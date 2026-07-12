const test = require('node:test');
const assert = require('node:assert/strict');
const { createGameStore } = require('../../src/state/store');

test('state store supports slices, selectors, and action-based updates', () => {
  const store = createGameStore({
    character: { name: 'Yuji', level: 1, attributes: { strength: 1, agility: 1, intelligence: 1 } },
    world: { currentLocation: 'Tokyo', timeRemaining: 10 },
    relationships: {},
    events: []
  });

  store.setCharacter({ name: 'Yuuji', level: 2 });
  store.advanceTime(2);
  store.updateRelationship('gojo', 3);

  assert.equal(store.getState().character.name, 'Yuuji');
  assert.equal(store.getState().character.level, 2);
  assert.equal(store.getState().world.timeRemaining, 8);
  assert.equal(store.getState().relationships.gojo.trust, 3);
  assert.equal(store.getState().selectors.characterLevel(store.getState()), 2);
  assert.equal(store.getState().selectors.currentLocation(store.getState()), 'Tokyo');
});
