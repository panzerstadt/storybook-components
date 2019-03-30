import React from "react";
import Markdown from "markdown-to-jsx";

import styles from "./Markdown.module.css";

const MD = ({ children }) => (
  <Markdown
    children={children}
    options={{
      overrides: {
        code: {
          props: {
            className: styles.code
          }
        },
        blockquote: {
          props: {
            className: styles.blockquote
          }
        }
      }
    }}
  />
);

export default MD;
