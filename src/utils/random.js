export function createSeededRandom(seed = 1) {
  return () => {
    const next = (seed * 1664525 + 1013904223) % 4294967296;
    seed = next;
    return next / 4294967296;
  };
}
