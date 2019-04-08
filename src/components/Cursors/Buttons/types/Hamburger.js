import React from "react";

import styles from "./Hamburger.module.css";

const Menu = ({ href }) => {
  return (
    <a href={href || "#"} className={styles.link}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <g className={styles.icon__group1}>
          <line
            className={styles.icon__line}
            y1="79.69"
            x1="16.2"
            y2="79.69"
            x2="83.8"
          />
        </g>
        <g className={styles.icon__group2}>
          <line
            className={styles.icon__line}
            y1="50.41"
            x1="16.2"
            y2="50.41"
            x2="83.8"
          />
        </g>
        <g className={styles.icon__group3}>
          <line
            className={styles.icon__line}
            y1="20.31"
            x1="16.2"
            y2="20.31"
            x2="83.8"
          />
        </g>
      </svg>
    </a>
  );
};

export default Menu;
