(function(root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.createGameStore = api.createGameStore;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  function createGameStore(initialState = {}) {
    const selectors = {
      characterLevel(currentState) {
        return currentState?.character?.level || 1;
      },
      currentLocation(currentState) {
        return currentState?.world?.currentLocation || 'Unknown';
      },
      relationshipTrust(currentState, npcId) {
        return currentState?.relationships?.[npcId]?.trust || 0;
      }
    };

    let state = {
      character: initialState.character || { name: 'Unknown', level: 1, attributes: { strength: 0, agility: 0, intelligence: 0 } },
      world: initialState.world || { currentLocation: 'Unknown', timeRemaining: 10 },
      relationships: initialState.relationships || {},
      events: initialState.events || [],
      selectors
    };

    function getState() {
      return state;
    }

    function setState(nextState) {
      state = { ...state, ...nextState };
      return state;
    }

    function setCharacter(character) {
      state = {
        ...state,
        character: { ...state.character, ...character }
      };
      return state;
    }

    function advanceTime(ticks = 1) {
      state = {
        ...state,
        world: {
          ...state.world,
          timeRemaining: Math.max(0, (state.world?.timeRemaining || 0) - ticks)
        }
      };
      return state;
    }

    function updateRelationship(npcId, delta) {
      const current = state.relationships?.[npcId] || { trust: 0 };
      state = {
        ...state,
        relationships: {
          ...state.relationships,
          [npcId]: {
            ...current,
            trust: current.trust + delta
          }
        }
      };
      return state;
    }

    return {
      getState,
      setState,
      setCharacter,
      advanceTime,
      updateRelationship,
      selectors
    };
  }

  return {
    createGameStore
  };
});
