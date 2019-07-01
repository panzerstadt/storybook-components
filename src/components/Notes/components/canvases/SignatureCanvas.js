// https://www.npmjs.com/package/react-signature-canvas
import React, { useRef, useEffect } from "react";

import SignatureCanvas from "react-signature-canvas";

const Canvas = ({
  penColor = "#cecece",
  width = 500,
  height = 200,
  className = "sigCanvas",
  backgroundColor = "red",
  clear = false,
  initialData,
  onData,
  onBegin,
  onEnd,
  ...rest
}) => {
  const sigRef = useRef();
  useEffect(() => {
    if (sigRef) sigRef.current.clear();
  }, [clear]);

  useEffect(() => {
    // init from data
    if (sigRef && initialData) {
      sigRef.current.fromData(initialData);
    }
    // save data on unmount
    return () => {
      if (sigRef && onData) {
        onData(sigRef.current.toData());
      }
    };
  }, [initialData]);

  return (
    <SignatureCanvas
      ref={sigRef}
      penColor={penColor}
      backgroundColor={backgroundColor}
      canvasProps={{
        width: width,
        height: height,
        className: className,
        ...rest
      }}
      onBegin={onBegin}
      onEnd={onEnd}
    />
  );
};

export default Canvas;
