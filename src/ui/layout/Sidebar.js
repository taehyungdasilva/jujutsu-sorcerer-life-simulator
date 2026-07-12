export function Sidebar({ items = [] }) {
  return `<aside class="app-sidebar">${items.map((item) => `<div>${item}</div>`).join('')}</aside>`;
}
