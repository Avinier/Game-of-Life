import React, { useContext, useState } from "react";
import Slider from "./Slider";
import infoBtn from "../../assets/circle-info-solid.svg";
import "./Controls.css";

import { motion } from "framer-motion";
import { ThemeContext } from "../../App";

const controlVars = {
  entry: {
    y: "150vh",
    opacity: 0,
  },
  onstage: {
    y: 0,
    opacity: 1,
  },
};
export default function Controls(props) {
  const themeCtx = useContext(ThemeContext);

  return (
    <motion.div
      variants={controlVars}
      initial="entry"
      animate="onstage"
      transition={{ delay: 1, duration: 1, easing: "easeOut" }}
      drag
      dragSnapToOrigin
      dragConstraints={{ left: 0, right: 0, to: 0, bottom: 0 }}
      className={`controls ${themeCtx.theme}--mode`}
    >
      <motion.button
        whileHover={{ backgroundColor: "#B98900", color: "white" }}
        transition={{ duration: 0.5 }}
        className="control--btns"
        onClick={props.clickHandler}
      >
        {props.runner ? "Stop" : "Start"}
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: "#B98900", color: "white" }}
        transition={{ duration: 0.5 }}
        className="control--btns"
        onClick={() => window.location.reload()}
      >
        Reset
      </motion.button>
      <Slider speedHandler={props.speeder} />
      <button
        onClick={() => {
          props.opener(true);
        }}
        className="info--btn"
      >
        <img src={infoBtn} className="info--img"></img>
      </button>
    </motion.div>
  );
}
