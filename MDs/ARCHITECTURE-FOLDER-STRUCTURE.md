# Folder Structure

## Recommended Directory Layout

```
src/
├── core/                          # Core game engine
│   ├── engine.ts                  # Main game loop and time management
│   ├── eventBus.ts                # Pub/sub for game events
│   ├── saveManager.ts             # Save/load with versioning
│   └── migration/                 # Save migrations
│       ├── migrations.ts          # Migration registry
│       ├── v1_to_v2.ts
│       ├── v2_to_v3.ts
│       └── ...
├── domain/                        # Domain models (pure business logic)
│   ├── world/
│   │   ├── timeline.ts            # Time/calendar system
│   │   ├── location.ts            # Location/area management
│   │   └── layer.ts               # World layers/zones
│   ├── character/
│   │   ├── character.ts           # Character entity
│   │   ├── origin.ts              # Origin traits and effects
│   │   ├── attributes.ts          # Attributes and stats
│   │   └── progression.ts         # Leveling, grades, XP
│   ├── social/
│   │   ├── relationship.ts        # Social link system
│   │   ├── npc.ts                 # NPC definitions
│   │   └── dialogue.ts            # Dialogue trees
│   ├── events/
│   │   ├── event.ts                # Event system
│   │   ├── trigger.ts             # Event triggers
│   │   ├── condition.ts           # Event conditions
│   │   └── effect.ts              # Event effects
│   ├── combat/
│   │   ├── combat.ts              # Combat mechanics
│   │   ├── enemy.ts               # Enemy definitions
│   │   └── ai.ts                  # Enemy AI
│   └── inventory/
│       ├── item.ts                # Item definitions
│       ├── equipment.ts           # Equipment system
│       └── crafting.ts            # Crafting (if needed)
├── data/                          # Static data (JSON or TS)
│   ├── origins/                   # Origin definitions
│   │   ├── standard.json
│   │   ├── heavenly_restriction.json
│   │   └── six_eyes.json
│   ├── events/                    # Event definitions
│   │   ├── daily/
│   │   ├── story/
│   │   ├── random/
│   │   └── seasonal/
│   ├── npcs/                      # NPC data
│   │   ├── masters/
│   │   ├── contacts/
│   │   └── rivals/
│   ├── locations/                 # Location data
│   │   ├── school/
│   │   ├── tokyo/
│   │   └── kyoto/
│   ├── enemies/                   # Enemy data
│   ├── items/                     # Item data
│   └── quests/                    # Quest definitions
├── state/                         # State management
│   ├── store.ts                   # Global state store
│   ├── slices/                    # State slices (if using Redux-like pattern)
│   │   ├── characterSlice.ts
│   │   ├── worldSlice.ts
│   │   ├── socialSlice.ts
│   │   └── eventSlice.ts
│   ├── selectors/                 # Computed state
│   │   ├── characterSelectors.ts
│   │   └── worldSelectors.ts
│   └── actions/                   # State actions
│       ├── characterActions.ts
│       └── worldActions.ts
├── ui/                            # UI components
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── screens/
│   │   ├── character/
│   │   ├── world/
│   │   ├── social/
│   │   └── events/
│   ├── components/
│   │   ├── common/
│   │   ├── character/
│   │   └── world/
│   └── hooks/
│       ├── useGameState.ts
│       ├── useTime.ts
│       └── useEvents.ts
├── history/                       # Historical records system
│   ├── logger.ts                  # Action logger
│   ├── timeline.ts                # Timeline visualization
│   └── achievements.ts            # Achievement tracking
├── utils/                         # Utilities
│   ├── format.ts
│   ├── random.ts                  # Seeded RNG
│   ├── validation.ts
│   └── performance.ts
├── types/                         # TypeScript types
│   ├── core.ts
│   ├── domain.ts
│   ├── state.ts
│   └── ui.ts
├── config/                        # Configuration
│   ├── gameConstants.ts
│   ├── balance.ts
│   └── features.ts                # Feature flags
└── main.tsx                       # Entry point
```

## Directory Explanations

### `core/`
Contains the fundamental systems that power the game. These are framework-level concerns that don't contain game-specific logic.

### `domain/`
Pure business logic organized by game domain. Each subdirectory contains functions that operate on domain entities without any UI or state management concerns.

### `data/`
Static game content in JSON format. This separation allows content creators to work without touching code. TypeScript files are used when type safety is needed for complex data structures.

### `state/`
State management layer. The store holds the entire game state, with slices organizing related state pieces. Selectors provide computed values, and actions handle state mutations.

### `ui/`
React components organized by purpose. Layout components form the app shell, screens are full-page views, components are reusable UI elements, and hooks provide state access patterns.

### `history/`
Systems for tracking and displaying player actions and achievements. This enables timeline visualization and achievement tracking.

### `utils/`
Pure utility functions that don't belong to any specific domain. These are helper functions used throughout the codebase.

### `types/`
TypeScript type definitions organized by layer. This keeps type definitions close to their usage while maintaining a single source of truth.

### `config/`
Configuration files that control game behavior. These include balance constants, feature flags, and other tunable parameters.

## Migration from Current Structure

### Current Structure
```
src/
├── components/
├── systems/
├── data/
├── types/
├── utils/
├── config/
└── main.tsx
```

### Migration Mapping

| Current | New Location |
|---------|--------------|
| `systems/combat.ts` | `domain/combat/combat.ts` |
| `systems/bonds.ts` | `domain/social/relationship.ts` |
| `systems/leveling.ts` | `domain/character/progression.ts` |
| `systems/timeSystem.ts` | `domain/world/timeline.ts` |
| `systems/drops.ts` | `domain/inventory/item.ts` |
| `systems/encounter.ts` | `domain/events/trigger.ts` |
| `systems/equipmentStats.ts` | `domain/inventory/equipment.ts` |
| `systems/enemyAI.ts` | `domain/combat/ai.ts` |
| `data/techniques.ts` | `data/events/techniques.json` |
| `data/npcs.ts` | `data/npcs/masters/*.json` |
| `data/world.ts` | `data/locations/*.json` |
| `data/curses.ts` | `data/enemies/*.json` |
| `data/origins.ts` | `data/origins/*.json` |
| `data/quests.ts` | `data/quests/*.json` |
| `data/equipment.ts` | `data/items/*.json` |
| `components/` | `ui/screens/` and `ui/components/` |
| `utils/storage.ts` | `core/saveManager.ts` |
| `utils/format.ts` | `utils/format.ts` (unchanged) |

## File Naming Conventions

- **Domain logic**: `camelCase.ts` (e.g., `character.ts`, `relationship.ts`)
- **Data files**: `snake_case.json` (e.g., `standard.json`, `heavenly_restriction.json`)
- **Components**: `PascalCase.tsx` (e.g., `CharacterScreen.tsx`, `ResourceBar.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useGameState.ts`)
- **Types**: `camelCase.ts` (e.g., `domain.ts`, `state.ts`)
- **Tests**: `camelCase.test.ts` (e.g., `character.test.ts`)
