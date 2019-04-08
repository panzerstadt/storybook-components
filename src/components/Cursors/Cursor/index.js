import React, { useState, useEffect, useRef } from "react";
import SimplexNoise from "simplex-noise";
import * as paper from "paper";

import styles from "./index.module.css";

import Cursor from "./cursors"

let lastX = 0;
let lastY = 0;
let showCursor = false;
let fillOuterCursor;
let bigCoordinates = [];

// the animation around the cursor (noisy circle)
const CursorCanvas = ({ type = "noisyCircle", mousePos, interactionRefs }) => {
  const canvasRef = useRef();
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
    noiseRange: 4 // range of distortion
  };

  // listen to hover interactions (add event listeners)
  const [stuckX, setStuckX] = useState();
  const [stuckY, setStuckY] = useState();
  const [isStuck, setIsStuck] = useState(false);
  useEffect(() => {
    // find mouse pos for circle
    const handleMouseEnter = e => {
      const navItem = e.currentTarget;
      const navItemBox = navItem.getBoundingClientRect();
      const s_X = Math.round(navItemBox.left + navItemBox.width / 2);
      const s_Y = Math.round(navItemBox.top + navItemBox.height / 2);
      setStuckX(s_X);
      setStuckY(s_Y);
      setIsStuck(true);
    };

    const handleMouseLeave = () => {
      setIsStuck(false);
    };

    // ALL link items have this
    // add to children
    let linkItems;
    if (interactionRefs) {
      interactionRefs.map(r => {
        const children = r.current.children
        if (children.length > 0) {
          Array.from(children).map(c => {
            c.addEventListener("mouseenter", handleMouseEnter);
            c.addEventListener("mouseleave", handleMouseLeave);
          })
        }
      });
    }

    return () => {
      if (interactionRefs) {
      interactionRefs.map(r => {
        const children = r.current.children
        if (children.length > 0) {
          Array.from(children).map(c => {
            c.removeEventListener("mouseenter", handleMouseEnter);
            c.removeEventListener("mouseleave", handleMouseLeave);
          })
        }
      });
    }
    };
  }, [interactionRefs]);

  const [polygon, setPolygon] = useState();
  const [noiseObj, setNoiseObj] = useState()
  const [group, setGroup] = useState();
  useEffect(() => {
    paper.setup(canvasRef.current);

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
    const group = new paper.Group([polygon]);
    group.applyMatrix = false;

    setPolygon(polygon);
    setGroup(group);
    setNoiseObj(polygon.segments.map(() => new SimplexNoise()))
  }, []);

  // animate the geometry based on mouse position
  const [isNoisy, setIsNoisy] = useState(false);
  useEffect(() => {
    const lerp = (a, b, n) => {
      return (1 - n) * a + n * b;
    };

    const map = (value, in_min, in_max, out_min, out_max) => {
      return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    };

    

    // listen to interactinos with the link
    if (polygon && group) {
      // noise
    const noiseObjects = noiseObj

    // the draw loop of Paper.js
    // (60fps with requestAnimationFrame under the hood)
    paper.view.onFrame = event => {
      
      // using linear interpolation, the circle will move 0.2 (20%)
      // of the distance between its current position and the mouse
      // coordinates per Frame
      if (!isStuck) {
        // move circle around normally
        lastX = lerp(lastX, mousePos.clientX, 0.2);
        lastY = lerp(lastY, mousePos.clientY, 0.2);
        group.position = new paper.Point(lastX, lastY);
      } else if (isStuck) {
        // fixed position on a nav item
        lastX = lerp(lastX, stuckX, 0.2);
        lastY = lerp(lastY, stuckY, 0.2);
        group.position = new paper.Point(lastX, lastY);
      }

      if (isStuck && polygon.bounds.width < settings.shapeBounds.width) {
        // scale up the shape
        polygon.scale(1.08);
      } else if (!isStuck && polygon.bounds.width > 30) {
        // remove noise
        if (isNoisy && bigCoordinates.length !== 0) {

          polygon.segments.forEach((segment, i) => {
            segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
          });
          setIsNoisy(false);
          bigCoordinates = [];
        }
        // scale down the shape
        const scaleDown = 0.92;
        polygon.scale(scaleDown);
      }

      // while stuck and big, apply simplex noise
      if (isStuck && polygon.bounds.width >= settings.shapeBounds.width) {
        setIsNoisy(true);
        // first get coordinates of large circle
        if (bigCoordinates.length === 0) {
          polygon.segments.forEach((segment, i) => {
            bigCoordinates[i] = [segment.point.x, segment.point.y];
          });
        }

        // loop over all points of the polygon
        polygon.segments.forEach((segment, i) => {
          // get new noise value
          // we divide event.count by noiseScale to get a very smooth value
          const noiseX = noiseObjects[i].noise2D(
            event.count / settings.noiseScale,
            0
          );
          const noiseY = noiseObjects[i].noise2D(
            event.count / settings.noiseScale,
            1
          );

          // map the noise value to our defined range
          const distortionX = map(
            noiseX,
            -1,
            1,
            -settings.noiseRange,
            settings.noiseRange
          );
          const distortionY = map(
            noiseY,
            -1,
            1,
            -settings.noiseRange,
            settings.noiseRange
          );

          // apply distortion to coordinates
          const newX = bigCoordinates[i][0] + distortionX;
          const newY = bigCoordinates[i][1] + distortionY;

          // set new (noisy) coodrindate of point
          segment.point.set(newX, newY);
        });
      }
      polygon.smooth();
    };

    }
    
  }, [mousePos, polygon]);

  //noisyCircle(canvasRef, mousePos);

  return (
    <canvas
      ref={canvasRef}
      className={styles.cursor + " " + styles.cursor__canvas}
      resize="true"
    />
  );
};

// bring it all together
const CursorComponent = ({ type = "line", interactionRefs }) => {
  const [mousePos, setMousePos] = useState({ clientX: -100, clientY: -100 });
  // https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/

  return (
    <>
      <Cursor type={type} onMouseMove={setMousePos} />
      <CursorCanvas mousePos={mousePos} interactionRefs={interactionRefs} />
    </>
  );
};

export default CursorComponent;
