import React from "react";
import styles from "./Gallery.module.css";

import { shorten } from "./index";

export const GalleryWithImage = ({ post }) => {
  return (
    <div className={styles.postDiv}>
      <div className={styles.postDivBorder} style={{ width: 300, height: 400 }}>
        <div className={styles.postDivPadding}>
          <div className={styles.imgDiv} style={{ height: 300 }}>
            <img className={styles.img} src={post.feature_image} alt="img" />
          </div>
          <div className={styles.textDiv}>
            <p className={styles.text}>{shorten(post.excerpt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GalleryNoImage = ({ post }) => {
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
