import React, { useEffect, useState } from "react";
import GhostContentAPI from "@tryghost/content-api";

import styles from "./fetchGhost.module.css";

import {
  BlogNoImage,
  BlogWithImage,
  GalleryNoImage,
  GalleryWithImage
} from "./components";

const api = new GhostContentAPI({
  url: "https://gatsby-starter-blog-admin.now.sh",
  key: "53321cfbcc9440e2c7554b0c91",
  version: "v2"
});

export const FetchGhost = ({ onFetched, theme = "blog" }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchGhost().then(d => {
      setPosts(d);
    });
  }, []);

  useEffect(() => {
    if (onFetched) onFetched(posts);
  }, [posts]);

  const WithImage = ({ theme, ...rest }) => {
    if (theme === "gallery") return <GalleryWithImage {...rest} />;
    else if (theme === "blog") return <BlogWithImage {...rest} />;
    return <GalleryWithImage {...rest} />;
  };

  const NoImage = ({ theme, ...rest }) => {
    if (theme === "gallery") return <GalleryNoImage {...rest} />;
    else if (theme === "blog") return <BlogNoImage {...rest} />;
    return <GalleryNoImage {...rest} />;
  };

  return (
    <div
      className={styles.containerDiv}
      style={{
        flexDirection: theme === "blog" ? "column" : "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {posts.map(p => {
        if (p.feature_image) {
          return <WithImage key={p.comment_id} theme={theme} post={p} />;
        } else {
          return <NoImage key={p.comment_id} theme={theme} post={p} />;
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
