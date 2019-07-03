import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Editable from "./components/Editable";

import Unsplash from "./components/Unsplash";
import VisualTest from "./components/VisualTesting";

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
        {/* <Unsplash search="dog" /> */}
        <VisualTest />
      </div>
    );
  }
}

export default App;
