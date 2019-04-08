import React from "react";
import ReactiveCursor from "./Canvas";

const DynamicCursors = ({ type = "default", ...rest }) => {
  if (type === "default") return <ReactiveCursor {...rest} />;
  else {
    return <ReactiveCursor {...rest} />;
  }
};

export default DynamicCursors;
