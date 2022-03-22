import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "typeface-ibm-plex-sans"
import "typeface-open-sans"
import Fade from "react-reveal/Fade"
import Footer from "./footer.js"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import Resume from "../../static/emilylouie.pdf"
import useDarkMode from "use-dark-mode"
import styled, { createGlobalStyle } from "styled-components"
import { palette, font, other, media } from "./constants"

import "./layout.scss"

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    font-family: ${font.openSans};
    margin: 0;
    background-color: ${palette.darkThemeBg};
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${font.ibmPlex};
    margin-bottom: 16px;
    font-weight: ${other.headerFontWeight};
    margin-top: 0;
    color: inherit;
  }
  
  h1 {
    font-size: 48px;
  }
  
  h2 {
    font-size: 24px;
  }
  
  h3 {
    font-size: 21px;
  }
  
  a, a:active, a:visited, a:hover, a:focus {
    text-decoration: none;
  }

  //Selection highlight colours
  ::-moz-selection {
    background: ${palette.highlight};
  }

  ::selection {
    background: ${palette.highlight};
  }

  //Scrollbar themes
* {
  scrollbar-width: thin;
  scrollbar-color: ${palette.grey} ${palette.headingBlack};
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: ${palette.headingBlack};
}
*::-webkit-scrollbar-thumb {
  background-color: ${palette.grey};
  border-radius: 20px;
  border: 3px solid ${palette.headingBlack};
}

  @media ${media.small} {
    h1 {
      font-size: 36px;
    }
    h2 {
      font-size: 21px;
    }
  
    h3 {
      font-size: 18px;
    }
  }

`
const Container = styled.div`
  max-width: 850px;
  margin: auto;

  @media ${media.medium} {
    padding-left: 16px;
    padding-right: 16px;
  }
`

const Layout = ({ children }) => {
  const darkMode = useDarkMode(false)
  const [darkThemeIcon, setDarkThemeIcon] = useState(darkMode.value)

  useEffect(() => {
    setDarkThemeIcon(!darkThemeIcon)
    setDarkThemeIcon(!darkThemeIcon)
  }, [])

  const toggleDarkMode = checked => {
    setDarkThemeIcon(!darkThemeIcon)
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
      <GlobalStyle />
      <Container>
        <Fade duration={1500}>
          <nav id="navbar">
            <div className="nav-container">
              <Link className="effect" to="/">
                <strong>Emily Louie</strong>
              </Link>
              <div className="items">
                <DarkModeSwitch
                  style={{
                    filter: "invert(1)",
                    opacity: "0.7",
                    transform: "translateY(2px) rotate(50deg)",
                  }}
                  checked={darkThemeIcon}
                  size={18}
                  onChange={toggleDarkMode}
                />
                <Link className="effect" to="/about">
                  About
                </Link>
                {/* <Link className="effect" to="/blog">
                  Blog
                </Link> */}
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
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
