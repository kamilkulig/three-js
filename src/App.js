import React, { Component } from "react";
import Environment3d from "./Environment3d";

class App extends Component {
  componentDidMount() {
    window.environment3d = new Environment3d(this.mount);
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
  
}

export default App;
