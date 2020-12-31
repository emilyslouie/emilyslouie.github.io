import React from "react"
import ProjectCard from "./projectCard"
import Slide from "react-reveal/Slide"

// get the index of the current post
// get the length of the total number of posts
// if the current post is post 1 or length
// and if post is 1, then return length and 2
// if post is length, then return length-1 and 1
function getCorrectCards(current, length) {
  if (current === 1) {
    return [2, length, false]
  } else if (current === length) {
    return [1, length - 1, false]
  } else {
    return [current + 1, current - 1, true]
  }
}

const MoreProjects = props => {
  const cardsToDisplay = getCorrectCards(props.current, props.projects.length)
  return (
    <div className="more-gallery">
      <Slide bottom>
        <div className="grid">
          {cardsToDisplay[2]
            ? props.projects
                .map(({ node }, i) => {
                  if (cardsToDisplay.includes(i + 1)) {
                    const {
                      title,
                      path,
                      thumbnail,
                      tags,
                      company,
                    } = node.frontmatter
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
                  }
                })
                .sort()
                .reverse()
            : props.projects
                .map(({ node }, i) => {
                  if (cardsToDisplay.includes(i + 1)) {
                    const {
                      title,
                      path,
                      thumbnail,
                      tags,
                      company,
                    } = node.frontmatter
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
                  }
                })
                .sort()}
        </div>
      </Slide>
    </div>
  )
}

export default MoreProjects
