import React, { useState, useEffect, useRef } from "react";

import styles from "./index.module.css";

import Cursor from "../Cursor";

const Canvas = () => {
  // https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/

  // canvas (bg)
  return (
    <div className={styles.tutorial}>
      <div className={styles.page}>
        <div className={styles.page__inner}>
          <Cursor />

          {/* put your stuff here */}
          <nav className={styles.nav}>
            <a href="#" className={styles.link}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
              >
                <g className={styles.icon__group1}>
                  <line
                    className={styles.icon__line}
                    x1="79.69"
                    y1="16.2"
                    x2="79.69"
                    y2="83.8"
                  />
                  <rect
                    className={styles.icon__rect}
                    x="73.59"
                    y="31.88"
                    width="12.19"
                    height="12.19"
                  />
                </g>
                <g className={styles.icon__group2}>
                  <line
                    className={styles.icon__line}
                    x1="50.41"
                    y1="16.2"
                    x2="50.41"
                    y2="83.8"
                  />
                  <rect
                    className={styles.icon__rect}
                    x="44.31"
                    y="54.33"
                    width="12.19"
                    height="12.19"
                  />
                </g>
                <g className={styles.icon__group3}>
                  <line
                    className={styles.icon__line}
                    x1="20.31"
                    y1="16.2"
                    x2="20.31"
                    y2="83.8"
                  />
                  <rect
                    className={styles.icon__rect}
                    x="14.22"
                    y="26.97"
                    width="12.19"
                    height="12.19"
                  />
                </g>
              </svg>
            </a>
            {/* <!-- you can add more links here --> */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
