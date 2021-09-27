import * as THREE from "three";
import Stats from 'stats-js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {getRandomElement, getRandomNumber} from './utils.js';
import RESOURCES from './resources.js';

class Environment3d {
  constructor(mount) {
    this.mount = mount; // rendering container
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 300 );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // disable for better performance
      powerPreference: "high-performance",
    });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
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
    this.createOrbitControls();
    this.createLights();
    this.createSky();
    this.createGroundPlane();
    animate();
  }


  createOrbitControls() {
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.target.set(0, 20, 0);
    this.orbitControls.update();
  }

  createStats() {
    this.stats = new Stats();
    this.stats.setMode(0);

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0';
    this.stats.domElement.style.top = '0';

    this.mount.appendChild( this.stats.domElement );
  }

  createLights() {
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    directionalLight.position.set(20, 100, 10);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = -0.001;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 500.0;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500.0;
    directionalLight.shadow.camera.left = 100;
    directionalLight.shadow.camera.right = -100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    this.scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x101010);
    this.scene.add(ambientLight);
  }

  createSky() {
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(200, 32, 32),
      new THREE.MeshBasicMaterial({
          color: getRandomElement(RESOURCES.skyColors),
          side: THREE.BackSide,
      })
    );
    this.scene.add(sky);
  }

  createGroundPlane() {
    const floorTexture = new THREE.TextureLoader().load( "./resources/" +  getRandomElement(RESOURCES.floor));
    floorTexture.wrapS = THREE.RepeatWrapping; 
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 20, 20 ); 
    const  material = new THREE.MeshStandardMaterial({ map : floorTexture });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 1000, 1000), material);

    plane.material.side = THREE.DoubleSide;
    plane.castShadow = true;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this.scene.add(plane);
  }
  
}

export default Environment3d;
