import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Hero from "../components/hero"
import SEO from "../components/seo"
import Gallery from "../components/gallery"

function IndexPage({ data }) {
  const { edges: all } = data.allMdx
  let filteredExperience = all.filter(
    ({ node }) => node.frontmatter.type === "experience"
  )

  let filteredProjects = all.filter(
    ({ node }) => node.frontmatter.type === "project"
  )
  return (
    <Layout>
      <SEO title="Home" />
      <Hero />
      <Gallery section="Experience" projects={filteredExperience} />
      <Gallery section="Side Hustles" projects={filteredProjects} />
      <div className="project-section">
        <h2>I'm learning about...</h2>
        <hr />
        <div className="learning">
          <ul>
            <li>3D web development</li>
            <li>VR/AR/XR design and development</li>
            <li>Game development</li>
          </ul>
          <h3>
            <a
              className="effect"
              href="https://www.notion.so/emilyslouie/Learning-everyday-94851f74f9cd4dd89145f022fd340221"
              target="_blank"
              rel="noreferrer"
            >
              Learn more ➜
            </a>
          </h3>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query blogIndex {
    allMdx(sort: { order: DESC, fields: [frontmatter___order] }) {
      edges {
        node {
          id
          frontmatter {
            title
            shortTitle
            path
            type
            order
            tags
            company
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  height: 280
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    }
  }
`
