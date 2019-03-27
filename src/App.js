import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import fetchGhost, { FetchGhost } from "./components/Ghost";
import Form from "./components/Formik";
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
        <Form />
      </div>
    );
  }
}

export default App;
