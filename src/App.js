import React, { Component } from "react";
import Environment3d from "./components/Environment3d/Environment3d";
import './App.css';
import Logo from './components/Logo/Logo';

class App extends Component {
  componentDidMount() {
    //window.environment3d = new Environment3d(this.mount);
  }
  render() {
    return (
      <div>
        {/* <div className='threeContainer' ref={ref => (this.mount = ref)} /> */}
        <div className='container'>
            <Logo
              title='Imperfect Designs'
              backgroundImageURL='url(https://media.istockphoto.com/vectors/symmetrycal-motley-hippie-trippy-psychedelic-abstract-pattern-with-vector-id1271341003)'
              fontSize='3rem'
              padding='1rem 2rem'
            />
            
        </div>
      </div>

    )
  }
  
}

export default App;
