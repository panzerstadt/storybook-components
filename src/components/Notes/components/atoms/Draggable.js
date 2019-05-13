import React, { useRef } from "react";
import { ItemTypes } from "../../constants";
import { DragSource } from "react-dnd";

const DraggableComponent = ({
  connectDragSource,
  isDragging,
  onDrag,
  children
}) => {
  const dragRef = useRef();
  return (
    <div
      ref={connectDragSource}
      style={{
        opacity: isDragging ? 0.4 : 1
      }}
    >
      <div ref={dragRef}>{children || "draggable!"}</div>
    </div>
  );
};

const SourceFunctions = {
  beginDrag(props, monitor) {
    return {
      textArrayIndex: props.textArrayIndex
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    // report what happened to parent
    const { onDragEnd } = props;
    onDragEnd && onDragEnd({ from: item, to: dropResult });

    // console.log("props: ", props);
    // console.log("from: ", item);
    // console.log("to: ", dropResult);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

export default DragSource(ItemTypes.USERTEXT, SourceFunctions, collect)(
  DraggableComponent
);
