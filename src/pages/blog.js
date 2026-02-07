import React, { useState } from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import FeaturedCard from "../components/FeaturedCard";
import NeonButton from "../components/NeonButton";
import { motion } from "framer-motion";
import "../styles/global.css";

const listVariants = { hidden: {}, enter: { transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0 } };

export default function Blog({ data }) {
  const posts = data?.allMarkdownRemark?.nodes || [];
  const [q, setQ] = useState("");
  const filtered = posts.filter(p => (p.frontmatter.title + " " + (p.frontmatter.description||"")).toLowerCase().includes(q.toLowerCase()));
  const featured = posts[0] || null;

  return (
    <Layout>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:16}}>
        <div>
          <h1 style={{margin:0}}>Blog</h1>
          <p style={{margin:'6px 0 0 0', color:'rgba(255,255,255,0.78)'}}>All posts — curated & searchable.</p>
        </div>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <input placeholder="Search title or description..." value={q} onChange={e=>setQ(e.target.value)} style={{padding:'8px 10px', borderRadius:10, border:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)', color:'#fff'}} />
          <NeonButton to="/" small variant="ghost" ariaLabel="Home">Home</NeonButton>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 340px', gap:20, marginTop:18}}>
        <main>
          <motion.div variants={listVariants} initial="hidden" animate="enter" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16}}>
            {filtered.map(p => (
              <motion.article key={p.frontmatter.slug} variants={itemVariants} className="card" whileHover={{ y: -8, scale: 1.02 }}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div>
                    <h4 style={{margin:'4px 0'}}>{p.frontmatter.title}</h4>
                    <p style={{margin:0, color:'rgba(255,255,255,0.76)'}}>{p.frontmatter.description}</p>
                  </div>
                  <small style={{color:'rgba(255,255,255,0.5)'}}>{p.frontmatter.date}</small>
                </div>

                <div style={{marginTop:10}}>
                  <NeonButton to={`/blog/${p.frontmatter.slug}`} variant="outline" ariaLabel={`Open ${p.frontmatter.title}`}>Open</NeonButton>
                </div>
              </motion.article>
            ))}
            {filtered.length === 0 && <p style={{color:'rgba(255,255,255,0.7)'}}>No posts match your search.</p>}
          </motion.div>
        </main>

        <aside>
          <div style={{position:'sticky', top:28}}>
            <div style={{marginBottom:16}}>
              <h4 style={{margin:'0 0 8px 0'}}>Featured</h4>
              <FeaturedCard post={featured} />
            </div>

            <div className="neon-box" style={{marginTop:12}}>
              <h4 style={{margin:'0 0 8px 0'}}>Tags</h4>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                <button className="chip" type="button">Design</button>
                <button className="chip" type="button">Frontend</button>
                <button className="chip" type="button">Gatsby</button>
                <button className="chip" type="button">CSS</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort:{frontmatter:{date:DESC}}){
      nodes { frontmatter { title date slug description } excerpt(pruneLength:120) }
    }
  }
`;
