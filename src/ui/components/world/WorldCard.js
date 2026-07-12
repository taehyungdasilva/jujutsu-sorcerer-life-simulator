export function WorldCard({ world }) {
  return `<div class="world-card">${world?.currentLocation || 'Unknown'}</div>`;
}
