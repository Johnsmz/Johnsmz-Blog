const path = require('path');
const fs = require('fs');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const templatePath = path.join(__dirname, 'src', 'templates', 'blog-post.js');

  if (!fs.existsSync(templatePath)) {
    reporter.panicOnBuild(`Missing template at ${templatePath}. Make sure src/templates/blog-post.js exists.`);
    return;
  }

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          frontmatter { slug }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading markdown files', result.errors);
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes || [];
  if (posts.length === 0) {
    reporter.info('No markdown posts found.');
    return;
  }

  posts.forEach(post => {
    const slug = post.frontmatter && post.frontmatter.slug;
    if (!slug) {
      reporter.warn(`Skipping post ${post.id} — missing frontmatter.slug`);
      return;
    }
    createPage({
      path: `/blog/${slug}/`,
      component: templatePath,
      context: { id: post.id },
    });
  });
};
