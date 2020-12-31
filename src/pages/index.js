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
                fluid(maxWidth: 900) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
