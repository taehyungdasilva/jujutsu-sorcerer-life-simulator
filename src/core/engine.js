export function createEngine(store, eventBus) {
  let running = false;
  let tickInterval = null;
 
  function tick() {
    if (!running) return { ok: false };
 
    // Get current state
    const state = store.getState();
 
    // Advance time
    store.advanceTime(1);
 
    // Emit tick event
    eventBus.publish('tick', { timestamp: Date.now() });
 
    return { ok: true, state: store.getState() };
  }
 
  function start(intervalMs = 1000) {
    if (running) return { ok: false, error: 'Already running' };
 
    running = true;
    tickInterval = setInterval(tick, intervalMs);
 
    eventBus.publish('engine:start', { intervalMs });
 
    return { ok: true };
  }
 
  function stop() {
    if (!running) return { ok: false, error: 'Not running' };
 
    running = false;
    if (tickInterval) {
      clearInterval(tickInterval);
      tickInterval = null;
    }
 
    eventBus.publish('engine:stop');
 
    return { ok: true };
  }
 
  return {
    get isRunning() { return running; },
    tick,
    start,
    stop
  };
}
