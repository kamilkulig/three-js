import {FontLoader} from '../../loaders/FontLoader.js';
import {TextGeometry} from '../../geometries/TextGeometry.js';

const AsyncFontLoader = (callback) => {
    const loader = new FontLoader();
    // promisify font loading
    function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }
    
    async function doit() {
      const font = await loadFont('resources/fonts/helvetiker_regular.typeface.json');  /* threejs.org: url */
      const geometry = new TextGeometry('three.js', {
        font: font,
        size: 3.0,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: .3,
        bevelSegments: 5,
      });

      callback(geometry);
    }
    doit();
}

export default AsyncFontLoader;