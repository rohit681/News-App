import "./App.css";
import NavBar from "./Components/NavBar";
import React, { Component } from "react";
import News from "./Components/News";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      search: "",
    };
  }
  func = (nUrl) => {
    this.setState({ category: nUrl });
  };

  search = (text) => {
    this.setState({ search: text });
  };
  render() {
    return (
      <>
        <NavBar
          func={this.func}
          category={this.state.category}
          search={this.search}
        />
        <News category={this.state.category} search={this.state.search} />
      </>
    );
  }
}

export default App;
