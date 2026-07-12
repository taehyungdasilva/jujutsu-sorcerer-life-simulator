export function createCharacter(name) {
  return {
    name,
    level: 1,
    grade: 1,
    attributes: {
      strength: 0,
      agility: 0,
      intelligence: 0
    }
  };
}
