import React from "react";
import Modal from "../UI/Modal";
import infola from "./InfoModal.module.css";

import rulesImg from "../../assets/rules.png";
import closeBtn from "../../assets/xmark-solid.svg";

export default function InfoModal(props) {
  return (
    <Modal>
      <button
        onClick={() => {
          props.openHandler(false);
        }}
        className={infola.btn}
      >
        <img src={closeBtn} className={infola.closebtn}></img>
      </button>
      <p className={infola.content}>
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970. One
        interacts with the Game of Life by creating an initial configuration and
        observing how it evolves.
      </p>
      <a
        className={infola.wiki}
        target="_blank"
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
      >
        more info
      </a>
      <img src={rulesImg} className={infola.rulesimg}></img>
    </Modal>
  );
}
