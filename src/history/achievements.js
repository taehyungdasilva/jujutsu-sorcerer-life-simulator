export function createAchievementSystem() {
  const unlocked = new Set();
  const progress = {};
 
  return {
    unlock(id) {
      unlocked.add(id);
    },
 
    isUnlocked(id) {
      return unlocked.has(id);
    },
 
    setProgress(id, value) {
      progress[id] = value;
    },
 
    getProgress(id) {
      return progress[id];
    },
 
    getUnlocked() {
      return Array.from(unlocked);
    }
  };
}
