export function selectCharacterName(state) {
  return state.character?.name || 'Unknown';
}
