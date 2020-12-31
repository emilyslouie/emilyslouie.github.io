import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

const ProjectCard = props => {
  return (
    <div className="card">
      <Link to={props.path}>
        <div>
          <Img
            fluid={props.thumbnail.childImageSharp.fluid}
            alt={props.title}
          />
        </div>
        <div className="description">
          <h2>{props.title}</h2>
          <p>{props.company}</p>
          <ul>
            {props.tags.map((tag, i) => (
              <li key={i}>{tag}</li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  )
}

export default ProjectCard
