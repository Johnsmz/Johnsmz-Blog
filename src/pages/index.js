import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import FeaturedCard from "../components/FeaturedCard";
import NeonButton from "../components/NeonButton";
import "../styles/global.css";
import { motion } from "framer-motion";

const listVariants = { hidden: {}, enter: { transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0 } };

export default function Home({ data }) {
  const posts = data?.allMarkdownRemark?.nodes || [];
  const featured = posts[0] || null;
  const latest = posts.slice(0,6);

  return (
    <Layout>
      <section style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:20}}>
        <div>
          <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="neon-box" style={{padding:22, marginBottom:18}}>
            <motion.h1 layoutId="hero-title" style={{margin:0, fontSize:40, color:'#ff00cc'}}>Johnsmz — Dev notes</motion.h1>
            {/* <p style={{color:'rgba(255,255,255,0.82)'}}>Bold ideas, experiments, and code — wrapped in neon.</p> */}
          </motion.div>

          <motion.div variants={listVariants} initial="hidden" animate="enter" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16}}>
            {latest.map(p => (
              <motion.article key={p.frontmatter.slug} variants={itemVariants} className="card" whileHover={{ y: -6 }}>
                <h4 style={{margin:'0 0 6px 0'}}>{p.frontmatter.title}</h4>
                <p style={{color:'rgba(255,255,255,0.78)'}}>{p.frontmatter.description}</p>

                <div style={{marginTop:10}}>
                  <NeonButton to={`/blog/${p.frontmatter.slug}`} small variant="outline" ariaLabel={`Read ${p.frontmatter.title}`}>Read</NeonButton>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <aside>
          <h3 style={{marginBottom:8}}>Featured</h3>
          <FeaturedCard post={featured} />
        </aside>
      </section>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort:{frontmatter:{date:DESC}}){
      nodes { frontmatter { title slug description } }
    }
  }
`;
