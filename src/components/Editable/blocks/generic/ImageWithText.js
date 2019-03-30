import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { DebounceInput } from "react-debounce-input";

import styles from "./ImageWithText.module.css";

const DataBlock = ({ data, onUpdate, mode }) => {
  const [title, setTitle] = useState(data.title);
  const [image, setImage] = useState(data.imageData);

  const handleUpdate = d => {
    if (d.type === "title") {
      setTitle(d.data);
    } else if (d.type === "imageData") {
      setImage(d.data);
    }

    if (onUpdate) {
      let update = {};
      update[d.type] = d.data;
      const out = { ...data, ...update };

      onUpdate(out);
    }
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
    return (
      <div className={styles.dataBlockDiv}>
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

        <DebounceInput
          minLength={2}
          debounceTimeout={1000}
          className={styles.dataBlockText}
          value={title}
          onChange={e => handleUpdate({ type: "title", data: e.target.value })}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.dataBlockDiv}>
        <div className={styles.dataBlock}>
          <img
            className={styles.dataBlockImage}
            src={data.imageData}
            alt={data.title}
          />
          <p className={styles.dataBlockText}>{data.title}</p>
        </div>
      </div>
    );
  }
};

export default DataBlock;
