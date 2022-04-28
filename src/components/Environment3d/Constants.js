export default {
  colors: {
    white: 0xffffff,
    blue: 0x90c1e8,
    green: 0xd5d98d,
  },

  camera: {
    fov: 40,
    aspect: 2,
    near: 0.1,
    far: 1000,

    initialPos: {
      x: 54.243670117534094,
      y: 32.64288185099514,
      z: 314.33919295694875,
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
