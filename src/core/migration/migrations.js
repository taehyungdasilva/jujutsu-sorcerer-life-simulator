(function(root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.migrateSave = api.migrateSave;
  root.migrations = api.migrations;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  const CURRENT_VERSION = 9;

  function migrateCharacterV4ToV5(player) {
    return {
      id: player.name,
      name: player.name,
      originId: player.originId || 'standard',
      createdAt: Date.now(),
      level: player.level || 1,
      grade: player.grade || 1,
      xp: player.xp || 0,
      xpToNextLevel: player.xpToNextLevel || 100,
      attributes: {
        strength: player.strength || 0,
        agility: player.agility || 0,
        intelligence: player.intelligence || 0
      },
      unspentPoints: player.unspentPoints || 0,
      hp: player.hp || 100,
      maxHp: player.maxHp || 100,
      curseEnergy: player.curseEnergy || 0,
      maxCurseEnergy: player.maxCurseEnergy || 100,
      stamina: player.stamina || 0,
      maxStamina: player.maxStamina || 30,
      techniqueId: player.techniqueId || null,
      knownTechniqueIds: player.knownTechniqueIds || [],
      unlockedSkills: player.unlockedSkills || [],
      money: player.money || 0,
      inventory: player.inventory || [],
      equippedWeaponId: player.equippedWeaponId || null,
      equippedAccessoryId: player.equippedAccessoryId || null,
      enemiesDefeated: player.enemiesDefeated || 0,
      quests: player.quests || {},
      combatPosture: player.combatPosture || 'neutral',
      blackFlashPeakUntil: player.blackFlashPeakUntil || null,
      alive: player.alive !== false
    };
  }

  function migrateWorldV4ToV5(player) {
    return {
      currentTick: 0,
      calendarDate: player.calendarDate || { year: 1, month: 1, day: 1, timeOfDay: 'morning' },
      season: player.season || 'spring',
      dayCount: player.dayCount || 1,
      currentLayerId: player.currentLayerId || 'school',
      currentLocationId: player.currentLocationId || 'classroom',
      timeRemaining: player.timeRemaining || 10,
      maxTimePerDay: player.maxTimePerDay || 10
    };
  }

  function migrateRelationshipsV8ToV9(relationships = {}) {
    return Object.entries(relationships).reduce((acc, [npcId, bond]) => {
      acc[npcId] = {
        ...(bond || {}),
        dialogueIndex: bond?.dialogueIndex ?? 0,
        lastVisited: bond?.lastVisited ?? Date.now()
      };
      return acc;
    }, {});
  }

  const migrations = {
    5: (state) => {
      const player = state?.player || {};
      return {
        version: 5,
        savedAt: state?.savedAt || Date.now(),
        playtime: state?.playtime || 0,
        checksum: state?.checksum || '',
        character: migrateCharacterV4ToV5(player),
        world: migrateWorldV4ToV5(player),
        relationships: player.bonds || {},
        events: {
          activeEvents: [],
          triggeredEvents: [],
          completedEvents: [],
          blockedEvents: []
        },
        actionLog: [],
        eventHistory: [],
        achievements: {
          unlocked: [],
          progress: {},
          lastNotified: null
        },
        settings: state?.settings || {},
        flags: state?.flags || {}
      };
    },
    6: (state) => ({
      ...state,
      version: 6,
      events: {
        ...(state?.events || {}),
        activeEvents: state?.events?.activeEvents || [],
        triggeredEvents: state?.events?.triggeredEvents || [],
        completedEvents: state?.events?.completedEvents || [],
        blockedEvents: state?.events?.blockedEvents || []
      }
    }),
    7: (state) => ({
      ...state,
      version: 7,
      actionLog: state?.actionLog || [],
      eventHistory: state?.eventHistory || [],
      achievements: {
        unlocked: state?.achievements?.unlocked || [],
        progress: state?.achievements?.progress || {},
        lastNotified: state?.achievements?.lastNotified || null
      }
    }),
    8: (state) => ({
      ...state,
      version: 8,
      character: {
        ...state.character,
        traits: state?.character?.traits || []
      }
    }),
    9: (state) => ({
      ...state,
      version: 9,
      relationships: migrateRelationshipsV8ToV9(state?.relationships || {})
    })
  };

  function migrateSave(persistedState, version = 1) {
    if (!persistedState || typeof version !== 'number' || version >= CURRENT_VERSION) {
      if (persistedState && typeof persistedState === 'object') {
        return {
          version: CURRENT_VERSION,
          savedAt: persistedState.savedAt || Date.now(),
          playtime: persistedState.playtime || 0,
          checksum: persistedState.checksum || '',
          character: persistedState.character || {},
          world: persistedState.world || {},
          relationships: persistedState.relationships || {},
          events: persistedState.events || {
            activeEvents: [],
            triggeredEvents: [],
            completedEvents: [],
            blockedEvents: []
          },
          actionLog: persistedState.actionLog || [],
          eventHistory: persistedState.eventHistory || [],
          achievements: persistedState.achievements || {
            unlocked: [],
            progress: {},
            lastNotified: null
          },
          settings: persistedState.settings || {},
          flags: persistedState.flags || {}
        };
      }
      return {
        version: CURRENT_VERSION,
        savedAt: Date.now(),
        playtime: 0,
        checksum: '',
        character: {},
        world: {},
        relationships: {},
        events: {
          activeEvents: [],
          triggeredEvents: [],
          completedEvents: [],
          blockedEvents: []
        },
        actionLog: [],
        eventHistory: [],
        achievements: {
          unlocked: [],
          progress: {},
          lastNotified: null
        },
        settings: {},
        flags: {}
      };
    }

    let current = persistedState;
    for (let step = version + 1; step <= CURRENT_VERSION; step += 1) {
      if (migrations[step]) {
        current = migrations[step](current);
      }
    }
    return current;
  }

  return {
    CURRENT_VERSION,
    migrations,
    migrateSave
  };
});
