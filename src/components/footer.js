import React from "react"
import SocialMedia from "./socialmedia"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

function Footer() {
  return (
    <div className="footer">
      <hr />
      <div className="horizontal">
        <SocialMedia />
        <p>Designed and developed by Emily Louie</p>
      </div>
    </div>
  )
}

export default Footer
