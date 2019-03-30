import React, { useState, useEffect, useRef } from "react";

import styles from "./Button.module.css";

function Button(props) {
  const button = useRef();
  const [clicked, setClicked] = useState(false);

  function animate(e) {
    var d = document.createElement("div");
    d.className = styles.circle;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    button.current.appendChild(d);
    d.addEventListener("animationend", function() {
      d.parentElement.removeChild(d);
    });
  }

  return (
    <button
      {...props}
      className={styles.button}
      ref={button}
      onClick={e => {
        animate(e);
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;
