import { useEffect } from "react";
import Unsplash from "unsplash-js";

import keys from "./hidden/hidden.json";

const unsplash = new Unsplash({
  applicationId: keys.unsplash.key,
  secret: keys.unsplash.secret
});

const Search = ({ search, onComplete }) => {
  const fetchUnsplash = () => {
    unsplash.search
      .photos(search, 1)
      .then(v => v.json())
      .then(json => {
        onComplete && onComplete(json);
      });
  };

  useEffect(() => {
    fetchUnsplash();
  }, [search]); // only fetches on keyword change

  return null;
};

// private (within this file)
let prevSearch;
let cache = [];
export const urls = async search => {
  //console.log(cache);
  if (cache.length === 0 || prevSearch !== search) {
    console.log("performing fetch!");
    const res = await unsplash.search.photos(search, 1);
    const resJson = await res.json();

    const results = resJson.results;
    if (results && results.length > 0) {
      cache = results;
      prevSearch = search;
    } else {
      // empty search
      return "";
    }

    const out = cache.shift();
    return out.urls.regular;
  } else {
    const out = cache.shift();
    return out.urls.regular;
  }
};

export default Search;
