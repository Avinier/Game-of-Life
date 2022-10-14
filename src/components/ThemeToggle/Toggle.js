import React, { useContext, useState } from "react";
import "./Toggle.css";

import moonLogo from "../../assets/moonlogo.png";
import sunlogo from "../../assets/sunlogo.png";
import { motion } from "framer-motion";
import { ThemeContext } from "../../App";

const togglevars = {
  entry: {
    y: "150vh",
    opacity: 0,
  },
  onstage: {
    y: 0,
    opacity: 1,
  },
};
const togglervars = {
  whenLight: {
    translateX: 50,
  },
  whenDark: {
    translateX: 0,
  },
};

export default function Toggle() {
  const themeCtx = useContext(ThemeContext);
  const [animate, setAnimate] = useState(false);

  function clickHandler() {
    themeCtx.toggleTheme();
    setAnimate((curr) => !curr);
  }
  return (
    <motion.div
      variants={togglevars}
      initial="entry"
      animate="onstage"
      transition={{ delay: 1.08, duration: 1, easing: "easeOut" }}
      drag
      dragSnapToOrigin
      dragConstraints={{ left: 0, right: 0, to: 0, bottom: 0 }}
      className={`toggle ${themeCtx.theme}--mode`}
    >
      <img src={moonLogo} className="toggle--moon"></img>
      <img src={sunlogo} className="toggle--sun"></img>
      <motion.div
        onClick={clickHandler}
        variants={togglervars}
        animate={animate ? "whenLight" : "whenDark"}
        className="toggle--toggler"
      ></motion.div>
    </motion.div>
  );
}
