import React, { useState, useEffect, useRef } from "react";

import styles from "./Text.module.css";

let textDims = {
  height: 0,
  width: 0
};

const DataBlock = ({ data, onUpdate, mode }) => {
  const textRef = useRef(null);
  const [text, setText] = useState({});
  const [textSizes, setTextSizes] = useState({});

  const [author, setAuthor] = useState({});

  // on new data received (+ first mount)
  useEffect(() => {
    let incomingData;
    // try parsing json into array
    try {
      const k = Object.keys(data);
      incomingData = k.map(k => data[k]);
    } catch {
      incomingData = data;
    }

    // set all the blocks
    incomingData.map((d, i) => {
      if (d.type === "text") {
        setText({ id: i, data: d.data });
      } else if (d.type === "author") {
        setAuthor({ id: i, data: d.data });
      }
    });

    // get text height (for textarea)
    // wait for it to load (delay)
    if (mode !== "edit") {
      setTimeout(() => {
        // setTextSizes({
        //   height: textRef.current.clientHeight,
        //   width: textRef.current.clientWidth
        // });
        textDims = {
          height: textRef.current.clientHeight,
          width: textRef.current.clientWidth
        };
      }, 500);
    }
  }, [data]);

  const handleUpdate = d => {
    if (d.type === "text") {
      setText(d.data);
    } else if (d.type === "author") {
      setAuthor(d.data);
    }

    // TODO: onUpdate right now is a NOPE. only send dispatches
    // if (onUpdate) {
    //   let update = {};
    //   update[d.type] = d.data;
    //   const out = { ...data, ...update };

    //   onUpdate(out);
    // }
  };

  if (mode === "edit") {
    // edit mode
    return (
      <div className={styles.dataBlockDiv}>
        <div className={styles.textBlock}>
          <textarea
            className={styles.text + " " + styles.removeInputStyling}
            style={{ height: textDims.height }}
            value={text.data}
            onChange={e =>
              handleUpdate({ type: "text", data: e.target.value, id: text.id })
            }
          />

          <br />
          <input
            className={styles.author}
            value={author.data}
            onChange={e =>
              handleUpdate({ type: "author", data: e.target.value })
            }
          />
        </div>
      </div>
    );
  } else {
    // normal mode
    return (
      <div className={styles.dataBlockDiv}>
        <div className={styles.textBlock}>
          <p key={text.id} className={styles.text} ref={textRef}>
            {text.data}
          </p>
          <br />
          <h3 className={styles.author}>{author.data}</h3>
        </div>
      </div>
    );
  }
};

export default DataBlock;
