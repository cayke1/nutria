export function isToday(date: Date | string): boolean {
    const target = new Date(date);
    const now = new Date(Date.now());
  
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  
    return target >= startOfToday && target < startOfTomorrow;
  }
  