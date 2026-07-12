export function createEvent(id, name) {
  return { id, name, triggers: [], conditions: [], effects: [] };
}
