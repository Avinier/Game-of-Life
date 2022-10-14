//  TODO:
// -understanding logic
// -in real time speed change
// -scroll animation


//PALETTE- 
// #00AD96 - blue
// #DFE0DF - light gray
// #fdf3e5 - main
// #B98900 - gold
// #2e1d08 - dark brown
// #C3FCF2 - light blue
// #E0B5E4 - purple
// #404040 - dark gray

import React, { Fragment, useState } from "react";
import "./App.css";
import Grid from "./components/MainGrid";
import InfoModal from "./components/Controls/InfoModal";
import { createContext } from "react";
import { motion } from "framer-motion";

export const ThemeContext = createContext({theme: "light", toggleTheme: () => {}})

const titleVars = {
  entry: {
    y: "-20vh",
    opacity: 0,
  },
  onstage: {
    y: 0,
    opacity: 1
  }
}

function App() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(curr => (curr === "light" ? "dark":"light"))
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <motion.div className="body" id={theme}>
        <motion.h1 variants={titleVars} initial="entry" animate="onstage" transition={{delay: 0.8, duration: 1, easing: "easeOut"}} className="title">Game Of Life</motion.h1>
        {open && <InfoModal openHandler={setOpen} />}
        <Grid openHandler={setOpen}/>
      </motion.div>
    </ThemeContext.Provider>
  );
}

export default App;
