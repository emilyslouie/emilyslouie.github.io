import React from "react"
import Typing from "react-typing-animation"
import styled from "styled-components"
import { palette, font, media } from "./constants"
import SocialMedia from "./socialmedia"

const HeroContainer = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${media.small} {
    height: 100%;
    padding-bottom: 32px;
  }
`

const NameHeading = styled.h1`
  padding-top: 16px;
  padding-bottom: 16px;

  .name {
    color: ${palette.purple};
  }

  @media ${media.small} {
    min-height: 160px;
    padding-bottom: 0px;
  }
`

const Typer = styled.div`
  display: inline-block;
  overflow-wrap: normal;
  white-space: pre-line;

  @media ${media.medium} {
    display: block;
  }
`

const Subheading = styled.h3`
  font-weight: 500;
  color: inherit;
`

function Hero() {
  let words = [
    "problem solver",
    "developer & designer",
    "engineering student",
    "xr enthusiast",
    "avid gamer",
    "piplup fan",
  ]

  return (
    <HeroContainer>
      <NameHeading>
        <span className="name">Emily Louie</span> –{" "}
        <Typer>
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
            <span>{words[5]}</span>
            <Typing.Speed ms={800} />
            <Typing.Delay ms={2000} />
            <Typing.Backspace count={words[5].length + 1} speed={50} />
          </Typing>
        </Typer>
      </NameHeading>

      <Subheading>
        I’m a developer and designer striving to empower people.
      </Subheading>
      <div className="roles">
        <p>
          I'm a{" "}
          <strong>
            <a
              href="https://uwaterloo.ca/systems-design-engineering/"
              target="_blank"
              rel="noreferrer"
            >
              Systems Design Engineering
            </a>
          </strong>{" "}
          student at the University of Waterloo. Previously, I've created cool
          things at{" "}
          <strong>
            <a href="https://figma.com" target="_blank" rel="noreferrer">
              Figma
            </a>
          </strong>
          {", "}
          <strong>
            <a href="https://unity.com" target="_blank" rel="noreferrer">
              Unity
            </a>
          </strong>
          {", "}
          <strong>
            <a
              href="https://emily.louie.ca/microsoft"
              target="_blank"
              rel="noreferrer"
            >
              Microsoft
            </a>
          </strong>
          {", "}
          <strong>
            <a href="https://lumafield.com" target="_blank" rel="noreferrer">
              Lumafield
            </a>
          </strong>{" "}
          and{" "}
          <strong>
            <a
              href="https://www.ontario.ca/page/ontario-digital-service"
              target="_blank"
              rel="noreferrer"
            >
              Ontario Digital Service
            </a>
          </strong>
          .
        </p>
      </div>
      <SocialMedia />
    </HeroContainer>
  )
}

export default Hero
