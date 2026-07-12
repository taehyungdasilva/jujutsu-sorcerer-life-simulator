# Architecture Overview for Large Simulation Game

## Purpose

This document outlines the proposed architecture for scaling the jujutsu-idle project to support:
- Hundreds of events
- Many character origins
- Complex social link systems
- Dynamic timeline management
- Legacy system compatibility
- Historical record tracking

## Key Design Principles

1. **Domain-Driven Design**: Separate business logic from UI and state management
2. **Data-Driven Content**: Static data in JSON files for easy content creation
3. **Single Source of Truth**: Centralized state store with versioned persistence
4. **Event-Driven Architecture**: Pub/sub system for cross-system communication
5. **Immutable State**: All state changes go through named actions
6. **Safe Migrations**: Versioned saves with rollback protection

## Technology Stack

- **State Management**: Zustand (lightweight, no boilerplate)
- **Data Format**: JSON for content, TypeScript for types
- **Persistence**: localStorage with compression
- **Migration**: Versioned save migrations with backups

## Architecture Layers

```
┌─────────────────────────────────────────┐
│           UI Layer (React)              │
│  Screens, Components, Hooks, Layout     │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         State Layer (Zustand)           │
│  Store, Slices, Selectors, Actions      │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         Domain Layer (Pure Logic)       │
│  Character, World, Social, Events, etc. │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│          Data Layer (JSON)              │
│  Origins, Events, NPCs, Locations, etc. │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│          Core Layer (Engine)            │
│  Game Loop, Event Bus, Save Manager     │
└─────────────────────────────────────────┘
```

## Related Documents

- [Folder Structure](./ARCHITECTURE-FOLDER-STRUCTURE.md)
- [File Responsibilities](./ARCHITECTURE-FILE-RESPONSIBILITIES.md)
- [State Management](./ARCHITECTURE-STATE-MANAGEMENT.md)
- [Save Structure](./ARCHITECTURE-SAVE-STRUCTURE.md)
- [Migration Plan](./ARCHITECTURE-MIGRATION-PLAN.md)

## Benefits

1. **Scalability**: Add hundreds of events without code bloat
2. **Maintainability**: Clear file responsibilities make codebase navigable
3. **Testability**: Pure domain logic can be unit tested independently
4. **Extensibility**: New systems fit into existing structure
5. **Data-Driven**: Content creators work without code changes
6. **Safe Migrations**: Versioned saves with rollback protection
7. **Performance**: Compressed history, computed selectors, efficient updates
