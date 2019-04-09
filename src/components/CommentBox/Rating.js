import React, { useState } from "react";
import MaterialIcon from "material-icons-react";

import styles from "./Rating.module.css";

function Rating(props) {
  const [count, setCount] = useState(props.votes);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);

  return (
    <div {...props} className={styles.rating}>
      <button
        className={thumbsUp ? styles.selected : ""}
        id={styles.thumbs_up}
        onClick={() => {
          setThumbsUp(!thumbsUp);
          setThumbsDown(false);
        }}
      >
        <MaterialIcon icon="keyboard_arrow_up" />
      </button>
      <div
        className={`${styles.count} ${thumbsUp ? styles.up : ""} ${
          thumbsDown ? styles.down : ""
        }`}
      >
        {thumbsUp ? count + 1 : ""}
        {thumbsDown ? count - 1 : ""}
        {thumbsUp || thumbsDown ? "" : count}
      </div>
      <button
        className={`material-icons ${thumbsDown ? styles.selected : ""}`}
        id={styles.thumbs_down}
        onClick={() => {
          setThumbsDown(!thumbsDown);
          setThumbsUp(false);
        }}
      >
        <MaterialIcon icon="keyboard_arrow_down" />
      </button>
    </div>
  );
}

export default Rating;
