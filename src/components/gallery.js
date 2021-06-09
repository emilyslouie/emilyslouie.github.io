import React from "react"
import ProjectCard from "./projectCard"
import Slide from "react-reveal/Slide"
import { BlogPost } from "./blogPost"
import styled from "styled-components"

export const Gallery = props => {
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

const BlogTitle = styled.div`
  margin-bottom: 48px;
`

const Subheading = styled.p`
  font-style: italic;
  opacity: 70%;
`

export const BlogGallery = props => {
  return (
    <div className="project-section">
      <Slide bottom>
        <BlogTitle>
          <h2>{props.section}</h2>
          <Subheading>Just some thoughts and scribbles.</Subheading>
        </BlogTitle>

        {props.posts.map(({ node }) => {
          const { title, path, date, readTime } = node.frontmatter
          return (
            <BlogPost
              key={node.id}
              title={title}
              path={path}
              date={date}
              readTime={readTime}
            />
          )
        })}
      </Slide>
    </div>
  )
}
