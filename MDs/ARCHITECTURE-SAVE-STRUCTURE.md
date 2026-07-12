# Save Structure

## Save Envelope

The save envelope wraps all game state with metadata for versioning and integrity.

```typescript
interface SaveEnvelope {
  version: number                    // Current save version
  savedAt: number                    // Unix timestamp
  playtime: number                   // Total playtime in seconds
  checksum: string                   // Data integrity check (SHA-256)
  
  // Core state
  character: CharacterSaveState
  world: WorldSaveState
  relationships: RelationshipSaveState
  events: EventSaveState
  
  // History (compressed)
  actionLog: CompressedActionLog[]
  eventHistory: CompressedEventLog[]
  
  // Achievements
  achievements: AchievementSaveState
  
  // Metadata
  settings: GameSettings
  flags: FeatureFlags
}
```

## Character Save State

```typescript
interface CharacterSaveState {
  // Identity
  id: string
  name: string
  originId: string
  createdAt: number
  
  // Progression
  level: number
  grade: number
  xp: number
  xpToNextLevel: number
  
  // Attributes
  attributes: {
    strength: number
    agility: number
    intelligence: number
  }
  unspentPoints: number
  
  // Resources
  hp: number
  maxHp: number
  curseEnergy: number
  maxCurseEnergy: number
  stamina: number
  maxStamina: number
  
  // Techniques
  techniqueId: string | null
  knownTechniqueIds: string[]
  unlockedSkills: string[]
  
  // Inventory
  money: number
  inventory: string[]
  equippedWeaponId: string | null
  equippedAccessoryId: string | null
  
  // Progression tracking
  enemiesDefeated: number
  quests: Record<string, QuestProgress>
  
  // Combat state
  combatPosture: CombatPosture
  blackFlashPeakUntil: number | null
  
  // Alive status
  alive: boolean
}
```

## World Save State

```typescript
interface WorldSaveState {
  // Timeline
  currentTick: number
  calendarDate: {
    year: number
    month: number
    day: number
    timeOfDay: TimeOfDay
  }
  season: Season
  dayCount: number
  
  // Location
  currentLayerId: string
  currentLocationId: string
  
  // Time budget
  timeRemaining: number
  maxTimePerDay: number
}
```

## Relationship Save State

```typescript
interface RelationshipSaveState {
  [npcId: string]: {
    trust: number
    tier: number
    dialogueIndex: number
    lastVisited: number
  }
}
```

## Event Save State

```typescript
interface EventSaveState {
  activeEvents: ActiveEvent[]
  triggeredEvents: string[]
  completedEvents: string[]
  blockedEvents: string[]
}

interface ActiveEvent {
  eventId: string
  triggeredAt: number
  expiresAt: number | null
  data: Record<string, unknown>
}
```

## Quest Progress

```typescript
interface QuestProgress {
  status: 'available' | 'active' | 'completed'
  progress: number
  completedAt?: number
}
```

## Action Log (Compressed)

Action logs track all player actions for timeline visualization and debugging. Compression reduces storage overhead.

```typescript
interface CompressedActionLog {
  t: number        // timestamp (tick)
  a: string        // action type (enum)
  d: unknown       // data (compressed)
}

// Example
{
  t: 12345,
  a: 'travel',
  d: { to: 'tokyo', cost: 2 }
}
```

## Event History (Compressed)

Event history tracks all triggered events for timeline visualization.

```typescript
interface CompressedEventLog {
  t: number        // timestamp (tick)
  e: string        // event id
  o: string        // outcome (success/failure/etc)
  d: unknown       // data (compressed)
}

// Example
{
  t: 12345,
  e: 'meet_gojo',
  o: 'success',
  d: { trustGained: 1 }
}
```

## Achievement Save State

```typescript
interface AchievementSaveState {
  unlocked: string[]
  progress: Record<string, number>
  lastNotified: number | null
}
```

## Game Settings

```typescript
interface GameSettings {
  audio: {
    musicVolume: number
    sfxVolume: number
    musicEnabled: boolean
    sfxEnabled: boolean
  }
  display: {
    theme: 'dark' | 'light'
    fontSize: 'small' | 'medium' | 'large'
    animationsEnabled: boolean
  }
  gameplay: {
    autoSave: boolean
    autoSaveInterval: number
    difficulty: 'normal' | 'hard' | 'expert'
  }
}
```

## Feature Flags

```typescript
interface FeatureFlags {
  experimentalCombat: boolean
  newEventSystem: boolean
  enhancedSocialLinks: boolean
  timelineVisualization: boolean
}
```

## Compression Strategy

### Action Log Compression

```typescript
// history/logger.ts
interface ActionLog {
  timestamp: number
  type: string
  data: Record<string, unknown>
}

interface CompressedActionLog {
  t: number
  a: string
  d: unknown
}

// Compression function
function compressActionLog(log: ActionLog[]): CompressedActionLog[] {
  return log.map(entry => ({
    t: entry.timestamp,
    a: entry.type,
    d: compressData(entry.data)
  }))
}

// Decompression function
function decompressActionLog(log: CompressedActionLog[]): ActionLog[] {
  return log.map(entry => ({
    timestamp: entry.t,
    type: entry.a,
    data: decompressData(entry.d)
  }))
}

// Data compression (simple example)
function compressData(data: Record<string, unknown>): unknown {
  // Replace long keys with short codes
  const keyMap: Record<string, string> = {
    'locationId': 'l',
    'npcId': 'n',
    'techniqueId': 't',
    'itemId': 'i'
  }
  
  const compressed: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    const shortKey = keyMap[key] || key
    compressed[shortKey] = value
  }
  
  return compressed
}
```

### Log Trimming

Keep only recent detailed logs, aggregate older entries:

```typescript
function trimActionLog(log: ActionLog[]): ActionLog[] {
  const MAX_DETAILED_LOGS = 1000
  const AGGREGATION_INTERVAL = 100 // ticks
  
  if (log.length <= MAX_DETAILED_LOGS) {
    return log
  }
  
  // Keep recent detailed logs
  const recent = log.slice(-MAX_DETAILED_LOGS)
  
  // Aggregate older logs
  const old = log.slice(0, -MAX_DETAILED_LOGS)
  const aggregated = aggregateActions(old, AGGREGATION_INTERVAL)
  
  return [...aggregated, ...recent]
}

function aggregateActions(log: ActionLog[], interval: number): ActionLog[] {
  const aggregated: ActionLog[] = []
  
  for (let i = 0; i < log.length; i += interval) {
    const chunk = log.slice(i, i + interval)
    const summary = summarizeActions(chunk)
    aggregated.push(summary)
  }
  
  return aggregated
}

function summarizeActions(actions: ActionLog[]): ActionLog {
  const actionCounts = actions.reduce((acc, action) => {
    acc[action.type] = (acc[action.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    timestamp: actions[0].timestamp,
    type: 'aggregated',
    data: { actionCounts, count: actions.length }
  }
}
```

## Checksum Calculation

```typescript
// core/saveManager.ts
import crypto from 'crypto'

function calculateChecksum(data: unknown): string {
  const str = JSON.stringify(data)
  return crypto.createHash('sha256').update(str).digest('hex')
}

function validateChecksum(envelope: SaveEnvelope): boolean {
  const { checksum, ...data } = envelope
  const calculated = calculateChecksum(data)
  return calculated === checksum
}
```

## Save Size Optimization

### Strategies

1. **Use numeric enums instead of strings**
```typescript
// Bad - uses more space
type Action = 'travel' | 'combat' | 'rest'

// Good - uses less space
enum Action {
  Travel = 0,
  Combat = 1,
  Rest = 2
}
```

2. **Store IDs instead of full objects**
```typescript
// Bad - stores full NPC data
relationships: {
  gojo: {
    name: 'Satoru Gojo',
    title: 'Feiticeiro de Grau Especial',
    // ... full NPC data
  }
}

// Good - stores only ID and relationship data
relationships: {
  gojo: {
    trust: 5,
    tier: 2,
    dialogueIndex: 3
  }
}
```

3. **Use arrays instead of objects for ordered data**
```typescript
// Bad - object keys are strings
inventory: {
  'sword_1': true,
  'potion_5': true
}

// Good - array of IDs
inventory: ['sword_1', 'potion_5']
```

4. **Remove null/undefined values**
```typescript
// Bad - includes nulls
{
  techniqueId: null,
  equippedWeaponId: null,
  equippedAccessoryId: null
}

// Good - omit nulls
{
  // techniqueId omitted if null
  // equippedWeaponId omitted if null
  // equippedAccessoryId omitted if null
}
```

## Save Slots

Support multiple save slots:

```typescript
// core/saveManager.ts
interface SaveSlot {
  id: string
  name: string
  envelope: SaveEnvelope
  createdAt: number
  updatedAt: number
  playtime: number
  screenshot?: string // base64 encoded
}

class SaveManager {
  private readonly MAX_SLOTS = 5
  
  getSlots(): SaveSlot[] {
    const data = localStorage.getItem('jujutsu-save-slots')
    return data ? JSON.parse(data) : []
  }
  
  saveToSlot(slotId: string, envelope: SaveEnvelope, name: string) {
    const slots = this.getSlots()
    const existingIndex = slots.findIndex(s => s.id === slotId)
    
    const slot: SaveSlot = {
      id: slotId,
      name,
      envelope,
      createdAt: existingIndex >= 0 ? slots[existingIndex].createdAt : Date.now(),
      updatedAt: Date.now(),
      playtime: envelope.playtime
    }
    
    if (existingIndex >= 0) {
      slots[existingIndex] = slot
    } else if (slots.length < this.MAX_SLOTS) {
      slots.push(slot)
    } else {
      throw new Error('No save slots available')
    }
    
    localStorage.setItem('jujutsu-save-slots', JSON.stringify(slots))
  }
  
  loadFromSlot(slotId: string): SaveEnvelope | null {
    const slots = this.getSlots()
    const slot = slots.find(s => s.id === slotId)
    return slot?.envelope || null
  }
  
  deleteSlot(slotId: string) {
    const slots = this.getSlots()
    const filtered = slots.filter(s => s.id !== slotId)
    localStorage.setItem('jujutsu-save-slots', JSON.stringify(filtered))
  }
}
```

## Auto-Save

```typescript
// core/saveManager.ts
class SaveManager {
  private autoSaveInterval: number | null = null
  
  enableAutoSave(intervalMs: number, getSave: () => SaveEnvelope) {
    this.disableAutoSave()
    
    this.autoSaveInterval = window.setInterval(() => {
      const envelope = getSave()
      this.saveToSlot('autosave', envelope, 'Auto Save')
    }, intervalMs)
  }
  
  disableAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval)
      this.autoSaveInterval = null
    }
  }
}
```

## Export/Import

```typescript
// core/saveManager.ts
class SaveManager {
  exportSave(slotId: string): string {
    const envelope = this.loadFromSlot(slotId)
    if (!envelope) throw new Error('Save not found')
    
    return JSON.stringify(envelope)
  }
  
  importSave(data: string): SaveEnvelope {
    const envelope = JSON.parse(data)
    
    if (!this.validateEnvelope(envelope)) {
      throw new Error('Invalid save data')
    }
    
    return envelope
  }
  
  private validateEnvelope(envelope: unknown): envelope is SaveEnvelope {
    // Type guard implementation
    return (
      typeof envelope === 'object' &&
      envelope !== null &&
      'version' in envelope &&
      'character' in envelope &&
      'world' in envelope
    )
  }
}
```

## Cloud Save (Optional)

```typescript
// core/saveManager.ts
interface CloudSaveProvider {
  save(slotId: string, data: string): Promise<void>
  load(slotId: string): Promise<string | null>
  listSlots(): Promise<string[]>
}

class SaveManager {
  private cloudProvider?: CloudSaveProvider
  
  setCloudProvider(provider: CloudSaveProvider) {
    this.cloudProvider = provider
  }
  
  async syncToCloud(slotId: string): Promise<void> {
    if (!this.cloudProvider) return
    
    const data = this.exportSave(slotId)
    await this.cloudProvider.save(slotId, data)
  }
  
  async syncFromCloud(slotId: string): Promise<void> {
    if (!this.cloudProvider) return
    
    const data = await this.cloudProvider.load(slotId)
    if (data) {
      const envelope = this.importSave(data)
      this.saveToSlot(slotId, envelope, `Cloud: ${slotId}`)
    }
  }
}
```

## Summary

The save structure provides:

1. **Versioning**: Clear version field for migrations
2. **Integrity**: Checksum validation for corruption detection
3. **Compression**: Reduced storage via log compression and trimming
4. **Optimization**: Space-efficient data structures
5. **Flexibility**: Multiple save slots with metadata
6. **Portability**: Export/import for backup and sharing
7. **Extensibility**: Optional cloud save support
