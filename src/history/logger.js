export function logAction(type, data = {}) {
  return { type, data, timestamp: Date.now() };
}
