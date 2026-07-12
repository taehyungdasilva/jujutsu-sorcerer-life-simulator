export function createEventBus() {
  const listeners = new Map();

  return {
    publish(event, payload) {
      const handlers = listeners.get(event) || [];
      handlers.forEach((handler) => handler(payload));
    },
    subscribe(event, handler) {
      const handlers = listeners.get(event) || [];
      handlers.push(handler);
      listeners.set(event, handlers);
      return () => {
        const next = (listeners.get(event) || []).filter((item) => item !== handler);
        listeners.set(event, next);
      };
    }
  };
}
