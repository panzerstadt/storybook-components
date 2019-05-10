import React from "react";
import { DropTarget } from "react-dnd";

import { moveText } from "./Manager";
import { ItemTypes } from "../constants/index";

const DropTargetComponent = ({
  connectDropTarget,
  isOver,
  canDrop,
  data,
  children,
  ...rest
}) => {
  const highlightBorder = () => {
    if (isOver && canDrop) return "1px solid green";
    else if (canDrop) return "1px solid yellow";
    else return "none";
  };

  return (
    <div
      ref={connectDropTarget}
      style={{ border: highlightBorder() }}
      {...rest}
    >
      {children || "target"}
    </div>
  );
};

const DropTargetFunctions = {
  drop(props, monitor) {
    return { name: "textContainer" };
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

export default DropTarget(ItemTypes.USERTEXT, DropTargetFunctions, collect)(
  DropTargetComponent
);
