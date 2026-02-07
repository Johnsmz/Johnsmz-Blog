import React from "react";
import NeonButton from "../components/NeonButton";
import "../styles/global.css";

export default function NotFound(){
  return (
    <div style={{padding:32, maxWidth:900, margin:"0 auto", textAlign:"center"}}>
      <h1 style={{color:"#ff00cc"}}>404 — Not Found</h1>
      <p style={{color:"#cfc5cf"}}>There's nothing at this route.</p>
      <div style={{marginTop:18}}>
        <NeonButton to="/" ariaLabel="Back to home">Go home</NeonButton>
      </div>
    </div>
  );
}
