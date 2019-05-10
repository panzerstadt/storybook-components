import React from "react";
import { DropTarget } from "react-dnd";

import { moveText } from "./Manager";
import { ItemTypes } from "../constants/index";

const TargetFunctions = {
  drop(props, monitor) {
    console.log(monitor.getItem());
    moveText("text", props.ObjId);
  },
  canDrop(props) {
    return true; // ummmmmm
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

const TargetComponent = ({
  connectDropTarget,
  isOver,
  canDrop,
  data,
  children
}) => {
  const highlightBorder = () => {
    if (isOver && canDrop) return "1px solid green";
    else if (canDrop) return "1px solid yellow";
    else return "none";
  };
  const output = (
    <div style={{ border: highlightBorder() }}>{children || "target"}</div>
  );

  return connectDropTarget(output);
};

export default DropTarget(ItemTypes.USERTEXT, TargetFunctions, collect)(
  TargetComponent
);
