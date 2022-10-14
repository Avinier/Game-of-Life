import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { AnimatePresence, motion } from "framer-motion";

export function Backdrop() {
  return <div className={classes.backdrop}></div>;
}

export function ModalOverlay(props) {
  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ rotateX: 180 }}
        animate={{ rotateX: 360 }}
        exit={{ rotateX: 540 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={classes.modal}
      >
        <div key="modal__content">{props.children}</div>
      </motion.div>
    </AnimatePresence>
  );
}

const portalElement = document.getElementById("overlays");

export default function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
