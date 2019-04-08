import React from "react";

import styles from "./Circle.module.css";

const Menu = ({ href }) => {
  return (
    <a href={href || "#"} className={styles.link}>
      <div className={styles.icon}> </div>
    </a>
  );
};

export default Menu;
