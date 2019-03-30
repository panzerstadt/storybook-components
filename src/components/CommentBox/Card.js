import React, { useState, useContext } from "react";

import styles from "./Card.module.css";

import ThemeContext from "./context";

function Card(props) {
  const theme = useContext(ThemeContext);
  return (
    <div {...props} className={`${styles.card} ${props.className} ${theme}`}>
      {props.children}
    </div>
  );
}

export default Card;
