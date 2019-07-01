/*
A good indicator that they belong together is that
they are used one after another (e.g. setIsError,
setIsLoading). Let’s combine all three of them
with a Reducer Hook instead.
*/

// useReducer == do similar things together as a group

import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

import styles from "./index.module.css";

// grouped state
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      throw new Error("dunno what to do with this condition");
  }
};

const useFetch = (initialUrl, initialData) => {
  const INIT = { hits: [] };
  const [data, setData] = useState(initialData || INIT);
  const [url, setUrl] = useState(
    initialUrl || "http://hn.algolia.com/api/v1/search?query=redux"
  );

  const [state, dispatch] = useReducer(dataFetchReducer, {
    // dataFetchReducer is the action
    // this here is the initial state
    isLoading: false,
    error: "",
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE", payload: e.message });
        }
      }
    };

    fetchData();

    return () => {
      // if it unmounts, this returns true
      // thereby skipping FETCH_SUCCESS / FETCH_FAILURE
      didCancel = true;
    };
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };

  return [state, doFetch];
};

export default useFetch;
