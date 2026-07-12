# Migration Plan from Current HTML

## Current State Analysis

The current `index.html` is a minimal Vite entry point. The actual game logic lives in React components. Migration involves:

1. **Extracting state from components** to domain layer
2. **Moving static data** from TS files to JSON
3. **Implementing new systems** (events, history, timeline)
4. **Preserving existing saves** via migration

## Phase 1: Foundation (Week 1-2)

### Goal
Set up new architecture without breaking existing game

### Tasks

#### 1. Create folder structure
```
src/
├── core/
├── domain/
├── data/
├── state/
├── history/
├── ui/
├── utils/
├── types/
└── config/
```

#### 2. Extract domain logic
Move existing systems to domain layer:

| Current Location | New Location |
|-----------------|--------------|
| `src/systems/combat.ts` | `domain/combat/combat.ts` |
| `src/systems/bonds.ts` | `domain/social/relationship.ts` |
| `src/systems/leveling.ts` | `domain/character/progression.ts` |
| `src/systems/timeSystem.ts` | `domain/world/timeline.ts` |
| `src/systems/drops.ts` | `domain/inventory/item.ts` |
| `src/systems/encounter.ts` | `domain/events/trigger.ts` |
| `src/systems/equipmentStats.ts` | `domain/inventory/equipment.ts` |
| `src/systems/enemyAI.ts` | `domain/combat/ai.ts` |

#### 3. Convert static data to JSON
Move data files from TS to JSON:

| Current Location | New Location |
|-----------------|--------------|
| `src/data/techniques.ts` | `data/events/techniques.json` |
| `src/data/npcs.ts` | `data/npcs/masters/*.json` |
| `src/data/world.ts` | `data/locations/*.json` |
| `src/data/curses.ts` | `data/enemies/*.json` |
| `src/data/origins.ts` | `data/origins/*.json` |
| `src/data/quests.ts` | `data/quests/*.json` |
| `src/data/equipment.ts` | `data/items/*.json` |

Keep TS files for type definitions in `types/`.

#### 4. Implement state store
- Install Zustand: `npm install zustand`
- Create `state/store.ts` with current state shape
- Migrate `App.tsx` to use store instead of useState
- Update all components to use store hooks

### Migration: v4 → v5

**No data changes**, just structural reorganization.

```typescript
// core/migration/migrations.ts
export const migrations = {
  5: (state: any): SaveEnvelope => {
    return {
      version: 5,
      savedAt: state.savedAt || Date.now(),
      playtime: 0,
      checksum: '',
      character: migrateCharacterV4ToV5(state.player),
      world: migrateWorldV4ToV5(state.player),
      relationships: state.player.bonds || {},
      events: {
        activeEvents: [],
        triggeredEvents: [],
        completedEvents: [],
        blockedEvents: []
      },
      actionLog: [],
      eventHistory: [],
      achievements: {},
      settings: {},
      flags: {}
    }
  }
}

function migrateCharacterV4ToV5(player: any) {
  return {
    id: player.name,
    name: player.name,
    originId: player.originId,
    createdAt: Date.now(),
    level: player.level,
    grade: player.grade,
    xp: player.xp,
    xpToNextLevel: player.xpToNextLevel,
    attributes: {
      strength: player.strength,
      agility: player.agility,
      intelligence: player.intelligence
    },
    unspentPoints: player.unspentPoints,
    hp: player.hp,
    maxHp: player.maxHp,
    curseEnergy: player.curseEnergy,
    maxCurseEnergy: player.maxCurseEnergy,
    stamina: player.stamina,
    maxStamina: player.maxStamina,
    techniqueId: player.techniqueId,
    knownTechniqueIds: player.knownTechniqueIds || [],
    unlockedSkills: player.unlockedSkills || [],
    money: player.money,
    inventory: player.inventory || [],
    equippedWeaponId: player.equippedWeaponId,
    equippedAccessoryId: player.equippedAccessoryId,
    enemiesDefeated: player.enemiesDefeated,
    quests: player.quests || {},
    combatPosture: player.combatPosture,
    blackFlashPeakUntil: player.blackFlashPeakUntil,
    alive: player.alive
  }
}

function migrateWorldV4ToV5(player: any) {
  return {
    currentTick: 0,
    calendarDate: player.calendarDate,
    season: player.season,
    dayCount: player.dayCount,
    currentLayerId: player.currentLayerId,
    currentLocationId: player.currentLocationId,
    timeRemaining: player.timeRemaining,
    maxTimePerDay: player.maxTimePerDay
  }
}
```

### Verification
- Game loads existing saves
- All features work as before
- No data loss
- Build passes

---

## Phase 2: Event System (Week 3-4)

### Goal
Implement event system for hundreds of events

### Tasks

#### 1. Create event domain
- `domain/events/event.ts` - Event matching and execution
- `domain/events/trigger.ts` - Trigger conditions
- `domain/events/condition.ts` - Condition evaluation
- `domain/events/effect.ts` - Effect application

#### 2. Create event data structure
```typescript
interface Event {
  id: string
  name: string
  description: string
  category: 'daily' | 'story' | 'random' | 'seasonal'
  
  triggers: EventTrigger[]
  conditions: EventCondition[]
  effects: EventEffect[]
  
  choices?: EventChoice[]
  repeatable: boolean
  cooldown?: number
}
```

#### 3. Create event data files
- `data/events/daily/*.json` - Daily events
- `data/events/story/*.json` - Story events
- `data/events/random/*.json` - Random encounters
- `data/events/seasonal/*.json` - Seasonal events

#### 4. Wire to game loop
- Add event checking to `core/engine.ts`
- Add event state to store
- Create UI for event display
- Add event history tracking

### Migration: v5 → v6

**Add event state to save.**

```typescript
6: (state: SaveEnvelope): SaveEnvelope => {
  return {
    ...state,
    version: 6,
    events: {
      ...state.events,
      activeEvents: [],
      triggeredEvents: [],
      completedEvents: [],
      blockedEvents: []
    }
  }
}
```

### Verification
- Events trigger correctly
- Event conditions evaluate properly
- Event effects apply correctly
- Event history tracks properly
- Build passes

---

## Phase 3: History System (Week 5)

### Goal
Implement action logging and timeline

### Tasks

#### 1. Create history domain
- `history/logger.ts` - Action logging
- `history/timeline.ts` - Timeline visualization
- `history/achievements.ts` - Achievement tracking

#### 2. Wire to all actions
- Add logging to all store actions
- Implement log compression
- Create timeline UI component
- Add achievement notifications

#### 3. Implement compression
- Compress action log keys
- Trim old logs
- Aggregate historical data

### Migration: v6 → v7

**Add history to save.**

```typescript
7: (state: SaveEnvelope): SaveEnvelope => {
  return {
    ...state,
    version: 7,
    actionLog: [],
    eventHistory: [],
    achievements: {
      unlocked: [],
      progress: {},
      lastNotified: null
    }
  }
}
```

### Verification
- All actions logged
- Log compression works
- Timeline displays correctly
- Achievements unlock properly
- Build passes

---

## Phase 4: Origins Expansion (Week 6)

### Goal
Support many origins with trait system

### Tasks

#### 1. Enhance origin system
- Move origins to `data/origins/*.json`
- Add trait composition system
- Add origin-specific events
- Create origin editor tool

#### 2. Origin data structure
```typescript
interface Origin {
  id: string
  name: string
  description: string
  
  traits: OriginTrait[]
  restrictions: OriginRestriction[]
  bonuses: OriginBonus[]
  
  specificEvents: string[]
  specificTechniques: string[]
}
```

#### 3. Create origin editor
- UI for creating new origins
- Validation for trait balance
- Preview of origin effects

### Migration: v7 → v8

**Origin data structure change.**

```typescript
8: (state: SaveEnvelope): SaveEnvelope => {
  return {
    ...state,
    version: 8,
    character: migrateCharacterV7ToV8(state.character)
  }
}

function migrateCharacterV7ToV8(character: any) {
  // Map old originId to new origin structure
  // Apply new trait system
  return {
    ...character,
    // Apply trait-based bonuses
  }
}
```

### Verification
- Origins load correctly
- Traits apply properly
- Origin-specific events trigger
- Origin editor works
- Build passes

---

## Phase 5: Social Links Deepening (Week 7-8)

### Goal
Enhanced social link system with dialogue trees

### Tasks

#### 1. Enhance relationship system
- Add dialogue trees to NPC data
- Add relationship milestones
- Add social link events
- Implement branching dialogue

#### 2. Dialogue system
- `domain/social/dialogue.ts` - Dialogue parsing
- Branching dialogue support
- Choice consequences
- Dialogue history tracking

#### 3. NPC data structure
```typescript
interface NPC {
  id: string
  name: string
  title: string
  locationId: string
  kind: 'master' | 'contact' | 'rival'
  
  dialogueTree: DialogueNode
  tierThresholds: number[]
  tierUnlocks: string[]
  
  specificEvents: string[]
}
```

### Migration: v8 → v9

**Relationship data structure change.**

```typescript
9: (state: SaveEnvelope): SaveEnvelope => {
  return {
    ...state,
    version: 9,
    relationships: migrateRelationshipsV8ToV9(state.relationships)
  }
}

function migrateRelationshipsV8ToV9(relationships: any) {
  // Add dialogue index to existing relationships
  // Add last visited timestamp
  // Preserve trust and tier
  const migrated: Record<string, any> = {}
  
  for (const [npcId, bond] of Object.entries(relationships)) {
    migrated[npcId] = {
      ...bond,
      dialogueIndex: 0,
      lastVisited: Date.now()
    }
  }
  
  return migrated
}
```

### Verification
- Dialogue trees load correctly
- Branching works properly
- Relationship milestones trigger
- Dialogue history tracks
- Build passes

---

## Migration Implementation

### Migration Registry

```typescript
// core/migration/migrations.ts
import { SaveEnvelope } from '../../types'

export const migrations = {
  5: (state: any): SaveEnvelope => { /* ... */ },
  6: (state: SaveEnvelope): SaveEnvelope => { /* ... */ },
  7: (state: SaveEnvelope): SaveEnvelope => { /* ... */ },
  8: (state: SaveEnvelope): SaveEnvelope => { /* ... */ },
  9: (state: SaveEnvelope): SaveEnvelope => { /* ... */ }
}

export function migrateSave(persistedState: unknown, version: number): SaveEnvelope {
  // Start from current version
  let state = persistedState as SaveEnvelope
  
  // Apply migrations sequentially
  for (let v = version + 1; v <= CURRENT_VERSION; v++) {
    if (migrations[v]) {
      console.log(`Migrating from v${v - 1} to v${v}`)
      state = migrations[v](state)
    }
  }
  
  return state
}
```

### Rollback Strategy

```typescript
// core/saveManager.ts
export class SaveManager {
  private readonly MAX_BACKUPS = 5
  
  save(state: SaveEnvelope) {
    // Create backup before saving
    this.createBackup(state)
    
    // Save new version
    localStorage.setItem('jujutsu-save', JSON.stringify(state))
  }
  
  private createBackup(state: SaveEnvelope) {
    const backups = this.getBackups()
    backups.push({
      version: state.version,
      timestamp: Date.now(),
      data: state
    })
    
    // Keep only last 5 backups
    if (backups.length > this.MAX_BACKUPS) {
      backups.shift()
    }
    
    localStorage.setItem('jujutsu-backups', JSON.stringify(backups))
  }
  
  getBackups(): SaveBackup[] {
    const data = localStorage.getItem('jujutsu-backups')
    return data ? JSON.parse(data) : []
  }
  
  restoreBackup(version: number): boolean {
    const backups = this.getBackups()
    const backup = backups.find(b => b.version === version)
    
    if (backup) {
      this.save(backup.data)
      return true
    }
    
    return false
  }
}

interface SaveBackup {
  version: number
  timestamp: number
  data: SaveEnvelope
}
```

### Migration Testing

```typescript
// test/migration.test.ts
import { migrateSave } from '../core/migration/migrations'
import { SaveEnvelope } from '../types'

describe('Save Migrations', () => {
  test('migrates v4 to v5', () => {
    const v4State = {
      player: {
        name: 'Test',
        originId: 'standard',
        // ... v4 player structure
      }
    }
    
    const result = migrateSave(v4State, 4)
    
    expect(result.version).toBe(5)
    expect(result.character).toBeDefined()
    expect(result.world).toBeDefined()
  })
  
  test('migrates v5 to v6', () => {
    const v5State: SaveEnvelope = {
      version: 5,
      // ... v5 structure
      events: {} as any
    }
    
    const result = migrateSave(v5State, 5)
    
    expect(result.version).toBe(6)
    expect(result.events.activeEvents).toEqual([])
    expect(result.events.triggeredEvents).toEqual([])
  })
  
  test('handles missing version gracefully', () => {
    const unknownState = { version: 999 }
    
    expect(() => migrateSave(unknownState, 999)).not.toThrow()
  })
})
```

## Timeline Summary

| Phase | Duration | Version | Focus |
|-------|----------|---------|-------|
| Phase 1 | Week 1-2 | v4 → v5 | Foundation, folder structure, state store |
| Phase 2 | Week 3-4 | v5 → v6 | Event system, event data |
| Phase 3 | Week 5 | v6 → v7 | History system, timeline, achievements |
| Phase 4 | Week 6 | v7 → v8 | Origins expansion, trait system |
| Phase 5 | Week 7-8 | v8 → v9 | Social links, dialogue trees |

## Risk Mitigation

### Data Loss Prevention
- Always create backup before migration
- Keep last 5 backups in localStorage
- Provide manual export/import
- Test migrations with sample saves

### Rollback Plan
- If migration fails, restore from backup
- If backup fails, provide manual import
- If all else fails, provide reset option

### Testing Strategy
- Unit tests for each migration
- Integration tests for migration chain
- Manual testing with real saves
- Beta testing with subset of users

## Success Criteria

Each phase is complete when:
- [ ] All tasks completed
- [ ] Migration implemented and tested
- [ ] Existing saves load correctly
- [ ] No data loss
- [ ] Build passes
- [ ] Manual testing passes
- [ ] Documentation updated
