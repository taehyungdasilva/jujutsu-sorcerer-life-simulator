export function createLogger() {
  const log = [];
 
  return {
    log(action, data = {}) {
      log.push({
        timestamp: Date.now(),
        action,
        data
      });
    },
 
    getLog() {
      return [...log];
    },
 
    clear() {
      log.length = 0;
    }
  };
}
