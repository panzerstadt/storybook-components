import React, { useEffect, useState } from "react";
import GhostContentAPI from "@tryghost/content-api";

import styles from "./fetchGhost.module.css";

const api = new GhostContentAPI({
  url: "https://gatsby-starter-blog-admin.now.sh",
  key: "53321cfbcc9440e2c7554b0c91",
  version: "v2"
});

const shorten = (text, words = 30) => {
  return text
    .split(" ")
    .slice(0, words)
    .concat(["...more"])
    .join(" ");
};

export const FetchGhost = ({ onFetched }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchGhost().then(d => {
      setPosts(d);
    });
  }, []);

  useEffect(() => {
    if (onFetched) onFetched(posts);
  }, [posts]);

  const WithImage = ({ post }) => {
    return (
      <div className={styles.postDiv}>
        <div
          className={styles.postDivBorder}
          style={{ width: 300, height: 400 }}
        >
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

  const NoImage = ({ post }) => {
    return (
      <div className={styles.postDiv}>
        <div
          className={styles.postDivBorder}
          style={{ width: 300, height: 400 }}
        >
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

  return (
    <div className={styles.containerDiv}>
      {posts.map(p => {
        console.log(p);
        if (p.feature_image) {
          return <WithImage key={p.comment_id} post={p} />;
        } else {
          return <NoImage key={p.comment_id} post={p} />;
        }
      })}
    </div>
  );
};

const fetchGhost = () => {
  return api.posts
    .browse()
    .then(posts => {
      return posts;
    })
    .catch(e => console.log(e));
};

export default fetchGhost;
