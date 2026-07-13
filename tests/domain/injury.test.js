const test = require('node:test');
const assert = require('node:assert/strict');

const { applyInjuryToState, advanceInjuries, recoverInjuries, getActiveInjuries } = require('../../src/domain/character/injury.js');

test('applyInjuryToState reduces health and adds an injury entry', () => {
  const state = { health: 100, injuries: [] };

  applyInjuryToState(state, {
    name: 'Rasgo muscular',
    severity: 12,
    description: 'O treino foi demais para o seu corpo.',
    remainingDays: 3
  });

  assert.equal(state.health, 88);
  assert.equal(getActiveInjuries(state).length, 1);
  assert.equal(getActiveInjuries(state)[0].name, 'Rasgo muscular');
});

test('advanceInjuries removes expired injuries and recoverInjuries heals health', () => {
  const state = {
    health: 100,
    injuries: [
      { id: 'a', name: 'Lesão leve', severity: 6, remainingDays: 1, description: '...' },
      { id: 'b', name: 'Lesão intensa', severity: 10, remainingDays: 2, description: '...' }
    ]
  };

  advanceInjuries(state);
  assert.equal(getActiveInjuries(state).length, 1);

  recoverInjuries(state, 1);
  assert.equal(state.health, 100);
  assert.equal(getActiveInjuries(state)[0].name, 'Lesão intensa');
});
