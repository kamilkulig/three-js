import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { createMaterial, oscillateScale } from "./Utils";
import Constants from "./Constants";

import { ParametricGeometry } from "../../geometries/ParametricGeometry.js";
import AsyncFontLoader from "./AsyncFontLoader";
import { GUI } from 'dat.gui'


// TODO: add DAT.GUI

class Environment3d {
  constructor(mount) {
    this.mount = mount;

    function createFloor() {
      const geometry = new THREE.PlaneGeometry(Constants.floor.size, Constants.floor.size);

      const material = new THREE.MeshBasicMaterial({
        color: Constants.colors.green,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI / 2;

      return mesh;
    }

    function createLight() {
      const color = Constants.colors.white;
      const light = new THREE.DirectionalLight(
        color,
        Constants.light.intensity
      );
      light.position.set(
        Constants.light.initialPos.x,
        Constants.light.initialPos.y,
        Constants.light.initialPos.z,
      );
      return light;
    }

    // TODO: convert numbers so that everything is in meters
    function createFog() {
      return new THREE.Fog(Constants.colors.blue, 1, 1000);
    }

    function createStats() {
      const stats = new Stats();
      stats.domElement.style.position = "absolute";

      return stats;
    }

    function createCamera() {
      const camera = new THREE.PerspectiveCamera(
        Constants.camera.fov,
        Constants.camera.aspect,
        Constants.camera.near,
        Constants.camera.far
      );
      camera.position.set(
        Constants.camera.initialPos.x,
        Constants.camera.initialPos.y,
        Constants.camera.initialPos.z,

      );
      window.camera = camera; // for debugging purposes
      return camera;
    }

    function main() {
      const container = document.createElement("div");
      document.body.appendChild(container);
      const renderer = new THREE.WebGLRenderer();
      container.appendChild(renderer.domElement);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      const stats = createStats();
      container.appendChild(stats.dom);

      const camera = createCamera();

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(Constants.icosahedron.initialPos.x, Constants.icosahedron.initialPos.y, Constants.icosahedron.initialPos.z);
      controls.update();

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(Constants.colors.blue);
      const light = createLight();
      scene.add(light);

      const fog =  createFog();
      scene.fog =fog;

      const floor = createFloor();
      scene.add(floor);

      window.fog = fog;
      const objects = [];
      const spread = Constants.objectSpread;

      const gui = new GUI()
      const fogFolder = gui.addFolder('Fog')
      fogFolder.add(fog, 'far', 0, 1000)
      fogFolder.open()



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
        const material = new THREE.LineBasicMaterial({
          color: Constants.colors.white,
        });
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
      }

      addSolidGeometry(
        Constants.icosahedron.initialPos.x,
        Constants.icosahedron.initialPos.y,
        new THREE.IcosahedronGeometry(Constants.icosahedron.radius)
      );

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
          const speed = Constants.icosahedron.speed;
          oscillateScale(obj);
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
