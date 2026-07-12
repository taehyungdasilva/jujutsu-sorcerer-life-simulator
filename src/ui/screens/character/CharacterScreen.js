export function CharacterScreen({ character }) {
  return `<section>Character: ${character?.name || 'Unknown'}</section>`;
}
