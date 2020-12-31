import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

function SocialMedia() {
  return (
    <div className="social-icons">
      <a href="mailto:emilyslouie@gmail.com" target="_blank" rel="noreferrer">
        <FontAwesomeIcon size="lg" className="toggle" icon={faEnvelope} />
      </a>
      <a
        href="https://www.linkedin.com/in/emilyslouie/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon size="lg" className="toggle" icon={faLinkedinIn} />
      </a>
      <a href="https://github.com/emilyslouie" target="_blank" rel="noreferrer">
        <FontAwesomeIcon size="lg" className="toggle" icon={faGithub} />
      </a>
    </div>
  )
}

export default SocialMedia
