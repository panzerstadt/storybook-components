import React, { useEffect, useState } from "react";
import Camera from "react-html5-camera-photo";

import "./index.css";
import styles from "./index.module.css";

import MainCopy from "./assets/copy.png";

const Poster = ({ facePos }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (facePos) {
      setTranslate(facePos);
    }
  }, [facePos]);

  return (
    <div className={styles.posterFrame}>
      <div className={styles.posterBanner}>
        <h2>THE LAMPLIGHT GROUP PROUDLY PRESENTS</h2>
      </div>

      <div className={styles.contentDiv}>
        <img
          style={{ transform: `translate(${translate.x},${translate.y})` }}
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

      <Camera className={styles.cameraBG} />
    </div>
  );
};

export default Poster;
