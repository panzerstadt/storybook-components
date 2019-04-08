import React from "react";
import ReactDOM from "react-dom";
import ParticleField from "react-particles-webgl";
import styles from "./ParticlesWebGL.module.css";

function App() {
  const config = {
    showCube: false,
    dimension: "2D",
    velocity: 1.5,
    lines: {
      colorMode: "solid",
      color: "#3FB568",
      transparency: 0.9,
      limitConnections: true,
      maxConnections: 20,
      minDistance: 60,
      visible: true
    },
    particles: {
      colorMode: "solid",
      color: "#3FB568",
      transparency: 0.9,
      shape: "circle",
      boundingBox: "canvas",
      count: 300,
      minSize: 20,
      maxSize: 50,
      visible: true
    },
    cameraControls: {
      enabled: false,
      enableDamping: true,
      dampingFactor: 0.2,
      enableZoom: true,
      autoRotate: false,
      autoRotateSpeed: 0.3,
      resetCameraFlag: true
    }
  };

  return (
    <div className={styles.bg}>
      <ParticleField config={config} />
    </div>
  );
}

export default App