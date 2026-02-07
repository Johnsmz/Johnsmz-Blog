import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import "../styles/global.css";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FF00CC" },
    background: { default: "#070607", paper: "#070607" },
    text: { primary: "#ffffff", secondary: "#CFC5CF" }
  },
  typography: { fontFamily: ['Inter','Roboto','Helvetica','Arial'].join(',') }
});

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {/* page-level entrance */}
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }}
        style={{ maxWidth: 1100, margin: "28px auto", padding: "0 18px" }}
      >
        {children}
      </motion.main>

      <footer style={{ marginTop: 48, padding: 24, textAlign: "center", color: "rgba(255,255,255,0.6)" }}>
        Built with Gatsby • By Johnsmz
      </footer>
    </ThemeProvider>
  );
}
