export function SocialScreen({ relationships = {} }) {
  return `<section>Relationships: ${Object.keys(relationships).length}</section>`;
}
