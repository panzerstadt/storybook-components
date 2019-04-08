import React, { useState, useEffect, useRef } from "react";
import SimplexNoise from "simplex-noise";
import * as paper from "paper";

// TODO: conitue from here
// https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/#attachment_38005

import styles from "./index.module.css";

const Cursor = ({ type = "dot", onMouseMove }) => {
  // mouse stuff
  const mouseRef = useRef();

  const [mousePos, setMousePos] = useState({ clientX: -100, clientY: -100 });
  useEffect(() => {
    const updateMousePos = e => {
      const u = {
        clientX: e.clientX,
        clientY: e.clientY
      };
      setMousePos(u);
      if (onMouseMove) {
        onMouseMove(u);
      }
    };

    document.addEventListener("mousemove", updateMousePos);
    return () => document.removeEventListener("mousemove", updateMousePos);
  }, []);

  useEffect(() => {
    const moveMouse = () => {
      if (mouseRef) {
        mouseRef.current.style.transform = `translate(${mousePos.clientX}px, ${
          mousePos.clientY
        }px)`;
      }
    };

    requestAnimationFrame(moveMouse);
  }, [mousePos, mouseRef]);

  return (
    <div
      ref={mouseRef}
      className={styles.cursor + " " + styles.cursor__small}
    />
  );
};

let lastX = 0;
let lastY = 0;
let isStuck = false;
let showCursor = false;
let group, stuckX, stuckY, fillOuterCursor;

const CursorCanvas = ({ type = "noisyCircle", mousePos }) => {
  const canvasRef = useRef();

  const lerp = (a, b, n) => {
    return (1 - n) * a + n * b;
  };

  const map = (value, in_min, in_max, out_min, out_max) => {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  useEffect(() => {
    paper.setup(canvasRef.current);

    const settings = {
      shapeBounds: {
        width: 75,
        height: 75
      },
      strokeColor: "rgba(255, 0, 0, 0.5)",
      strokeWidth: 1,
      segments: 8,
      radius: 15,
      noiseScale: 150, // speed
      noiseRange: 4, // range of distortion
      isNoisy: false
    };

    // base shape
    const polygon = new paper.Path.RegularPolygon(
      new paper.Point(0, 0),
      settings.segments,
      settings.radius
    );
    polygon.strokeColor = settings.strokeColor;
    polygon.strokeWidth = settings.strokeWidth;
    polygon.smooth();

    // put it together
    group = new paper.Group([polygon]);
    group.applyMatrix = false;

    // noise
    const noiseObjects = polygon.segments.map(() => new SimplexNoise());
    let bigCoordinates = [];
  }, []);

  useEffect(() => {
    paper.view.onFrame = event => {
      // using linear interpolation, the circle will move 0.2 (20%)
      // of the distance between its current position and the mouse
      // coordinates per Frame
      lastX = lerp(lastX, mousePos.clientX, 0.2);
      lastY = lerp(lastY, mousePos.clientY, 0.2);

      group.position = new paper.Point(lastX, lastY);
    };
  }, [mousePos]);

  //noisyCircle(canvasRef, mousePos);

  return (
    <canvas
      ref={canvasRef}
      className={styles.cursor + " " + styles.cursor__canvas}
      resize="true"
    />
  );
};

const CursorComponent = ({ type = "dot" }) => {
  const [mousePos, setMousePos] = useState({ clientX: -100, clientY: -100 });
  // https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/

  return (
    <>
      <Cursor type={type} onMouseMove={setMousePos} />
      <CursorCanvas mousePos={mousePos} />
    </>
  );
};

export default CursorComponent;
