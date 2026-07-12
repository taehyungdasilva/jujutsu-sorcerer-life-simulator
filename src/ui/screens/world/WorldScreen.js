export function WorldScreen({ world }) {
  return `<section>World: ${world?.currentLocation || 'Unknown'}</section>`;
}
