#!/usr/bin/env node
/**
 * Guard the marketing copy against claims the app does not actually make good on.
 *
 * This exists because the shipped apps' own paywall copy once drifted from the
 * code — it advertised "All 5 warm-up games" and "Lark scenes" when neither was
 * true. The app has since fixed its own copy; several bans below were retired
 * when the feature caught up with the claim, and the ones that remain are the
 * ones the code still contradicts. Each `why` cites the constant or the file
 * that settles it, so the next person can re-derive the decision instead of
 * trusting this comment.
 *
 * It also enforces the platform-scoping rule the app repo already applies to
 * store screenshots (tools/screenshots/verify.py fails the build if "Focus" or
 * "AlarmKit" appear in Play copy). Marketing claims about how the alarm rings
 * must name the platform they are true of.
 *
 * Localized pages (dist/<locale>.html and dist/<locale>/…) get their own pass:
 * the English phrase rules cannot see a Turkish sentence, so each locale carries
 * a seed list of the claims that matter most, every locale must be built in
 * full, and no English sentence may survive untranslated. The registry in
 * src/i18n/config.ts says which locales exist, which is why this runs under tsx.
 *
 *   npm run copy        # checks dist/ after a build
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LOCALE, enabledLocales } from '../src/i18n/config';
import { SITE } from '../src/config/site';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

/**
 * Substrings that must never appear in rendered text.
 *
 * An entry is either a plain `needle` (substring, lowercased) or a `re`. Adding
 * `unless` makes the rule skip a match whose SENTENCE also matches it — the
 * sentence being the text back to the previous [.!?;]. That exists because the
 * honest sentence and the false one often share a noun: "scanning a barcode in
 * the kitchen" must fail while "there is no barcode mission" must pass, and no
 * amount of word-boundary tuning separates those two.
 */
const BANNED = [
  // ── how the app is sold (2.10) ─────────────────────────────────────────
  // There is no free tier: the app is sold as WakeSharp Unlimited, yearly with
  // a free trial for eligible new subscribers or monthly without one, and it
  // shows no ads. claims-matrix.md rules every free-tier sentence Prohibited
  // and says to remove "Your alarm rings free, forever" from the site; Lifetime
  // is no longer sold (existing purchases stay valid). Approved wording:
  // "Start a 7-day free trial of WakeSharp Unlimited." and "WakeSharp shows no
  // ads." The trial always travels with the price that follows it.
  { needle: 'every alarm and every mission', why: 'no free tier (claims-matrix.md) — every mission comes with WakeSharp Unlimited' },
  { needle: 'every mission is free', why: 'no free tier (claims-matrix.md)' },
  { needle: 'every mission stays free', why: 'no free tier (claims-matrix.md)' },
  { needle: 'nothing that wakes you up is ever behind', why: 'no free tier — the whole app is WakeSharp Unlimited' },
  { re: /\bfree,? forever\b/g, why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited and says to remove it from the site' },
  { needle: 'rings free', why: 'no free tier (claims-matrix.md)' },
  { re: /\bfree (?:tier|plan|version)\b/g, unless: /\b(?:earlier|removed|no longer|there is no|isn’t|isn't)\b/, why: 'no free tier since 2.10 (claims-matrix.md)' },
  { re: /\bfree missions?\b/g, why: 'no free tier — every mission comes with WakeSharp Unlimited' },
  { re: /\bbanner ads?\b/g, unless: /\b(?:earlier|removed|no longer)\b/, why: 'no ad SDK ships — "WakeSharp shows no ads." (claims-matrix.md)' },
  { re: /\bplus (?:removes|is ad-free)\b|\bad-free with plus\b/g, why: 'there is no ad-supported tier to contrast against (claims-matrix.md)' },
  { needle: 'lifetime plan', why: 'Lifetime is no longer sold; only purchases already made stay valid (Terms section 4)' },

  // ── a mission that never shipped ───────────────────────────────────────
  // GameRegistry.MissionRoute has six cases and code_scan is not one of them.
  // Barcodes and QR codes exist only as targets registered under "My spots &
  // codes" INSIDE Scan an Object, which is why the ban is on the affirmative
  // phrasings rather than on the bare word: /support legitimately explains what
  // a registered code actually is.
  { re: /\bscan(?:ning)? a (?:bar ?code|qr code)\b/g, why: 'no barcode mission exists — GameRegistry.MissionRoute has no code_scan; a code is a target inside Scan an Object' },
  { re: /\bbar ?code mission\b|\bqr[- ]?code mission\b/g, unless: /\b(?:no|not|never|isn’t|isn't|does ?n’t|does ?n't|cannot|can’t|can't)\b/, why: 'no barcode mission exists — GameRegistry.MissionRoute has no code_scan' },
  { re: /\bscan(?:ning)? a code\b/g, unless: /spots ?(?:&|and) ?codes|as a target|that specific target/, why: 'a registered code is a target inside Scan an Object, not a mission — say "scan a real object"' },

  // ── absolute dismissal ─────────────────────────────────────────────────
  // Prohibited in claims-matrix.md: the OS exits exist on both platforms
  // (switching the phone off, force-stopping on Android, revoking the alarm
  // permission), and how the alarm comes back after a snooze or a stop changed
  // between 2.10 and 2.12 — so the site describes the mission, never a promise
  // that the alarm cannot end. Strict Mode was retired in 2.12.
  // The apostrophe variants are both spelled out on purpose: the site renders
  // U+2019 and strip() does not normalise it, so an ASCII-only needle would
  // silently never match.
  { needle: 'impossible to dismiss', why: 'the system Stop control exists on both platforms — Prohibited, claims-matrix.md' },
  { needle: 'the only way out', why: 'the system Stop control exists on both platforms — Prohibited, claims-matrix.md' },
  { re: /\b(?:won’t|won't|will not|doesn’t|doesn't|does not) stop until\b/g, why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
  { re: /\b(?:keeps?|kept) ringing until\b|\bre-?rings? until\b/g, why: '"keeps ringing" reads as continuous sound and the OS exits exist — Prohibited, claims-matrix.md' },
  { needle: 'strict mode', why: 'retired in 2.12 (claims-matrix.md), and version-dependent before that — describe the mission, not the re-rings' },
  // Do Not Disturb silences the alarm when its exceptions leave alarms out,
  // and Total Silence always does (claims-matrix.md, G6-01).
  { re: /\bdo not disturb (?:does(?:n’t|n't| not)|never) silences?\b/g, why: 'Do Not Disturb can silence it — say "through Do Not Disturb when it allows alarms" (claims-matrix.md)' },
  { re: /\bthrough do not disturb\b/g, unless: /allows alarms/, why: 'never "through Do Not Disturb" on its own — add "when it allows alarms" (claims-matrix.md)' },
  { re: /\bno tracking\b|\bdoes(?:n’t|n't| not) track you\b/g, why: 'claims-matrix.md: never "no tracking" — say what happens: "With your permission, WakeSharp learns which ad brought you here."' },
  { re: /until you(?:’ve| have|'ve)? (?:prove|proved|proven)\b/g, why: '"keeps ringing until you prove you are up" is Prohibited in claims-matrix.md' },

  // ── wallpapers ─────────────────────────────────────────────────────────
  // Every scene and wallpaper is included with Unlimited; there is no free set
  // (claims-matrix.md), so no free/paid wallpaper split may be described.
  { re: /\bfree (?:alarm )?wallpapers?\b|\bwallpapers? (?:are |is )?free\b/g, why: 'every wallpaper and scene is included with WakeSharp Unlimited; there is no free set (claims-matrix.md)' },

  // ── built but dark, or not built ───────────────────────────────────────
  // Wake Squad does not exist, and every referral route answers 503
  // referrals_disabled until Gate C. Advertising either is selling a 503.
  { needle: 'wake squad', why: 'not built — referral-spec.md records it as unbuilt' },
  { re: /\brefer a friend\b|\breferral (?:programme|program|bonus|reward|link)\b/g, why: 'every referral route answers 503 referrals_disabled (api/_lib/referrals.ts); Gate C not passed' },

  // GameRegistry.dailyPremiumGameCount is 3, and warmupPlan(excluding:) drops
  // whatever the mission just played. A subscriber does meet all five games in a
  // morning — four in the warm-up, one as the mission — but never five *warm-up*
  // games. The app's own paywall retired this phrasing; the site must not revive it.
  { needle: 'all five games', why: 'GameRegistry.dailyPremiumGameCount = 3; the warm-up never runs five' },
  { needle: 'all 5 games', why: 'GameRegistry.dailyPremiumGameCount = 3' },
  { needle: 'all 5 warm-up games', why: 'GameRegistry.dailyPremiumGameCount = 3' },
  { needle: 'celebration styles', why: 'celebrations ship attached to a Lark scene (LarkScene.celebration); there is no separate picker' },
  // Both live listings say "unlimited alarms" in their 80-character summary. The
  // site has room to be exact and AlarmPlanning.armedAlarmBudget is a real 96-alarm
  // ceiling, so the site says "as many alarms as you need" instead. This is a
  // deliberate divergence from the store copy, not an oversight.
  { needle: 'unlimited alarms', why: 'AlarmPlanning.armedAlarmBudget = 96 is a real ceiling — say "as many alarms as you need"' },
  { needle: 'trusted by', why: 'the stores hold a handful of ratings, and no social proof may be fabricated or borrowed' },
  { needle: 'apple app store', why: 'Apple style: "the App Store", never "Apple App Store"' },
  { needle: 'itunes app store', why: 'Apple style: "the App Store"' },

  // Both apps are live. Any surviving pre-launch phrasing is now simply false.
  { needle: 'coming soon', why: 'both apps shipped — 2026-08-18 on Play, 2026-08-22 on the App Store' },
  { needle: 'not released yet', why: 'both apps shipped' },

  // Counts that moved. Five warm-up games ship (GameRegistry.allWarmupGames) and
  // Plus history is uncapped (StatsView.trendDays is nil for subscribers), so the
  // old "3 games" and "30-day trend" numbers are wrong wherever they survive.
  { re: /\b(?:seven|7) (?:wake-up )?missions\b|\bfive of (?:the )?seven\b/g, why: 'fourteen missions plus Surprise Me (GameCatalog.json) — describe them by kind, not by count' },
  { needle: '3 brain games', why: 'GameRegistry.allWarmupGames has five entries' },
  { needle: 'three brain games', why: 'GameRegistry.allWarmupGames has five entries' },
  { needle: '30-day trend', why: 'Plus history is uncapped — StatsView.trendDays is nil when premium' },
  { needle: '30 day trend', why: 'Plus history is uncapped' },
  { needle: '30-day sharpness', why: 'Plus history is uncapped' },
];

/*
 * Retired bans, kept as a record so they are not silently re-added:
 *
 *   'lark scenes'      — was "no scene system exists". It does now: Design/Scenes/,
 *                        a scenes screen on both platforms, and paywall bullet 5.
 *   'unlimited smart'  — was "smart alarms are not gated at all". They are now:
 *                        HomeView.freeSmartRuleLimit = 1.
 */

/**
 * Claims that are only true on one platform. Each must appear within 240
 * characters of a platform word, so the site never tells Android users about Focus.
 */
const SCOPED = [
  { needle: 'alarmkit', scope: ['iphone', 'ios', 'apple'] },
  { needle: 'focus', scope: ['iphone', 'ios', 'apple', 'silent'] },
  { needle: 'force-quit', scope: ['iphone', 'ios', 'apple'] },
  // Android-only ring behaviour: AlarmKit takes countdownDuration/schedule/
  // attributes/sound and nothing else, so iOS can neither ramp volume nor
  // brighten the screen. Claiming either without saying "Android" promises
  // iPhone users a feature that cannot exist for them.
  { needle: 'extra loud', scope: ['android'] },
  { needle: 'build-up', scope: ['android'] },
  // Gentle start is the iOS alarm-editor toggle: iOS will not let an app change
  // alarm volume, so it ships a version of the tone that begins quiet. Android
  // has a real volume ramp instead. Scoped as the two-word phrase and never the
  // bare word "gentle", because Android's own escalation curve is called Gentle
  // and a rule on the bare word would be wrong in both directions.
  { needle: 'gentle start', scope: ['iphone', 'ios', 'apple'] },
  // iOS-only surfaces. ios/WakeSharpWidgets ships a Next Alarm widget and a
  // Live Activity; nothing under android/app/src/main matches *widget* and
  // android/wear has no tile or complication. Android's Glance widget is
  // deliberately deferred, so an unscoped widget claim promises Android users a
  // feature that does not exist for them.
  { needle: 'live activity', scope: ['iphone', 'ios', 'apple'] },
  { needle: 'widget', scope: ['iphone', 'ios', 'apple', 'watch'] },
];

/**
 * The same product truths, per locale, as the translator is most likely to
 * phrase them. Seeds, not a full grammar: docs/i18n/glossary.md carries the
 * rules the translations are reviewed against, and this catches the phrasings
 * a machine draft reaches for first. Compared with the locale's own lowercasing
 * (Turkish dotless i breaks plain toLowerCase()).
 */
const BANNED_BY_LOCALE = {
  es: [
    { needle: 'gratis, para siempre', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'suena gratis', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'todas las misiones son gratis', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'imposible de descartar', why: 'the system Stop control exists on both platforms' },
    { needle: 'imposible de apagar', why: 'the system Stop control exists on both platforms' },
    { needle: 'no se detendrá hasta', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'no parará hasta', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'alarmas ilimitadas', why: 'AlarmPlanning.armedAlarmBudget = 96 — say "todas las alarmas que necesites"' },
  ],
  ru: [
    { needle: 'бесплатно, навсегда', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'звонит бесплатно', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'все миссии бесплатны', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'невозможно отключить', why: 'the system Stop control exists on both platforms' },
    { needle: 'невозможно выключить', why: 'the system Stop control exists on both platforms' },
    { needle: 'не остановится, пока', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'не замолчит, пока', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'неограниченное количество будильников', why: 'AlarmPlanning.armedAlarmBudget = 96' },
    { needle: 'безлимитные будильники', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  'pt-BR': [
    { needle: 'de graça, para sempre', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'toca de graça', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'todas as missões são grátis', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'todas as missões são gratuitas', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'impossível de desligar', why: 'the system Stop control exists on both platforms' },
    { needle: 'não para até', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'alarmes ilimitados', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  id: [
    { needle: 'gratis, selamanya', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'berbunyi gratis', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'semua misi gratis', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'tidak bisa dimatikan', why: 'the system Stop control exists on both platforms' },
    { needle: 'tidak akan berhenti sampai', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'alarm tanpa batas', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  uk: [
    { needle: 'безкоштовно, назавжди', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'дзвонить безкоштовно', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'усі місії безкоштовні', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'неможливо вимкнути', why: 'the system Stop control exists on both platforms' },
    { needle: 'не зупиниться, поки', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'необмежена кількість будильників', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  de: [
    { needle: 'kostenlos, für immer', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'klingelt kostenlos', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'alle missionen sind kostenlos', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'unmöglich auszuschalten', why: 'the system Stop control exists on both platforms' },
    { needle: 'hört nicht auf, bis', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'unbegrenzte alarme', why: 'AlarmPlanning.armedAlarmBudget = 96' },
    { needle: 'unbegrenzt viele alarme', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  ar: [
    { needle: 'مجانًا، إلى الأبد', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'يرن مجانًا', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'جميع المهام مجانية', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'يستحيل إيقافه', why: 'the system Stop control exists on both platforms' },
    { needle: 'لن يتوقف حتى', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'منبهات غير محدودة', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  fr: [
    { needle: 'gratuitement, pour toujours', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'sonne gratuitement', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'toutes les missions sont gratuites', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'impossible à arrêter', why: 'the system Stop control exists on both platforms' },
    { needle: 'ne s’arrête pas tant que', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'alarmes illimitées', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  hi: [
    { needle: 'मुफ़्त, हमेशा', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'मुफ़्त बजता है', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'सभी मिशन मुफ़्त', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'बंद करना असंभव', why: 'the system Stop control exists on both platforms' },
    { needle: 'तब तक नहीं रुकेगा', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'असीमित अलार्म', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  ja: [
    { needle: 'ずっと無料', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: '無料で鳴ります', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'すべてのミッションが無料', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    // 突き止める ("to ascertain") contains this needle; its negative is the report
    // admitting it could not work out why an alarm failed, which is the opposite
    // of a claim that the alarm cannot be stopped.
    { needle: '止められない', unless: /突き止められない/, why: 'the system Stop control exists on both platforms' },
    { needle: '解くまで鳴り続け', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'アラーム無制限', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
  tr: [
    { needle: 'sonsuza dek ücretsiz', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'ücretsiz çalar', why: 'no free tier — claims-matrix.md rules "Your alarm rings free, forever" Prohibited in every language' },
    { needle: 'tüm görevler ücretsiz', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'bütün görevler ücretsiz', why: 'no free tier — every mission comes with WakeSharp Unlimited (claims-matrix.md)' },
    { needle: 'kapatılması imkansız', why: 'the system Stop control exists on both platforms' },
    { needle: 'kapatılması imkânsız', why: 'the system Stop control exists on both platforms' },
    { needle: 'kadar durmaz', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'kadar susmaz', why: 'the OS exits always exist — Prohibited, claims-matrix.md' },
    { needle: 'sınırsız alarm', why: 'AlarmPlanning.armedAlarmBudget = 96' },
  ],
};

/**
 * Both apps are live, so the listings are the destination — but only these two.
 * Anything else matching a store-listing shape is a typo or a stale package id
 * (com.dipojjal.wakesharp was renamed to com.wakesharp.app on 2026-08-14) and
 * would send a reader to a 404 or, worse, to somebody else's app.
 */
const CANONICAL_LINKS = [
  'https://apps.apple.com/app/id6801198703',
  'https://play.google.com/store/apps/details?id=com.wakesharp.app',
];
const LISTING_LINK = /https:\/\/(?:apps\.apple\.com\/\S*?app\/[^"'\s]+|play\.google\.com\/store\/apps\/details\?[^"'\s]+)/gi;

/**
 * Checked against raw HTML rather than the stripped text, because strip() removes
 * attributes and <script> bodies — where all three of these can hide.
 */
const BANNED_RAW = [
  { re: /\[\[/, why: 'unfilled "[[…]]" placeholder — one shipped live on /terms, a page both apps link to' },
  { re: /com\.dipojjal\.wakesharp/i, why: 'dead package id — renamed to com.wakesharp.app on 2026-08-14' },
  // The two live listings no longer share a name: verified 2026-09-24, the App
  // Store reads "Loud Alarm Clock - WakeSharp" and Play reads "WakeSharp: Loud
  // Alarm Clock". This bans the names neither listing carries any more. Re-read
  // both listings before changing anything here — it is the one rule in this
  // file whose ground truth lives outside both repos.
  // itunes.apple.com/lookup?id=6801198703&country=us needs no credential.
  { re: /WakeSharp: Alarm Clock &amp; Games|WakeSharp: Alarm Clock & Games|WakeSharp: Math Alarm Clock/i, why: 'a listing name neither store uses any more — the live listings are "Loud Alarm Clock - WakeSharp" (App Store) and "WakeSharp: Loud Alarm Clock" (Play)' },
  // Raw HTML on purpose: this reaches every locale, every attribute and the
  // JSON-LD. "WakeSharp Plus" survives only as an internal entitlement id.
  { re: /WakeSharp Plus\b/i, why: 'the plan is WakeSharp Unlimited since 2.10 (claims-matrix.md)' },
  { re: /\$59\.99/, why: 'the Lifetime price — Lifetime is no longer sold (Terms section 4)' },
  { re: /\bcode[_-]scan\b/i, why: 'dead mission route — code_scan was deleted from GameRegistry.MissionRoute and never had a host on either platform' },
  { re: /\bMath Sprint\b/i, why: 'dead game name — GameCatalog.json renamed math_sprint to "Mind Games" on 2026-08-23 (app commit d320d71); the site kept the old name for the warm-up game while already using the new one for the mission' },
];

/**
 * English sentences that legitimately survive on a localized page: vendor
 * attribution that must stay verbatim, and the address.
 */
const UNTRANSLATED_ALLOW = [
  // Fragments, not whole sentences: the splitter cuts at "U.S.", so a full
  // trademark line never matches its own first half.
  'trademarks of apple inc',
  'service mark of apple inc',
  'trademarks of google llc',
  'support@wakesharp.app',
];

/** Pages every enabled locale must ship, relative to dist/<path>/ (the home page is dist/<path>.html). */
const TIER_A = ['support.html', 'contact.html', 'contact-sent.html', 'contact-error.html', 'account/delete.html', 'c.html', 'p.html', 'privacy.html', 'terms.html'];
/** Of those, the indexable ones, which must carry the x-default hreflang link. */
const NEEDS_X_DEFAULT = new Set(['index.html', 'support.html', 'contact.html', 'account/delete.html']);
/**
 * The share-link decoders. vercel.json rewrites every /c/<payload> and
 * /p/<payload> onto these files, so each one stands for an unbounded set of
 * URLs: they must be noindex, and carry no hreflang, in every language.
 */
const SHARE_SHELLS = ['c.html', 'p.html'];
/** Localized routes that wrap the English legal text on purpose: no untranslated-sentence check. */
/**
 * Product and feature names the glossary keeps in English on pages whose
 * language the app does not ship in (SITE.appLanguages), because there the app
 * falls back to English and a reader has to find the same words on screen. In
 * the languages the app does ship, the page uses the app's own localized names
 * (docs/i18n/glossary.md), so this list does not apply there.
 *
 * Deliberately NOT the OS features. Focus, Silent mode and Do Not Disturb must
 * become the vendor's localized name, so listing them here would fail every
 * locale that got them right.
 *
 * "Beat my wake" and "Wake with a friend" are why this check exists: they read
 * like sentences rather than product names, were missing from the keep-table,
 * and all eleven locales translated them before anyone noticed.
 */
const MUST_STAY_ENGLISH = [
  'WakeSharp',
  'Sharpness Score',
  'Mind Games',
  'Photo Proof',
  'Memory Match',
  'Sequence Recall',
  'Word Dash',
  'Reaction Tap',
  'Scan an Object',
  'Walk It Off',
  'Colour Clash',
  'Type It Out',
  'Fetch',
  'Face Check',
  'Fruit Slash',
  'First Light',
  'Serial Sevens',
  'Name Five',
  'Surprise Me',
  'My spots & codes',
  'Gentle start',
  'Extra Loud',
  'Alarm reliability',
  'Beat my wake',
  'Wake with a friend',
];

const ENGLISH_BODY_BY_DESIGN = new Set(['privacy.html', 'terms.html']);

const OTHER_LOCALES = enabledLocales().filter((l) => l.code !== DEFAULT_LOCALE);

const html = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.html')) html.push(p);
  }
})(DIST);

const strip = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    // Astro escapes expression output, so an apostrophe in a catalog string
    // arrives as &#39;. Decode the numeric forms before matching, or a needle
    // like "won't stop until" could never fire on a localized template.
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');

/**
 * The copy that `strip()` throws away: meta/OG descriptions, alt text, and the
 * JSON-LD body.
 *
 * This is not a nicety. The prohibited "every alarm and every mission, free
 * forever" claim shipped inside JsonLd.astro's Offer description, where it sat
 * in a <script> block that strip() deletes — no BANNED rule could ever have
 * seen it. Same blind spot covers every <meta name="description">.
 *
 * Deliberately a narrow attribute list. Taking every attribute would drag
 * `class` in, and Tailwind's `focus:` utilities would then trip the platform
 * rule for "focus" on every page that has a link.
 */
const META_ATTR = /\b(?:content|alt|title|aria-label)\s*=\s*"([^"]*)"/gi;
const LD_JSON = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;

const metaFields = (raw) => {
  const out = [];
  for (const m of raw.matchAll(META_ATTR)) out.push(m[1]);
  for (const m of raw.matchAll(LD_JSON)) out.push(m[1]);
  return out.map((f) => f.replace(/\s+/g, ' ').toLowerCase());
};

/** The sentence a match sits in — back to the previous [.!?;] — for `unless`. */
const sentenceAt = (hay, index) => {
  const start = Math.max(0, ...['.', '!', '?', ';'].map((c) => hay.lastIndexOf(c, index)));
  const endCandidates = ['.', '!', '?', ';'].map((c) => hay.indexOf(c, index)).filter((i) => i !== -1);
  const end = endCandidates.length ? Math.min(...endCandidates) : hay.length;
  return hay.slice(start, end + 1);
};

/**
 * The characters immediately around a match, for a locale rule's `unless`.
 *
 * Deliberately not `sentenceAt`: that splits on [.!?;], which Japanese and
 * Chinese do not use, so a whole paragraph would read as one sentence and an
 * `unless` would pardon far more than the compound it was written for. A
 * language without word boundaries needs a tight window instead — wide enough
 * to see the compound the needle is buried in, narrow enough that a real claim
 * later in the paragraph still fires.
 */
const neighbourhood = (hay, i, needle) => hay.slice(Math.max(0, i - 12), i + needle.length + 12);

/** Every place a BANNED needle may hide: the rendered text plus each meta field. */
const banHaystacks = (text, fields) => [text, ...fields];

/** `es` for dist/es.html and dist/es/…; undefined for an English page. */
const localeOf = (name) => {
  const first = name.split('/')[0];
  const base = first.endsWith('.html') ? first.slice(0, -5) : first;
  return OTHER_LOCALES.find((l) => l.path === base);
};

/** dist/es/support.html → support.html; dist/es.html → index.html. */
const englishCounterpart = (name, loc) => (name === `${loc.path}.html` ? 'index.html' : name.slice(loc.path.length + 1));

/** Sentences of the English page long enough to be unmistakable when they survive verbatim. */
const sentencesOf = (text) =>
  text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 45 && !UNTRANSLATED_ALLOW.some((a) => s.includes(a)));

let problems = 0;
let sawCanonical = false;

for (const file of html) {
  const raw = readFileSync(file, 'utf8');
  const stripped = strip(raw);
  const text = stripped.toLowerCase();
  const fields = metaFields(raw);
  const name = file.replace(DIST + '/', '');
  const loc = localeOf(name);

  if (!loc) {
    for (const { needle, re, unless, why } of BANNED) {
      for (const hay of banHaystacks(text, fields)) {
        if (needle) {
          const i = hay.indexOf(needle);
          if (i === -1) continue;
          if (unless && unless.test(sentenceAt(hay, i))) continue;
          console.error(`  ✗ ${name}: banned phrase "${needle}" — ${why}`);
          problems++;
          break;
        }
        let hit = null;
        for (const m of hay.matchAll(re)) {
          if (unless && unless.test(sentenceAt(hay, m.index))) continue;
          hit = m;
          break;
        }
        if (!hit) continue;
        console.error(`  ✗ ${name}: banned phrase "${hit[0]}" — ${why}`);
        console.error(`      …${hay.slice(Math.max(0, hit.index - 70), hit.index + 70).trim()}…`);
        problems++;
        break;
      }
    }

    for (const { needle, scope } of SCOPED) {
      // Whole words only. A substring match fires on "autofocus" for "focus" and
      // on "focused" for the same reason, which is a false positive that trains
      // people to reword true copy around a broken check.
      const re = new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      for (const m of text.matchAll(re)) {
        const i = m.index;
        const window = text.slice(Math.max(0, i - 240), i + 240);
        if (!scope.some((w) => window.includes(w))) {
          console.error(`  ✗ ${name}: "${needle}" used without naming the platform it applies to`);
          console.error(`      …${text.slice(Math.max(0, i - 70), i + 70).trim()}…`);
          problems++;
        }
      }
    }
  } else {
    const localText = stripped.toLocaleLowerCase(loc.hreflang);
    for (const { needle, unless, why } of BANNED_BY_LOCALE[loc.code] ?? []) {
      let i = -1;
      for (let from = 0; from <= localText.length; ) {
        const at = localText.indexOf(needle, from);
        if (at === -1) break;
        if (unless && unless.test(neighbourhood(localText, at, needle))) {
          from = at + 1;
          continue;
        }
        i = at;
        break;
      }
      if (i === -1) continue;
      console.error(`  ✗ ${name}: banned phrase "${needle}" — ${why}`);
      console.error(`      …${localText.slice(Math.max(0, i - 70), i + 70).trim()}…`);
      problems++;
    }

    // An English sentence surviving verbatim is a key that never got translated —
    // or a template that never read the catalog. Either way it is a bug.
    const counterpart = englishCounterpart(name, loc);
    const counterpartFile = join(DIST, counterpart);
    if (!ENGLISH_BODY_BY_DESIGN.has(counterpart) && existsSync(counterpartFile)) {
      const englishText = strip(readFileSync(counterpartFile, 'utf8')).toLowerCase();
      for (const sentence of sentencesOf(englishText)) {
        if (!text.includes(sentence)) continue;
        console.error(`  ✗ ${name}: English sentence survived untranslated`);
        console.error(`      …${sentence.slice(0, 140)}…`);
        problems++;
      }

      // The inverse: a name the glossary keeps in English must survive here too.
      //
      // Case-SENSITIVE, and that is the whole subtlety. The capitalised name is
      // the product; the same words in lower case are ordinary prose the blog is
      // supposed to translate. An English article writes "WakeSharp checks alarm
      // reliability the night before" and "scan a real object" — neither names a
      // feature, and a case-insensitive match would demand English inside a
      // correctly translated Spanish sentence.
      const englishRaw = strip(readFileSync(counterpartFile, 'utf8'));
      const appSpeaksIt = SITE.appLanguages.includes(loc.code);
      for (const term of appSpeaksIt ? [] : MUST_STAY_ENGLISH) {
        if (!englishRaw.includes(term)) continue;
        if (stripped.includes(term)) continue;
        console.error(`  ✗ ${name}: feature name "${term}" was translated — the glossary keeps it in English`);
        problems++;
      }
    }

    const expectedLang = `<html lang="${loc.hreflang}"`;
    if (!raw.includes(expectedLang)) {
      console.error(`  ✗ ${name}: missing ${expectedLang}`);
      problems++;
    }
  }

  // Checked against raw HTML, not `text`: strip() discards every attribute and
  // every <script> block, which is exactly where a placeholder can hide.
  for (const { re, why } of BANNED_RAW) {
    const m = raw.match(re);
    if (m) {
      console.error(`  ✗ ${name}: ${why}`);
      console.error(`      …${raw.slice(Math.max(0, m.index - 60), m.index + 80).replace(/\s+/g, ' ').trim()}…`);
      problems++;
    }
  }

  for (const link of raw.match(LISTING_LINK) ?? []) {
    if (CANONICAL_LINKS.includes(link)) {
      sawCanonical = true;
      continue;
    }
    console.error(`  ✗ ${name}: non-canonical store link ${link}`);
    console.error(`      Store links belong in src/config/site.ts. Canonical: ${CANONICAL_LINKS.join('  ')}`);
    problems++;
  }
}

// The apps are live; a site that never links to either listing has regressed to
// its pre-launch state, which is exactly the bug this pass existed to fix.
if (!sawCanonical) {
  console.error('  ✗ no page links to either store listing — is src/config/site.ts still coming-soon?');
  problems++;
}

// Search consoles are pointed at /sitemap.xml (robots.txt and BaseHead). The
// integration writes sitemap-index.xml + sitemap-0.xml; the build hook in
// astro.config.mjs renames the chunk to sitemap.xml and drops the index.
if (!existsSync(join(DIST, 'sitemap.xml'))) {
  console.error('  ✗ dist/sitemap.xml is missing — crawlers are told to fetch /sitemap.xml');
  problems++;
}
for (const leftover of ['sitemap-index.xml', 'sitemap-0.xml']) {
  if (existsSync(join(DIST, leftover))) {
    console.error(`  ✗ dist/${leftover} should not exist — every URL belongs in dist/sitemap.xml`);
    problems++;
  }
}
if (existsSync(join(DIST, 'sitemap.xml'))) {
  const body = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
  if (!body.includes('<urlset') || body.includes('<sitemapindex')) {
    console.error('  ✗ dist/sitemap.xml must be a <urlset> listing every page, not a sitemap index');
    problems++;
  }
  // hreflang belongs in BaseHead. An xhtml:link here duplicates it and makes
  // Chrome show the sitemap as one run-on line of URLs (see astro.config.mjs).
  if (body.includes('xhtml:')) {
    console.error('  ✗ dist/sitemap.xml must not carry xhtml:link alternates — hreflang lives in BaseHead');
    problems++;
  }
  // src/lib/sitemap.ts: every URL gets a <priority>; every blog URL a <lastmod>.
  for (const [, entry] of body.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>(.*?)<\/loc>/.exec(entry)?.[1] ?? '(no loc)';
    if (!entry.includes('<priority>')) {
      console.error(`  ✗ dist/sitemap.xml: ${loc} has no <priority>`);
      problems++;
    }
    if (/\/blog(\/|$)/.test(loc) && !entry.includes('<lastmod>')) {
      console.error(`  ✗ dist/sitemap.xml: ${loc} has no <lastmod> — is article:modified_time still rendered?`);
      problems++;
    }
  }
  for (const loc of [
    'https://wakesharp.app',
    'https://wakesharp.app/privacy',
    'https://wakesharp.app/terms',
    'https://wakesharp.app/support',
    'https://wakesharp.app/blog',
  ]) {
    if (!body.includes(`<loc>${loc}</loc>`)) {
      console.error(`  ✗ dist/sitemap.xml is missing <loc>${loc}</loc>`);
      problems++;
    }
  }
  for (const loc of [
    'https://wakesharp.app/contact-sent',
    'https://wakesharp.app/contact-error',
    'https://wakesharp.app/c',
    'https://wakesharp.app/p',
    'https://wakesharp.app/es/privacy',
    'https://wakesharp.app/es/terms',
  ]) {
    if (body.includes(`<loc>${loc}</loc>`)) {
      console.error(`  ✗ dist/sitemap.xml must not list ${loc}`);
      problems++;
    }
  }
}

// The URLs frozen into both shipped app binaries (and filed with the stores)
// must exist as real English pages at the root — exact paths, not suffixes, so
// dist/es/privacy.html can never satisfy this on the root's behalf.
for (const required of ['privacy.html', 'terms.html', 'support.html', 'account/delete.html']) {
  if (!existsSync(join(DIST, required))) {
    console.error(`  ✗ dist/${required} is missing — a paywall or store link points at it`);
    problems++;
  }
}

// The default locale is never prefixed. Astro writes the 404 body of /en/… to
// disk if a route ever emits that param, and Vercel would serve it as a 200.
for (const forbidden of [`${DEFAULT_LOCALE}.html`, DEFAULT_LOCALE]) {
  if (existsSync(join(DIST, forbidden))) {
    console.error(`  ✗ dist/${forbidden} exists — the default locale must never be built under a prefix`);
    problems++;
  }
}

// The share-link decoders stay out of search in every language.
for (const prefix of ['', ...OTHER_LOCALES.map((l) => `${l.path}/`)]) {
  for (const shell of SHARE_SHELLS) {
    const p = join(DIST, prefix + shell);
    if (!existsSync(p)) continue; // a missing locale page is reported below
    const head = readFileSync(p, 'utf8');
    if (!/<meta name="robots" content="noindex/.test(head)) {
      console.error(`  ✗ dist/${prefix}${shell}: no noindex — every /${shell.slice(0, 1)}/<payload> URL would be indexable`);
      problems++;
    }
    if (/<link rel="alternate" hreflang=/.test(head)) {
      console.error(`  ✗ dist/${prefix}${shell}: carries hreflang — a noindex share shell must not`);
      problems++;
    }
  }
}

// Every enabled locale ships in full, or not at all.
const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
for (const loc of OTHER_LOCALES) {
  const pages = [{ file: `${loc.path}.html`, logical: 'index.html' }, ...TIER_A.map((f) => ({ file: `${loc.path}/${f}`, logical: f }))];
  for (const { file, logical } of pages) {
    const p = join(DIST, file);
    if (!existsSync(p)) {
      console.error(`  ✗ dist/${file} is missing — locale "${loc.code}" is enabled but only partly built`);
      problems++;
      continue;
    }
    if (NEEDS_X_DEFAULT.has(logical) && !readFileSync(p, 'utf8').includes('hreflang="x-default"')) {
      console.error(`  ✗ dist/${file}: no x-default hreflang link — is BaseLayout getting the page's alternates?`);
      problems++;
    }
  }
  // The share links must reach the localized landing pages through the same
  // rewrite the English ones use; a locale missing from the alternation 404s.
  for (const page of ['c', 'p']) {
    const rule = (vercel.rewrites ?? []).find((r) => new RegExp(`^/:lang\\([^)]+\\)/${page}/:payload$`).test(r.source));
    const alternation = rule ? rule.source.match(/\(([^)]+)\)/)[1].split('|') : [];
    if (!alternation.includes(loc.path)) {
      console.error(`  ✗ vercel.json: no rewrite for /${loc.path}/${page}/:payload — add "${loc.path}" to the /:lang(…)/${page}/:payload alternation`);
      problems++;
    }
  }
}

if (problems) {
  console.error(`\n  ${problems} copy problem(s) in ${html.length} pages.\n`);
  process.exit(1);
}
console.log(`\n  Copy check passed across ${html.length} pages.\n`);
