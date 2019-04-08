import React from "react";
import styles from "./Box.module.css";

const Cursor = ({ mouseRef }) => {
  return (
    <div
      // this is a mouse. it is a div, but it is actually a mouse.
      ref={mouseRef}
      className={styles.cursor + " " + styles.cursor__small}
    />
  );
};

export default Cursor;
