import React from "react";
import styles from "./Blog.module.css";

import { shorten } from "./index";

export const BlogWithImage = ({ post, index }) => {
  const flipStyle = index % 2 ? styles.flip : "";

  return (
    <div className={styles.postDiv + " " + flipStyle}>
      <div className={styles.imgDiv} style={{ height: 300 }}>
        <img className={styles.img} src={post.feature_image} alt="img" />
      </div>
      <div className={styles.textDiv}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.text}>{shorten(post.excerpt)}</p>
      </div>
    </div>
  );
};

export const BlogNoImage = ({ post, index }) => {
  return (
    <div className={styles.postDivFull}>
      <div
        className={styles.postDivPadding}
        style={{ justifyContent: "center" }}
      >
        <div className={styles.textDiv}>
          <p
            className={styles.text}
            style={{ fontSize: "1.5rem", fontWeight: 200 }}
          >
            {shorten(post.excerpt)}
          </p>
        </div>
      </div>
    </div>
  );
};
