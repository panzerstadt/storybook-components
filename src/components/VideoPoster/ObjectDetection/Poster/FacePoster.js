import React, { useEffect, useState } from "react";
import Webcam from "../components/Webcam";

import "./index.css";
import styles from "./FacePoster.module.css";

import MainCopy from "./assets/copy.png";

const videoSettings = {
  facingMode: "user"
};

const Poster = ({ facePos, onRef }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0, h: 300, w: 300 });
  useEffect(() => {
    if (facePos) {
      //console.log(facePos.x, facePos.y);
      // console.log(
      //   `translate(${-translate.x * 100}px,${translate.y * 150}px) ${
      //     translate.confidence
      //   }`
      // );
      const { x, y, h, w } = facePos;

      // fiddle with this until your face matches
      const x2 = -x * 600;
      const y2 = y * 1200;
      const h2 = h * 300;
      const w2 = w * 300;

      setTranslate({ x: x2, y: y2, h: h2, w: w2, hnorm: h, wnorm: w });
    }
  }, [facePos]);

  console.log(translate);

  return (
    <div className={styles.posterFrame}>
      {/* <div
        className={styles.debugFace}
        style={{
          transform: `translate(${translate.x}px,${translate.y}px)`,
          height: translate.h,
          width: translate.w
        }}
      >
        {" "}
      </div> */}
      <div className={styles.posterBanner}>
        <h2>THE LAMPLIGHT GROUP PROUDLY PRESENTS</h2>
      </div>

      <div className={styles.contentDiv}>
        <img
          style={{
            transform: `translate(${translate.x}px,${translate.y +
              50}px) scaleY(${translate.hnorm})`
          }}
          className={styles.copyDiv}
          src={MainCopy}
          alt="For the Children, For the World"
        />
        <br />
        <h2 className={styles.copyText}>
          A Program centered on raising awareness on child labor and joining the
          fight
        </h2>
        <span style={{ height: 30 }} />
        <p className={styles.copySubText}>JUNE 12, 2017 | 10:00 AM - 6:00 PM</p>
        <p className={styles.copySubText}>EL DORADO SESSION HALL</p>
      </div>

      <div className={styles.posterBanner}>
        <h2>VISIT US AT WWW.WEBSITE.COM</h2>
      </div>

      <Webcam
        className={styles.cameraBG}
        onRef={onRef}
        videoConstraints={videoSettings}
      />
    </div>
  );
};

export default Poster;
