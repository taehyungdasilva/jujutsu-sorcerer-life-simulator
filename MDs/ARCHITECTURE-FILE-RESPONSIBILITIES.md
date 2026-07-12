# File Responsibilities

## Core Layer (`core/`)

### `core/engine.js`
**Responsibility**: Main game loop and time management
- Manages game tick execution
- Handles pause/resume functionality
- Coordinates system updates
- Provides time delta to all systems
- Manages game speed settings

### `core/eventBus.js`
**Responsibility**: Central pub/sub for cross-system communication
- Provides publish/subscribe API
- Manages event listeners
- Handles event routing
- Supports event prioritization
- Enables loose coupling between systems

### `core/saveManager.js`
**Responsibility**: Save/load orchestration
- Serializes state to localStorage
- Deserializes state from localStorage
- Handles save compression
- Manages save backups
- Provides save slot management

### `core/migration/migrations.js`
**Responsibility**: Migration registry
- Registers all migration functions
- Determines current save version
- Orchestrates migration chain
- Handles migration failures
- Provides rollback capability

### `core/eventBus.ts`
**Responsibility**: Central pub/sub for cross-system communication
- Provides publish/subscribe API
- Manages event listeners
- Handles event routing
- Supports event prioritization
- Enables loose coupling between systems

### `core/saveManager.ts`
**Responsibility**: Save/load orchestration
- Serializes state to localStorage
- Deserializes state from localStorage
- Handles save compression
- Manages save backups
- Provides save slot management

### `core/migration/migrations.ts`
**Responsibility**: Migration registry
- Registers all migration functions
- Determines current save version
- Orchestrates migration chain
- Handles migration failures
- Provides rollback capability

### `core/migration/vX_to_vY.ts`
**Responsibility**: Individual version migrations
- Transforms state from version X to Y
- Handles data structure changes
- Preserves player progress
- Adds default values for new fields
- Logs migration steps

## Domain Layer (`domain/`)

### `domain/world/timeline.js`
**Responsibility**: Time/calendar system
- Advances game time
- Calculates calendar dates
- Determines seasons
- Manages time of day transitions
- Handles time budget calculations

### `domain/world/location.js`
**Responsibility**: Location/area management
- Manages location state
- Calculates travel costs
- Handles location transitions
- Manages location-specific actions
- Tracks location-specific events

### `domain/world/layer.js`
**Responsibility**: World layers/zones
- Manages layer state
- Calculates inter-layer travel
- Handles layer-specific rules
- Manages layer-specific events
- Tracks layer accessibility

### `domain/character/character.js`
**Responsibility**: Character entity
- Defines character structure
- Manages character state
- Validates character data
- Handles character serialization
- Provides character utilities

### `domain/character/origin.js`
**Responsibility**: Origin traits and effects
- Applies origin traits to character
- Validates origin compatibility
- Calculates origin bonuses
- Manages origin-specific rules
- Provides origin utilities

### `domain/character/attributes.js`
**Responsibility**: Attributes and stats
- Calculates effective stats
- Manages attribute spending
- Handles stat scaling
- Provides stat utilities
- Validates stat changes

### `domain/character/progression.js`
**Responsibility**: Leveling, grades, XP
- Calculates XP requirements
- Handles level-ups
- Manages grade promotions
- Tracks progression milestones
- Provides progression utilities

### `domain/social/relationship.js`
**Responsibility**: Social link system
- Calculates relationship progress
- Manages bond tiers
- Handles relationship events
- Tracks relationship history
- Provides relationship utilities

### `domain/social/npc.js`
**Responsibility**: NPC definitions
- Defines NPC structure
- Manages NPC state
- Handles NPC interactions
- Tracks NPC availability
- Provides NPC utilities

### `domain/social/dialogue.js`
**Responsibility**: Dialogue trees
- Parses dialogue data
- Handles dialogue branching
- Manages dialogue state
- Tracks dialogue history
- Provides dialogue utilities

### `domain/events/event.js`
**Responsibility**: Event system
- Matches events to conditions
- Executes event effects
- Manages event state
- Handles event chaining
- Provides event utilities

### `domain/events/trigger.js`
**Responsibility**: Event triggers
- Evaluates trigger conditions
- Handles trigger timing
- Manages trigger state
- Tracks trigger history
- Provides trigger utilities

### `domain/events/condition.js`
**Responsibility**: Event conditions
- Evaluates condition logic
- Handles condition nesting
- Manages condition state
- Provides condition utilities
- Validates condition data

### `domain/events/effect.js`
**Responsibility**: Event effects
- Applies effect changes
- Handles effect chaining
- Manages effect state
- Provides effect utilities
- Validates effect data

### `domain/combat/combat.js`
**Responsibility**: Combat mechanics
- Calculates damage formulas
- Manages resource costs
- Handles combat state
- Provides combat utilities
- Validates combat data

### `domain/combat/enemy.js`
**Responsibility**: Enemy definitions
- Defines enemy structure
- Manages enemy state
- Handles enemy scaling
- Provides enemy utilities
- Validates enemy data

### `domain/combat/ai.js`
**Responsibility**: Enemy AI
- Makes enemy decisions
- Handles AI state
- Manages AI behavior
- Provides AI utilities
- Validates AI data

### `domain/inventory/item.js`
**Responsibility**: Item definitions
- Defines item structure
- Manages item state
- Handles item effects
- Provides item utilities
- Validates item data

### `domain/inventory/equipment.js`
**Responsibility**: Equipment system
- Calculates equipment bonuses
- Manages equipment state
- Handles equipment changes
- Provides equipment utilities
- Validates equipment data

### `domain/inventory/crafting.js`
**Responsibility**: Crafting system (if needed)
- Validates crafting recipes
- Handles crafting costs
- Manages crafting state
- Provides crafting utilities
- Validates crafting data

### `domain/world/location.ts`
**Responsibility**: Location/area management
- Manages location state
- Calculates travel costs
- Handles location transitions
- Manages location-specific actions
- Tracks location-specific events

### `domain/world/layer.ts`
**Responsibility**: World layers/zones
- Manages layer state
- Calculates inter-layer travel
- Handles layer-specific rules
- Manages layer-specific events
- Tracks layer accessibility

### `domain/character/character.ts`
**Responsibility**: Character entity
- Defines character structure
- Manages character state
- Validates character data
- Handles character serialization
- Provides character utilities

### `domain/character/origin.ts`
**Responsibility**: Origin traits and effects
- Applies origin traits to character
- Validates origin compatibility
- Calculates origin bonuses
- Manages origin-specific rules
- Provides origin utilities

### `domain/character/attributes.ts`
**Responsibility**: Attributes and stats
- Calculates effective stats
- Manages attribute spending
- Handles stat scaling
- Provides stat utilities
- Validates stat changes

### `domain/character/progression.ts`
**Responsibility**: Leveling, grades, XP
- Calculates XP requirements
- Handles level-ups
- Manages grade promotions
- Tracks progression milestones
- Provides progression utilities

### `domain/social/relationship.ts`
**Responsibility**: Social link system
- Calculates relationship progress
- Manages bond tiers
- Handles relationship events
- Tracks relationship history
- Provides relationship utilities

### `domain/social/npc.ts`
**Responsibility**: NPC definitions
- Defines NPC structure
- Manages NPC state
- Handles NPC interactions
- Tracks NPC availability
- Provides NPC utilities

### `domain/social/dialogue.ts`
**Responsibility**: Dialogue trees
- Parses dialogue data
- Handles dialogue branching
- Manages dialogue state
- Tracks dialogue history
- Provides dialogue utilities

### `domain/events/event.ts`
**Responsibility**: Event system
- Matches events to conditions
- Executes event effects
- Manages event state
- Handles event chaining
- Provides event utilities

### `domain/events/trigger.ts`
**Responsibility**: Event triggers
- Evaluates trigger conditions
- Handles trigger timing
- Manages trigger state
- Tracks trigger history
- Provides trigger utilities

### `domain/events/condition.ts`
**Responsibility**: Event conditions
- Evaluates condition logic
- Handles condition nesting
- Manages condition state
- Provides condition utilities
- Validates condition data

### `domain/events/effect.ts`
**Responsibility**: Event effects
- Applies effect changes
- Handles effect chaining
- Manages effect state
- Provides effect utilities
- Validates effect data

### `domain/combat/combat.ts`
**Responsibility**: Combat mechanics
- Calculates damage formulas
- Manages resource costs
- Handles combat state
- Provides combat utilities
- Validates combat data

### `domain/combat/enemy.ts`
**Responsibility**: Enemy definitions
- Defines enemy structure
- Manages enemy state
- Handles enemy scaling
- Provides enemy utilities
- Validates enemy data

### `domain/combat/ai.ts`
**Responsibility**: Enemy AI
- Makes enemy decisions
- Handles AI state
- Manages AI behavior
- Provides AI utilities
- Validates AI data

### `domain/inventory/item.ts`
**Responsibility**: Item definitions
- Defines item structure
- Manages item state
- Handles item effects
- Provides item utilities
- Validates item data

### `domain/inventory/equipment.ts`
**Responsibility**: Equipment system
- Calculates equipment bonuses
- Manages equipment state
- Handles equipment changes
- Provides equipment utilities
- Validates equipment data

### `domain/inventory/crafting.ts`
**Responsibility**: Crafting system (if needed)
- Validates crafting recipes
- Handles crafting costs
- Manages crafting state
- Provides crafting utilities
- Validates crafting data

## Data Layer (`data/`)

### `data/origins/*.json`
**Responsibility**: Origin definitions
- Defines origin traits
- Specifies origin bonuses
- Lists origin restrictions
- Provides origin metadata
- Links to origin-specific events

### `data/events/daily/*.json`
**Responsibility**: Daily event definitions
- Defines daily events
- Specifies event triggers
- Lists event conditions
- Provides event effects
- Links to event rewards

### `data/events/story/*.json`
**Responsibility**: Story event definitions
- Defines story events
- Specifies story prerequisites
- Lists story branches
- Provides story dialogue
- Links to story consequences

### `data/events/random/*.json`
**Responsibility**: Random event definitions
- Defines random events
- Specifies event weights
- Lists event conditions
- Provides event effects
- Links to event rewards

### `data/events/seasonal/*.json`
**Responsibility**: Seasonal event definitions
- Defines seasonal events
- Specifies season requirements
- Lists seasonal effects
- Provides seasonal dialogue
- Links to seasonal rewards

### `data/npcs/masters/*.json`
**Responsibility**: Master NPC data
- Defines master NPCs
- Specifies master abilities
- Lists master teachings
- Provides master dialogue
- Links to master events

### `data/npcs/contacts/*.json`
**Responsibility**: Contact NPC data
- Defines contact NPCs
- Specifies contact services
- Lists contact dialogue
- Provides contact information
- Links to contact quests

### `data/npcs/rivals/*.json`
**Responsibility**: Rival NPC data
- Defines rival NPCs
- Specifies rival abilities
- Lists rival encounters
- Provides rival dialogue
- Links to rival events

### `data/locations/school/*.json`
**Responsibility**: School location data
- Defines school locations
- Specifies school actions
- Lists school NPCs
- Provides school descriptions
- Links to school events

### `data/locations/tokyo/*.json`
**Responsibility**: Tokyo location data
- Defines Tokyo locations
- Specifies Tokyo actions
- Lists Tokyo NPCs
- Provides Tokyo descriptions
- Links to Tokyo events

### `data/locations/kyoto/*.json`
**Responsibility**: Kyoto location data
- Defines Kyoto locations
- Specifies Kyoto actions
- Lists Kyoto NPCs
- Provides Kyoto descriptions
- Links to Kyoto events

### `data/enemies/*.json`
**Responsibility**: Enemy data
- Defines enemy types
- Specifies enemy stats
- Lists enemy abilities
- Provides enemy descriptions
- Links to enemy drops

### `data/items/*.json`
**Responsibility**: Item data
- Defines item types
- Specifies item effects
- Lists item rarities
- Provides item descriptions
- Links to item sources

### `data/quests/*.json`
**Responsibility**: Quest definitions
- Defines quest objectives
- Specifies quest rewards
- Lists quest prerequisites
- Provides quest dialogue
- Links to quest events

## State Layer (`state/`)

### `state/store.js`
**Responsibility**: Global state store
- Holds entire game state
- Provides state access API
- Manages state persistence
- Handles state hydration
- Provides state utilities

### `state/slices/characterSlice.js`
**Responsibility**: Character state slice
- Manages character state
- Provides character actions
- Handles character mutations
- Provides character selectors
- Validates character changes

### `state/slices/worldSlice.js`
**Responsibility**: World state slice
- Manages world state
- Provides world actions
- Handles world mutations
- Provides world selectors
- Validates world changes

### `state/slices/socialSlice.js`
**Responsibility**: Social state slice
- Manages social state
- Provides social actions
- Handles social mutations
- Provides social selectors
- Validates social changes

### `state/slices/eventSlice.js`
**Responsibility**: Event state slice
- Manages event state
- Provides event actions
- Handles event mutations
- Provides event selectors
- Validates event changes

### `state/selectors/characterSelectors.js`
**Responsibility**: Character computed state
- Calculates effective stats
- Determines available actions
- Provides character utilities
- Caches computed values
- Optimizes re-renders

### `state/selectors/worldSelectors.js`
**Responsibility**: World computed state
- Calculates location availability
- Determines travel options
- Provides world utilities
- Caches computed values
- Optimizes re-renders

### `state/actions/characterActions.js`
**Responsibility**: Character state actions
- Defines character mutations
- Handles character updates
- Validates character changes
- Provides action creators
- Logs character actions

### `state/actions/worldActions.js`
**Responsibility**: World state actions
- Defines world mutations
- Handles world updates
- Validates world changes
- Provides action creators
- Logs world actions

### `state/slices/characterSlice.ts`
**Responsibility**: Character state slice
- Manages character state
- Provides character actions
- Handles character mutations
- Provides character selectors
- Validates character changes

### `state/slices/worldSlice.ts`
**Responsibility**: World state slice
- Manages world state
- Provides world actions
- Handles world mutations
- Provides world selectors
- Validates world changes

### `state/slices/socialSlice.ts`
**Responsibility**: Social state slice
- Manages social state
- Provides social actions
- Handles social mutations
- Provides social selectors
- Validates social changes

### `state/slices/eventSlice.ts`
**Responsibility**: Event state slice
- Manages event state
- Provides event actions
- Handles event mutations
- Provides event selectors
- Validates event changes

### `state/selectors/characterSelectors.ts`
**Responsibility**: Character computed state
- Calculates effective stats
- Determines available actions
- Provides character utilities
- Caches computed values
- Optimizes re-renders

### `state/selectors/worldSelectors.ts`
**Responsibility**: World computed state
- Calculates location availability
- Determines travel options
- Provides world utilities
- Caches computed values
- Optimizes re-renders

### `state/actions/characterActions.ts`
**Responsibility**: Character state actions
- Defines character mutations
- Handles character updates
- Validates character changes
- Provides action creators
- Logs character actions

### `state/actions/worldActions.ts`
**Responsibility**: World state actions
- Defines world mutations
- Handles world updates
- Validates world changes
- Provides action creators
- Logs world actions

## UI Layer (`ui/`)

### `ui/layout/AppLayout.js`
**Responsibility**: Main app layout
- Provides app shell
- Manages navigation

### `ui/layout/Header.js`
**Responsibility**: Top header region
- Displays title and status information
- Hosts shared header actions

### `ui/layout/Sidebar.js`
**Responsibility**: Side navigation container
- Displays navigation items
- Keeps layout modular

### `ui/screens/character/CharacterScreen.js`
**Responsibility**: Character view screen
- Renders character-facing panels
- Connects character data to UI

### `ui/screens/world/WorldScreen.js`
**Responsibility**: World view screen
- Renders location and timeline data

### `ui/screens/social/SocialScreen.js`
**Responsibility**: Social view screen
- Renders relationship and NPC information

### `ui/screens/events/EventScreen.js`
**Responsibility**: Event view screen
- Displays active and historical events
- Handles responsive layout
- Provides persistent UI
- Manages global modals

### `ui/layout/Header.tsx`
**Responsibility**: App header
- Displays player info
- Shows resources
- Provides quick actions
- Manages header state
- Handles header interactions

### `ui/layout/Sidebar.tsx`
**Responsibility**: App sidebar
- Provides navigation
- Shows menu items
- Handles sidebar state
- Manages sidebar interactions
- Provides quick access

### `ui/screens/character/*.tsx`
**Responsibility**: Character screens
- Character creation
- Character stats
- Character progression
- Character equipment
- Character techniques

### `ui/screens/world/*.tsx`
**Responsibility**: World screens
- World map
- Location view
- Travel interface
- Location actions
- World events

### `ui/screens/social/*.tsx`
**Responsibility**: Social screens
- NPC list
- Relationship view
- Dialogue interface
- Bond progression
- Social events

### `ui/screens/events/*.tsx`
**Responsibility**: Event screens
- Event display
- Event choices
- Event history
- Event calendar
- Event notifications

### `ui/components/common/*.tsx`
**Responsibility**: Common UI components
- Buttons
- Cards
- Modals
- Tooltips
- Progress bars

### `ui/components/character/*.tsx`
**Responsibility**: Character-specific components
- Stat display
- Resource bars
- Attribute editor
- Technique display
- Equipment slots

### `ui/components/world/*.tsx`
**Responsibility**: World-specific components
- Map display
- Location card
- Travel button
- Action list
- Event indicator

### `ui/hooks/useGameState.ts`
**Responsibility**: Game state hook
- Provides game state access
- Handles state subscriptions
- Optimizes re-renders
- Provides state utilities
- Manages state hydration

### `ui/hooks/useTime.ts`
**Responsibility**: Time management hook
- Provides time state
- Handles time updates
- Manages time subscriptions
- Provides time utilities
- Optimizes time re-renders

### `ui/hooks/useEvents.ts`
**Responsibility**: Event management hook
- Provides event state
- Handles event subscriptions
- Manages event triggers
- Provides event utilities
- Optimizes event re-renders

## History Layer (`history/`)

### `history/logger.ts`
**Responsibility**: Action logging
- Logs all player actions
- Compresses log data
- Manages log rotation
- Provides log queries
- Handles log export

### `history/timeline.ts`
**Responsibility**: Timeline visualization
- Renders timeline view
- Filters timeline events
- Handles timeline navigation
- Provides timeline search
- Manages timeline state

### `history/achievements.ts`
**Responsibility**: Achievement tracking
- Tracks achievement progress
- Handles achievement unlocks
- Manages achievement notifications
- Provides achievement utilities
- Validates achievement data

## Utils Layer (`utils/`)

### `utils/format.ts`
**Responsibility**: Formatting utilities
- Number formatting
- Currency formatting
- Percentage formatting
- Duration formatting
- Date formatting

### `utils/random.ts`
**Responsibility**: Seeded RNG
- Provides seeded random
- Handles random state
- Manages random seeding
- Provides random utilities
- Ensures reproducibility

### `utils/validation.ts`
**Responsibility**: Validation utilities
- Validates data structures
- Checks data integrity
- Provides validation errors
- Handles validation rules
- Manages validation state

### `utils/performance.ts`
**Responsibility**: Performance utilities
- Measures performance
- Tracks render times
- Provides performance metrics
- Handles performance logging
- Optimizes performance

## Types Layer (`types/`)

### `types/core.ts`
**Responsibility**: Core type definitions
- Engine types
- Event bus types
- Save manager types
- Migration types
- Core utilities

### `types/domain.ts`
**Responsibility**: Domain type definitions
- Character types
- World types
- Social types
- Event types
- Combat types
- Inventory types

### `types/state.ts`
**Responsibility**: State type definitions
- Store types
- Slice types
- Selector types
- Action types
- State utilities

### `types/ui.ts`
**Responsibility**: UI type definitions
- Component props
- Hook types
- Layout types
- UI utilities
- Component types

## Config Layer (`config/`)

### `config/gameConstants.ts`
**Responsibility**: Game constants
- Combat constants
- Progression constants
- Resource constants
- World constants
- Balance values

### `config/balance.ts`
**Responsibility**: Balance configuration
- Damage formulas
- XP curves
- Drop rates
- Encounter chances
- Economy values

### `config/features.ts`
**Responsibility**: Feature flags
- Enables/disables features
- Controls feature behavior
- Manages feature rollout
- Provides feature utilities
- Handles feature toggles
