export type TimerState = 'idle' | 'running' | 'paused' | 'ringing';
/** Absolute deadlines survive throttled render intervals. No background reliability claim. */
export class Timer {
  state: TimerState = 'idle';
  deadline = 0;
  remaining = 0;
  start(ms: number, now = Date.now()) { if (!Number.isFinite(ms) || ms <= 0) throw new RangeError('Invalid duration'); this.deadline = now + ms; this.remaining = ms; this.state = 'running'; }
  tick(now = Date.now()) { if (this.state === 'running') { this.remaining = Math.max(0, this.deadline - now); if (!this.remaining) this.state = 'ringing'; } return this.remaining; }
  pause(now = Date.now()) { this.tick(now); if (this.state === 'running') this.state = 'paused'; }
  resume(now = Date.now()) { if (this.state === 'paused') this.start(this.remaining, now); }
  stop() { this.state = 'idle'; this.remaining = 0; this.deadline = 0; }
}
