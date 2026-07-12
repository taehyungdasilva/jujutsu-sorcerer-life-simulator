export const migrations = {
  1: (state) => {
    // Version 1 is the initial version
    return state;
  },
 
  2: (state) => {
    // Future migration: add health system
    return {
      ...state,
      character: {
        ...state.character,
        health: state.character.health || 100,
        maxHealth: state.character.maxHealth || 100
      }
    };
  }
};
 
export function migrateSave(state, fromVersion) {
  let current = state;
 
  for (let v = fromVersion + 1; v <= Object.keys(migrations).length; v++) {
    if (migrations[v]) {
      current = migrations[v](current);
    }
  }
 
  return current;
}
 
export function getCurrentVersion() {
  return Object.keys(migrations).length;
}
