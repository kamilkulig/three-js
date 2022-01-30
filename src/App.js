import React, { Component } from "react";
import Environment3d from "./components/Environment3d/Environment3d";
import Logo from './components/Logo'
import './App.css';

class App extends Component {
  componentDidMount() {
    //  window.environment3d = new Environment3d(this.mount);
  }
  render() {
    return (
      <div style={{
        'background-image': 'url(resources/mock/3d.jpg)',
        'background-size': 'contain',
        width: '100vw',
        height: '100vh',
      }}>
        test
        {/* <div className='threeContainer' ref={ref => (this.mount = ref)} /> */}
        {/* <Logo /> */}
      </div>
    )
  }
  
}

export default App;
