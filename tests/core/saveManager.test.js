const test = require('node:test');
const assert = require('node:assert/strict');

const { createGameSaveManager } = require('../../src/core/saveManager');
const { createGameStore } = require('../../src/state/gameStore');

function createMemoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
    clear() {
      data.clear();
    }
  };
}

test('save manager persists payloads in a versioned envelope', () => {
  const storage = createMemoryStorage();
  const manager = createGameSaveManager(storage);

  manager.saveState('run', { day: 3, alive: true, playtime: 120 });

  const serialized = storage.getItem('jujutsu-save-run');
  assert.ok(serialized);

  const parsed = JSON.parse(serialized);
  assert.equal(parsed.version, 1);
  assert.equal(typeof parsed.savedAt, 'number');
  assert.equal(parsed.playtime, 120);
  assert.equal(typeof parsed.checksum, 'string');
  assert.equal(parsed.payload.day, 3);
  assert.equal(parsed.payload.alive, true);
  const loaded = manager.loadState('run');
  assert.equal(loaded.day, 3);
  assert.equal(loaded.alive, true);
  assert.equal(loaded.playtime, 120);
  assert.deepEqual(loaded.actionLog, []);
  assert.deepEqual(loaded.eventHistory, []);
});

test('save manager rejects tampered saves', () => {
  const storage = createMemoryStorage();
  const manager = createGameSaveManager(storage);

  manager.saveState('run', { day: 2, alive: false });

  const serialized = storage.getItem('jujutsu-save-run');
  const parsed = JSON.parse(serialized);
  parsed.payload.day = 99;
  storage.setItem('jujutsu-save-run', JSON.stringify(parsed));

  assert.equal(manager.loadState('run'), null);
});

test('store updates subscribers and accepts functional updates', () => {
  const store = createGameStore({ count: 0, log: [] });
  let latest;

  const unsubscribe = store.subscribe((state) => {
    latest = state;
  });

  store.setState((state) => ({ count: state.count + 1, log: [...state.log, 'tick'] }));

  assert.equal(latest.count, 1);
  assert.deepEqual(latest.log, ['tick']);

  unsubscribe();
});
