function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function createInjury(definition) {
  return {
    id: definition.id || `injury-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name: definition.name || 'Lesão',
    severity: definition.severity || 5,
    description: definition.description || 'Seu corpo precisa de descanso.',
    remainingDays: definition.remainingDays || 1
  };
}

function applyInjuryToState(state, definition) {
  const injury = createInjury(definition);
  state.health = clamp((state.health || 100) - injury.severity);
  state.injuries = [...(state.injuries || []), injury];
  return injury;
}

function advanceInjuries(state) {
  const nextInjuries = (state.injuries || [])
    .map((injury) => ({ ...injury, remainingDays: injury.remainingDays - 1 }))
    .filter((injury) => injury.remainingDays > 0);

  state.injuries = nextInjuries;
  return nextInjuries;
}

function recoverInjuries(state, amount = 10) {
  const healed = Math.max(0, amount);
  state.health = clamp((state.health || 100) + healed);
  return state.health;
}

function getActiveInjuries(state) {
  return state.injuries || [];
}

module.exports = {
  createInjury,
  applyInjuryToState,
  advanceInjuries,
  recoverInjuries,
  getActiveInjuries,
  clamp
};
