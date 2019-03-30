import React, { useState, useEffect, useContext, createContext } from "react";

import styles from "./Comments.module.css";

import { CommentContext } from "./Comment";

import Card from "./Card";
import Reply from "./Reply";

import { gen_comments } from "./Comment";

function Comments(props) {
  var [replying, setReplying] = useState([]);
  var [comments, setComments] = useState([
    {
      username: "Kevin",
      date: "3 hours ago",
      text: "#Hello\n>quote\n\n`code`",
      votes: 12,
      comments: [
        {
          username: "Kevin",
          date: "2 hours ago",
          text: "^ click the minimize button to hide threads",
          votes: 8,
          comments: [
            {
              username: "Kevin",
              date: "1 hours ago",
              text: "<- Click the arrows to vote",
              votes: 3,
              comments: []
            }
          ]
        },
        {
          username: "Kevin",
          date: "4 hours ago",
          text: "click on reply to open up a text prompt",
          votes: 5,
          comments: []
        },
        {
          username: "Kevin",
          date: "4 hours ago",
          text: "click on reply to open up a text prompt",
          votes: 5,
          comments: []
        },
        {
          username: "Kevin",
          date: "4 hours ago",
          text: "click on reply to open up a text prompt",
          votes: 5,
          comments: []
        },
        {
          username: "Kevin",
          date: "10 mins ago",
          text: "this",
          votes: 2,
          comments: [
            {
              username: "Kevin",
              date: "8 mins ago",
              text: "is",
              votes: 1,
              comments: [
                {
                  username: "Kevin",
                  date: "5 mins ago",
                  text: "to",
                  votes: 0,
                  comments: [
                    {
                      username: "Kevin",
                      date: "4 mins ago",
                      text: "show",
                      votes: -1,
                      comments: [
                        {
                          username: "Kevin",
                          date: "2 mins ago",
                          text: "nesting",
                          votes: -200,
                          comments: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  return (
    <Card {...props} className={styles.comments}>
      <span className={styles.comments} id={styles.comments}>
        Comments
      </span>
      <span className={styles.comments} id={styles.commentCount}>
        (9)
      </span>
      <Reply />
      <CommentContext.Provider value={[replying, setReplying]}>
        {gen_comments(comments, 0, [])}
      </CommentContext.Provider>
    </Card>
  );
}

export default Comments;
