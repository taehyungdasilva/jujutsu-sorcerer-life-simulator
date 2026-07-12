export function createTimeline() {
  const events = [];
 
  return {
    addEvent(event) {
      events.push({
        ...event,
        timestamp: Date.now()
      });
    },
 
    getEvents() {
      return [...events];
    },
 
    getEventsByType(type) {
      return events.filter(e => e.type === type);
    }
  };
}
