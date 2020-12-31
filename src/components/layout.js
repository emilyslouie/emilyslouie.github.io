import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
// import { useStaticQuery, graphql } from "gatsby"
import "typeface-ibm-plex-sans"
import "typeface-open-sans"
import Fade from "react-reveal/Fade"
import Footer from "./footer.js"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import Resume from "../assets/emilylouie.pdf"
import useDarkMode from "use-dark-mode"

import "./layout.scss"

const Layout = ({ children }) => {
  const darkMode = useDarkMode(true)

  // const [darkTheme, setDarkTheme] = useState(true)
  const [darkThemeIcon, setDarkThemeIcon] = useState(!darkMode.value)
  // useEffect(() => {
  //   setDarkThemeIcon(darkMode.value)
  // }, [darkMode.value])

  // useEffect(() => {
  //   localStorage.setItem("dark", JSON.stringify(darkTheme))
  // }, [darkTheme])
  // useEffect(() => {
  //   setDarkTheme(getDefaultTheme())
  // }, [])
  // function getDefaultTheme() {
  //   let selectedTheme = true

  //   if (typeof window !== "undefined") {
  //     selectedTheme = JSON.parse(localStorage.getItem("dark"))

  //     if (selectedTheme == null) {
  //       if (
  //         window.matchMedia &&
  //         window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ) {
  //         selectedTheme = true
  //       } else {
  //         selectedTheme = false
  //       }
  //     }
  //   }

  //   return selectedTheme || false
  // }
  const toggleDarkMode = checked => {
    setDarkThemeIcon(checked)
    checked ? darkMode.disable() : darkMode.enable()
  }

  if (typeof window !== "undefined") {
    let prevScrollpos = window.pageYOffset
    window.onscroll = function () {
      const maxScroll = document.body.clientHeight - window.innerHeight
      let currentScrollPos = window.pageYOffset
      if (
        (maxScroll > 0 &&
          prevScrollpos > currentScrollPos &&
          prevScrollpos <= maxScroll) ||
        (maxScroll <= 0 && prevScrollpos > currentScrollPos) ||
        (prevScrollpos <= 0 && currentScrollPos <= 0)
      ) {
        document.getElementById("navbar").style.top = "0"
      } else {
        document.getElementById("navbar").style.top = "-5.0rem"
      }
      prevScrollpos = currentScrollPos
    }
  }

  return (
    <>
      {/* <div className={darkTheme ? " dark-theme" : "light-theme"}> */}
      <div className="container">
        <Fade duration={1500}>
          <nav id="navbar">
            <div className="nav-container">
              <Link className="effect" to="/">
                <strong>Emily Louie</strong>
              </Link>
              <div className="items">
                <DarkModeSwitch
                  style={{
                    opacity: "0.7",
                    transform: "translateY(2px) rotate(50deg)",
                  }}
                  checked={darkThemeIcon}
                  size={18}
                  onChange={toggleDarkMode}
                  moonColor="#000000"
                  sunColor="#FFFFFF"
                />
                <Link className="effect" to="/about">
                  About
                </Link>
                <a
                  className="effect"
                  href={Resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  Résumé
                </a>
              </div>
            </div>
          </nav>
        </Fade>
        <Fade duration={1500}>
          <main>{children}</main>
        </Fade>
        <Fade duration={1500}>
          <Footer />
        </Fade>
      </div>
      {/* </div> */}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
