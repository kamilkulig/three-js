import React, { Component } from "react";
import Environment3d from "./components/Environment3d/Environment3d";
import Header from './components/Header'
import './App.css';

class App extends Component {
  componentDidMount() {
     window.environment3d = new Environment3d(this.mount);
  }
  render() {
    return (
      <div style={{
        // 'background-image': 'url(resources/mock/3d.jpg)',
        // 'background-size': 'contain',
        // 'background-repeat': 'no-repeat',
        // width: '100vw',
        // height: '100vh',
      }}>
        <div className='threeContainer' ref={ref => (this.mount = ref)} />
        <Header />
      </div>
    )
  }
  
}

export default App;
