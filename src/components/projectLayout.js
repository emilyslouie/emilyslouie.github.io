import React from "react"
import Layout from "./layout"
import SEO from "./seo"
import ScrollToTop from "react-scroll-to-top"

function ProjectLayout({ children, pageContext }) {
  const { shortTitle } = pageContext.frontmatter

  return (
    <>
      <ScrollToTop
        smooth
        svgPath="M74.1992 58.3828L51.9297 36.1094C51.4141 35.5977 50.7305 35.3125 49.9805 35.3125C49.25 35.3125 48.5625 35.5977 48.0469 36.1094L25.7969 58.3594C25.2852 58.875 25 59.5625 25 60.293C25 61.0273 25.2812 61.7148 25.7969 62.2266L27.4375 63.8672C27.9531 64.3828 28.6367 64.6641 29.3711 64.6641C30.1016 64.6641 30.7891 64.3828 31.3047 63.8672L49.9883 45.1836L68.6953 63.8867C69.207 64.4023 69.8945 64.6875 70.6289 64.6875C71.3594 64.6875 72.0469 64.4023 72.5625 63.8867L74.1992 62.25C75.2656 61.1836 75.2656 59.4492 74.1992 58.3828Z"
        viewBox="0 0 100 100"
        color="#333333"
        style={{ borderRadius: "50%" }}
      />
      <Layout>
        <SEO title={shortTitle} />
        <div className="case-study">{children}</div>
      </Layout>
    </>
  )
}

export default ProjectLayout
