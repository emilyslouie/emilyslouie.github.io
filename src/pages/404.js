import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>
      You just hit a route that doesn&#39;t exist...{" "}
      <Link
        to="/"
        className="link"
        style={{ cursor: "pointer", borderBottom: "2px solid #c989df" }}
      >
        return to the homepage
      </Link>
      .
    </p>
  </Layout>
)

export default NotFoundPage
