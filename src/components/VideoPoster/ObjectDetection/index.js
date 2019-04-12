import React, { useEffect, useState, useRef } from "react";
import ml5 from "ml5";

import styles from "./index.module.css";

import Poster from "./Poster";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const PosterObjectDetection = () => {
  const [video, setVideo] = useState();
  const [predictor, setPredictor] = useState();
  const [ready, setReady] = useState(false);

  const handleReady = e => {
    console.log("model loaded!");
    setReady(true);
  };

  useEffect(() => {
    if (video) {
      const v = video.current.video;
      const yolo = ml5.YOLO(v, handleReady);
      setPredictor(yolo);
    }
  }, [video]);

  useEffect(() => {
    if (ready && predictor) {
      setIsDetecting(true);
    }
  }, [predictor, ready]);

  const [delay, setDelay] = useState(1);
  const [isDetecting, setIsDetecting] = useState(false);
  useInterval(
    () => {
      detect();
    },
    isDetecting ? delay : null
  );

  const [facePos, setFacePos] = useState({ h: 0.5, w: 0, x: 0, y: 0.5 });
  const detect = () => {
    predictor &&
      predictor.detect((err, results) => {
        if (err) console.log("error: ", err);
        //console.log(results); // bounding boxes

        // get the first person from the prediction
        const person = results.filter(v => v.label === "person")[0];

        if (person) {
          setFacePos(person);
        }
      });
  };

  return (
    <div className={styles.container}>
      <code className={styles.status}>
        {ready ? "predicting" : "loading model..."}
      </code>
      <Poster onRef={setVideo} facePos={facePos} />
    </div>
  );
};

export default PosterObjectDetection;
