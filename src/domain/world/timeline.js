export const TIME_PERIODS = ['morning', 'afternoon', 'night'];
 
export function advanceTimeOfDay(currentDate) {
  const periods = TIME_PERIODS;
  const currentIndex = periods.indexOf(currentDate.timeOfDay);
 
  if (currentIndex < periods.length - 1) {
    return {
      ...currentDate,
      timeOfDay: periods[currentIndex + 1]
    };
  }
 
  // Advance to next day
  return {
    ...currentDate,
    timeOfDay: periods[0],
    day: currentDate.day + 1
  };
}
 
export function getTimePeriodLabel(period) {
  const labels = {
    morning: 'Manhã',
    afternoon: 'Tarde',
    night: 'Noite'
  };
  return labels[period] || period;
}
