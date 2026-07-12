export function calculateCombatPower(character, enemy) {
  const characterPower = character.attributes.forca * 0.4 + 
                         character.attributes.velocidade * 0.3 +
                         character.attributes.resolucao * 0.3;
 
  const enemyPower = enemy.threat || 50;
 
  return {
    character: characterPower,
    enemy: enemyPower,
    ratio: characterPower / enemyPower
  };
}
 
export function resolveCombat(character, enemy) {
  const power = calculateCombatPower(character, enemy);
  const successChance = Math.min(0.95, Math.max(0.05, power.ratio * 0.6 + 0.2));
  const roll = Math.random();
 
  const success = roll < successChance;
 
  return {
    success,
    damage: success ? Math.floor(enemy.threat * 0.3) : Math.floor(enemy.threat * 0.8),
    outcome: success ? 'victory' : 'defeat'
  };
}
