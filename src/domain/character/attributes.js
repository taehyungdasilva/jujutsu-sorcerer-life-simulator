export function calculateEffectiveStats(character) {
  return {
    ...character.attributes,
    level: character.level,
    grade: character.grade
  };
}
