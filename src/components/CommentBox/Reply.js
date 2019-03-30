import React, { useState } from "react";
import TextArea from "react-textarea-autosize";

import styles from "./Reply.module.css";

import Button from "./Button";

function Reply(props) {
  const [text, setText] = useState("");
  return (
    <div {...props} className={styles.reply}>
      <TextArea
        placeholder="What are your thoughts?"
        minRows={2}
        defaultValue={text}
        onChange={value => {
          setText(value.target.value);
        }}
      />
      <div className="panel">
        <div className="comment_as">
          Comment as{" "}
          <a href="" className="username">
            Kevin
          </a>
        </div>
        <Button className={styles.button}>COMMENT</Button>
      </div>
    </div>
  );
}

export default Reply;
