import React from "react";
import { DropTarget } from "react-dnd";

import { ItemTypes } from "../../constants/index";

const DropTargetComponent = ({
  connectDropTarget,
  isOver,
  canDrop,
  data,
  children,
  ...rest
}) => {
  const highlightBorder = () => {
    if (isOver().bool && canDrop) return "1px solid green";
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
    // this is close to what i want
    // there is still a height difference between the dragged object
    const delta = monitor.getDifferenceFromInitialOffset(); // seems close to what i want
    const item = monitor.getItem();

    //console.log(item);

    // what is need now is the position of the
    // TODO: final pos should be delta - delta between drag source and drop target

    //console.log(delta);

    return { name: "textContainer", delta: delta };
  },
  canDrop(props) {
    return true; // ummmmmm
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: () => {
      const delta = monitor.getDifferenceFromInitialOffset();
      return { bool: monitor.isOver(), pos: delta };
    },
    canDrop: monitor.canDrop()
  };
};

export default DropTarget(ItemTypes.USERTEXT, DropTargetFunctions, collect)(
  DropTargetComponent
);
