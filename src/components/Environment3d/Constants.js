export default {
  colors: {
    white: 0xffffff,
  },

  camera: {
    fov: 40,
    aspect: 2,
    near: 0.1,
    far: 100,

    initialPos: {
      x: -34.2007125993641,
      y: -0.15595484033965595,
      z: 33.76813491715959,
    },
  },

  icosahedron: {
    radius: 7,
    initialPos: {
      x: -1,
      y: 1,
    },
    speed: 0.1,
  },

  light: {
    initialPos: {
      x: -1,
      y: 4,
      z: 2,
    },
    intensity: 1,
  },

  material: {
    saturation: 1,
    luminance: 0.5,
  },

  rescale: {
    direction: {
      grow: "GROW",
      shrink: "SHRINK",
    },
    maxScale: 2,
    minScale: 0.5,
    scaleChange: 0.01,
  },

  objectSpread: 15,
};
