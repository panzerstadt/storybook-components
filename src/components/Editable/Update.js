import React, { useState, useEffect } from "react";
import firebase from "./lib/firebase";
import ReactJson from "react-json-view";

import styles from "./Update.module.css";

import { ShowDB, ReadFromFirebase } from "./Read";
import DataBlock, { AaronC } from "./blocks";

const DB_REF = "0003-aaron-chew/data";

export const updateDB = (databaseRef = DB_REF, data) => {
  if (data.title) {
    firebase
      .database()
      .ref(databaseRef + "/" + data.title)
      .set(data);
  } else {
    firebase
      .database()
      .ref(databaseRef)
      .push(data);
  }
};

export const Update = ({ databaseRef = DB_REF, onUpdated, children }) => {
  const [state, setState] = useState({ url: "", title: "", imageBase64: "" });
  const [content, setContent] = useState("");

  // GET STUFF
  const [dbRef, setDbRef] = useState();
  const [dbState, setDBState] = useState({});
  const [newDBState, setNewDBState] = useState(dbState);
  useEffect(() => {
    const ref = firebase.database().ref(databaseRef);
    setDbRef(ref);

    ref.on("value", snapshot => {
      let data = snapshot.val();
      const keys = Object.keys(snapshot.val());
      keys.map(k => {
        data[k] = { ...data[k], uid: k };
      });
      setDBState(data);
    });
  }, []);

  // CREATE EDITABLE COMPONENTS
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    if (editable && dbRef) {
      // editable mode
      const data = dbState;
      const keys = Object.keys(data);

      const output = keys.map((k, i) => {
        if (data[k].type === "data") {
          return (
            <Editable key={k} uid={k} toDelete={!dbState[k]}>
              <DataBlock
                data={data[k]}
                mode="edit"
                onUpdate={handleChange}
                uid={k}
              />
            </Editable>
          );
        } else if (data[k].type === "text") {
          return (
            <Editable key={k} uid={k} toDelete={!dbState[k]}>
              <AaronC.text
                key={k}
                data={data[k]}
                mode="edit"
                onUpdate={handleChange}
              />
            </Editable>
          );
        } else if (data[k].type === "image") {
          return (
            <AaronC.image
              key={k}
              data={data[k]}
              mode="edit"
              onUpdate={handleChange}
            />
          );
        } else if (data[k].type === "heroImage") {
          return (
            <AaronC.heroImage
              key={k}
              data={data[k]}
              mode="edit"
              onUpdate={handleChange}
            />
          );
        } else {
          return (
            <Editable key={k} uid={k} toDelete={!dbState[k]}>
              <p key={k}>this block editing function is not supported yet.</p>
            </Editable>
          );
        }
      });

      setContent(output);
    } else if (!editable && dbRef) {
      // non editable mode
      const data = dbState;
      const keys = Object.keys(data);

      const output = keys.map((k, i) => {
        if (data[k].type === "data") {
          return <DataBlock key={k} data={data[k]} />;
        } else if (data[k].type === "text") {
          return <AaronC.text key={k} data={data[k]} />;
        } else if (data[k].type === "image") {
          return <AaronC.image key={k} data={data[k]} />;
        } else if (data[k].type === "heroImage") {
          return <AaronC.heroImage key={k} data={data[k]} />;
        } else {
          return (
            <div key={k} style={{ margin: "1rem 0" }}>
              <ReactJson
                style={{ overflow: "hidden", textAlign: "left" }}
                src={data[k]}
                theme="summerfruit"
              />
            </div>
          );
        }
      });

      setContent(output);
    }
  }, [editable, dbRef, dbState]);

  const Editable = ({ children, uid, toDelete }) => {
    return (
      <div
        key={uid}
        className={styles.editable + " " + (toDelete ? styles.warning : "")}
      >
        <button
          className={styles.editButton}
          style={{
            visibility: editable ? "visible" : "hidden"
          }}
          onClick={() => handleDelete(uid)}
        >
          🧨
        </button>
        {children}
      </div>
    );
  };

  // EDITS
  const handleChange = d => {
    let newDBState = { ...dbState };
    newDBState[d.uid] = d;
    setNewDBState(newDBState);
  };
  // UPDATE / DELETE
  const handleDBUpdate = () => {
    console.log("publishing");
    console.log(newDBState);
    // "publish" button
    const uidsToDelete = trashUID;
    firebase
      .database()
      .ref(databaseRef)
      .set(newDBState); // this triggers a new render

    // sets the new db state
    //setDBState(newDBState);

    setEditable(false);
  };
  // PREPARE TO DELETE
  const [trashUID, setTrashUID] = useState([]);
  const handleDelete = v => {
    let newDBState = { ...dbState };
    delete newDBState[v];
    setDBState(newDBState);
    setTrashUID([...trashUID, v]);
  };

  return (
    <div>
      <h3>UPDATE (+DELETE)</h3>
      <button
        className={styles.modeButton}
        style={{ backgroundColor: editable ? "red" : "black" }}
        onClick={() => setEditable(!editable)}
      >
        edit
      </button>{" "}
      <button className={styles.modeButton} onClick={handleDBUpdate}>
        publish
      </button>
      <br />
      {content}
      <br />
      <h3>ALL DATA - REF</h3>
      <ShowDB databaseRef={DB_REF} />
    </div>
  );
};

export const bulkUpdateDB = (databaseRef = DB_REF, data) => {
  return 0;
};
