import React, { useEffect, useState, useReducer } from "react";
import GhostContentAPI from "@tryghost/content-api";

import styles from "./fetchGhost.module.css";

import {
  BlogNoImage,
  BlogWithImage,
  GalleryNoImage,
  GalleryWithImage
} from "./components";

const DEFAULT = {
  url: "https://gatsby-starter-blog-admin.now.sh",
  key: "53321cfbcc9440e2c7554b0c91",
  version: "v2"
};

const api = new GhostContentAPI(DEFAULT);

//var counter = 0;
// hack to move screen to top on pagination click

export const FetchGhost = ({ onFetched, limit = 3, theme = "blog" }) => {
  const [pagination, setPagination] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  // paginated fetch
  useEffect(() => {
    fetchGhost({ limit: limit, page: pageNum })
      .then(d => {
        //if (counter > 0) document.getElementById("blog-top").click();
        setPagination(d.meta.pagination);
        setPosts(d);
        //counter++;
      })
      .catch(e => {
        console.log("there seems to be an error from the Ghost backend: ", e);
      });
  }, [pageNum]);

  // callback
  useEffect(() => {
    if (onFetched) onFetched(posts);
  }, [posts]);

  const Pagination = ({ data }) => {
    const hasPrev = data && data.prev ? true : false;
    const hasNext = data && data.next ? true : false;
    return (
      <div className={styles.paginationDiv}>
        <span className={styles.paginationLeft}>
          <button
            className={hasPrev ? styles.pagebtn : styles.disabled}
            onClick={() => setPageNum(data.prev)}
          >
            {"<"}
          </button>
        </span>
        <span className={styles.paginationText}>
          {data.page} of {data.pages} pages
        </span>
        <span className={styles.paginationRight}>
          <button
            className={hasNext ? styles.pagebtn : styles.disabled}
            onClick={() => setPageNum(data.next)}
          >
            {">"}
          </button>
        </span>
      </div>
    );
  };

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
        //justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <a href="#blog" id="blog-top" />
      {posts.map((p, i) => {
        if (p.feature_image) {
          return (
            <WithImage key={p.comment_id} index={i} theme={theme} post={p} />
          );
        } else {
          return (
            <NoImage key={p.comment_id} index={i} theme={theme} post={p} />
          );
        }
      })}
      <br />
      <Pagination data={pagination} />
    </div>
  );
};

const fetchGhost = props => {
  return api.posts
    .browse({
      limit: (props && props.limit) || 20,
      page: (props && props.page) || 1
    })
    .then(posts => {
      return posts;
    })
    .catch(e => console.log(e));
};

export default fetchGhost;
