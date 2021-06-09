import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { palette } from "./constants"

const Row = styled.div`
  margin-bottom: 24px;
`

const Post = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BlogTitle = styled.h3`
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;

  &:hover {
    color: ${palette.purple} !important;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
  }
`
const Date = styled.h3`
  font-weight: 500;
`

export const BlogPost = props => {
  let date = props.date.substring(0, 10)

  return (
    <Row>
      <Link to={props.path}>
        <Post>
          <BlogTitle>{props.title}</BlogTitle>
          <Date>{date}</Date>
        </Post>
      </Link>
    </Row>
  )
}
