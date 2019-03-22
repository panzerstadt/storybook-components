import React from "react";
import styles from "./Blog.module.css";

import { shorten } from "./index";

export const BlogWithImage = ({ post, index }) => {
  console.log(post);
  return (
    <div className={styles.postDiv}>
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
    <div className={styles.postDiv}>
      <div className={styles.postDivBorder} style={{ width: 300, height: 400 }}>
        <div
          className={styles.postDivPadding}
          style={{ justifyContent: "center" }}
        >
          <div className={styles.textDiv}>
            <p
              className={styles.text}
              style={{ fontSize: "1.3rem", fontWeight: 200, padding: 30 }}
            >
              {shorten(post.excerpt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
