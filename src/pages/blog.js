import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { BlogGallery } from "../components/gallery"

function BlogPage({ data }) {
  const { edges: all } = data.allMdx

  return (
    <Layout>
      <SEO title="Blog" />
      <BlogGallery section="Blog" posts={all} />
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query blogIndex {
    allMdx(
      filter: { frontmatter: { date: { ne: null } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            type
            date
            readTime
          }
        }
      }
    }
  }
`
