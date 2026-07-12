export function CharacterCard({ character }) {
  return `<div class="character-card">${character?.name || 'Unknown'}</div>`;
}
