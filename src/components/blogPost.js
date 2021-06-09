import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { media, palette } from "./constants"

const Row = styled.div`
  margin-bottom: 36px;
`

const Post = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media ${media.medium} {
    flex-direction: column;
  }
`

const BlogTitle = styled.h3`
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  margin-bottom: 0;

  @media ${media.medium} {
    margin-bottom: 4px;
  }

  &:hover {
    color: ${palette.purple} !important;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
  }
`
const Date = styled.h3`
  font-weight: 500;
  margin-bottom: 0;
`
const Details = styled.p`
  font-style: normal;
  margin-bottom: 0;
`

const BlogDetails = styled.p`
  margin-top: 8px;
  font-style: italic;
  opacity: 85%; ;
`

export const BlogPost = props => {
  let date = props.date.substring(0, 10)
  let tags = props.tags.join(", ")
  return (
    <Row>
      <Link to={props.path}>
        <Post>
          <BlogTitle>{props.title}</BlogTitle>
          <Date>{date}</Date>
        </Post>
        <BlogDetails>
          {props.readTime} min read // {tags}
        </BlogDetails>
      </Link>
    </Row>
  )
}

const BlogCard = props => {
  let date = props.date.substring(0, 10)
  return (
    <div className="card">
      <Link to={props.path}>
        <div className="description">
          <h2>{props.title}</h2>
          <Details>
            {date} // {props.time} min read
          </Details>
        </div>
      </Link>
    </div>
  )
}

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

export const NextPrevPosts = props => {
  const cardsToDisplay = getCorrectCards(props.current, props.projects.length)
  return (
    <div className="more-gallery">
      <div className="grid">
        {cardsToDisplay[2]
          ? props.projects
              .map(({ node }, i) => {
                if (cardsToDisplay.includes(i + 1)) {
                  const { title, path, date, readTime } = node.frontmatter
                  return (
                    <BlogCard
                      key={node.id}
                      title={title}
                      path={path}
                      date={date}
                      time={readTime}
                    />
                  )
                }
              })
              .sort()
              .reverse()
          : props.projects
              .map(({ node }, i) => {
                if (cardsToDisplay.includes(i + 1)) {
                  const { title, path, date, readTime } = node.frontmatter
                  return (
                    <BlogCard
                      key={node.id}
                      title={title}
                      path={path}
                      date={date}
                      time={readTime}
                    />
                  )
                }
              })
              .sort()}
      </div>
    </div>
  )
}
