import React, { useState, useEffect, useRef } from "react";
import requireContext from "require-context.macro";

import styles from "./index.module.css";

const importAll = r => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
    return null;
  });
  //console.log(images);
  return images;
};

// image assets folder path
const imgs = importAll(requireContext("./assetsToTest", true, /.*\.png$/));

const getDeviceSize = src => {
  // split android ios
  // get ios / android names
  // get device model name
  // map size to existing library of sizes

  return {
    height: 300,
    width: 175
  };
};

const DeviceWindow = ({ src, onScroll, scrollTo }) => {
  let isScrolling;
  const { height, width } = getDeviceSize(src);

  const handleScroll = e => {
    // clear timeout
    let val = e.target.scrollTop;
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      // scroll stopped
      onScroll && onScroll(val);
    }, 66);
  };

  const winRef = useRef(null);
  useEffect(() => {
    if (winRef) {
      const ref = winRef;

      ref.current.addEventListener("scroll", handleScroll);
      return () => ref.current.removeEventListener("scroll", handleScroll);
    }
  }, [winRef]);

  // handle scrolling
  useEffect(() => {
    if (winRef && scrollTo) {
      requestAnimationFrame(() => (winRef.current.scrollTop = scrollTo));
    }
  }, [scrollTo, winRef]);

  return (
    <div className={styles.deviceContainer}>
      <div
        ref={winRef}
        className={styles.deviceImageContainer}
        style={{ height: height, overflowY: "scroll" }}
      >
        <img
          className={styles.deviceImage}
          style={{ width: width }}
          src={src}
        />
      </div>
      <span className={styles.deviceName}>
        {src.split("/")[3].split(".png")[0]}
      </span>
    </div>
  );
};

const VisualTest = ({ zoom = 1 }) => {
  // console.log(imgs);
  // console.log(Array.from(imgs));
  const deviceKeys = Object.keys(imgs);
  const deviceImgs = deviceKeys.map(v => imgs[v]);
  // TODO: upload

  const [scrollTo, setScrollTo] = useState(0);

  return (
    <div className={styles.container}>
      {deviceImgs.map((v, i) => (
        <DeviceWindow
          key={`${v}-${i}`}
          src={v}
          onScroll={setScrollTo}
          scrollTo={scrollTo}
        />
      ))}
    </div>
  );
};

export default VisualTest;
