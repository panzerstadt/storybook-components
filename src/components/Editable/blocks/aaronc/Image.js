import React, { useState, useEffect, useRef } from "react";
import Dropzone from "react-dropzone";

import styles from "./Image.module.css";

const DataBlock = ({ data, onUpdate, mode }) => {
  const textRef = useRef(null);
  const [text, setText] = useState({});
  const [image, setImage] = useState(data.imageData);

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

    console.log(incomingData);

    // set all the blocks
    incomingData.map((d, i) => {
      if (d.type === "text") {
        setText({ id: i, data: d.data });
      } else if (d.type === "author") {
        setAuthor({ id: i, data: d.data });
      } else if (d.type === "imageData") {
        setImage(d.data);
      }
    });
  }, [data]);

  const handleUpdate = d => {
    if (d.type === "text") {
      const copy = text;
      const newState = copy.map(v =>
        v.id === d.id ? { id: d.id, data: d.data } : v
      );
      setText(newState);
    } else if (d.type === "author") {
      setAuthor(d.data);
    } else if (d.type === "imageData") {
      setImage(d.data);
    }

    // TODO: onUpdate right now is a NOPE. only send dispatches
    // if (onUpdate) {
    //   let update = {};
    //   update[d.type] = d.data;
    //   const out = { ...data, ...update };

    //   onUpdate(out);
    // }
  };

  const handleDrop = (acceptedFiles, rejectedFiles) => {
    // do something
    const f = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = res => {
      const b64 = res.target.result;
      handleUpdate({ type: "imageData", data: b64 });
    };

    reader.readAsDataURL(f);
  };

  if (mode === "edit") {
    // edit mode
    return (
      <div className={styles.dataBlockDiv}>
        <div className={styles.textBlock}>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  // className={styles.dropzone + " " + isDragActive ? "active" : ""}
                  className={styles.dataBlock}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <span className={styles.dndOverlay}>
                      Try dropping some files here, <br />
                      or click to select files to upload.
                    </span>
                  ) : (
                    ""
                  )}
                  <img
                    className={styles.dataBlockImage}
                    src={image}
                    alt={data.title}
                  />
                </div>
              );
            }}
          </Dropzone>

          {/* <br />
          <input
            className={styles.author}
            value={author.data}
            onChange={e =>
              handleUpdate({ type: "author", data: e.target.value })
            }
          /> */}
        </div>
      </div>
    );
  } else {
    // normal mode
    return (
      <div className={styles.dataBlockDiv}>
        <div className={styles.dataBlock}>
          <img className={styles.dataBlockImage} src={image} alt={data.title} />
        </div>
      </div>
    );
  }
};

export default DataBlock;
