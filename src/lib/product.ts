/** Public product facts verified against iPhone 2.14 build 262, 2026-09-28.
 * DeviceValidation.squatsReleased is false. Catalog supportsMission is NOT a
 * visibility rule. Retired serial_sevens resolves to math_sprint in the app. */
export const RELEASE = { version: '2.14', build: 262, status: 'preview', publicIOS: '2.10', checked: '2026-09-28' } as const;
const definitions = [
  ['math_sprint', 'mind', 'math-alarm-clock'],
  ['memory_match', 'mind', 'puzzle-alarm-clock'],
  ['sequence_recall', 'mind', 'puzzle-alarm-clock'],
  ['colour_clash', 'mind', 'puzzle-alarm-clock'],
  ['type_quote', 'mind', 'puzzle-alarm-clock'],
  ['photo_proof', 'camera', 'photo-alarm-clock'],
  ['object_scan', 'camera', 'object-scan-alarm'],
  ['fetch', 'camera', 'photo-alarm-clock'],
  ['face_check', 'camera', 'photo-alarm-clock'],
  ['fruit_slash', 'camera', 'photo-alarm-clock'],
  ['walk_steps', 'movement', 'walking-alarm-clock'],
  ['first_light', 'movement', 'walking-alarm-clock'],
  ['name_five', 'voice', 'puzzle-alarm-clock'],
  ['surprise', 'random', 'puzzle-alarm-clock'],
] as const;
export const MISSIONS = definitions.map(([id, group, feature]) => ({ id, group, feature, public: true, availableIn: '2.14', platform: 'ios' } as const));
export const HIDDEN_MISSIONS = [
  { id: 'squats', public: false, reason: 'production gate remains disabled in 2.14' },
  { id: 'serial_sevens', public: false, reason: 'retired; migrated to math_sprint' },
] as const;
export const WARMUP_ONLY = ['word_dash', 'reaction_tap'] as const;
export const publicMissions = () => MISSIONS.filter(m => m.public && m.availableIn === RELEASE.version);
export const FEATURE_SLUGS = ['loud-alarm-clock','object-scan-alarm','math-alarm-clock','puzzle-alarm-clock','photo-alarm-clock','walking-alarm-clock','calendar-alarm-clock','shift-work-alarm-clock','sharpness-score'] as const;
