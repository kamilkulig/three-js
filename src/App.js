import React, { Component } from "react";
import Environment3d from "./components/Environment3d/Environment3d";
import './App.css';
import Header from "./components/Header";

class App extends Component {
  componentDidMount() {
     window.environment3d = new Environment3d(this.mount);
  }
  render() {
    return (
      <>
        <Header></Header>
        <div className='threeContainer' ref={ref => (this.mount = ref)} />
      </>
    )
  }
  
}

export default App;
