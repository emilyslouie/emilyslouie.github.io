import { STICKERS } from "./stickers.js"

const HOLD_MS = 170
const DRAG_DISTANCE = 6
const MIN_VISIBLE = 120
const OPEN_Z = 1001
const CLOSE_SPACE = 56
const MIN_ZOOM = 0.4
const MAX_ZOOM = 2.5
const MIN_SIZE = 0.5
const MAX_SIZE = 4

const root = document.documentElement
const viewport = document.querySelector("#viewport")
const world = document.querySelector("#world")
const deck = document.querySelector("#deck")
const layer = document.querySelector("#layer")
const scrim = document.querySelector("#scrim")
const toolbar = document.querySelector("#toolbar")
const tray = document.querySelector("#tray")
const stickersButton = document.querySelector("#stickers")
const slots = [...deck.children]
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches
// Keep this query in step with canvas.css. Everywhere else the page scrolls and cards flip in place.
const canvasMode = matchMedia("(hover: hover) and (pointer: fine)")

const pan = { x: 0, y: 0 }
const movables = [...document.querySelectorAll(".movable")]
const offsets = new Map(
  [...slots.map(slot => slot.querySelector(".mover")), ...movables].map(item => [item, { x: 0, y: 0 }]),
)
let zoom = 1
let openSlot = null
let gesture = null
let zTop = 40

const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

/* ---- Panning and zooming. Positions on screen are world positions times zoom, plus pan. ---- */
function extent() {
  const left = []
  const right = []
  const top = []
  const bottom = []
  for (const el of [world.querySelector(".links"), ...offsets.keys()]) {
    const r = el.getBoundingClientRect()
    left.push(r.left - pan.x)
    right.push(r.right - pan.x)
    top.push(r.top - pan.y)
    bottom.push(r.bottom - pan.y)
  }
  return {
    left: Math.min(...left),
    right: Math.max(...right),
    top: Math.min(...top),
    bottom: Math.max(...bottom),
  }
}

function setPan(x, y) {
  const { left, right, top, bottom } = extent()
  // Something always stays on screen, so nobody can get lost.
  pan.x = clamp(x, MIN_VISIBLE - right, innerWidth - MIN_VISIBLE - left)
  pan.y = clamp(y, MIN_VISIBLE - bottom, innerHeight - MIN_VISIBLE - top)
  showPan()
}

function showPan() {
  root.style.setProperty("--px", `${pan.x}px`)
  root.style.setProperty("--py", `${pan.y}px`)
  root.style.setProperty("--z", zoom)
}

// Scrolling stops at the top and bottom of the page, unless the canvas has been panned sideways
// or zoomed, or something has been dragged past the edge.
function scrollBy(deltaY) {
  const next = pan.y - deltaY
  if (Math.abs(pan.x) > 1 || zoom !== 1) return setPan(pan.x, next)
  const { top, bottom } = extent()
  const pageBottom = Math.max(world.getBoundingClientRect().bottom - pan.y, bottom)
  const lowest = Math.min(0, innerHeight - pageBottom)
  const highest = Math.max(0, -top)
  // Someone dragged past an edge can always scroll back, just not further out.
  pan.y = clamp(next, Math.min(lowest, pan.y), Math.max(highest, pan.y))
  showPan()
}

function zoomAt(x, y, factor) {
  const next = clamp(zoom * factor, MIN_ZOOM, MAX_ZOOM)
  if (next === zoom) return
  pan.x = x - (x - pan.x) * (next / zoom)
  pan.y = y - (y - pan.y) * (next / zoom)
  zoom = next
  showPan()
  setPan(pan.x, pan.y)
}

viewport.addEventListener(
  "wheel",
  event => {
    if (!canvasMode.matches) return
    event.preventDefault()
    if (openSlot || gesture) return
    // Trackpads report a pinch as a wheel event with ctrlKey set.
    if (event.ctrlKey) zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * 0.01))
    // Scrolling is vertical only; moving sideways takes a drag on the canvas.
    else scrollBy(event.deltaY)
  },
  { passive: false },
)

// Safari reports a pinch as its own gesture events.
let lastScale = 1
for (const type of ["gesturestart", "gesturechange"]) {
  viewport.addEventListener(type, event => {
    if (!canvasMode.matches) return
    event.preventDefault()
    if (type === "gesturestart") lastScale = 1
    if (!openSlot && !gesture) zoomAt(event.clientX, event.clientY, event.scale / lastScale)
    lastScale = event.scale
  })
}

// Links and other native drags would otherwise cancel the gesture partway through.
viewport.addEventListener("dragstart", event => event.preventDefault())

/* ---- Gestures: only one at a time, and it keeps the pointer until it ends. ---- */
function beginGesture(id, end) {
  gesture?.()
  gesture = () => {
    gesture = null
    removeEventListener("blur", cancelGesture)
    end()
  }
  addEventListener("blur", cancelGesture)
  return () => {
    if (viewport.hasPointerCapture(id)) return
    try {
      viewport.setPointerCapture(id)
    } catch {}
  }
}

const cancelGesture = () => gesture?.()

/* ---- Items ---- */
function place(item) {
  const { x, y } = offsets.get(item)
  item.style.setProperty("--x", `${x}px`)
  item.style.setProperty("--y", `${y}px`)
}

const overToolbar = event => {
  const r = toolbar.getBoundingClientRect()
  return event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom
}

function removeItem(item) {
  if (item === selected) select(null)
  offsets.delete(item)
  item.remove()
}

// A Figma-style selection frame: an outline on hover, and corner handles once selected.
function addFrame(item) {
  const frame = document.createElement("span")
  frame.className = "frame"
  frame.setAttribute("aria-hidden", "true")
  // Rotate zones sit just outside each corner, under its resize handle, as in Figma.
  frame.innerHTML = ["nw", "ne", "sw", "se"]
    .map(corner => `<span class="rotor ${corner}"></span><span class="handle ${corner}"></span>`)
    .join("")
  item.append(frame)
}

movables.forEach(addFrame)

let selected = null
function select(item) {
  selected?.classList.remove("selected")
  selected = item
  item?.classList.add("selected")
}

const worldPoint = (clientX, clientY, element) => ({
  x: (clientX - pan.x) / zoom - element.offsetWidth / 2,
  y: (clientY - pan.y) / zoom - element.offsetHeight / 2,
})

function addItem(element, clientX, clientY) {
  element.classList.add("placed")
  element.style.setProperty("--r", `${(Math.random() - 0.5) * 12}deg`)
  element.style.zIndex = ++zTop
  addFrame(element)
  layer.append(element)
  offsets.set(element, worldPoint(clientX, clientY, element))
  place(element)
  return element
}

function makeSticker(sticker) {
  const element = document.createElement("button")
  element.type = "button"
  element.className = "sticker"
  element.setAttribute("aria-label", `${sticker.name} sticker. Press Delete to remove.`)
  element.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">${sticker.art}</svg>`
  return element
}

const viewCentre = () => ({
  x: innerWidth / 2 + (Math.random() - 0.5) * 120,
  y: innerHeight / 2 + (Math.random() - 0.5) * 120,
})

/* ---- Flip: the card comes to the middle of the screen at a readable size. ---- */
function setOpen(slot, open) {
  const mover = slot.querySelector(".mover")
  const front = slot.querySelector(".front")
  const back = slot.querySelector(".back")
  slot.classList.toggle("open", open)
  front.inert = open
  back.inert = !open
  openSlot = open ? slot : null

  const overlay = open && canvasMode.matches
  root.classList.toggle("has-open", overlay)
  scrim.hidden = !overlay

  if (overlay) {
    closeTray()
    // Dragged cards keep their own stacking order, which must not beat the scrim.
    mover.dataset.z = mover.style.zIndex
    mover.style.zIndex = OPEN_Z
    const home = slot.getBoundingClientRect()
    const shape = home.height / home.width
    const width = Math.min(innerWidth * 0.86, (innerHeight - CLOSE_SPACE - 32) / shape, 360)
    const height = width * shape
    mover.style.width = `${width / zoom}px`
    mover.style.setProperty("--x", `${((innerWidth - width) / 2 - home.left) / zoom}px`)
    mover.style.setProperty("--y", `${((innerHeight - height - CLOSE_SPACE) / 2 - home.top) / zoom}px`)
    mover.style.setProperty("--r", "0deg")
  } else {
    mover.style.zIndex = mover.dataset.z ?? ""
    mover.style.width = ""
    mover.style.removeProperty("--r")
    place(mover)
  }
  ;(open ? (slot.querySelector(".go") ?? back) : front).focus({ preventScroll: true })
}

const closeOpen = () => openSlot && setOpen(openSlot, false)

scrim.addEventListener("click", closeOpen)

/* ---- Press: tap acts on an item, drag moves it, and empty canvas pans. ---- */
function startPan(event) {
  const start = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }
  viewport.classList.add("panning")
  const move = ev => {
    // Capturing only once it moves leaves plain clicks on header links alone.
    if (Math.hypot(ev.clientX - start.x, ev.clientY - start.y) >= DRAG_DISTANCE) capture()
    setPan(start.panX + ev.clientX - start.x, start.panY + ev.clientY - start.y)
  }
  const end = () => {
    viewport.classList.remove("panning")
    removeEventListener("pointermove", move)
    removeEventListener("pointerup", cancelGesture)
    removeEventListener("pointercancel", cancelGesture)
  }
  const capture = beginGesture(event.pointerId, end)
  addEventListener("pointermove", move)
  addEventListener("pointerup", cancelGesture)
  addEventListener("pointercancel", cancelGesture)
}

/* ---- Resize and rotate, both around the item's centre. ---- */
function startResize(event, item) {
  const startSize = parseFloat(item.style.getPropertyValue("--s")) || 1
  // Size follows how far the pointer is from the centre.
  transformItem(event, item, "resizing", (ev, from) =>
    item.style.setProperty("--s", clamp((startSize * from.reach(ev)) / from.reach(event), MIN_SIZE, MAX_SIZE)),
  )
}

function startRotate(event, item) {
  const startTurn = parseFloat(item.style.getPropertyValue("--r")) || 0
  transformItem(event, item, "rotating", (ev, from) => {
    const turn = startTurn + from.angle(ev) - from.angle(event)
    // Shift snaps to 15° steps, as in Figma.
    item.style.setProperty("--r", `${ev.shiftKey ? Math.round(turn / 15) * 15 : turn}deg`)
  })
}

function transformItem(event, item, state, update) {
  const box = item.getBoundingClientRect()
  const centre = { x: box.left + box.width / 2, y: box.top + box.height / 2 }
  const from = {
    reach: ev => Math.hypot(ev.clientX - centre.x, ev.clientY - centre.y),
    angle: ev => (Math.atan2(ev.clientY - centre.y, ev.clientX - centre.x) * 180) / Math.PI,
  }
  item.classList.add(state)
  item.style.zIndex = ++zTop
  const move = ev => {
    capture()
    update(ev, from)
  }
  const end = () => {
    item.classList.remove(state)
    removeEventListener("pointermove", move)
    removeEventListener("pointerup", cancelGesture)
    removeEventListener("pointercancel", cancelGesture)
  }
  const capture = beginGesture(event.pointerId, end)
  addEventListener("pointermove", move)
  addEventListener("pointerup", cancelGesture)
  addEventListener("pointercancel", cancelGesture)
}

function tapItem(item) {
  if (item.classList.contains("mover")) setOpen(item.parentElement, true)
}

viewport.addEventListener("pointerdown", event => {
  if (!canvasMode.matches || event.button || !event.isPrimary || openSlot) return
  closeTray()

  const handle = event.target.closest(".handle")
  if (handle) return startResize(event, handle.closest(".placed, .movable"))
  const rotor = event.target.closest(".rotor")
  if (rotor) return startRotate(event, rotor.closest(".placed, .movable"))

  const item = event.target.closest(".mover, .placed, .movable")
  select(item?.matches(".placed, .movable") ? item : null)
  if (!item) return startPan(event)

  const origin = { ...offsets.get(item) }
  let lifted = false
  let moved = false

  const lift = () => {
    lifted = true
    item.classList.add("held")
    item.style.zIndex = ++zTop
  }
  const timer = setTimeout(lift, HOLD_MS)

  const finish = () => {
    clearTimeout(timer)
    removeEventListener("pointermove", move)
    removeEventListener("pointerup", up)
    removeEventListener("pointercancel", cancelGesture)
    item.classList.remove("held", "removing")
    toolbar.classList.remove("dropping")
  }
  const capture = beginGesture(event.pointerId, finish)

  function move(ev) {
    const dx = ev.clientX - event.clientX
    const dy = ev.clientY - event.clientY
    if (!lifted) {
      if (Math.hypot(dx, dy) < DRAG_DISTANCE) return
      // On touch, moving before the hold finishes pans; the card only comes up after a hold.
      if (ev.pointerType !== "mouse") {
        cancelGesture()
        return startPan(ev)
      }
      clearTimeout(timer)
      lift()
    }
    if (Math.hypot(dx, dy) < DRAG_DISTANCE && !moved) return
    moved = true
    capture()
    const pos = offsets.get(item)
    pos.x = origin.x + dx / zoom
    pos.y = origin.y + dy / zoom
    place(item)
    if (item.classList.contains("placed")) {
      const dropping = overToolbar(ev)
      toolbar.classList.toggle("dropping", dropping)
      item.classList.toggle("removing", dropping)
    }
  }

  function up(ev) {
    cancelGesture()
    if (!moved) tapItem(item)
    else if (item.classList.contains("placed") && overToolbar(ev)) removeItem(item)
  }

  addEventListener("pointermove", move)
  addEventListener("pointerup", up)
  addEventListener("pointercancel", cancelGesture)
})

deck.addEventListener("click", event => {
  const slot = event.target.closest(".slot")
  if (!slot) return
  if (event.target.closest(".close")) return setOpen(slot, false)
  if (event.target.closest("a")) return
  if (slot.classList.contains("open")) {
    // Off the canvas a tap flips it back, unless it ends a text selection.
    if (!canvasMode.matches && event.detail > 0 && !getSelection().toString()) setOpen(slot, false)
    return
  }
  if (!canvasMode.matches || event.detail === 0) {
    // On the canvas, pointer presses are handled above; detail is 0 only for keyboard clicks.
    if (openSlot) setOpen(openSlot, false)
    setOpen(slot, true)
  }
})

// Tabbing to something off screen brings it into view. Presses and closing a card move focus
// too, and those must never pan the canvas.
let tabbing = false
addEventListener("keydown", event => (tabbing = event.key === "Tab"), true)
addEventListener("pointerdown", () => (tabbing = false), true)

viewport.addEventListener("focusin", event => {
  if (!canvasMode.matches) return
  viewport.scrollTo(0, 0)
  if (openSlot || !tabbing) return
  const r = event.target.getBoundingClientRect()
  if (r.left < 0 || r.right > innerWidth || r.top < 0 || r.bottom > innerHeight) {
    setPan(pan.x + innerWidth / 2 - (r.left + r.right) / 2, pan.y + innerHeight / 2 - (r.top + r.bottom) / 2)
  }
})

/* ---- Keyboard ---- */
addEventListener("keydown", event => {
  if (event.key === "Escape") {
    select(null)
    closeTray()
    return closeOpen()
  }
  if (!canvasMode.matches || openSlot) return
  const item = document.activeElement?.closest?.(".mover, .placed, .movable") ?? selected
  if ((event.key === "Delete" || event.key === "Backspace") && item?.classList.contains("placed")) {
    return removeItem(item)
  }
  const nudge = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24] }[event.key]
  if (!nudge) return
  event.preventDefault()
  if (item) {
    const pos = offsets.get(item)
    pos.x += nudge[0]
    pos.y += nudge[1]
    place(item)
  } else {
    setPan(pan.x - nudge[0] * 2, pan.y - nudge[1] * 2)
  }
})

/* ---- Toolbar: tools can be tapped, or dragged straight onto the canvas. ---- */
function closeTray() {
  tray.hidden = true
  stickersButton.setAttribute("aria-expanded", "false")
}

function dragOut(button, makeElement, onTap) {
  button.addEventListener("pointerdown", event => {
    if (event.button) return
    const start = { x: event.clientX, y: event.clientY }
    const box = button.getBoundingClientRect()
    const grab = { x: (start.x - box.left) / box.width - 0.5, y: (start.y - box.top) / box.height - 0.5 }
    let element = null
    const move = ev => {
      if (!element && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) >= DRAG_DISTANCE) {
        element = addItem(makeElement(), ev.clientX, ev.clientY)
        element.classList.add("held")
        closeTray()
      }
      if (element) {
        const pos = worldPoint(ev.clientX, ev.clientY, element)
        pos.x -= grab.x * element.offsetWidth
        pos.y -= grab.y * element.offsetHeight
        offsets.set(element, pos)
        place(element)
      }
    }
    const end = () => {
      removeEventListener("pointermove", move)
      removeEventListener("pointerup", up)
      removeEventListener("pointercancel", end)
    }
    const up = ev => {
      end()
      if (!element) return onTap()
      element.classList.remove("held")
      if (overToolbar(ev)) removeItem(element)
    }
    addEventListener("pointermove", move)
    addEventListener("pointerup", up)
    addEventListener("pointercancel", end)
  })
  button.addEventListener("click", event => {
    if (event.detail === 0) onTap()
  })
}

tray.innerHTML = STICKERS.map(
  (s, i) => `<button type="button" data-i="${i}" aria-label="Add ${s.name} sticker" data-tip="${s.name}">
    <svg viewBox="0 0 100 100" aria-hidden="true">${s.art}</svg></button>`,
).join("")

for (const button of tray.querySelectorAll("button")) {
  const sticker = STICKERS[button.dataset.i]
  dragOut(
    button,
    () => makeSticker(sticker),
    () => {
      const { x, y } = viewCentre()
      addItem(makeSticker(sticker), x, y)
      closeTray()
    },
  )
}

stickersButton.addEventListener("click", () => {
  tray.hidden = !tray.hidden
  stickersButton.setAttribute("aria-expanded", String(!tray.hidden))
})

function tidy() {
  select(null)
  closeOpen()
  closeTray()
  for (const [item, pos] of offsets) {
    if (item.classList.contains("placed")) continue
    pos.x = pos.y = 0
    place(item)
    item.style.removeProperty("--s")
    item.style.removeProperty("--r")
  }
  pan.x = pan.y = 0
  zoom = 1
  showPan()
}

document.querySelector("#tidy").addEventListener("click", tidy)

canvasMode.addEventListener("change", tidy)

// Card offsets only make sense for the grid they were dropped on.
let lastWidth = innerWidth
addEventListener("resize", () => {
  if (innerWidth !== lastWidth) tidy()
  lastWidth = innerWidth
})

/* ---- Theme ---- */
const themeButton = document.querySelector("#theme")
const labelTheme = () => {
  const label = `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} mode`
  themeButton.setAttribute("aria-label", label)
  themeButton.dataset.tip = label
}
function switchTheme() {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark"
  try {
    localStorage.setItem("theme", root.dataset.theme)
  } catch {}
  labelTheme()
}

themeButton.addEventListener("click", () => {
  // WebKit misplaces the snapshot of a scrolled page, so the crossfade is kept to the canvas, which never scrolls.
  if (calm || !canvasMode.matches || !document.startViewTransition) switchTheme()
  else document.startViewTransition(switchTheme)
})
labelTheme()

/* ---- Rest the art on cards that are off screen. ---- */
const sight = new IntersectionObserver(entries =>
  entries.forEach(entry => entry.target.classList.toggle("away", !entry.isIntersecting)),
)
slots.forEach(slot => sight.observe(slot))

/* ---- Deal the cards in. ---- */
if (!calm) {
  slots.forEach((slot, i) =>
    slot.animate(
      [
        { translate: "0 48px", rotate: `${(i % 3 - 1) * 5}deg`, opacity: 0 },
        { translate: "0 0", rotate: "0deg", opacity: 1 },
      ],
      { duration: 620, delay: 80 + i * 40, easing: "cubic-bezier(.2, 1.15, .3, 1)", fill: "backwards" },
    ),
  )
}
