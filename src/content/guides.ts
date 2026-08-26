import type { GrowthAngle } from '../config/growth';

export interface GuideSource {
  title: string;
  publisher: string;
  url: string;
  checked: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideComparison {
  caption: string;
  headers: [string, string, string];
  rows: Array<[string, string, string]>;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  intent: string;
  angle: GrowthAngle;
  screenshot: 'home' | 'ring' | 'mission' | 'games' | 'reveal' | 'smart' | 'stats';
  screenshotAlt: string;
  platform: { ios: string; android: string };
  sections: GuideSection[];
  comparison?: GuideComparison;
  faq: GuideFaq[];
  sources: GuideSource[];
  related: string[];
}

const CHECKED = 'August 25, 2026';
const APPLE_ALARMKIT = 'https://developer.apple.com/documentation/alarmkit';
const APPLE_ALARM_WWDC = 'https://developer.apple.com/videos/play/wwdc2025/230/';
const APPLE_EVENTKIT = 'https://developer.apple.com/documentation/eventkit/accessing-the-event-store';
const ANDROID_ALARMS = 'https://developer.android.com/develop/background-work/services/alarms';
const ANDROID_DND = 'https://developer.android.com/reference/android/app/NotificationManager';
const ANDROID_HELP = 'https://support.google.com/android/answer/2840926';
const ALARMY_PREMIUM = 'https://alarmy-android.zendesk.com/hc/en-us/articles/900001614846-Let-me-introduce-to-you-Alarmy-Premium-features';
const WAKESHARP_PRIVACY = 'https://wakesharp.app/privacy';

const source = (title: string, publisher: string, url: string): GuideSource => ({
  title,
  publisher,
  url,
  checked: CHECKED,
});

export const GUIDES: Guide[] = [
  {
    slug: 'alarmy-alternative-without-ads',
    title: 'Alarmy alternative without ads: a factual WakeSharp comparison',
    description: 'Compare WakeSharp and Alarmy missions, ads, accounts, alarm delivery, and paid features using current first-party sources.',
    eyebrow: 'Comparison · checked August 2026',
    heading: 'Looking for an Alarmy alternative without ads?',
    intro: 'WakeSharp is a mission alarm with no advertising SDK and no WakeSharp account for core use. Alarmy is a broader sleep-and-alarm product whose own Premium materials include a zero-ads benefit. The useful choice is about product shape, not declaring one app universally better.',
    intent: 'Alarmy alternative without ads',
    angle: 'SHP',
    screenshot: 'mission',
    screenshotAlt: 'WakeSharp math mission on iPhone, using real app UI',
    platform: {
      ios: 'On supported iPhone versions, WakeSharp schedules through Apple AlarmKit after alarm permission is granted.',
      android: 'On Android, WakeSharp uses exact alarms, the alarm audio stream, and a full-screen notification subject to permissions and device settings.',
    },
    sections: [
      {
        heading: 'Where WakeSharp is deliberately narrower',
        paragraphs: ['WakeSharp focuses on a wake mission, optional brain warm-up, local calendar rules, streaks, and Sharpness trends. It does not claim to replace a sleep tracker or offer a social sleep program.'],
        bullets: ['No ads in Free or Plus', 'No WakeSharp login for alarms or free missions', 'Math, object scan, barcode, and walking missions', 'Separate reliability check that labels unknown device states'],
      },
      {
        heading: 'What “without ads” does and does not mean',
        paragraphs: ['It means the WakeSharp binaries and product experience do not contain an ad network or advertising placement. Anonymous product analytics can be disabled in Settings; subscription processing still uses the app stores and RevenueCat. The privacy policy lists those boundaries.'],
      },
    ],
    comparison: {
      caption: 'Product facts from current first-party pages; plans and features can change.',
      headers: ['Question', 'WakeSharp', 'Alarmy'],
      rows: [
        ['Advertising', 'No ads in Free or Plus', 'Alarmy describes zero ads as a Premium benefit'],
        ['Wake missions', 'Math, scan, barcode, or walk', 'Alarmy lists multiple alarm missions'],
        ['Account for core alarm', 'No WakeSharp account', 'Check Alarmy’s current onboarding for its requirements'],
        ['Product breadth', 'Alarm, warm-up, calendar rule, trends', 'Alarm plus broader sleep features'],
      ],
    },
    faq: [
      { question: 'Does WakeSharp reward or require reviews?', answer: 'No. Reviews are separate from referrals, entitlements, and alarm behavior.' },
      { question: 'Can either app guarantee an alarm will sound?', answer: 'No app can overcome a powered-off phone, empty battery, revoked permission, or every manufacturer restriction.' },
    ],
    sources: [
      source('Alarmy Premium features', 'Alarmy Help Center', ALARMY_PREMIUM),
      source('WakeSharp Privacy Policy', 'KineticBit Inc.', WAKESHARP_PRIVACY),
    ],
    related: ['alarm-for-heavy-sleepers', 'math-and-puzzle-alarm-clock', 'privacy-first-alarm-clock'],
  },
  {
    slug: 'why-an-alarm-may-not-go-off',
    title: 'Why an alarm may not go off — a practical phone checklist',
    description: 'Check alarm permission, exact scheduling, notifications, volume, DND, battery, reboot, and power state on iPhone and Android.',
    eyebrow: 'Alarm reliability',
    heading: 'Why an alarm may not go off',
    intro: 'A missed alarm is usually a chain, not one switch: the app must be authorized, the schedule must exist, the operating system must deliver it, and the device must still have power and usable output. Work from the blocking checks downward.',
    intent: 'why alarm may not go off',
    angle: 'REL',
    screenshot: 'home',
    screenshotAlt: 'WakeSharp home screen showing scheduled alarms and the next wake time',
    platform: {
      ios: 'WakeSharp uses AlarmKit, whose alarms require per-app authorization and are presented by iOS.',
      android: 'Android exact alarms require the appropriate alarms-and-reminders capability, and notification or device policy can still affect presentation and sound.',
    },
    sections: [
      {
        heading: 'Check these before bedtime',
        paragraphs: ['Confirm the alarm is enabled and shows the intended next time. Then inspect permission, notifications, alarm volume, DND policy, battery restrictions, and any manufacturer-specific background setting.'],
        bullets: ['Correct day, timezone, and next-fire time', 'Alarm or exact-alarm permission still granted', 'Notifications and lock-screen presentation allowed', 'Alarm stream audible on Android; a test sound is audible on iPhone', 'Phone charged and not powered off'],
      },
      {
        heading: 'After a reboot or app update',
        paragraphs: ['Android alarm apps commonly re-register alarms after boot and package replacement; that path can be affected by device policy. On iPhone, confirm the app still reports the alarm as scheduled. For something critical, use a second independent alarm until the exact device path has been physically tested.'],
      },
    ],
    faq: [
      { question: 'Will an alarm work if the phone is switched off?', answer: 'No. A powered-off phone cannot run an app or play an alarm.' },
      { question: 'Does “scheduled” guarantee sound?', answer: 'No. It proves one part of the chain, not battery, speaker, every system policy, or hardware.' },
    ],
    sources: [
      source('AlarmKit', 'Apple Developer', APPLE_ALARMKIT),
      source('Schedule alarms', 'Android Developers', ANDROID_ALARMS),
      source('Fix alarm issues', 'Google Android Help', ANDROID_HELP),
    ],
    related: ['silent-focus-and-dnd-alarm-behavior', 'how-to-know-an-alarm-is-ready', 'alarm-for-heavy-sleepers'],
  },
  {
    slug: 'silent-focus-and-dnd-alarm-behavior',
    title: 'Silent, Focus, and Do Not Disturb alarm behavior',
    description: 'Understand the platform-specific difference between iPhone AlarmKit alarms and Android exact alarms, DND policy, volume, and notifications.',
    eyebrow: 'iPhone and Android differ',
    heading: 'Silent, Focus, and DND are not one universal alarm rule',
    intro: 'The safe answer must name the platform. Apple’s AlarmKit and Android’s AlarmManager/notification stack have different permission models and different system owners.',
    intent: 'alarm silent focus DND behavior',
    angle: 'REL',
    screenshot: 'ring',
    screenshotAlt: 'WakeSharp alarm presentation using real iPhone app UI',
    platform: {
      ios: 'Apple states that authorized AlarmKit alarms break through silent mode and the current Focus. The person still opts in to alarm access per app.',
      android: 'Exact scheduling does not automatically settle sound or DND. Alarm volume, notification category, policy access, and manufacturer behavior must be checked on the device.',
    },
    sections: [
      {
        heading: 'On iPhone',
        paragraphs: ['WakeSharp hands the schedule and presentation to AlarmKit. iOS owns the system alarm UI and its Stop control. WakeSharp cannot read the current alarm volume as a number, so the app offers a test-sound path instead of painting an unverifiable green check.'],
      },
      {
        heading: 'On Android',
        paragraphs: ['WakeSharp uses exact scheduling for a user-facing alarm. DND and notification policy remain separate controls, and the alarm audio stream has its own volume. A manufacturer may also expose background settings that third-party apps cannot read.'],
      },
    ],
    faq: [
      { question: 'Does Focus silence WakeSharp on iPhone?', answer: 'Apple says an authorized AlarmKit alarm breaks through the current Focus, on supported iPhone versions.' },
      { question: 'Does exact alarm permission bypass Android DND?', answer: 'No. Exact scheduling and interruption policy are different controls.' },
    ],
    sources: [
      source('Wake up to the AlarmKit API', 'Apple Developer', APPLE_ALARM_WWDC),
      source('Schedule alarms', 'Android Developers', ANDROID_ALARMS),
      source('NotificationManager interruption policy', 'Android Developers', ANDROID_DND),
    ],
    related: ['why-an-alarm-may-not-go-off', 'how-to-know-an-alarm-is-ready', 'wakesharp-vs-standard-phone-alarm'],
  },
  {
    slug: 'alarm-for-heavy-sleepers',
    title: 'Alarm for heavy sleepers: missions, guards, and honest limits',
    description: 'Use visible alarm delivery, a wake mission, Strict Mode guards, and a reliability check without impossible-to-dismiss promises.',
    eyebrow: 'Heavy sleeper guide',
    heading: 'A heavy-sleeper alarm needs more than louder marketing',
    intro: 'For persistent sleepers, the useful system is layered: verify the device configuration, choose an appropriate mission, limit automatic snoozing, and keep a backup for critical mornings. No software can prove that a person is awake.',
    intent: 'alarm for heavy sleepers',
    angle: 'HSL',
    screenshot: 'mission',
    screenshotAlt: 'WakeSharp math wake mission with a numeric keypad',
    platform: {
      ios: 'AlarmKit owns the iPhone alarm presentation and system Stop control; Strict Mode schedules additional guards where the platform permits.',
      android: 'WakeSharp can use the alarm stream and full-screen alert when permissions allow, with optional guards and device-specific checks.',
    },
    sections: [
      {
        heading: 'Build a layered wake routine',
        paragraphs: ['Start with the reliability check, place the phone where the selected mission makes sense, and choose a task difficult enough to interrupt autopilot without creating a safety problem.'],
        bullets: ['Math for a fast cognitive interruption', 'Object or barcode scan for movement to a chosen place', 'Walk mission for measured steps', 'Strict Mode guards as extra scheduled opportunities, not a lock-in guarantee'],
      },
      {
        heading: 'What full morning credit means',
        paragraphs: ['WakeSharp grants full streak credit only when a real wake alarm is followed by mission completion within 30 minutes. A system dismiss, missed morning, makeup, wake check, guard, debug run, or warm-up completion is not the same event.'],
      },
    ],
    faq: [
      { question: 'Can WakeSharp remove system dismissal controls?', answer: 'No. System Stop and dismiss controls remain available.' },
      { question: 'What does Strict Mode do?', answer: 'It adds scheduled guard alarms where supported; it does not remove operating-system controls.' },
    ],
    sources: [
      source('AlarmKit', 'Apple Developer', APPLE_ALARMKIT),
      source('Schedule alarms', 'Android Developers', ANDROID_ALARMS),
      source('WakeSharp Privacy Policy', 'KineticBit Inc.', WAKESHARP_PRIVACY),
    ],
    related: ['math-and-puzzle-alarm-clock', 'how-to-know-an-alarm-is-ready', 'why-an-alarm-may-not-go-off'],
  },
  {
    slug: 'math-and-puzzle-alarm-clock',
    title: 'Math and puzzle alarm clock: what the mission should accomplish',
    description: 'Learn how WakeSharp math missions, difficulty, fallback, full credit, warm-up games, and system dismissal work.',
    eyebrow: 'Wake mission design',
    heading: 'A math alarm should interrupt autopilot, not trap you',
    intro: 'The job of a wake mission is to create a deliberate action between hearing the alarm and earning full morning credit. It should remain recoverable if a sensor or camera is unavailable.',
    intent: 'math and puzzle alarm clock',
    angle: 'HSL',
    screenshot: 'games',
    screenshotAlt: 'WakeSharp Memory Match brain game shown after a completed wake mission',
    platform: {
      ios: 'The iPhone system alarm can still be stopped; WakeSharp records whether the mission was completed for credit.',
      android: 'Android system and notification controls remain available; the mission and credit logic live in WakeSharp.',
    },
    sections: [
      {
        heading: 'Mission first, warm-up second',
        paragraphs: ['The alarm mission determines full morning credit. Optional post-mission brain games produce a Sharpness result, but finishing a warm-up alone never turns a missed alarm into a qualifying morning.'],
        bullets: ['Math Sprint is always available as a recoverable fallback', 'Difficulty is selected per alarm', 'Free includes one warm-up game after a mission', 'Plus rotates three warm-up games from the five-game library'],
      },
      {
        heading: 'Choose difficulty for the real morning',
        paragraphs: ['A challenge that is frustrating enough to trigger system dismissal is not automatically better. Start at a level you can finish reliably, then adjust from actual morning outcomes.'],
      },
    ],
    faq: [
      { question: 'Does solving a warm-up count as the wake mission?', answer: 'No. Only the mission attached to the real wake alarm can earn qualifying full credit.' },
      { question: 'What if a scan or motion sensor is unavailable?', answer: 'WakeSharp provides a math fallback so the alarm flow remains recoverable.' },
    ],
    sources: [
      source('AlarmKit alarm configuration', 'Apple Developer', 'https://developer.apple.com/documentation/alarmkit/alarmmanager/alarmconfiguration/alarm(schedule:attributes:stopintent:secondaryintent:sound:)'),
      source('Schedule alarms', 'Android Developers', ANDROID_ALARMS),
      source('WakeSharp Privacy Policy', 'KineticBit Inc.', WAKESHARP_PRIVACY),
    ],
    related: ['alarm-for-heavy-sleepers', 'wake-up-brain-games-and-morning-sharpness', 'wakesharp-vs-standard-phone-alarm'],
  },
  {
    slug: 'wake-before-first-calendar-meeting',
    title: 'Wake before your first calendar meeting or event',
    description: 'Set preparation time before the first morning event, understand local calendar access, refresh timing, and honest scheduling limits.',
    eyebrow: 'Local calendar smart alarm',
    heading: 'Wake before the first event in your morning window',
    intro: 'Instead of copying one meeting time into an alarm every night, a smart rule can calculate a wake time from your local calendar and the preparation time you choose.',
    intent: 'wake before first calendar meeting',
    angle: 'MTG',
    screenshot: 'smart',
    screenshotAlt: 'WakeSharp smart rule editor set before the first morning event',
    platform: {
      ios: 'WakeSharp requests the EventKit access required to read upcoming events. Apple requires explicit permission for event data.',
      android: 'WakeSharp requests calendar permission and reads matching morning events on the device.',
    },
    sections: [
      {
        heading: 'How the rule works',
        paragraphs: ['Choose a lead time and a fallback time. After WakeSharp receives a successful local calendar refresh, it identifies the first qualifying event in the configured morning window and recalculates the alarm. The Home screen shows the next computed time.'],
      },
      {
        heading: 'What happens when a meeting moves',
        paragraphs: ['A changed event can alter the next alarm after the app receives a refresh opportunity and successfully reads the new calendar state. That is not a promise of continuous background monitoring. Check the displayed next time before a critical morning.'],
      },
      {
        heading: 'Privacy boundary',
        paragraphs: ['Calendar titles, attendees, notes, and raw event details are not sent to WakeSharp analytics. Calendar access is optional, and regular alarms continue to work if it is denied.'],
      },
    ],
    faq: [
      { question: 'Does WakeSharp continuously watch my calendar?', answer: 'No. It recalculates after a successful refresh opportunity; check the displayed next alarm for critical events.' },
      { question: 'Does my meeting title leave the phone?', answer: 'No. Calendar contents are excluded from WakeSharp analytics.' },
    ],
    sources: [
      source('Accessing the event store', 'Apple Developer', APPLE_EVENTKIT),
      source('Calendar provider overview', 'Android Developers', 'https://developer.android.com/identity/providers/calendar-provider'),
      source('WakeSharp Privacy Policy', 'KineticBit Inc.', WAKESHARP_PRIVACY),
    ],
    related: ['privacy-first-alarm-clock', 'how-to-know-an-alarm-is-ready', 'why-an-alarm-may-not-go-off'],
  },
  {
    slug: 'how-to-know-an-alarm-is-ready',
    title: 'How to know an alarm is ready before you sleep',
    description: 'Use a readiness check that separates verified pass, warning, failure, and unknown states on iPhone and Android.',
    eyebrow: 'Pre-bed readiness',
    heading: 'Ask “what can the phone verify?” before you sleep',
    intro: 'A green promise is weaker than a transparent report. A useful readiness check distinguishes what passed, what failed, what needs attention, and what the operating system refuses to expose.',
    intent: 'how to know alarm is ready',
    angle: 'REL',
    screenshot: 'home',
    screenshotAlt: 'WakeSharp home screen showing an armed alarm and its next time',
    platform: {
      ios: 'WakeSharp can inspect alarm authorization and its own scheduled records, but iOS does not expose every sound or system state to third-party apps.',
      android: 'WakeSharp can inspect exact-alarm, notification, volume, full-screen, battery, and some policy states; manufacturer-only settings may remain unknown.',
    },
    sections: [
      {
        heading: 'Four honest states',
        paragraphs: ['Pass means the app could read a favorable value. Warning means delivery may degrade. Failure means a known blocker exists. Unknown means the platform did not provide a readable answer; unknown must never be silently upgraded to pass.'],
      },
      {
        heading: 'A short bedtime routine',
        bullets: ['Open Alarm reliability', 'Fix blocking rows first', 'Confirm the intended next-fire time', 'Use Test sound where volume cannot be read', 'Keep a second alarm for an untested critical path'],
        paragraphs: ['Repeat the check after permission changes, OS updates, phone migration, or unusual battery settings.'],
      },
    ],
    faq: [
      { question: 'Does “configuration looks ready” guarantee the morning?', answer: 'No. It means every state WakeSharp could inspect passed; hardware, power, and unreadable policy can still matter.' },
      { question: 'Why show unknown instead of a green check?', answer: 'Because the platform did not provide evidence. Treating absence of evidence as success would manufacture confidence.' },
    ],
    sources: [
      source('AlarmKit', 'Apple Developer', APPLE_ALARMKIT),
      source('Schedule alarms', 'Android Developers', ANDROID_ALARMS),
      source('NotificationManager policy access', 'Android Developers', ANDROID_DND),
    ],
    related: ['why-an-alarm-may-not-go-off', 'silent-focus-and-dnd-alarm-behavior', 'alarm-for-heavy-sleepers'],
  },
  {
    slug: 'wake-up-brain-games-and-morning-sharpness',
    title: 'Wake-up brain games and morning Sharpness',
    description: 'Understand WakeSharp warm-up games, personal baselines, trends, and the difference between a score and a medical claim.',
    eyebrow: 'Post-mission warm-up',
    heading: 'Use brain games as a personal morning signal',
    intro: 'WakeSharp’s post-mission games produce a Sharpness score compared with your own recent mornings. It is a habit and reflection tool, not a diagnosis, intelligence score, or comparison with strangers.',
    intent: 'wake up brain games morning sharpness',
    angle: 'SHP',
    screenshot: 'reveal',
    screenshotAlt: 'WakeSharp daily Sharpness result compared with the user’s recent baseline',
    platform: {
      ios: 'The same scoring domain and five-game catalog are used by the native iPhone app.',
      android: 'The Kotlin app mirrors the scoring domain and game catalog rather than embedding a web game.',
    },
    sections: [
      {
        heading: 'What the score can tell you',
        paragraphs: ['A consistent, short routine can reveal whether today differs from your own recent pattern. The baseline is intentionally personal because device, familiarity, and routine make cross-person comparisons misleading.'],
      },
      {
        heading: 'What it cannot tell you',
        paragraphs: ['Sharpness is not a medical assessment, sleep-stage measurement, or safety clearance. Do not use it to decide whether you are fit to drive, work with machinery, or make a health decision.'],
      },
      {
        heading: 'Free and Plus boundaries',
        paragraphs: ['Free provides a warm-up game after a mission and a seven-day trend. Plus runs three rotating games each morning and unlocks full available history.'],
      },
    ],
    faq: [
      { question: 'Is Sharpness an IQ score?', answer: 'No. It is a personal morning performance signal against your own recent baseline.' },
      { question: 'Does a warm-up count as a successful morning?', answer: 'No. The qualifying event is full-credit completion of the real alarm mission within 30 minutes.' },
    ],
    sources: [
      source('WakeSharp Privacy Policy', 'KineticBit Inc.', WAKESHARP_PRIVACY),
      source('AlarmKit', 'Apple Developer', APPLE_ALARMKIT),
      source('Schedule alarms', 'Android Developers', ANDROID_ALARMS),
    ],
    related: ['math-and-puzzle-alarm-clock', 'privacy-first-alarm-clock', 'wakesharp-vs-standard-phone-alarm'],
  },
  {
    slug: 'privacy-first-alarm-clock',
    title: 'Privacy-first alarm clock: what should stay on your phone',
    description: 'See WakeSharp’s account, calendar, camera, analytics, advertising, attribution, and subscription-data boundaries.',
    eyebrow: 'Privacy by data minimization',
    heading: 'An alarm does not need your identity to wake you',
    intro: 'WakeSharp keeps core alarm use independent of a WakeSharp account. Sensitive feature inputs stay local, while the small set of services that receive data are documented and bounded.',
    intent: 'privacy first alarm clock',
    angle: 'SHP',
    screenshot: 'smart',
    screenshotAlt: 'WakeSharp smart alarm editor explaining local calendar use',
    platform: {
      ios: 'Calendar and camera access use Apple permission boundaries; AlarmKit authorization is separate from analytics.',
      android: 'Calendar, camera, notification, and exact-alarm permissions are requested for their specific product functions.',
    },
    sections: [
      {
        heading: 'Data that stays local',
        bullets: ['Alarm labels and schedules', 'Calendar event contents and meeting details', 'Camera frames from scan missions', 'Raw advertising attribution tokens and Play referrer URLs'],
        paragraphs: ['Raw attribution inputs are normalized and discarded. WakeSharp does not use IDFA, fingerprinting, automatic clipboard reading, or cross-app tracking.'],
      },
      {
        heading: 'Data that can leave the phone',
        paragraphs: ['With analytics enabled, WakeSharp sends bounded, de-identified product and reliability events. The app stores and RevenueCat process purchase and entitlement state. Referral infrastructure, when separately activated, uses anonymous installation credentials and attestation results rather than a WakeSharp profile.'],
      },
      {
        heading: 'Controls and independence',
        paragraphs: ['Analytics can be disabled in Settings. Core alarms and existing free missions do not depend on PostHog, attribution, referrals, RevenueCat availability, or a feature-flag response.'],
      },
    ],
    faq: [
      { question: 'Does WakeSharp upload camera frames?', answer: 'No. Scan mission frames are processed on the device and are not saved by WakeSharp.' },
      { question: 'Does WakeSharp use an advertising ID?', answer: 'No. There is no IDFA, Android advertising ID, fingerprinting, or cross-app tracking in the stated design.' },
    ],
    sources: [
      source('WakeSharp Privacy Policy', 'KineticBit Inc.', WAKESHARP_PRIVACY),
      source('Accessing the event store', 'Apple Developer', APPLE_EVENTKIT),
      source('Calendar provider overview', 'Android Developers', 'https://developer.android.com/identity/providers/calendar-provider'),
    ],
    related: ['wake-before-first-calendar-meeting', 'alarmy-alternative-without-ads', 'wake-up-brain-games-and-morning-sharpness'],
  },
  {
    slug: 'wakesharp-vs-standard-phone-alarm',
    title: 'WakeSharp versus a standard phone alarm',
    description: 'Compare native phone alarms with WakeSharp missions, readiness checks, smart rules, streak credit, warm-ups, and privacy boundaries.',
    eyebrow: 'Choose the simpler or richer tool',
    heading: 'WakeSharp versus a standard phone alarm',
    intro: 'A standard alarm is often the right answer when you need only a time and sound. WakeSharp adds a mission and feedback loop for people who want a more deliberate morning. It still relies on the operating system’s alarm capabilities.',
    intent: 'WakeSharp vs standard phone alarm',
    angle: 'REL',
    screenshot: 'stats',
    screenshotAlt: 'WakeSharp morning trend and streak screen from the real Android app',
    platform: {
      ios: 'WakeSharp schedules through Apple AlarmKit rather than replacing iOS alarm delivery with a private timer.',
      android: 'WakeSharp uses Android exact-alarm and notification primitives for its alarm-clock use case.',
    },
    sections: [
      {
        heading: 'Use the standard alarm when',
        bullets: ['You want the fewest moving parts', 'You do not need a mission or streak credit', 'You prefer the operating system’s built-in settings and integrations'],
        paragraphs: ['There is no virtue in adding a mission to a morning routine that already works.'],
      },
      {
        heading: 'Consider WakeSharp when',
        bullets: ['You repeatedly stop an alarm on autopilot', 'You want a readiness check and repair guidance', 'You want a local first-event rule', 'You value a personal warm-up and trend'],
        paragraphs: ['WakeSharp adds those layers without claiming they defeat every system, power, or hardware limitation.'],
      },
    ],
    comparison: {
      caption: 'A product-shape comparison, not a reliability guarantee.',
      headers: ['Capability', 'WakeSharp', 'Standard phone alarm'],
      rows: [
        ['Basic scheduled sound', 'Yes, through platform alarm APIs', 'Yes'],
        ['Wake mission', 'Yes', 'Usually no'],
        ['Configuration check', 'WakeSharp-specific readiness report', 'Varies by phone'],
        ['First-event rule', 'Optional local calendar rule', 'Varies by phone'],
        ['Sharpness trend', 'Yes', 'Usually no'],
      ],
    },
    faq: [
      { question: 'Is WakeSharp more reliable than every standard alarm?', answer: 'That claim is not made. Reliability depends on platform, permission, device state, and the exact tested path.' },
      { question: 'Should I keep a backup alarm?', answer: 'Yes for anything critical, especially until your exact phone and settings have been physically tested.' },
    ],
    sources: [
      source('AlarmKit', 'Apple Developer', APPLE_ALARMKIT),
      source('Schedule alarms', 'Android Developers', ANDROID_ALARMS),
      source('Fix alarm issues', 'Google Android Help', ANDROID_HELP),
    ],
    related: ['how-to-know-an-alarm-is-ready', 'alarm-for-heavy-sleepers', 'math-and-puzzle-alarm-clock'],
  },
];

export const GUIDE_BY_SLUG = new Map(GUIDES.map((guide) => [guide.slug, guide]));
