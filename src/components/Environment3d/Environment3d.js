import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Colors } from '../../utils/colors';

class Environment3d {
  constructor(mount) {
    this.mount = mount; // rendering container



    let camera, scene, renderer, stats;

    const clock = new THREE.Clock();

    let mixer;

    init();
    animate();

    function init() {

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
      window.camera = camera; // for debugging purposes
      camera.position.set(
        -229.7125902247501,
        114.1736637719915,
        80.44154890605155
      );
      
      console.log(camera);

      scene = new THREE.Scene();
      scene.background = new THREE.Color( Colors.BLACK );
      scene.fog = new THREE.Fog( Colors.BLACK, 200, 1000 );

      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
      hemiLight.position.set( 0, 200, 0 );
      scene.add( hemiLight );

      const dirLight = new THREE.DirectionalLight( 0xffffff );
      dirLight.position.set( 0, 200, 100 );
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 180;
      dirLight.shadow.camera.bottom = - 100;
      dirLight.shadow.camera.left = - 120;
      dirLight.shadow.camera.right = 120;
      scene.add( dirLight );

      // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

      // ground
      const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
      mesh.rotation.x = - Math.PI / 2;
      mesh.receiveShadow = true;
      scene.add( mesh );

      const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      scene.add( grid );

      // model
      const loader = new FBXLoader();
      loader.load( 'resources/terrain/Terrain_1.fbx', function ( object ) {

        // mixer = new THREE.AnimationMixer( object );

        // const action = mixer.clipAction( object.animations[ 0 ] );
        // action.play();

        object.traverse( function ( child ) {

          if ( child.isMesh ) {

            child.castShadow = true;
            child.receiveShadow = true;

          }

        } );

        scene.add( object );

      } );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.shadowMap.enabled = true;
      container.appendChild( renderer.domElement );

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.target.set( 0, 100, 0 );
      controls.update();

      window.addEventListener( 'resize', onWindowResize );

      // stats
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = 'calc(100% - 80px)';
      stats.domElement.style.bottom = '0';
      container.appendChild( stats.dom );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

      requestAnimationFrame( animate );

      const delta = clock.getDelta();

      if ( mixer ) {
        mixer.update( delta );
      }

      renderer.render( scene, camera );

      stats.update();

    }

  }
}

export default Environment3d;
