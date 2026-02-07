import React from "react";
import NeonButton from "./NeonButton";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.995 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0 26px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,0,204,0.06)" }
};

export default function FeaturedCard({ post }) {
  if (!post) return null;
  const { title, date, description, slug } = post.frontmatter;

  return (
    <motion.article
      className="neon-box"
      initial="hidden"
      animate="enter"
      whileHover="hover"
      variants={cardVariants}
      style={{ borderRadius: 14, padding: 18, cursor: "default" }}
    >
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16}}>
        <div style={{flex:1}}>
          <h3 style={{margin:'0 0 6px 0'}}>{title}</h3>
          <small style={{color:'rgba(255,255,255,0.6)'}}>{date}</small>
          <p style={{marginTop:10, color:'rgba(255,255,255,0.82)'}}>{description}</p>
        </div>

        <div style={{minWidth:120, textAlign:'right'}}>
          <div className="ribbon pulse" style={{display:'inline-block', padding:'8px 12px', borderRadius:12}}>Featured</div>
          <div style={{marginTop:12}}>
            {/* <NeonButton to={`/blog/${slug}`} small variant="outline" ariaLabel={`Read ${title}`}>Read</NeonButton> */}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
