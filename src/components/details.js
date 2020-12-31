import React from "react"

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
            <span className="purple">Company</span> – {props.company}
          </p>
          <p>
            <span className="purple">Timeline</span> – {props.timeline}
          </p>
        </div>
        <div className="column">
          <p>
            <span className="purple">Role</span> – {props.role}
          </p>

          <p>
            <span className="purple">Skills</span> – {skills}
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
        <span className="purple">Timeline</span> – {props.timeline}
      </p>
      <p>
        <span className="purple">Role</span> – {props.role}
      </p>
      <p>
        <span className="purple">Skills</span> – {skills}
      </p>
    </div>
  )
}

export const Blockquote = props => {
  return (
    <div className="blockquote">
      <div className="text">
        <h3>{props.text}</h3>
      </div>
    </div>
  )
}
