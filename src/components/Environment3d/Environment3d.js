import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
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

      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.z = 2;
      camera.position.y = 5;
      camera.position.x = 5;
      window.camera = camera; // for debugging purposes


      scene = new THREE.Scene();
      scene.background = new THREE.Color( Colors.WHITE );
      //scene.fog = new THREE.Fog( Colors.BLACK, 200, 1000 );

      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
      hemiLight.position.set( 0, 200, 0 );
      scene.add( hemiLight );

      // const dirLight = new THREE.DirectionalLight( 0xffffff );
      // dirLight.position.set( 0, 200, 100 );
      // dirLight.castShadow = true;
      // dirLight.shadow.camera.top = 180;
      // dirLight.shadow.camera.bottom = - 100;
      // dirLight.shadow.camera.left = - 120;
      // dirLight.shadow.camera.right = 120;
      // scene.add( dirLight );


      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.shadowMap.enabled = true;
      container.appendChild( renderer.domElement );

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.target.set( 0, 0, 0 );
      controls.update();

      window.addEventListener( 'resize', onWindowResize );

      // stats
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = 'calc(100% - 80px)';
      stats.domElement.style.bottom = '0';
      container.appendChild( stats.dom );




      const objects = [];
      const spread = 15;
       
      function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;
       
        scene.add(obj);
        objects.push(obj);
      }


      function createMaterial() {
        const material = new THREE.MeshPhongMaterial({
          side: THREE.DoubleSide,
        });
       
        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance);
       
        return material;
      }

      function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
      }


      const width = 8;
      const height = 8;
      const depth = 8;
      addSolidGeometry(-2, -2, new THREE.BoxGeometry(width, height, depth));



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
