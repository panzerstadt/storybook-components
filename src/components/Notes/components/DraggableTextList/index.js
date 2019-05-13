import React, { useState, useEffect } from "react";

import Draggable from "../atoms/Draggable";

import styles from "./index.module.css";

const DraggableTextList = ({ textArray, onTextArrayUpdate, onDragEnd }) => {
  const [singleInput, setSingleInput] = useState("");
  const handleSingleInput = e => {
    setSingleInput(e.target.value);
  };

  const [textArrayLocal, setTextArrayLocal] = useState(textArray);
  const handleTextArray = e => {
    if (e.key === "Enter") {
      setTextArrayLocal([...textArray, singleInput]);
      setSingleInput("");
      e.preventDefault();
    } else if (
      e.key === "Backspace" &&
      singleInput.length === 0 &&
      textArray.length > 0
    ) {
      let tempArray = textArray;
      const last = tempArray.pop();
      setTextArrayLocal(tempArray);
      setSingleInput(last); // put that last array back into input
      e.preventDefault(); // prevent extra backspace on text
    }
  };
  useEffect(() => {
    onTextArrayUpdate && onTextArrayUpdate(textArrayLocal);
  }, [textArrayLocal]);
  // useEffect(() => {
  //   if (textArray !== textArrayLocal) setTextArrayLocal(textArray);
  // }, [textArray]);

  return (
    <div className={styles.textArrayContainer}>
      <div className={styles.textArray}>
        {textArray.map((v, i) => (
          <Draggable key={`${v}-${i}`} textArrayIndex={i} onDragEnd={onDragEnd}>
            <span className={styles.textArrayText}>{v}</span>
          </Draggable>
        ))}
      </div>
      <input
        className={styles.textArrayInput}
        onChange={handleSingleInput}
        onKeyDown={handleTextArray}
        placeholder="type here"
        value={singleInput}
      />
    </div>
  );
};

export default DraggableTextList;
