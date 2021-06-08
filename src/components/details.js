import React from "react"
import styled from "styled-components"

const Title = styled.span`
  color: #c989df;
`

const DetailsContainer = styled.div`
  margin-bottom: 48px;
  p {
    margin-top: 8px;
    margin-bottom: 0px;
  }
  span {
    font-weight: 700;
  }
`

export const Details = props => {
  let skills = ""
  props.skills.map((item, i) =>
    i !== props.skills.length - 1
      ? (skills += `${item}, `)
      : (skills += `${item}`)
  )
  return (
    <div className="details">
      <div className="row">
        <div className="column">
          <p>
            <Title>Company</Title> – {props.company}
          </p>
          <p>
            <Title>Timeline</Title> – {props.timeline}
          </p>
        </div>
        <div className="column">
          <p>
            <Title>Role</Title> – {props.role}
          </p>

          <p>
            <Title>Skills</Title> – {skills}
          </p>
        </div>
      </div>
    </div>
  )
}

export const DetailsProject = props => {
  let skills = ""
  props.skills.map((item, i) =>
    i !== props.skills.length - 1
      ? (skills += `${item}, `)
      : (skills += `${item}`)
  )
  return (
    <div className="details margin-top">
      <p>
        <Title>Timeline</Title> – {props.timeline}
      </p>
      <p>
        <Title>Role</Title> – {props.role}
      </p>
      <p>
        <Title>Skills</Title> – {skills}
      </p>
    </div>
  )
}

const Block = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border-left: 4px solid #c989df;

  h3 {
    margin-left: 24px;
    font-weight: 500;
    line-height: 180%;
  }
`

export const Blockquote = props => {
  return (
    <Block>
      <h3>{props.text}</h3>
    </Block>
  )
}
