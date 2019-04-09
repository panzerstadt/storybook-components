import React, { useState, useContext, createContext } from "react";
import ThemeContext from "./context";

import styles from "./index.module.css";

import Comments from "./Comments";

function App(props) {
  const [theme, setTheme] = useState("light");

  return (
    <div {...props} className={styles.commentBox}>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito"
        rel="stylesheet"
      />
      <Comments />
    </div>
  );
}

export default App;
