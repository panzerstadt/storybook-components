import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import styles from "./Text.module.css";

let textDims = {
  height: 0,
  width: 0
};

const DataBlock = ({ data, onUpdate, mode }) => {
  const textRef = useRef(null);
  const [text, setText] = useState({});
  const [textSizes, setTextSizes] = useState(textDims);

  const [author, setAuthor] = useState({});

  // on new data received (+ first mount)
  useEffect(() => {
    let incomingData = data;

    // set all the blocks
    incomingData.data.map((d, i) => {
      if (d.type === "text") {
        setText({ id: i, data: d.data });
      } else if (d.type === "author") {
        setAuthor({ id: i, data: d.data });
      }
    });
  }, [data]);

  useEffect(() => {
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
        }; // for remembering across edit and normal modes
        setTextSizes(textDims); // for initial normal mode paint

        textRef.current.style.display = "none"; // hide the ref
      }, 300);
    }
  }, []);

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
    console.log("edit ode text dims");
    console.log(textDims);
    // edit mode
    return (
      <div className={styles.dataBlockDiv}>
        <div className={styles.textBlock}>
          <textarea
            className={styles.text + " " + styles.removeInputStyling}
            style={{ height: textDims.height, width: "100%" }}
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
    const refText = text.data && text.data.replace(/\n/g, "<br/>");
    return (
      <div className={styles.dataBlockDiv}>
        <div className={styles.textBlock}>
          <textarea
            readOnly
            key={text.id}
            className={
              styles.text +
              " " +
              styles.removeInputStyling +
              " " +
              styles.fixInput
            }
            style={{ height: textSizes.height, width: "100%" }}
            value={text.data}
          />
          <div
            ref={textRef}
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: refText }}
          />
          <br />
          <h3 className={styles.author}>{author.data}</h3>
        </div>
      </div>
    );
  }
};

export default DataBlock;
