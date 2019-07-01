import React, { useState, useRef, useEffect } from "react";

// styles
import styles from "./index.module.css";

// shit that JS doesn't like to give us
function remap(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function normalize(value_list, inverse = false) {
  const max = Math.max(...value_list);
  const min = Math.min(...value_list);
  const outMax = inverse ? 0 : 1;
  const outMin = inverse ? 1 : 0;
  return value_list.map(v => remap(v, min, max, outMin, outMax));
}

function distances(first, others) {
  return others.map(v => Math.floor(Math.abs(v - first)));
}

const getDummyImages = () => {
  const imgs = [...Array(12)].map((v, i) =>
    require(`./assets/dummy/${(i + 1).toString().padStart(2, "0")}.jpg`)
  );
  return imgs;
};

const updateOpacity = (dims, mousePos) => {
  // horizontal movement
  const w = updateWidth(dims.map(v => v.width));
  // range
  const widthRange = [...Array(dims.length)].map(
    (v, i) => (i * w) / dims.length
  );
  const pos = mousePos.x; // mapped to width

  // return an opacity list mapped to img_list
  const t = distances(pos, widthRange);

  return normalize(t, true);
};

const updateOpacity2 = (dims, mousePos) => {
  // width
  const w = updateWidth(dims.map(v => v.width));
  // pos
  const pos = mousePos.x; // mapped to width

  // normalized pos
  const normPos = remap(pos, 0, w, 1, dims.length + 1);

  const t = dims.map((v, i) => {
    if (i === 0) {
      return i + normPos;
    } else {
      return -i + normPos;
    }
  });

  return t;
};

const updateHeight = height_list => {
  return Math.max(Math.max(...height_list), 0);
};

const updateWidth = width_list => {
  return Math.max(Math.max(...width_list), 0);
};

export default ({ data }) => {
  const mousePos = e => {
    setPos({ x: e.clientX, y: e.clientY });
    setOpacityList(updateOpacity2(dims, pos));
  };

  if (!data) {
    data = getDummyImages().reverse();
  }

  // dimension, height, and opacity
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dims, setDims] = useState([]);
  const [height, setHeight] = useState(0);
  const [opacityList, setOpacityList] = useState([]);

  // listener
  // currently mouse move.
  // can be any listener with continuous numbers
  useEffect(() => {
    window.addEventListener("mousemove", mousePos);
    return () => window.removeEventListener("mousemove", mousePos);
  });

  return (
    <div className={styles.div} style={{ height: height }}>
      {data.map((v, i) => (
        <img
          key={i}
          onLoad={e => {
            setDims([
              ...dims,
              {
                height: e.currentTarget.offsetHeight,
                width: e.currentTarget.offsetWidth
              }
            ]);
            setHeight(updateHeight(dims.map(v => v.height)));
          }}
          className={styles.img}
          style={{ opacity: opacityList ? opacityList[i] : 0.2 }}
          src={v}
          alt={`animated-image-${i}`}
        />
      ))}
    </div>
  );
};
