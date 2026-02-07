import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import NeonButton from "../components/NeonButton";
import "../styles/global.css";

export default function BlogPost({ data }) {
  const post = data?.markdownRemark;
  if (!post) return <Layout><p>Post not found</p></Layout>;

  return (
    <Layout>
      <div className="neon-box">
        <h1 style={{ marginBottom: 6 }}>{post.frontmatter.title}</h1>
        <small style={{ color: 'rgba(255,255,255,0.6)' }}>{post.frontmatter.date}</small>
      </div>

      <div className="neon-box blog-content" style={{ marginTop:16 }}>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <div style={{marginTop:12}}>
        <NeonButton to="/blog" variant="ghost" ariaLabel="Back to posts">← Back to posts</NeonButton>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter { title date }
    }
  }
`;
