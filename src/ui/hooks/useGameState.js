export function useGameState(store) {
  return store?.state || {};
}
