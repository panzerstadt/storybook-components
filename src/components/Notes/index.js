// this is meant to be a modal
import React, { useState } from "react";
import withDnDContext from "./components/withDnDContext";
import DrawableCanvas from "./components/DrawableCanvas";

// demo
import Fetch from "../ReducerHooksFetch";

import { moveText } from "./components/Manager";
import Target from "./components/Target";
import Draggable from "./components/Draggable";

import styles from "./index.module.css";

import { ReactComponent as Icon } from "./assets/notes.svg";
// popup modal
const Modal = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.popup}>{children}</div>
    </div>
  );
};

const Notes = () => {
  const [singleInput, setSingleInput] = useState("");
  const handleSingleInput = e => {
    setSingleInput(e.target.value);
  };

  const [textArray, setTextArray] = useState([]);
  const handleTextArray = e => {
    if (e.key === "Enter") {
      setTextArray([...textArray, singleInput]);
      setSingleInput("");
      e.preventDefault();
    } else if (e.key === "Backspace" && singleInput.length === 0) {
      let tempArray = textArray;
      const last = tempArray.pop();
      setTextArray(tempArray);
      setSingleInput(last); // put that last array back into input
      e.preventDefault(); // prevent extra backspace on text
    }
  };

  const renderText = (text, i) => {
    return (
      <p key={`${text}-canvas-i`} style={{ margin: 3 }}>
        {text}
      </p>
    );
  };

  const [dragging, setDragging] = useState();
  const [cDragging, setCDragging] = useState();
  const [canvasObjectList, setCanvasObjectList] = useState([]);
  const handleTagDrop = v => {
    // receive a report on which stuff went where

    // decide what to do with those two items
    // 1. take out item from array
    const itemIndex = v.from.textArrayIndex;
    let tempArray = textArray;
    const draggedItem = tempArray.splice(itemIndex, 1);
    // 2. put item into new area
    setCanvasObjectList(p => [...p, draggedItem]);
    setTextArray(tempArray);

    console.log(draggedItem);
    console.log(v);
    // setDragging(v);
  };

  const handleClick = e => {
    console.log(e.currentTarget);
    const txt = textArray.slice(-1);
    moveText(txt, e.currentTarget);
  };

  return (
    <div className={styles.noteContainer}>
      {dragging}
      <Icon className={styles.editIcon} height={50} width={50} />
      <div className={styles.textArray}>
        {textArray.map((v, i) => (
          <Draggable
            key={`${v}-${i}`}
            textArrayIndex={i}
            onDragEnd={handleTagDrop}
          >
            <span className={styles.textArrayText}>{v}</span>
          </Draggable>
        ))}
      </div>
      <input
        className={styles.noteText}
        onChange={handleSingleInput}
        onKeyDown={handleTextArray}
        placeholder="text here"
        value={singleInput}
      />

      <Target className={styles.targetContainer}>
        <div
          className={styles.targetContainerText}
          //onClick={handleClick}
        >
          {canvasObjectList.map((v, i) => renderText(v, i))}
        </div>
        <div className={styles.targetContainerCanvas}>
          <DrawableCanvas
            brushColor="#0B2027"
            lineWidth={4}
            canvasStyle={{ backgroundColor: "lightgrey" }}
            // clear={this.state.clear}
            // submitBtn={this.state.makePred}
            // submit={this.submitImage}
          />
        </div>
      </Target>
    </div>
  );
};

const MiniApp = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <br />
      <button onClick={() => setToggle(!toggle)}>
        open editable notes popup
      </button>
      <div style={{ display: toggle ? "block" : "none" }}>
        <Modal>
          <Notes />
        </Modal>
      </div>
      <Fetch />
    </>
  );
};

export default withDnDContext(MiniApp);
