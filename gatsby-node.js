/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `allMdx`) {
    const path = createFilePath({ node, getNode, basePath: `/` })

    createNodeField({
      node,
      name: `path`,
      value: path,
    })
  }
}
