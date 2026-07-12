export function createEngine() {
  return {
    running: false,
    tick() {
      return { ok: true };
    }
  };
}
