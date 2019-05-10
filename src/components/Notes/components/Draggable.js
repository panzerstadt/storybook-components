import React from "react";
import { ItemTypes } from "../constants";
import { DragSource } from "react-dnd";

const SourceFunctions = {
  beginDrag(props) {
    return {
      objId: props.id
    };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const DraggableComponent = ({
  connectDragSource,
  isDragging,
  onDrag,
  children
}) => {
  isDragging && onDrag && onDrag(children.props.children);
  //!isDragging && onDrag && onDrag();

  return connectDragSource(
    <div
      style={{
        outline: isDragging ? "1px solid red" : "none",
        outlineOffset: -0.5
      }}
    >
      {children || "draggable!"}
    </div>
  );
};

export default DragSource(ItemTypes.USERTEXT, SourceFunctions, collect)(
  DraggableComponent
);
