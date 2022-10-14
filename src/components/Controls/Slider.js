import React, { Fragment, useState } from "react";
import "./Slider.css";
import ReactSlider from "react-slider";

import { motion } from "framer-motion";

export default function Slider(props) {
  const speed = props.speedHandler;
  const [secs, setSecs] = useState(0);

  function thumbHandler(props, state) {
    speed((state.valueNow / 50) * 1000);
    setSecs(state.valueNow / 50);
    return (
      <motion.div {...props}>
        {state.valueNow % 50 === 0 ? state.valueNow / 50 : null}
      </motion.div>
    );
  }

  return (
    <Fragment>
      <div className="sliderdiv">
        <ReactSlider
          className="slider"
          trackClassName="track"
          thumbClassName="thumb"
          markClassName="marks"
          min={0}
          max={100}
          renderThumb={thumbHandler}
        />
      </div>
      <div>{secs}s</div>
    </Fragment>
  );
}
