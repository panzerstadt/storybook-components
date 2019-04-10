import React, { useEffect, useState } from "react";
import axios from "axios";

const axiosMethod = async url => {
  const result = await axios(url, {
    method: "GET",
    crossdomain: true,
    headers: {
      Accept: "application/vnd.BNM.API.v1+json",
      "cache-control": "no-cache",
      "Postman-Token": "c8e4fcc6-98d9-4dbd-a493-4be3f228432f",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept"
    },
    data: null
  })
    .then(r => JSON.stringify(r.data))
    .catch(e => JSON.stringify(e));

  return result;
};

const Fetch = () => {
  // not working in browsers (clients), therefore requires either a proxy or a server (node.js or python or the like)
  const url = "https://api.bnm.gov.my/public/fx-turn-over";

  const URL = url;
  const [data, setData] = useState("fetch something!");
  useEffect(() => {
    const runFetch = async () => {
      console.log("fetching!");
      const r = await axiosMethod(URL);
      console.log(r);
      setData(r);
    };

    runFetch();

    // the thing you care about
    // fetch(URL, options)
    //   .then(response => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(v => {
    //     console.log(v);
    //     const resultString = JSON.stringify(v, null, 2);
    //     setData(resultString);
    //   })
    //   .catch(e => {
    //     console.log("error!");
    //     console.log(e);
    //   });

    // the thing you care about stops here
  }, [URL]);

  return <div>{data}</div>;
};

export default Fetch;
