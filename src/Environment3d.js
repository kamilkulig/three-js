import * as THREE from "three";
import Stats from 'stats-js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

import {getRandomElement, getRandomNumber} from './utils.js';
import RESOURCES from './resources.js';

class Environment3d {
  constructor(mount) {
    this.mount = mount; // rendering container
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 3000 );
    this.camera.position.set(75, 20, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // disable for better performance
      powerPreference: "high-performance",
    });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    this.mount.appendChild( this.renderer.domElement );

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', () => {
      onWindowResize();
    }, false);

    const animate = () => {
      requestAnimationFrame( animate );
      this.renderer.render( this.scene, this.camera );
      this.stats.update();
    };
    this.createStats();
    this.createOrbitControls();
    this.createLights();
    this.createSky();
    this.createGroundPlane();
    this.createPlants(this.scene);
    this.createFog();
    animate();
  }


  createOrbitControls() {
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.target.set(0, 0, 0);
    this.orbitControls.update();
  }

  createStats() {
    this.stats = new Stats();
    this.stats.setMode(0);

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.bottom = '0px';
    this.stats.domElement.style.top = ''; // has to be set in order to let bottom to work


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
      new THREE.SphereGeometry(500, 32, 32),
      new THREE.MeshBasicMaterial({
          color: getRandomElement(RESOURCES.skyColors),
          side: THREE.BackSide,
      })
    );
    this.scene.add(sky);
  }

  createGroundPlane() {
    const floorTexture = new THREE.TextureLoader().load( "./resources/" +  getRandomElement(RESOURCES.floor));
    debugger;
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

  createFog() {
    //  TODO: create advanced fog -> threeCoponents/Fog
      this.scene.fog = new THREE.Fog(getRandomElement(RESOURCES.skyColors), 0.0, 400.0);
    
  }



  createPlants(parent) {
    const fbxLoader = new FBXLoader();
    fbxLoader.setPath('resources/');
    RESOURCES.plants.forEach((filename) => {
      fbxLoader.load(filename, (fbx) => {
        fbx.scale.setScalar(getRandomNumber(0.02, 0.1));
        fbx.traverse(c => {
          c.castShadow = true;
          c.receiveShadow = true;
          
        });
        fbx.position.set(getRandomNumber(-50, 50), 0, getRandomNumber(-50, 50));
        fbx.rotation.y = getRandomNumber(0, 2 * Math.PI);
        parent.add(fbx);            
      });
    });
  }
  
}

export default Environment3d;
