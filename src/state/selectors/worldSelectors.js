export function selectCurrentLocation(state) {
  return state.world?.currentLocation || 'unknown';
}
