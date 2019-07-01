import React, { useState, useEffect } from "react";

import UnsplashSearch, { urls } from "./search";

const isEmpty = test => {
  return Object.entries(test).length === 0 && test.constructor === Object;
};

const Demo = () => {
  const [search, setSearch] = useState("");
  const [done, setDone] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  // useEffect(() => {
  //   if (!isEmpty(result)) {
  //     console.log(result);
  //     const url =
  //       result && result.results.length > 0 && result.results[0].urls.regular;
  //     setImgSrc(url);
  //   }
  // }, [result]);

  useEffect(() => {
    if (!done) {
      urls(search).then(v => {
        console.log(v);
        setImgSrc(v);
        setDone(true);
      });
    }
  }, [done]);

  return (
    <div>
      <form
        onSubmit={e => {
          setSearch(e.target.querySelector("input").value);
          e.preventDefault();
          setDone(false);
        }}
      >
        <input placeholder="search unsplash" />
      </form>
      <p>search: {search}</p>

      {/* <UnsplashSearch search={search} onComplete={setResult} /> */}
      <img src={imgSrc} alt="img" />
    </div>
  );
};

export default Demo;
