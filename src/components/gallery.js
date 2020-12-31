import React from "react"
import ProjectCard from "./projectCard"
import Slide from "react-reveal/Slide"

const Gallery = props => {
  return (
    <div className="project-section">
      <Slide bottom>
        <h2>{props.section}</h2>
        <hr />
        <div className="grid">
          {props.projects.map(({ node }) => {
            const { title, path, thumbnail, tags, company } = node.frontmatter
            return (
              <ProjectCard
                key={node.id}
                title={title}
                path={path}
                thumbnail={thumbnail}
                tags={tags}
                company={company}
              />
            )
          })}
        </div>
      </Slide>
    </div>
  )
}

export default Gallery
