export function createCharacter(data) {
  return {
    name: data.name || 'Unknown',
    originId: data.originId || null,
    clan: data.clan || null,
    level: data.level || 1,
    attributes: {
      forca: data.forca || 0,
      velocidade: data.velocidade || 0,
      reservas: data.reservas || 0,
      controle: data.controle || 0,
      intelecto: data.intelecto || 0,
      resolucao: data.resolucao || 0
    },
    health: data.health || 100,
    stamina: data.stamina || 100,
    cursedEnergy: data.cursedEnergy || 0,
    maxCursedEnergy: data.maxCursedEnergy || 100,
    alive: data.alive !== false
  };
}
 
export function calculateEffectiveStats(character, origin) {
  const stats = { ...character.attributes };
 
  if (origin && origin.stats) {
    Object.keys(origin.stats).forEach(key => {
      if (stats[key] !== undefined) {
        stats[key] += origin.stats[key];
      }
    });
  }
 
  return stats;
}
