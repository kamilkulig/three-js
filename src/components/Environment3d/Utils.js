import * as THREE from "three";
import Constants from "./Constants";

export function createMaterial() {
  const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
  });

  const hue = Math.random();
  const saturation = Constants.material.saturation;
  const luminance = Constants.material.luminance;
  material.color.setHSL(hue, saturation, luminance);

  return material;
}

/*
from: https://github.com/mrdoob/three.js/blob/b8d8a8625465bd634aa68e5846354d69f34d2ff5/examples/js/ParametricGeometries.js

The MIT License

Copyright © 2010-2018 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
export function klein(v, u, target) {
  u *= Math.PI;
  v *= 2 * Math.PI;
  u = u * 2;

  let x;
  let z;

  if (u < Math.PI) {
    x =
      3 * Math.cos(u) * (1 + Math.sin(u)) +
      2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
    z =
      -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
  } else {
    x =
      3 * Math.cos(u) * (1 + Math.sin(u)) +
      2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
    z = -8 * Math.sin(u);
  }

  const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

  target.set(x, y, z).multiplyScalar(0.75);
}

export function oscillateScale(obj) {
  const currentScale = obj.scale.x;

  if (!obj.rescaleDirection) {
    obj.rescaleDirection = Constants.rescale.direction.grow;
  }

  if (
    obj.rescaleDirection === Constants.rescale.direction.grow &&
    currentScale > Constants.rescale.maxScale
  ) {
    obj.rescaleDirection = Constants.rescale.direction.shrink;
  } else if (
    obj.rescaleDirection === Constants.rescale.direction.shrink &&
    currentScale < Constants.rescale.minScale
  ) {
    obj.rescaleDirection = Constants.rescale.direction.grow;
  }

  const scaleChange = Constants.rescale.scaleChange;
  const newScale =
    currentScale +
    scaleChange *
      (obj.rescaleDirection === Constants.rescale.direction.grow ? 1 : -1);

  obj.scale.set(newScale, newScale, newScale);
}
