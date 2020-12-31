import React from "react"
import SocialMedia from "./socialmedia"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

function Footer() {
  return (
    <div className="footer">
      <hr />
      <SocialMedia />
      <p>
        Designed and developed with{" "}
        <span>
          <FontAwesomeIcon size="lg" className="heart" icon={faHeart} />
        </span>{" "}
        by Emily Louie
      </p>
    </div>
  )
}

export default Footer
