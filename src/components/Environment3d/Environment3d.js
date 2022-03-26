import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Colors } from '../../utils/colors';
import { createMaterial, klein } from './Utils';

import {ParametricGeometry} from '../../geometries/ParametricGeometry.js';
import AsyncFontLoader from './AsyncFontLoader';

class Environment3d {
  constructor(mount) {
    // TODO: move most of the code to separate files


    this.mount = mount; 




    let stats;

    function createLight() {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        return light;
    }

    function createCamera() {
      const fov = 40;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 1000;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(-34.2007125993641, 33.76813491715959,-0.15595484033965595);
      window.camera = camera; // for debugging purposes
      return camera;
    }

    function oscillateScale(obj, time) {
      const currentScale = obj.scale.x;

      if(!obj.rescaleDirection) {
        obj.rescaleDirection = 'GROW';
      }
      
      const scaleChange = time / 1000;
      const newScale = currentScale + scaleChange;

      obj.scale.set( newScale, newScale, newScale);
    }



    function main() {



      const container = document.createElement( 'div' );
      document.body.appendChild( container );
      const renderer = new THREE.WebGLRenderer();
      container.appendChild( renderer.domElement );

      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.shadowMap.enabled = true;
    
      // stats
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = 'calc(100% - 80px)';
      stats.domElement.style.bottom = '0';
      container.appendChild( stats.dom );

      const camera = createCamera();

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.target.set( 0, 0, 0 );
      controls.update();
    
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      const light = createLight();
      scene.add(light);

      const objects = [];
      const spread = 15;
    
      function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;
    
        scene.add(obj);
        window.primitive = obj;
        objects.push(obj);
      }
    
      function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
      }
    
      function addLineGeometry(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0x000000});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
      }
    
    
      // {
      //   const radius = 7;
      //   addSolidGeometry(2, 2, new THREE.DodecahedronGeometry(radius));
      // }

      {
        const radius = 7;
        addSolidGeometry(-1, 1, new THREE.IcosahedronGeometry(radius));
      }
      
      // {
      //   const verticesOfCube = [
      //       -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
      //       -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
      //   ];
      //   const indicesOfFaces = [
      //       2, 1, 0,    0, 3, 2,
      //       0, 4, 7,    7, 3, 0,
      //       0, 1, 5,    5, 4, 0,
      //       1, 2, 6,    6, 5, 1,
      //       2, 3, 7,    7, 6, 2,
      //       4, 5, 6,    6, 7, 4,
      //   ];
      //   const radius = 7;
      //   const detail = 2;
      //   addSolidGeometry(-1, 0, new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, radius, detail));
      // }
      
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
    
      function render(time) {
        time *= 0.001; // in ms
    
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
    
        objects.forEach((obj, i) => {
          const speed = .1 + i * .05;
          oscillateScale(obj, time);
          const rot = time * speed;
          obj.rotation.x = rot;
          obj.rotation.y = rot;
        });
    
        controls.update();
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
        stats.update();

      }
    
      requestAnimationFrame(render);

    }
    
    main();


  }
}

export default Environment3d;
