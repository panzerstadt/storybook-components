import React, { useState, useEffect } from "react";
import Json from "react-json-view";

import styles from "./index.module.css";

const MobileDevice = () => {
  const [allData, setAllData] = useState({});
  const [battery, setBattery] = useState();

  useEffect(() => {
    const notify = e => {
      let data;

      switch (e.type) {
        case "online":
          data = { timestamp: e.timeStamp, online: e.returnValue };
          break;
        case "levelchange":
          const {
            charging,
            chargingTime,
            dischargingTime,
            level
          } = e.currentTarget;
          data = {
            timestamp: e.timeStamp,
            charging: charging,
            chargingTime: chargingTime,
            dischargingTime: dischargingTime,
            level: level
          };
          break;
        default:
          data = e;
      }

      let output = { ...allData };
      output[e.type] = data;

      setAllData(d => ({
        ...d,
        ...output
      }));
    };
    window.addEventListener("orientationchange", notify);
    window.addEventListener("devicelight", notify);
    window.addEventListener("online", notify);

    navigator.getBattery().then(battery => {
      console.log(
        "battery discharging time: " + battery.dischargingTime + " seconds"
      );
      battery.addEventListener("levelchange", notify);
    });

    // ambient light sensor
    if (window.AmbientLightSensor) {
      try {
        const sensor = window.AmbientLightSensor();
        // Detect changes in the light
        sensor.onreading = () => {
          setAllData(sensor.illuminance);

          // Read the light levels in lux
          // < 50 is dark room
          if (sensor.illuminance < 50) {
            document.body.className = "darkLight";
          } else {
            document.body.className = "brightLight";
          }
        };

        // Has an error occured?
        sensor.onerror = event => console.log(event);
        sensor.start();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log(
        "It looks like your browser doesnt support ambient light API"
      );
    }

    //return () => window.removeEventListener("orientationchange", notify);
  }, []);

  console.log(allData);

  useEffect(() => {
    function convertToObject(input, showFunction) {
      // recursively
      // https://stackoverflow.com/questions/37733272/convert-dom-object-to-javascript-object
      let obj = {};
      for (var p in input) {
        switch (typeof input[p]) {
          case "function":
            if (showFunction) obj[p] = input[p];
            break;
          case "object":
            obj[p] = convertToObject(input[p], showFunction);
            break;
          case "number":
            obj[p] = input[p];
            break;
          default:
            obj[p] = input[p];
        }
      }
      return obj;
    }
    // https://stackoverflow.com/questions/15464896/get-cpu-gpu-memory-information
    // profile the cpu
    var performance =
      window.performance ||
      window.mozPerformance ||
      window.msPerformance ||
      window.webkitPerformance ||
      {};
    console.log("number of cpu cores: " + navigator.hardwareConcurrency);

    setAllData({
      ...allData,
      performance: convertToObject(performance, false),
      numCores: navigator.hardwareConcurrency
    });

    console.profile("test profile");
    setTimeout(() => console.profileEnd("test profile"), 3000);
  }, []);

  return (
    <div className={styles.page} style={{ textAlign: "left" }}>
      <p>things tested:</p>
      <table className={styles.table}>
        <tr>
          <td>orientationchange</td> <td>orientation change</td>
        </tr>
        <tr>
          <td>devicelight</td>
          <td>ambient light</td>
        </tr>
        <tr>
          <td>online</td>
          <td>online or not</td>
        </tr>
        <tr>
          <td>levelchange</td>
          <td>battery level change</td>
        </tr>
        <tr>
          <td>numCores</td>
          <td>number of cpu cores</td>
        </tr>
        <tr>
          <td>performance</td>
          <td>cpu performance based on loading and fetching times</td>
        </tr>
      </table>
      <br />
      <p>all APIs</p>
      <Json src={allData} />
    </div>
  );
};

export default MobileDevice;
