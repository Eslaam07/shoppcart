import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return <div className={classes.modal} onClick={props.onClick}></div>;
};

export default Modal;
