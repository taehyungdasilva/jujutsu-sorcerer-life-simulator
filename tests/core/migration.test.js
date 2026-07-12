const test = require('node:test');
const assert = require('node:assert/strict');

const { migrateSave, migrations } = require('../../src/core/migration/migrations');

test('migrates a v4-style save to the current save shape', () => {
  const legacyState = {
    player: {
      name: 'Yuji',
      originId: 'standard',
      level: 3,
      grade: 2,
      xp: 120,
      xpToNextLevel: 200,
      strength: 8,
      agility: 7,
      intelligence: 6,
      unspentPoints: 2,
      hp: 90,
      maxHp: 100,
      curseEnergy: 50,
      maxCurseEnergy: 100,
      stamina: 20,
      maxStamina: 30,
      techniqueId: 'black_flash',
      knownTechniqueIds: ['basic'],
      unlockedSkills: ['focus'],
      money: 150,
      inventory: ['bandage'],
      equippedWeaponId: 'stick',
      equippedAccessoryId: null,
      enemiesDefeated: 4,
      quests: { intro: { status: 'active', progress: 1 } },
      combatPosture: 'neutral',
      blackFlashPeakUntil: null,
      alive: true,
      bonds: { gojo: { trust: 4, tier: 2 } },
      calendarDate: { year: 1, month: 1, day: 1, timeOfDay: 'morning' },
      season: 'spring',
      dayCount: 3,
      currentLayerId: 'school',
      currentLocationId: 'classroom',
      timeRemaining: 8,
      maxTimePerDay: 10
    }
  };

  const migrated = migrateSave(legacyState, 4);

  assert.equal(migrated.version, 9);
  assert.ok(migrated.character);
  assert.ok(migrated.world);
  assert.ok(migrated.relationships.gojo);
  assert.deepEqual(migrated.events.activeEvents, []);
  assert.deepEqual(migrated.actionLog, []);
  assert.deepEqual(migrated.achievements.unlocked, []);
});

test('migration registry exposes all planned version steps', () => {
  assert.equal(typeof migrations[5], 'function');
  assert.equal(typeof migrations[6], 'function');
  assert.equal(typeof migrations[7], 'function');
  assert.equal(typeof migrations[8], 'function');
  assert.equal(typeof migrations[9], 'function');
});

test('unknown versions are handled gracefully', () => {
  assert.doesNotThrow(() => migrateSave({ version: 999 }, 999));
});
