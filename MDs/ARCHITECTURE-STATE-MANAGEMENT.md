# State Management Approach

## Recommended Solution: Lightweight Store

The project now uses a lightweight store implementation that mirrors the architecture goals from the design document while staying compatible with the current codebase.

## Store Structure

### Main Store Definition

The main store is implemented in [src/state/store.js](src/state/store.js) and now provides:

- A single centralized state container
- Character, world, relationship, and event slices in one object
- Selector helpers for derived values
- Action-like methods for controlled mutations
- A shape that can be persisted by the save manager in [src/core/saveManager.js](src/core/saveManager.js)

### Core API

```js
const store = createGameStore(initialState)

store.getState()
store.setState(nextState)
store.setCharacter(character)
store.advanceTime(ticks)
store.updateRelationship(npcId, delta)
store.selectors.characterLevel(state)
store.selectors.currentLocation(state)
```

## Key Principles

### 1. Single Store
One centralized store holds the game state for the current run.

### 2. Domain Slices
State is grouped by domain concepts:
- character
- world
- relationships
- events

### 3. Computed Selectors
Derived values are exposed explicitly through selectors so UI code can consume them without duplicating logic.

### 4. Action-Based Mutations
State changes happen through named methods instead of direct mutation.

### 5. Persistence Integration
The store API is intentionally simple so it can be integrated with the save layer when the game grows further.

## Selector Pattern

Selectors provide computed values and keep UI components simple.

### Character Selectors
- `characterLevel(state)` returns the current character level.
- `currentLocation(state)` returns the current world location.
- `relationshipTrust(state, npcId)` returns the trust value for a relationship.

## Action Pattern

The store exposes clear mutation methods:
- `setCharacter(character)` updates character data.
- `advanceTime(ticks)` reduces the available time budget.
- `updateRelationship(npcId, delta)` modifies relationship trust.

## Key Principles

### 1. Single Store
One Zustand store holds all game state. This provides:
- Single source of truth
- Easy debugging (one place to inspect state)
- Simplified persistence
- Consistent state access patterns

### 2. Domain Slices
State is organized by domain (character, world, social, events):
- Related state grouped together
- Easy to understand state structure
- Simplifies state updates
- Enables domain-specific selectors

### 3. Computed Selectors
Derived values calculated from state:
- Effective stats (base + equipment + buffs)
- Available actions (based on location, time, resources)
- Relationship progress (trust to next tier)
- Event eligibility (based on conditions)

### 4. Action-Based Mutations
All state changes go through named actions:
- Clear audit trail
- Easy to add logging
- Simplifies testing
- Enables undo/redo functionality

### 5. Persistence Middleware
Automatic save/load with versioning:
- Transparent to components
- Handles compression
- Manages versioning
- Provides migration support

### 6. Immutable Updates
Always return new state, never mutate directly:
- Prevents bugs from accidental mutations
- Enables time-travel debugging
- Simplifies state comparison
- Works well with React's rendering model

## Selector Pattern

Selectors provide computed values and optimize re-renders by only updating when dependencies change.

### Character Selectors

```typescript
// state/selectors/characterSelectors.ts
import { useGameStore } from '../store'

export const useEffectiveStats = () => 
  useGameStore((state) => calculateEffectiveStats(state.character))

export const useAvailableTechniques = () =>
  useGameStore((state) => 
    getAvailableTechniques(
      state.character.knownTechniqueIds,
      state.character.unlockedSkills,
      state.character.originId
    )
  )

export const useCanAffordAction = (actionId: string) =>
  useGameStore((state) => 
    canAffordAction(state.character, state.world, actionId)
  )

export const useCharacterLevel = () =>
  useGameStore((state) => state.character.level)

export const useCharacterGrade = () =>
  useGameStore((state) => state.character.grade)
```

### World Selectors

```typescript
// state/selectors/worldSelectors.ts
import { useGameStore } from '../store'

export const useCurrentLocation = () =>
  useGameStore((state) => 
    getLocation(state.world.currentLocationId)
  )

export const useAvailableLocations = () =>
  useGameStore((state) => 
    getAccessibleLocations(
      state.world.currentLayerId,
      state.character.grade
    )
  )

export const useTimeRemaining = () =>
  useGameStore((state) => state.world.timeRemaining)

export const useCurrentSeason = () =>
  useGameStore((state) => state.world.season)
```

### Social Selectors

```typescript
// state/selectors/socialSelectors.ts
import { useGameStore } from '../store'

export const useRelationship = (npcId: string) =>
  useGameStore((state) => state.relationships[npcId])

export const useAllRelationships = () =>
  useGameStore((state) => state.relationships)

export const useRelationshipTier = (npcId: string) =>
  useGameStore((state) => 
    state.relationships[npcId]?.tier ?? 0
  )

export const useTrustToNextTier = (npcId: string) =>
  useGameStore((state) => {
    const bond = state.relationships[npcId]
    const npc = getNpc(npcId)
    if (!bond || !npc) return null
    return trustToNextTier(npc, bond)
  })
```

## Action Pattern

Actions encapsulate state mutations with clear intent and validation.

### Character Actions

```typescript
// state/actions/characterActions.ts
import { useGameStore } from '../store'

export const characterActions = {
  spendAttributePoint: (attribute: keyof CharacterAttributes) => {
    useGameStore.setState((state) => {
      if (state.character.unspentPoints <= 0) {
        return state // No points to spend
      }
      
      return {
        character: {
          ...state.character,
          unspentPoints: state.character.unspentPoints - 1,
          attributes: {
            ...state.character.attributes,
            [attribute]: state.character.attributes[attribute] + 1
          }
        }
      }
    })
  },
  
  equipTechnique: (techniqueId: string) => {
    useGameStore.setState((state) => {
      if (!state.character.knownTechniqueIds.includes(techniqueId)) {
        return state // Technique not known
      }
      
      return {
        character: {
          ...state.character,
          techniqueId
        }
      }
    })
  },
  
  equipItem: (itemId: string, slot: EquipmentSlot) => {
    useGameStore.setState((state) => {
      if (!state.character.inventory.includes(itemId)) {
        return state // Item not in inventory
      }
      
      const slotKey = slot === 'weapon' ? 'equippedWeaponId' : 'equippedAccessoryId'
      
      return {
        character: {
          ...state.character,
          [slotKey]: itemId
        }
      }
    })
  }
}
```

### World Actions

```typescript
// state/actions/worldActions.ts
import { useGameStore } from '../store'

export const worldActions = {
  travelTo: (locationId: string) => {
    useGameStore.setState((state) => {
      const destination = getLocation(locationId)
      const cost = calculateTravelCost(state.world, destination)
      
      if (!canAfford(state.world, cost)) {
        return state // Cannot afford travel
      }
      
      return {
        world: {
          ...state.world,
          currentLocationId: locationId,
          currentLayerId: destination.layerId,
          timeRemaining: state.world.timeRemaining - cost
        }
      }
    })
  },
  
  spendTime: (timeCost: number, staminaCost?: number) => {
    useGameStore.setState((state) => {
      if (!canAfford(state.world, timeCost)) {
        return state // Cannot afford time
      }
      
      if (staminaCost && state.character.stamina < staminaCost) {
        return state // Cannot afford stamina
      }
      
      return {
        world: {
          ...state.world,
          timeRemaining: state.world.timeRemaining - timeCost
        },
        character: staminaCost ? {
          ...state.character,
          stamina: state.character.stamina - staminaCost
        } : state.character
      }
    })
  },
  
  advanceTimePeriod: () => {
    useGameStore.setState((state) => {
      const newDate = advanceTimeOfDay(state.world.calendarDate)
      const isNewDay = newDate.timeOfDay === 'morning' && 
        newDate.day !== state.world.calendarDate.day
      
      return {
        world: {
          ...state.world,
          calendarDate: newDate,
          season: getSeason(newDate.month),
          timeRemaining: isNewDay ? state.world.maxTimePerDay : state.world.timeRemaining
        },
        character: isNewDay ? {
          ...state.character,
          stamina: state.character.maxStamina,
          curseEnergy: state.character.maxCurseEnergy
        } : state.character
      }
    })
  }
}
```

## State Slices

For larger stores, state can be split into slices using Zustand's middleware.

### Character Slice

```typescript
// state/slices/characterSlice.ts
import { StateCreator } from 'zustand'

interface CharacterSlice {
  character: CharacterState
  characterActions: {
    updateCharacter: (updates: Partial<CharacterState>) => void
    resetCharacter: () => void
  }
}

export const createCharacterSlice: StateCreator<
  GameState,
  [],
  [],
  CharacterSlice
> = (set) => ({
  character: initialCharacterState,
  
  characterActions: {
    updateCharacter: (updates) =>
      set((state) => ({
        character: { ...state.character, ...updates }
      })),
    
    resetCharacter: () =>
      set({ character: initialCharacterState })
  }
})
```

### World Slice

```typescript
// state/slices/worldSlice.ts
import { StateCreator } from 'zustand'

interface WorldSlice {
  world: WorldState
  worldActions: {
    updateWorld: (updates: Partial<WorldState>) => void
    resetWorld: () => void
  }
}

export const createWorldSlice: StateCreator<
  GameState,
  [],
  [],
  WorldSlice
> = (set) => ({
  world: initialWorldState,
  
  worldActions: {
    updateWorld: (updates) =>
      set((state) => ({
        world: { ...state.world, ...updates }
      })),
    
    resetWorld: () =>
      set({ world: initialWorldState })
  }
})
```

### Combined Store

```typescript
// state/store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createCharacterSlice } from './slices/characterSlice'
import { createWorldSlice } from './slices/worldSlice'

export const useGameStore = create<GameState>()(
  persist(
    (...a) => ({
      ...createCharacterSlice(...a),
      ...createWorldSlice(...a),
      // ... other slices
    }),
    {
      name: 'jujutsu-save',
      storage: createJSONStorage(() => localStorage),
      version: 5
    }
  )
)
```

## Performance Optimization

### Shallow Comparison

Zustand automatically handles shallow comparison for selectors. For complex objects, use shallow comparison:

```typescript
import { shallow } from 'zustand/shallow'

export const useCharacterStats = () =>
  useGameStore(
    (state) => ({
      strength: state.character.attributes.strength,
      agility: state.character.attributes.agility,
      intelligence: state.character.attributes.intelligence
    }),
    shallow
  )
```

### Memoized Selectors

For expensive computations, memoize selectors:

```typescript
import { useMemo } from 'react'

export const useEffectiveStats = () => {
  const character = useGameStore((state) => state.character)
  
  return useMemo(() => 
    calculateEffectiveStats(character),
    [character]
  )
}
```

### Selective Subscriptions

Only subscribe to the state you need:

```typescript
// Good - only re-renders when level changes
const level = useGameStore((state) => state.character.level)

// Bad - re-renders on any character change
const character = useGameStore((state) => state.character)
```

## DevTools Integration

Zustand supports Redux DevTools for debugging:

```typescript
import { devtools } from 'zustand/middleware'

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        // ... store definition
      }),
      {
        name: 'jujutsu-save'
      }
    ),
    { name: 'JujutsuGame' }
  )
)
```

## Testing

State can be tested independently of UI:

```typescript
// test/store.test.ts
import { useGameStore } from '../state/store'

describe('Game Store', () => {
  beforeEach(() => {
    useGameStore.setState(initialState)
  })
  
  test('spending attribute point reduces unspent points', () => {
    characterActions.spendAttributePoint('strength')
    
    const state = useGameStore.getState()
    expect(state.character.unspentPoints).toBe(2)
    expect(state.character.attributes.strength).toBe(6)
  })
  
  test('cannot spend point when none available', () => {
    useGameStore.setState({
      character: { ...initialCharacterState, unspentPoints: 0 }
    })
    
    characterActions.spendAttributePoint('strength')
    
    const state = useGameStore.getState()
    expect(state.character.unspentPoints).toBe(0)
  })
})
```

## Summary

The Zustand-based state management provides:

1. **Simplicity**: Minimal boilerplate, easy to understand
2. **Performance**: Optimized re-renders via selectors
3. **Type Safety**: Full TypeScript support
4. **Persistence**: Built-in localStorage support
5. **DevTools**: Easy debugging with Redux DevTools
6. **Testability**: Pure functions, easy to test
7. **Scalability**: Slices for organizing large stores
