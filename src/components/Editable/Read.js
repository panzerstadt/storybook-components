import React, { useState, useEffect } from "react";
import firebase from "./lib/firebase";

import ReactJson from "react-json-view";
import styles from "./Read.module.css";

export const ReadFromFirebase = (databaseRef = "dev-playground", callback) => {
  return firebase
    .database()
    .ref(databaseRef)
    .on("value", snapshot => {
      const vals = snapshot.val();
      callback(vals);
    });
};

export const ShowDB = ({ databaseRef = "dev-playground", onDBUpdate }) => {
  const [dbState, setDBState] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref(databaseRef)
      .on(
        "value",
        snapshot => {
          const vals = snapshot.val();
          setDBState(vals);
          if (onDBUpdate) onDBUpdate(vals);
        },
        [dbState]
      );
  }, []);

  return (
    <div className={styles.json}>
      <ReactJson
        style={{ overflow: "hidden" }}
        src={dbState}
        theme="summerfruit"
      />
    </div>
  );
};
