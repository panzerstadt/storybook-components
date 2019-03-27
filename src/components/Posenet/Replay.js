// ref: https://github.com/jscriptcoder/tfjs-posenet/blob/master/src/PoseNet/index.jsx

// main imports
import React, { Component } from "react";
import ReactJson from "react-json-tree";

// styles
import styles from "./index.module.css";
// google theme
import { googleTheme } from "./replayhelpers/themes";
import {
  colourNameToHex,
  getColorOpacityRangeHex
} from "./replayhelpers/color";

// components
import { isMobile, drawKeypoints, drawSkeleton } from "./helpers/utils";
import Scrubber from "./replayhelpers/SliderScrubber";
import download from "./replayhelpers/download";
import { sendEmail } from "./replayhelpers/share";

// constants
const DEBUG = true;

export class ReplayPosenet extends Component {
  static defaultProps = {
    videoWidth: 600,
    videoHeight: 500,
    algorithm: "single-pose",
    mobileNetArchitecture: isMobile() ? 0.5 : 1.01,
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20.0,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: "aqua",
    ghostColor: "grey",
    skeletonLineWidth: 2,
    loadingText: "Loading pose detector...",
    frontCamera: true,
    stop: false,
    record: false,
    additionalOptions: true
  };
  state = {
    loadedPoseRecords: [],
    loadedPoseVideo: []
  };

  fileReader;
  onChange = this.onChange.bind(this);
  loadData = this.loadData.bind(this);
  handleFileRead = this.handleFileRead.bind(this);

  getCanvas = elem => {
    this.canvas = elem;
  };

  drawPose(range) {
    const { videoWidth, videoHeight } = this.props;
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d");

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    this.poseDrawFrame(ctx, range);
  }

  poseDrawFrame(ctx, range) {
    const {
      minPoseConfidence,
      minPartConfidence,
      videoWidth,
      videoHeight,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth,
      showVideo,
      flipped
    } = this.props;

    let { poseRecords, poseVideo } = this.props;

    if (
      (!poseRecords || poseRecords.length === 0) &&
      this.state.loadedPoseRecords.length > 1
    ) {
      poseRecords = this.state.loadedPoseRecords;
    }

    if (
      (!poseVideo || poseVideo.length === 0) &&
      this.state.loadedPoseVideo.length > 1
    ) {
      poseVideo = this.state.loadedPoseVideo;
    }

    const poseDetectionFrameInner = async () => {
      const drawPoses = () => {
        // For each pose (i.e. person) detected in an image, loop through the poses
        // and draw the resulting skeleton and keypoints if over certain confidence
        // scores
        poses.map(({ score, keypoints }, i) => {
          if (score >= minPoseConfidence) {
            if (showPoints) {
              drawKeypoints(keypoints, minPartConfidence, clrList[i], ctx);
            }
            if (showSkeleton) {
              drawSkeleton(
                keypoints,
                minPartConfidence,
                clrList[i],
                skeletonLineWidth,
                ctx
              );
            }
          }
        });
      };

      let poses = [];
      poses = range ? poseRecords.slice(range.min, range.max) : poseRecords;

      let video = [];

      if (range) {
        poses = poseRecords.slice(range.min, range.max);

        if (poseVideo) {
          video = poseVideo.slice(range.min, range.max);
        }
      } else {
        poses = poseRecords;

        if (poseVideo) {
          video = poseVideo;
        }
      }
      video = video[video.length - 1];

      const clrRange = poses.length || 1;
      let clr = colourNameToHex(skeletonColor) || "#cccccc";

      const clrList = getColorOpacityRangeHex(clrRange, clr);
      clrList.reverse()[0] = "#fff";
      clrList.reverse();

      if (poseVideo && poseVideo.length > 1 && poses.length > 1) {
        // turn blob into data
        const frame = document.createElement("img");
        const url = URL.createObjectURL(video);

        frame.src = url;

        // temp draw
        // frame.id = "frame";
        // frame.height = 300;
        // document.getElementById("frame").replaceWith(frame);

        frame.onload = () => {
          // why? : https://stackoverflow.com/questions/12387310/html5-drawimage-works-in-firefox-not-chrome

          ctx.clearRect(0, 0, videoWidth, videoHeight);
          // draw
          ctx.save();
          if (flipped) {
            // https://christianheilmann.com/2013/07/19/flipping-the-image-when-accessing-the-laptop-camera-with-getusermedia/
            ctx.scale(-1, 1);
            ctx.translate(-videoWidth, 0);
          }
          ctx.drawImage(frame, 0, 0, videoWidth, videoHeight);
          ctx.restore();

          drawPoses();

          URL.revokeObjectURL(url);
        };
      } else {
        // no video
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        drawPoses();
      }
    };

    requestAnimationFrame(poseDetectionFrameInner);
  }

  componentDidMount() {
    this.drawPose();
  }

  onChange(range) {
    this.drawPose(range);
  }

  handleFileRead(e) {
    const content = JSON.parse(this.fileReader.result);
    this.setState({
      loadedPoseRecords: content.poseRecords || content || [], // content is for backward compatibility
      loadedPoseVideo: content.poseVideo || []
    });
  }

  loadData(e) {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;

    // run it
    this.fileReader.readAsText(e.target.files[0]);
  }

  render() {
    let { poseRecords, poseVideo } = this.props;

    if (
      (!poseRecords || poseRecords.length === 0) &&
      this.state.loadedPoseRecords.length > 1
    ) {
      poseRecords = this.state.loadedPoseRecords;
    }

    if (
      (!poseVideo || poseVideo.length === 0) &&
      this.state.loadedPoseVideo.length > 1
    ) {
      poseVideo = this.state.loadedPoseVideo;
    }

    const additional_buttons = (
      <div className={styles.contextualOptionsDiv}>
        <div className={styles.contextualOptions}>
          {poseRecords && poseRecords.length > 1 ? (
            <div>
              <div
                className={styles.download}
                style={{
                  maxWidth: 800,

                  margin: "0 auto",
                  display: "flex"
                }}
              >
                <button
                  className={styles.button}
                  onClick={() =>
                    download(
                      JSON.stringify({
                        poseRecords: poseRecords,
                        poseVideo: []
                      }),
                      "temp.json"
                    )
                  }
                >
                  download data
                </button>

                <button
                  className={styles.button}
                  onClick={async () => {
                    await sendEmail({
                      subject: "GWARA GWARA!",
                      message: "I challenge you! GAWRRR!",
                      from: "Rahmat Hidayat"
                    });
                    alert("challenge sent!");
                  }}
                >
                  send challenge
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    console.log("clearing records!");

                    return this.setState({
                      loadedPoseRecords: [],
                      loadedPoseVideo: []
                    });
                  }}
                >
                  clear data
                </button>
              </div>
            </div>
          ) : (
            <div
              className={styles.download}
              style={{ maxWidth: 800, padding: "10px 0", margin: "0 auto" }}
            >
              <input
                type="file"
                name="pose records upload"
                accept=".json"
                onChange={this.loadData}
              />
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div className={styles.replayDiv}>
        <div
          style={{
            backgroundColor: "#050517",
            maxWidth: 800,
            overflow: "hidden",
            height: "100vh"
          }}
        >
          <div>
            <canvas ref={this.getCanvas} />
          </div>
        </div>

        <div className={styles.scrubberDiv}>
          <div className={styles.scrubberInnerDiv}>
            <Scrubber
              onChange={this.onChange}
              range={poseRecords ? poseRecords.length : 100}
            />
          </div>
        </div>

        {/* temporarily show image for debug */}
        {/* <div style={{ height: 300 }}>
          <div id="frame" />
        </div> */}
        {this.props.additionalOptions ? additional_buttons : ""}

        {DEBUG ? (
          <div
            style={{
              height: "100%",
              maxWidth: 800,
              margin: "3rem auto",
              textAlign: "left",
              border: "1px dashed lightgrey",
              padding: "0 10px"
            }}
          >
            <ReactJson data={poseRecords} theme={googleTheme} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
