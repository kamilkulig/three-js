import React, { Component } from "react";
import Environment3d from "./Environment3d";
import './App.css';

class App extends Component {
  componentDidMount() {
    window.environment3d = new Environment3d(this.mount);
  }
  render() {
    return (
      <>
        <div className='threeContainer' ref={ref => (this.mount = ref)} />
        <div className='logo'>Some looooooooooooooooooooooooooooooooooooooooooong text</div>

      </>

    )
  }
  
}

export default App;
