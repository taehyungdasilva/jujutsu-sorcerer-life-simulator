export function seededRandom(seed) {
  let state = seed;
 
  return function() {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}
 
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
export function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}
