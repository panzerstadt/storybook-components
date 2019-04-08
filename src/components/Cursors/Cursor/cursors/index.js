import React, { useState, useEffect, useRef } from "react";

import Dot from "./types/Dot";
import Box from "./types/Box";
import Line from "./types/Line";
import Unicorn from "./types/Unicorn";


// the cursor (middle part)
const Cursor = ({ type = "line", onMouseMove }) => {
  // mouse stuff
  const mouseRef = useRef();

  // listens to mouse movement
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

  // when mouse position changes, move the special mouse
  useEffect(() => {
    const moveMouse = () => {
      if (mouseRef && mouseRef.current) {
        mouseRef.current.style.transform = `translate(${mousePos.clientX}px, ${
          mousePos.clientY
        }px)`;
      }
    };

    requestAnimationFrame(moveMouse);
  }, [mousePos, mouseRef]);

  if (type === "dot") {
    return <Dot mouseRef={mouseRef} />;
  } else if (type === "line") {
    return <Line mouseRef={mouseRef} />;
  } else if (type === "box") {
    return <Box mouseRef={mouseRef} />;
  } else if (type === "unicorn") {
    return <Unicorn mouseRef={mouseRef} />;
  } else {
    return <Dot mouseRef={mouseRef} />;
  }

};

export default Cursor