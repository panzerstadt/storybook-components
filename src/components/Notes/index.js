// this is meant to be a modal
import React, { useState } from "react";
import withDnDContext from "./components/withDnDContext";

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
  const [textArray, setTextArray] = useState([]);

  const handleSingleInput = e => {
    setSingleInput(e.target.value);
  };

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

  const handleClick = e => {
    console.log(e.currentTarget);
    const txt = textArray.slice(-1);
    moveText(txt, e.currentTarget);
  };

  const renderText = text => {
    return <p>{text}</p>;
  };

  const [dragging, setDragging] = useState();
  const handleTagDragging = v => {
    console.log(v);
    setDragging(v);
  };

  return (
    <div className={styles.noteContainer}>
      {dragging}
      <Icon className={styles.editIcon} height={50} width={50} />
      <div className={styles.textArray}>
        {textArray.map((v, i) => (
          <Draggable onDrag={handleTagDragging}>
            <span key={`${v}-${i}`} className={styles.textArrayText}>
              {v}
            </span>
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
      <Target>
        <div className={styles.temp} onClick={handleClick}>
          click to stick stuff here
          {renderText("test")}
        </div>
      </Target>
      <canvas className={styles.noteCanvas} />
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
    </>
  );
};

export default withDnDContext(MiniApp);
