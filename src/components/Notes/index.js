// this is meant to be a modal
import React, { useState, useEffect } from "react";
import withDnDContext from "./components/withDnDContext";
import SignatureCanvas from "./components/canvases/SignatureCanvas";

// demo
import Fetch from "./components/DummyFetch";

import Target from "./components/atoms/Target";
import Draggable from "./components/atoms/Draggable";
import URLWindow from "./components/URLWindow";
import DraggableTextDiv from "./components/DraggableTextDiv";
import DraggableTextList from "./components/DraggableTextList";

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

const Notes = ({ isShowing }) => {
  const [textArray, setTextArray] = useState(["move this!"]);
  const handleTextArrayUpdate = v => {
    setTextArray(v);
  };

  const [dragging, setDragging] = useState();
  const [cDragging, setCDragging] = useState();
  const [canvasObjectList, setCanvasObjectList] = useState([]);
  const handleTagDrop = v => {
    // receive a report on which stuff went where
    const from = v.from;
    const to = v.to;

    // currently only allow drop to one object
    if (!to || to.name !== "textContainer") {
      return;
    }

    // decide what to do with those two items

    // -------
    // 1. take out item from array
    const itemIndex = v.from.textArrayIndex;
    let tempArray = Array.from(textArray);
    console.log("tempArray: ", tempArray);
    const draggedItem = tempArray.splice(itemIndex, 1);

    // move
    if (to.dropEffect === "move") {
      console.log("moving", draggedItem);

      setTextArray(tempArray);
      // if !move, do nothing to text array
    } else {
      console.log("copying", draggedItem);
    }

    // 2. put item into new area
    setCanvasObjectList(p => [
      ...p,
      { item: draggedItem, pos: to.delta, itemIndex: itemIndex }
    ]);
  };

  const [isCanvasDrawing, setIsCanvasDrawing] = useState(false);
  const [clearCanvas, setClearCanvas] = useState(false);
  const handleClearCanvas = () => {
    setClearCanvas(p => !p);
    setTimeout(() => {
      setClearCanvas(p => !p);
    }, 1000);
  };

  return (
    <div className={styles.noteContainer}>
      {dragging}
      <Icon className={styles.editIcon} height={50} width={50} />

      <Target className={styles.targetContainer}>
        <DraggableTextList
          textArray={textArray}
          onTextArrayUpdate={handleTextArrayUpdate}
          onDragEnd={handleTagDrop}
        />
        <DraggableTextDiv boxes={canvasObjectList} />

        <div className={styles.targetContainerCanvas}>
          <SignatureCanvas
            penColor="#0B2027"
            backgroundColor="transparent"
            clear={clearCanvas}
            width={600}
            height={300}
            onBegin={() => setIsCanvasDrawing(true)}
            onEnd={() => setIsCanvasDrawing(false)}
            // submitBtn={this.state.makePred}
            // submit={this.submitImage}
          />
          <button
            className={styles.targetContainerCanvasClearBtn}
            onClick={handleClearCanvas}
          >
            clear
          </button>
        </div>
      </Target>
    </div>
  );
};

const MiniApp = () => {
  const [toggle, setToggle] = useState(true);

  const [previewURL, setPreviewURL] = useState("");

  const handleURL = e => {
    setPreviewURL(e);
    setToggle(true);
  };

  return (
    <>
      <br />
      <button onClick={() => setToggle(!toggle)}>
        open editable notes popup
      </button>
      <div style={{ display: toggle ? "block" : "none" }}>
        <Modal>
          <button onClick={() => setToggle(!toggle)}>
            close editable notes popup
          </button>
          <Notes isShowing={toggle} />
          <br />
          <a href={previewURL} target="_blank" rel="noreferrer noopener">
            {previewURL}
          </a>
          <br />
          <br />
          <URLWindow url={previewURL} />
        </Modal>
      </div>
      <Fetch onClick={handleURL} />
    </>
  );
};

export default withDnDContext(MiniApp);
