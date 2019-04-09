import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import fetchGhost, { FetchGhost } from "./components/Ghost";
import Comment from "./components/CommentBox";
import Editable from "./components/Editable";

import DynamicCursor from "./components/Cursors";
import MobileDevice from "./components/MobileDeviceAPIs";
import SimplexTubes from "./components/Animations/SimplexTubes";

class App extends Component {
  state = { posts: [] };
  componentDidMount() {
    fetchGhost().then(d => this.setState({ posts: d }));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {/* <FetchGhost theme="gallery" limit={10} /> */}
        {/* <DynamicCursor /> */}
        {/* <Editable /> */}
        {/* <MobileDevice /> */}
        {/* <SimplexTubes /> */}
        <Comment />
      </div>
    );
  }
}

export default App;
