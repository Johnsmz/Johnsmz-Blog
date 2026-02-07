module.exports = {
  siteMetadata: {
    title: `NeonMag Dev Blog`,
    description: `A black & bright-magenta material-style dev blog.`,
    author: `You`,
    siteUrl: `http://localhost:8000`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `blog`, path: `${__dirname}/content/blog` },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`
        ]
      }
    }
  ],
};
