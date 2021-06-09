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

const DetailsProjectContainer = styled(DetailsContainer)`
  margin-top: 32px;
`

const DetailsBlogContainer = styled(DetailsContainer)`
  margin-top: -20px;
  p {
    margin-top: 0px;
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
    <DetailsContainer>
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
    </DetailsContainer>
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
    <DetailsProjectContainer>
      <p>
        <Title>Timeline</Title> – {props.timeline}
      </p>
      <p>
        <Title>Role</Title> – {props.role}
      </p>
      <p>
        <Title>Skills</Title> – {skills}
      </p>
    </DetailsProjectContainer>
  )
}

export const DetailsBlog = props => {
  let date = new Date(props.date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "utc",
  })

  return (
    <>
      <DetailsBlogContainer>
        <p>
          <span>{date}</span> // {props.time} min read
        </p>
      </DetailsBlogContainer>
    </>
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
