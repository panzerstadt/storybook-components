import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import fetchGhost, { FetchGhost } from "./components/Ghost";
import Comment from "./components/CommentBox";
import Editable from "./components/Editable";

import DynamicCursor from "./components/Cursors";
import MobileDevice from "./components/MobileDeviceAPIs";
import SimplexTubes from "./components/Animations/SimplexTubes";
import { SimpleFetch } from "./components/ReducerHooksFetch";
import { ObjectDetectionPoster } from "./components/VideoPoster";
import Notes from "./components/Notes";
import Unsplash from "./components/Unsplash";

class App extends Component {
  state = { posts: [] };
  componentDidMount() {
    //fetchGhost().then(d => this.setState({ posts: d }));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Unsplash search="dog" />
        <VisualTest />
      </div>
    );
  }
}

export default App;
