import React, { useState, useEffect } from "react";

import useInterval from "./helpers/useInterval";
import Camera from "./helpers/Camera";

import predictBrightness from "./predict";

const RGB_SCALE = 0.02;

// sml model learning bright and dark
export const isBright = async canvas => {
  const clrs = canvas
    .getContext("2d")
    .getImageData(0, 0, canvas.width, canvas.height);

  const flat = clrs.data;
  const res = await predictBrightness(flat);
  //console.log(res);
  return res > 0.6 ? true : false;
};

const Predictor = () => {
  const [videoRef, setVideoRef] = useState(); // connects to camera
  const [isDay, setIsDay] = useState(false); // output

  // the thing that runs stuff along on video stream
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionDelay, setDetectionDelay] = useState(500);
  useInterval(
    () => {
      detect();
    },
    isDetecting ? detectionDelay : null
  );

  const detect = async () => {
    if (videoRef) {
      let context;
      const video = videoRef.current.video;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth * RGB_SCALE;
      canvas.height = video.videoHeight * RGB_SCALE;

      context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // check brightness
      const bright = await isBright(canvas);
      bright ? setIsDay(true) : setIsDay(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: isDay ? "white" : "#282c34", display: "flex" }}
    >
      <Camera onRef={setVideoRef} />

      <div style={{ minHeight: 300, padding: 10 }}>
        <p style={{ color: "orange" }}>
          current prediction is: {isDay ? "day" : "night"}
        </p>
        <button
          style={{ backgroundColor: isDetecting ? "red" : "grey" }}
          onClick={() => setIsDetecting(!isDetecting)}
        >
          toggle detection
        </button>
      </div>
    </div>
  );
};

export default Predictor;
