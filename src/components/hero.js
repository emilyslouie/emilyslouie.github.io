import React from "react"
import Typing from "react-typing-animation"
import Slide from "react-reveal/Slide"
import SocialMedia from "./socialmedia"

function Hero() {
  let words = [
    "problem solver",
    "designer & developer",
    "engineering student",
    "piplup enthusiast",
    "avid gamer",
  ]

  return (
    <div className="hero">
      <Slide bottom>
        <div className="name-heading">
          <h1>
            <span className="name">Emily Louie</span> –{" "}
            <div className="typer">
              <Typing loop={true} cursorClassName="cursor">
                <span>{words[0]}</span>
                <Typing.Speed ms={800} />
                <Typing.Delay ms={2000} />
                <Typing.Backspace count={words[0].length + 1} speed={50} />
                <span>{words[1]}</span>
                <Typing.Speed ms={800} />
                <Typing.Delay ms={2000} />
                <Typing.Backspace count={words[1].length + 1} speed={50} />
                <span>{words[2]}</span>
                <Typing.Speed ms={800} />
                <Typing.Delay ms={2000} />
                <Typing.Backspace count={words[2].length + 1} speed={50} />{" "}
                <span>{words[3]}</span>
                <Typing.Speed ms={800} />
                <Typing.Delay ms={2000} />
                <Typing.Backspace count={words[3].length + 1} speed={50} />
                <span>{words[4]}</span>
                <Typing.Speed ms={800} />
                <Typing.Delay ms={2000} />
                <Typing.Backspace count={words[4].length + 1} speed={50} />
              </Typing>
            </div>
          </h1>
        </div>
      </Slide>
      <Slide bottom>
        <h3 className="sub-heading">
          I’m a creator focused on engineering products and experiences that
          empower people.
        </h3>
        <div className="roles">
          <p>
            <strong>
              <a
                href="https://uwblueprint.org"
                target="_blank"
                rel="noreferrer"
              >
                Blueprint
              </a>
            </strong>{" "}
            – Product Designer (Now)
          </p>
          <p>
            <strong>
              <a href="https://cutc.ca" target="_blank" rel="noreferrer">
                Canadian Undergraduate Tech Conference
              </a>
            </strong>{" "}
            – Lead Designer (Now)
          </p>
          <p>
            <strong>
              <a
                href="https://www.ontario.ca/page/ontario-digital-service"
                target="_blank"
                rel="noreferrer"
              >
                Ontario Digital Service
              </a>
            </strong>{" "}
            – Product Designer & Full Stack Developer (2020)
          </p>
          <p>
            <strong>
              <a
                href="https://medium.com/@emilyslouie/3-things-i-learned-at-microsoft-2f40bdf93c9b"
                target="_blank"
                rel="noreferrer"
              >
                Microsoft
              </a>
            </strong>{" "}
            – Designer & Developer (2019)
          </p>
        </div>
        <p>
          <strong>Seeking internships for Summer 2021.</strong>
        </p>
        <SocialMedia />
      </Slide>
    </div>
  )
}

export default Hero
