import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import about from "../assets/about.json"
import Slide from "react-reveal/Slide"
import SocialMedia from "../components/socialmedia"
import { Blockquote } from "../components/details"

const AboutPage = props => (
  <Layout>
    <SEO title="About" />
    <div className="about">
      <div className="row">
        <div className="column">
          <div className="intro">
            <h1>Hey, I'm Emily!</h1>
            <Blockquote text={about.about.tagline} />
            {about.about.description.map(item => {
              return (
                <p
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                ></p>
              )
            })}
            <SocialMedia />
          </div>
        </div>
        <div className="column">
          <GatsbyImage
            image={props.data.fileName.childImageSharp.gatsbyImageData}
            alt="Emily in Taiwan"
          />
          <p className="caption">
            I travelled to Taiwan to teach English in 2018!
          </p>
        </div>
      </div>
      <div className="resume">
        <Slide bottom>
          <div className="section">
            <h2>Experience</h2>
            {about["experience"].map(item => {
              return (
                <div className="entry">
                  <h4>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.company}
                    </a>{" "}
                    – {item.role}
                  </h4>
                  <p className="date">{item.date}</p>
                  {item["description"].map(point => {
                    return (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: point,
                        }}
                      ></p>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </Slide>
        <Slide bottom>
          <div className="section">
            <h2>Community</h2>
            {about["community"].map(item => {
              return (
                <div className="entry">
                  <h4>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.company}
                    </a>{" "}
                    – {item.role}
                  </h4>
                  <p className="date">{item.date}</p>
                  {item["description"].map(point => {
                    return (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: point,
                        }}
                      ></p>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </Slide>
        <Slide bottom>
          <div className="section">
            <h2>Education</h2>
            <div className="entry education">
              <h4>
                {about.education.school} –{" "}
                <a href={about.education.link} target="_blank" rel="noreferrer">
                  {about.education.program}
                </a>
              </h4>
              <p className="date">{about.education.graduation}</p>
              <p>{about.education.description}</p>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  </Layout>
)

export default AboutPage

export const query = graphql`
  {
    fileName: file(relativePath: { eq: "emily.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`
