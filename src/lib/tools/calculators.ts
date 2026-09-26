export function finite(n: number, min: number, max: number): number {
  if (!Number.isFinite(n) || n < min || n > max) throw new RangeError('Invalid input');
  return n;
}
export function clockMinutes(value: string): number {
  if (!/^\d{2}:\d{2}$/.test(value)) throw new RangeError('Invalid time');
  const [h, m] = value.split(':').map(Number);
  return finite(h, 0, 23) * 60 + finite(m, 0, 59);
}
export function sleepTime(time: number, hours: number, latency: number, mode: 'bedtime' | 'wake'): number {
  finite(time, 0, 1439); finite(hours, 1, 16); finite(latency, 0, 120);
  return time + (mode === 'bedtime' ? -1 : 1) * (hours * 60 + latency);
}
export function sleepDebt(nights: number[], target: number) {
  finite(target, 1, 16);
  if (nights.length !== 7) throw new RangeError('Seven nights required');
  nights.forEach(n => finite(n, 0, 24));
  return { debt: nights.reduce((s, n) => s + Math.max(target - n, 0), 0), surplus: nights.reduce((s, n) => s + Math.max(n - target, 0), 0), average: nights.reduce((s, n) => s + n, 0) / 7, range: Math.max(...nights) - Math.min(...nights) };
}
export function caffeine(dose: number, elapsed: number, halfLife: number) {
  finite(dose, 0, 2000); finite(elapsed, 0, 48); finite(halfLife, 1, 24);
  return dose * Math.pow(0.5, elapsed / halfLife);
}
export function nextAlarm(time: string, now: Date): number {
  const minutes = clockMinutes(time);
  const date = new Date(now);
  date.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  if (date.getTime() <= now.getTime()) date.setDate(date.getDate() + 1);
  return date.getTime();
}
