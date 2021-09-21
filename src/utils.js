
export function getRandomElement(array) {
    return  array[Math.floor(Math.random() * array.length)];
  }
  
  export function getRandomNumber(from, to) {
    return from + Math.random() * (to - from);
  }
  