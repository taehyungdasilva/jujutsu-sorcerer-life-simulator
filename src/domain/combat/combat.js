export function calculateDamage(attacker, defender) {
  return Math.max(1, attacker.power - defender.defense);
}
