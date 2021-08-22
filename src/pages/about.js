import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import about from "../assets/about.json"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
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
        <h2>Some of the things I've done</h2>
        <div className="section">
          <Accordion
            allowZeroExpanded
            preExpanded={["a"]}
            allowMultipleExpanded
          >
            <AccordionItem uuid="a">
              <AccordionItemHeading>
                <AccordionItemButton>Experience</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
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
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Community</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
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
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Education</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="entry education">
                  <h4>
                    {about.education.school} –{" "}
                    <a
                      href={about.education.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {about.education.program}
                    </a>
                  </h4>
                  <p className="date">{about.education.graduation}</p>
                  <p>
                    <strong>Relevant courses: </strong>
                    {about.education.courses}
                  </p>
                  <p>{about.education.description}</p>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
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
