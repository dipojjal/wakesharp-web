import { caffeine, clockMinutes, finite, nextAlarm, sleepDebt, sleepTime } from '../lib/tools/calculators';
import { Timer } from '../lib/tools/timer';
import type { ToolCopy } from '../i18n/tools';
import { trackWebsite } from './website-analytics';
for (const root of document.querySelectorAll<HTMLElement>('[data-tool]')) {
  const t: ToolCopy = JSON.parse(root.dataset.copy!);
  const tool = root.dataset.tool!;
  const locale = root.dataset.locale!;
  const form = root.querySelector<HTMLFormElement>('form')!;
  root.querySelector<HTMLFieldSetElement>('[data-controls]')!.disabled = false;
  const error = root.querySelector<HTMLElement>('[data-error]')!;
  const result = root.querySelector<HTMLElement>('[data-result]')!;
  const timer = new Timer();
  const fmt = new Intl.NumberFormat(locale, {maximumFractionDigits:1});
  const read = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value;
  const num = (name: string) => { const v = read(name); if (!v.trim()) throw new Error('empty'); return Number(v); };
  const clock = (minutes: number) => {
    const date = new Date(); date.setHours(0,0,0,0); date.setMinutes(Math.round(minutes));
    return new Intl.DateTimeFormat(locale, { weekday:'short', hour:'numeric', minute:'2-digit' }).format(date);
  };
  function show(rows: [string, string][]) {
    const dl = result.querySelector('dl')!; dl.replaceChildren();
    for (const [label, value] of rows) { const wrap = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; wrap.append(dt,dd); dl.append(wrap); }
    result.hidden = false;
  }
  let audio: AudioContext | undefined;
  let ringInterval: ReturnType<typeof setInterval> | undefined;
  let wakeLock: WakeLockSentinel | undefined;
  let ringing = false;
  async function unlock() {
    audio ??= new AudioContext();
    if (audio.state === 'suspended') await audio.resume();
    if (audio.state !== 'running') throw new Error('audio');
  }
  function beep() {
    if (!audio || audio.state !== 'running') { error.textContent = t.blocked; return; }
    const sound = read('sound'); const frequency = sound === 'bell' ? 880 : sound === 'pulse' ? 660 : 1046;
    const oscillator = audio.createOscillator(), gain = audio.createGain();
    oscillator.connect(gain); gain.connect(audio.destination); oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, audio.currentTime); gain.gain.linearRampToValueAtTime(.15, audio.currentTime + .03); gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .65);
    oscillator.start(); oscillator.stop(audio.currentTime + .7); oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }
  function silence() { clearInterval(ringInterval); ringInterval = undefined; ringing = false; }
  async function release() { const lock = wakeLock; wakeLock = undefined; await lock?.release().catch(() => {}); }
  async function keepAwake() {
    try {
      if (document.visibilityState === 'visible' && !wakeLock && 'wakeLock' in navigator) {
        const lock = await navigator.wakeLock.request('screen'); wakeLock = lock;
        lock.addEventListener('release', () => { if (wakeLock === lock) wakeLock = undefined; });
      }
    }
    catch { error.textContent = t.awake; }
  }
  function render() {
    const ms = timer.tick();
    const output = root.querySelector<HTMLOutputElement>('[data-countdown]');
    if (output) { const seconds = Math.ceil(ms / 1000); output.value = `${Math.floor(seconds / 3600).toString().padStart(2,'0')}:${Math.floor(seconds / 60 % 60).toString().padStart(2,'0')}:${(seconds % 60).toString().padStart(2,'0')}`; }
    for (const button of root.querySelectorAll<HTMLButtonElement>('[data-action]')) {
      const a = button.dataset.action;
      button.disabled = a === 'pause' ? timer.state !== 'running' : a === 'resume' ? timer.state !== 'paused' : a === 'stop' ? timer.state === 'idle' : a === 'snooze' ? timer.state !== 'ringing' : false;
    }
    const status = root.querySelector<HTMLElement>('[data-status]');
    if (status) { const text = timer.state === 'ringing' ? t.ringing : timer.state === 'paused' ? t.pause : timer.state === 'running' ? t.start : t.ready; if (status.textContent !== text) status.textContent = text; }
    if (timer.state === 'ringing' && !ringing) { ringing = true; beep(); ringInterval = setInterval(beep, 1200); trackWebsite('website_tool_completed', {tool}); }
  }
  form.addEventListener('submit', async e => {
    e.preventDefault(); error.textContent = '';
    if (!form.reportValidity()) return;
    try {
      if (tool === 'online-alarm-clock' || tool === 'nap-timer') {
        await unlock(); silence();
        const now = new Date();
        const ms = tool === 'online-alarm-clock' ? nextAlarm(read('time'), now) - now.getTime() : finite(num('duration'), 1, 1440) * 60000;
        timer.start(ms, now.getTime()); void keepAwake(); render();
        if (tool === 'online-alarm-clock') show([[t.wake, new Intl.DateTimeFormat(locale,{weekday:'short',hour:'numeric',minute:'2-digit'}).format(new Date(timer.deadline))]]);
      } else {
        trackWebsite('website_tool_started', {tool});
        if (tool === 'sleep-calculator') {
          const mode = read('mode'); const now = new Date(); const time = mode === 'now' ? now.getHours()*60+now.getMinutes() : clockMinutes(read('time'));
          const targets = [...new Set([num('target'),7,8,9])];
          show(targets.map(h => [`${fmt.format(h)} ${t.hours}`, clock(sleepTime(time,h,num('latency'),mode === 'bedtime' ? 'bedtime' : 'wake'))]));
        } else if (tool === 'sleep-debt-calculator') {
          const d = sleepDebt(Array.from({length:7},(_,i)=>num(`night${i}`)),num('target'));
          show([[t.debt,d.debt],[t.average,d.average],[t.surplus,d.surplus],[t.range,d.range]].map(([label,value]) => [String(label), `${fmt.format(Number(value))} ${t.hours}`]));
        } else {
          const consumed=clockMinutes(read('consumed')); let bed=clockMinutes(read('bedtime')); if (bed<consumed) bed+=1440;
          const half = num('halfLife'); const remaining=caffeine(num('dose'),(bed-consumed)/60,half);
          show([[t.remaining,`${fmt.format(remaining)} mg`],[t.half,clock(consumed+half*60)],[t.quarter,clock(consumed+half*120)],[t.cutoff,clock(bed-half*120)]]);
        }
        trackWebsite('website_tool_completed',{tool}); return;
      }
      trackWebsite('website_tool_started',{tool});
    } catch { error.textContent = tool.includes('alarm') || tool === 'nap-timer' ? t.blocked : t.invalid; }
  });
  form.addEventListener('click', async e => {
    const b = (e.target as Element).closest<HTMLButtonElement>('button'); if (!b) return;
    if (b.dataset.preset) (form.elements.namedItem('duration') as HTMLInputElement).value=b.dataset.preset;
    error.textContent = '';
    try {
      switch (b.dataset.action) {
        case 'test': await unlock(); beep(); break;
        case 'pause': timer.pause(); if (timer.state === 'paused') { silence(); void release(); } break;
        case 'resume': await unlock(); timer.resume(); void keepAwake(); break;
        case 'stop': timer.stop(); silence(); void release(); break;
        case 'snooze': await unlock(); silence(); timer.start(300000); void keepAwake(); break;
      }
      render();
    } catch { error.textContent=t.blocked; }
  });
  if (tool === 'sleep-calculator') form.addEventListener('change', () => { const input=form.elements.namedItem('time') as HTMLInputElement; input.disabled=read('mode')==='now'; });
  if (tool === 'nap-timer' || tool === 'online-alarm-clock') {
    let interval=setInterval(render,250);
    document.addEventListener('visibilitychange',()=> { if(document.visibilityState==='visible'){ if(timer.state==='running'||timer.state==='ringing') void keepAwake(); render(); } });
    window.addEventListener('pagehide',()=>{clearInterval(interval);silence();void release();void audio?.suspend();});
    window.addEventListener('pageshow', e=>{if(e.persisted){interval=setInterval(render,250);render();}});
  }
}
