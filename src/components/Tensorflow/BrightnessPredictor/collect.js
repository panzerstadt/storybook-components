import React, { useState, useEffect } from "react";

import useInterval from "./helpers/useInterval";
import Gallery from "./helpers/Gallery";
import { download, convertToArray } from "./helpers";
import Camera from "./helpers/Camera";

import predictBrightness from "./predict";

const SCALE = 1;
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
  const [delay, setDelay] = useState(1000);
  const [isCapturing, setIsCapturing] = useState(false);
  useInterval(
    () => {
      capture();
    },
    isCapturing ? delay : null
  );

  const [data, setData] = useState([]);
  const [rgb, setRGB] = useState([]);
  const capture = () => {
    if (videoRef) {
      let context;
      const video = videoRef.current.video;
      const canvas = document.createElement("canvas");

      canvas.width = video.videoWidth * SCALE;
      canvas.height = video.videoHeight * SCALE;
      context = canvas.getContext("2d");

      // full res
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // base64 setstate
      const b64 = canvas.toDataURL();
      setData([...data, b64]);

      context.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = video.videoWidth * RGB_SCALE;
      canvas.height = video.videoHeight * RGB_SCALE;

      context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // rgb array (flat)
      const clrs = context.getImageData(0, 0, canvas.width, canvas.height);
      console.log(clrs);
      const flat = convertToArray(clrs.data);

      setRGB([...rgb, flat]);
      // download(JSON.stringify({ data: flat }), "temp.json", "application/json");

      return data;
    }
  };

  const capture5sec = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
    }, 5000);
  };

  const capture5secvideo = () => {
    setDelay(1);
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setDelay(1000);
    }, 5000);
  };

  const downloadAsJson = () => {
    download(JSON.stringify({ data: rgb }), "temp.json", "application/json");
    setData([]);
    setRGB([]);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Camera onRef={setVideoRef} />

        <div style={{ minHeight: 300, padding: 10 }}>
          <button onClick={capture5sec}>capture5sec</button>
          <button onClick={capture5secvideo}>capture5sec video</button>
          <button onClick={downloadAsJson}>download data as json</button>
        </div>
      </div>
      <br />
      <br />
      <Gallery data={data} />
    </div>
  );
};

export default Predictor;
