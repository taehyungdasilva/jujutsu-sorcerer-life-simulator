export function gainExperience(character, xp) {
  return {
    ...character,
    level: character.level + Math.floor(xp / 100)
  };
}
