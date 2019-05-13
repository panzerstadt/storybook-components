// this is meant to be a modal
import React, { useState, useEffect } from "react";

import Draggable from "../atoms/Draggable";

import styles from "./index.module.css";

const DraggableTextDiv = ({ boxes, isDrawing }) => {
  const [boxStates, setBoxStates] = useState({});
  useEffect(() => {
    boxes.map((v, id) => {
      setBoxStates(prev => ({ ...prev, [id]: v }));
    });
  }, [boxes]);

  const handleMove = v => {
    console.log("handle move");
    console.log(v);
    const ind = v.from.textArrayIndex;
    const boxStateToMove = boxStates[ind];
    const delta = v.to && v.to.delta;

    const newPos = {
      x: boxStateToMove.pos.x + delta.x,
      y: boxStateToMove.pos.y + delta.y
    };

    const newBoxState = { ...boxStateToMove, pos: newPos };

    setBoxStates(prev => ({ ...prev, [ind]: newBoxState }));
    // TODO: right now box deltas are compounded (first delta is added to second delta)

    console.log("move");
    console.log(boxStateToMove);
    console.log("this much");
    console.log(delta);
  };

  const renderDraggableText = (text, i, pos) => {
    return (
      <Draggable
        key={`${text}-canvas-i`}
        textArrayIndex={i}
        onDragEnd={handleMove}
      >
        <p style={{ position: "absolute", margin: 3, left: pos.x, top: pos.y }}>
          {text}
        </p>
      </Draggable>
    );
  };

  const boxKeys = Object.keys(boxStates);
  const outputBoxes = boxKeys.map(v => boxStates[v]);

  return (
    <div
      className={styles.draggableTextContainer}
      style={{
        position: "relative",
        pointerEvents: isDrawing ? "none" : "all"
      }}
    >
      {outputBoxes.map((v, i) => renderDraggableText(v.item, i, v.pos))}
    </div>
  );
};

export default DraggableTextDiv;
