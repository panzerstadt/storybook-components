import React from "react";
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

const DeviceWindow = ({ src }) => {
  const { height, width } = getDeviceSize(src);

  return (
    <div
      className={styles.deviceContainer}
      style={{ height: height, overflowY: "scroll" }}
    >
      <img className={styles.deviceImage} style={{ width: width }} src={src} />
    </div>
  );
};

const VisualTest = ({ zoom = 1 }) => {
  console.log(imgs);
  console.log(Array.from(imgs));
  const deviceKeys = Object.keys(imgs);
  const deviceImgs = deviceKeys.map(v => imgs[v]);
  // TODO: upload

  return (
    <div className={styles.container}>
      {deviceImgs.map((v, i) => (
        <DeviceWindow key={i} src={v} />
      ))}
    </div>
  );
};

export default VisualTest;
