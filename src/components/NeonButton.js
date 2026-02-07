import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";

/*
Props:
 - to: string (Gatsby internal link path) OR undefined (button action)
 - onClick: function
 - variant: 'filled' | 'outline' | 'ghost'  (default 'filled')
 - small: boolean
 - ariaLabel: string
 - children
*/
export default function NeonButton({
  to,
  onClick,
  variant = "filled",
  small = false,
  ariaLabel,
  children,
}) {
  // Base visual values
  const magentaGradient = "linear-gradient(90deg,#ff00cc,#ff66d1)";
  const magenta = "#ff00cc";
  // const accent = "#ff66d1";
  const blackFill = "#070607";

  // Variant styles
  let style = {
    cursor: "pointer",
    borderRadius: 12,
    padding: small ? "8px 12px" : "10px 16px",
    fontWeight: 800,
    fontSize: small ? "0.85rem" : "0.95rem",
    letterSpacing: "-0.2px",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "none",
    outline: "none",
    color: blackFill,
    background: magentaGradient,
  };

  if (variant === "outline") {
    style = {
      ...style,
      background: blackFill,
      color: magenta,
      border: `2px solid ${magenta}`,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
    };
  } else if (variant === "ghost") {
    style = {
      ...style,
      background: "transparent",
      color: "var(--magenta, #ff00cc)",
      border: "1px solid rgba(255,255,255,0.06)",
    };
  }

  // Focus ring style (keyboard-accessible)
  const focusStyle = {
    boxShadow: "0 0 0 4px rgba(255,0,204,0.12), 0 8px 30px rgba(255,0,204,0.06)",
    outline: "none",
  };

  const btn = (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -3,
        boxShadow:
          variant === "outline"
            ? "0 14px 36px rgba(255,0,204,0.14)"
            : "0 14px 36px rgba(255,0,204,0.22)",
      }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      style={style}
      onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
      onBlur={(e) => {
        // remove focus styles (reset)
        e.currentTarget.style.boxShadow = style.boxShadow || "";
        e.currentTarget.style.outline = style.outline || "none";
      }}
      aria-label={ariaLabel || (typeof children === "string" ? children : "Navigate")}
    >
      {children}
    </motion.button>
  );

  if (to) {
    // wrap in Gatsby Link for navigation while keeping button internals
    return (
      <Link to={to} style={{ textDecoration: "none", display: "inline-block" }} aria-label={ariaLabel || (typeof children === "string" ? children : "Navigate")}>
        {btn}
      </Link>
    );
  }

  return btn;
}
