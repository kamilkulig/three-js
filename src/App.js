import React, { Component } from "react";
import * as THREE from "three";
import Stats from 'stats-js';

class App extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // disable for better performance
      powerPreference: "high-performance",
    });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.mount.appendChild( this.renderer.domElement );
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
    this.camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      this.renderer.render( this.scene, this.camera );
      this.stats.update();

    };
    this.createStats();
    animate();
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }

  createStats() {
    this.stats = new Stats();
    this.stats.setMode(0);

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0';
    this.stats.domElement.style.top = '0';

    this.mount.appendChild( this.stats.domElement );
  }
}

export default App;
