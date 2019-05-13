import React, { useEffect, useState, useRef } from "react";
import Iframe from "react-iframe";
import useFetch from "../useFetch";

import styles from "./index.module.css";

import loadingImg from "../../assets/duration.svg";

const URLWindow = ({ url }) => {
  const iframeRef = useRef();
  const [loading, setLoading] = useState(true);
  // const [state, setUrl] = useFetch();
  useEffect(() => {
    // if url changed, and loading is set to false (previously loaded), reset loading to true
    loading === false && setLoading(true);
  }, [url]);

  useEffect(() => {
    if (iframeRef) {
      //const elem = iframeRef.current.children[0]; // brittle to element render order
      const elem = document.getElementById("iframe-urlwindow");
      console.log(elem);
    }
  }, [iframeRef, loading]);

  // i believe i need to setup iframe, and it it fails, return a screenshot
  // TODO: waybackmachine
  // https://archive.org/help/wayback_api.php
  return (
    <div ref={iframeRef} className={styles.webpageContainer}>
      <Iframe
        id="iframe-urlwindow"
        onLoad={() => setLoading(false)}
        url={url}
        width="100%"
        height="100%"
        sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"
      />

      {loading && (
        <div className={styles.loadingContainer}>
          <img className={styles.loading} src={loadingImg} alt="loading..." />
        </div>
      )}
    </div>
  );
};

export default URLWindow;
