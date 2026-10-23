/**
 * Public product facts: which release each store serves and which missions
 * the site may name. Checked 2026-10-22 against the stores and the app repo.
 *
 * The App Store serves 2.25 (itunes.apple.com/lookup?id=6801198703, released
 * 2026-10-21). Google Play still serves 2.9: nothing later was ever uploaded
 * (app repo, Docs/PLAY-STORE-METADATA.md), so the site names both versions
 * and marks what 2.9 lacks as iPhone. Squats is public since the server
 * unlock of 2026-10-14 and the 2.21 builds (DeviceValidation.squatsReleased,
 * ReferralReward.missionLockInEffect = false); Push-ups shipped in 2.18 with
 * no gate. The warm-up games have no entry point in the app since iOS 2.23,
 * so they are not offered. Retired serial_sevens resolves to math_sprint.
 */
export const RELEASE = {
  /** The newest public release, the one the copy describes. */
  version: '2.25',
  status: 'live',
  publicIOS: '2.25',
  /** Play production, fully rolled out since 2026-09-11; its upload key was lost on 2026-09-23. */
  publicAndroid: '2.9',
  checked: '2026-10-22',
} as const;
const definitions = [
  ['math_sprint', 'mind', 'math-alarm-clock', '2.14'],
  ['memory_match', 'mind', 'puzzle-alarm-clock', '2.14'],
  ['sequence_recall', 'mind', 'puzzle-alarm-clock', '2.14'],
  ['colour_clash', 'mind', 'puzzle-alarm-clock', '2.14'],
  ['type_quote', 'mind', 'puzzle-alarm-clock', '2.14'],
  ['photo_proof', 'camera', 'photo-alarm-clock', '2.14'],
  ['object_scan', 'camera', 'object-scan-alarm', '2.14'],
  ['fetch', 'camera', 'photo-alarm-clock', '2.14'],
  ['face_check', 'camera', 'photo-alarm-clock', '2.14'],
  ['fruit_slash', 'camera', 'photo-alarm-clock', '2.14'],
  ['walk_steps', 'movement', 'walking-alarm-clock', '2.14'],
  ['first_light', 'movement', 'walking-alarm-clock', '2.14'],
  ['squats', 'movement', 'walking-alarm-clock', '2.21'],
  ['push_ups', 'movement', 'walking-alarm-clock', '2.18'],
  ['name_five', 'voice', 'puzzle-alarm-clock', '2.14'],
  ['surprise', 'random', 'puzzle-alarm-clock', '2.14'],
] as const;
/** `since` is the first public iPhone release that offered the mission to every subscriber. */
export const MISSIONS = definitions.map(([id, group, feature, since]) => ({ id, group, feature, public: true, since, platform: 'ios' } as const));
/** Missions Google Play's current release (2.9) does not have: say "iPhone" beside them. */
export const IPHONE_ONLY_MISSIONS = ['squats', 'push_ups'] as const;
export const HIDDEN_MISSIONS = [
  { id: 'serial_sevens', public: false, reason: 'retired; migrated to math_sprint' },
] as const;
/** Listed in the app's catalog but not reachable: the Sharpness warm-up has no entry point since iOS 2.23. */
export const WARMUP_ONLY = ['word_dash', 'reaction_tap'] as const;
const compare = (a: string, b: string) => a.localeCompare(b, 'en', { numeric: true });
export const publicMissions = () => MISSIONS.filter(m => m.public && compare(m.since, RELEASE.version) <= 0);
export const FEATURE_SLUGS = ['loud-alarm-clock','object-scan-alarm','math-alarm-clock','puzzle-alarm-clock','photo-alarm-clock','walking-alarm-clock','calendar-alarm-clock','shift-work-alarm-clock','sharpness-score'] as const;
