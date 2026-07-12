(function(root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.createGameStore = api.createGameStore;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  function createGameStore(initialState) {
    let state = initialState;
    const listeners = new Set();

    function getState() {
      return state;
    }

    function setState(update) {
      const next = typeof update === 'function' ? update(state) : update;
      state = { ...state, ...next };
      listeners.forEach((listener) => listener(state));
      return state;
    }

    function subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }

    return {
      getState,
      setState,
      subscribe
    };
  }

  return {
    createGameStore
  };
});
