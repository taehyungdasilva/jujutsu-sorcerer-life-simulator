export function validateCharacter(data) {
  const errors = [];
 
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Nome é obrigatório');
  }
 
  if (!data.originId) {
    errors.push('Origem é obrigatória');
  }
 
  return {
    valid: errors.length === 0,
    errors
  };
}
 
export function validateSaveData(data) {
  return data && typeof data === 'object' && data.version !== undefined;
}
