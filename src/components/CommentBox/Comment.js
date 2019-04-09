import React, { useState, useEffect, useContext, createContext } from "react";

import styles from "./Comment.module.css";

import Markdown from "./Markdown";
import Rating from "./Rating";
import Reply from "./Reply";

export const CommentContext = createContext({});

function compare(a1, a2) {
  if (JSON.stringify(a1) === JSON.stringify(a2)) {
    return true;
  }
  return false;
}

export function gen_comments(comments, colorindex, path) {
  return comments.map((comment, i) => {
    return (
      <Comment
        username={comment.username}
        date={comment.date}
        text={comment.text}
        votes={comment.votes}
        colorindex={colorindex}
        key={i}
        path={[...path, i]}
        comments={comment.comments}
      />
    );
  });
}

const Comment = props => {
  const [replying, setReplying] = useContext(CommentContext);
  const [minimized, setMinimized] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = async () => {
      if (props.path.length > 2 && props.path.length % 2 === 0) {
        setHidden(true);
      }
      if (props.path[props.path.length - 1] > 3) {
        setHidden(true);
      }
    };

    hide();
  }, [props.path]);

  return (
    <div
      {...props}
      className={styles.comment}
      style={{
        backgroundColor: props.colorindex % 2 === 0 ? "#161C21" : "#13181D"
      }}
    >
      {hidden ? (
        <button
          id={styles.showMore}
          onClick={() => {
            setHidden(false);
          }}
        >
          Show More Replies
        </button>
      ) : (
        <>
          <div id={styles.left} className={minimized ? styles.hidden : ""}>
            <Rating votes={props.votes} />
          </div>
          <div id={styles.right}>
            <div id={styles.top}>
              <span
                className={styles.minimize}
                onClick={() => {
                  setMinimized(!minimized);
                }}
              >
                [{minimized ? "+" : "-"}]
              </span>
              <span id={styles.username}>
                <a href="">{props.username}</a>
              </span>
              <span id={styles.date}>
                <a href="">{props.date}</a>
              </span>
            </div>
            <div id={styles.content} className={minimized ? styles.hidden : ""}>
              <Markdown options={{ forceBlock: true }}>{props.text}</Markdown>
            </div>
            <div id={styles.actions} className={minimized ? styles.hidden : ""}>
              <span
                className={`${
                  compare(replying, props.path) ? styles.selected : ""
                }`}
                onClick={() => {
                  if (compare(replying, props.path)) {
                    setReplying([]);
                  } else {
                    setReplying(props.path);
                  }
                }}
              >
                reply
              </span>
              <span>report</span>
            </div>
            <Reply
              className={
                compare(replying, props.path) && !minimized ? "" : styles.hidden
              }
            />
            <div
              className={`${styles.comments} ${minimized ? styles.hidden : ""}`}
            >
              {gen_comments(props.comments, props.colorindex + 1, [
                ...props.path
              ])}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
