const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..');

const requiredResponsibilities = [
  'src/core/engine.js',
  'src/core/eventBus.js',
  'src/core/saveManager.js',
  'src/core/migration/migrations.js',
  'src/domain/character/attributes.js',
  'src/domain/character/progression.js',
  'src/domain/social/relationship.js',
  'src/domain/events/event.js',
  'src/domain/combat/combat.js',
  'src/domain/inventory/item.js',
  'src/state/store.js',
  'src/state/selectors/characterSelectors.js',
  'src/state/actions/worldActions.js',
  'src/ui/layout/AppLayout.js',
  'src/ui/screens/character/CharacterScreen.js',
  'src/history/logger.js',
  'src/utils/validation.js'
];

test('file responsibilities scaffold exists for the main architecture layers', () => {
  for (const relativePath of requiredResponsibilities) {
    const fullPath = path.join(root, relativePath);
    assert.ok(fs.existsSync(fullPath), `Missing responsibility module: ${relativePath}`);
  }
});
