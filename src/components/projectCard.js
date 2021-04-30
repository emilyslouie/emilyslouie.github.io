import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ProjectCard = props => {
  return (
    <div className="card">
      <Link to={props.path}>
        <div>
          <GatsbyImage
            image={props.thumbnail.childImageSharp.gatsbyImageData}
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
