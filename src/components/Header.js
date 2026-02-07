import React from "react";
import NeonButton from "./NeonButton";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(8px)",
        background: "linear-gradient(90deg, rgba(18,0,18,0.92), rgba(6,0,6,0.96))",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
          <NeonButton to="/" ariaLabel="Home">✦ Johnsmz Blog</NeonButton>
        </motion.div>

        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <NeonButton to="/" small variant="outline" ariaLabel="Home">Home</NeonButton>
          <NeonButton to="/blog" small variant="outline" ariaLabel="Blog">Blog</NeonButton>
          {/* <NeonButton onClick={() => { subscribe modal placeholder }} small variant="outline" ariaLabel="Subscribe">Subscribe</NeonButton> */}
        </nav>
      </div>
    </motion.header>
  );
}
