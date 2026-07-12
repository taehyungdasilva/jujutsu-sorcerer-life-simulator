const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..');

const requiredPaths = [
  'src/core/engine.js',
  'src/core/eventBus.js',
  'src/core/migration/migrations.js',
  'src/domain/world/timeline.js',
  'src/domain/world/location.js',
  'src/domain/world/layer.js',
  'src/domain/character/character.js',
  'src/domain/character/origin.js',
  'src/domain/character/attributes.js',
  'src/domain/character/progression.js',
  'src/domain/social/relationship.js',
  'src/domain/social/npc.js',
  'src/domain/social/dialogue.js',
  'src/domain/events/event.js',
  'src/domain/events/trigger.js',
  'src/domain/events/condition.js',
  'src/domain/events/effect.js',
  'src/domain/combat/combat.js',
  'src/domain/combat/enemy.js',
  'src/domain/combat/ai.js',
  'src/domain/inventory/item.js',
  'src/domain/inventory/equipment.js',
  'src/domain/inventory/crafting.js',
  'src/data/origins/standard.json',
  'src/state/store.js',
  'src/state/slices/characterSlice.js',
  'src/state/slices/worldSlice.js',
  'src/state/slices/socialSlice.js',
  'src/state/slices/eventSlice.js',
  'src/state/selectors/characterSelectors.js',
  'src/state/selectors/worldSelectors.js',
  'src/state/actions/characterActions.js',
  'src/state/actions/worldActions.js',
  'src/ui/layout/AppLayout.js',
  'src/ui/layout/Header.js',
  'src/ui/layout/Sidebar.js',
  'src/ui/screens/character/CharacterScreen.js',
  'src/ui/screens/world/WorldScreen.js',
  'src/ui/screens/social/SocialScreen.js',
  'src/ui/screens/events/EventScreen.js',
  'src/ui/components/common/Panel.js',
  'src/ui/components/character/CharacterCard.js',
  'src/ui/components/world/WorldCard.js',
  'src/ui/hooks/useGameState.js',
  'src/ui/hooks/useTime.js',
  'src/ui/hooks/useEvents.js',
  'src/history/logger.js',
  'src/history/timeline.js',
  'src/history/achievements.js',
  'src/utils/format.js',
  'src/utils/random.js',
  'src/utils/validation.js',
  'src/utils/performance.js',
  'src/types/core.js',
  'src/types/domain.js',
  'src/types/state.js',
  'src/types/ui.js',
  'src/config/gameConstants.js',
  'src/config/balance.js',
  'src/config/features.js',
  'src/main.tsx'
];

test('architecture folder structure scaffold exists', () => {
  for (const relativePath of requiredPaths) {
    const fullPath = path.join(root, relativePath);
    assert.ok(fs.existsSync(fullPath), `Missing expected scaffold: ${relativePath}`);
  }
});
