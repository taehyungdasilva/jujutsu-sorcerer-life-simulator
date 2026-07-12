export function createTimeline() {
  return {
    currentTick: 0,
    advance(ticks = 1) {
      this.currentTick += ticks;
      return this.currentTick;
    }
  };
}
