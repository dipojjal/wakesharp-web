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
 *   node scripts/check-copy.mjs        # checks dist/ after a build
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

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
  // ── 2.2 mission tiering ────────────────────────────────────────────────
  // GameCatalog.json marks object_scan, walk_steps, memory_match,
  // sequence_recall and the surprise sentinel isPremium; only math_sprint
  // (Mind Games) and photo_proof (Photo Proof) are free, and the gate runs at
  // alarm creation, never at ring time. claims-matrix.md rules the old promise
  // Prohibited from 2.2 and names wakesharp.app as a surface still carrying it.
  // The replacement is the shipped paywall footer, verbatim.
  { needle: 'every alarm and every mission', why: 'GameCatalog.json gates five of seven missions — say "Your alarm rings free, forever. No ads." (PaywallView.swift:537)' },
  { needle: 'every mission is free', why: 'GameCatalog.json gates five of seven missions' },
  { needle: 'every mission stays free', why: 'GameCatalog.json gates five of seven missions' },
  { needle: 'every mission type', why: 'GameCatalog.json gates five of seven missions — name the two free ones or the five Plus ones, never all of them' },
  { needle: 'scan missions on every alarm', why: 'the pre-2.2 per-alarm scan cap is gone; object_scan is isPremium outright' },
  { needle: 'nothing that wakes you up is ever behind', why: 'Scan an Object, Walk It Off and Surprise Me are all Plus at creation' },

  // ── a mission that never shipped ───────────────────────────────────────
  // GameRegistry.MissionRoute has six cases and code_scan is not one of them.
  // Barcodes and QR codes exist only as targets registered under "My spots &
  // codes" INSIDE Scan an Object, which is why the ban is on the affirmative
  // phrasings rather than on the bare word: /support legitimately explains what
  // a registered code actually is.
  { re: /\bscan(?:ning)? a (?:bar ?code|qr code)\b/g, why: 'no barcode mission exists — GameRegistry.MissionRoute has no code_scan; a code is a target inside Scan an Object' },
  { re: /\bbar ?code mission\b|\bqr[- ]?code mission\b/g, unless: /\b(?:no|not|never|isn\u2019t|isn't|does ?n\u2019t|does ?n't|cannot|can\u2019t|can't)\b/, why: 'no barcode mission exists — GameRegistry.MissionRoute has no code_scan' },
  { re: /\bscan(?:ning)? a code\b/g, unless: /spots ?(?:&|and) ?codes|as a target|that specific target/, why: 'a registered code is a target inside Scan an Object, not a mission — say "scan a real object"' },

  // ── absolute dismissal ─────────────────────────────────────────────────
  // Prohibited in claims-matrix.md: the OS Stop/dismiss control exists on both
  // platforms, and Strict Mode is four alarms booked in advance, not a loop —
  // AlarmPlanning.guardOffsetsMinutes = [4, 8, 12] plus quickGuardSeconds = 45.
  // The apostrophe variants are both spelled out on purpose: the site renders
  // U+2019 and strip() does not normalise it, so an ASCII-only needle would
  // silently never match.
  { needle: 'impossible to dismiss', why: 'the system Stop control exists on both platforms — Prohibited, claims-matrix.md' },
  { needle: 'the only way out', why: 'the system Stop control exists on both platforms — Prohibited, claims-matrix.md' },
  { re: /\b(?:won\u2019t|won't|will not|doesn\u2019t|doesn't|does not) stop until\b/g, why: 'AlarmPlanning books four guards and then stops — say how many times it re-rings' },
  { re: /\b(?:keeps?|kept) ringing until\b|\bre-?rings? until\b/g, why: 'AlarmPlanning.guardOffsetsMinutes = [4, 8, 12] + quickGuardSeconds = 45 — bounded, not a loop' },
  { re: /until you(?:\u2019ve| have|'ve)? (?:prove|proved|proven)\b/g, why: '"keeps ringing until you prove you are up" is Prohibited in claims-matrix.md' },

  // ── wallpapers ─────────────────────────────────────────────────────────
  // Prohibited from v6. WallpaperCatalog.json: first_light, city_ledge and
  // above_the_clouds are isPremium:false; only lighthouse and summit are Plus.
  { needle: 'two wallpapers', why: 'WallpaperCatalog.json ships three free wallpapers since v6 — Above the Clouds moved to free' },

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
  { needle: 'trusted by', why: 'zero ratings on both stores — no social proof may be fabricated' },
  { needle: 'apple app store', why: 'Apple style: "the App Store", never "Apple App Store"' },
  { needle: 'itunes app store', why: 'Apple style: "the App Store"' },

  // Both apps are live. Any surviving pre-launch phrasing is now simply false.
  { needle: 'coming soon', why: 'both apps shipped — 2026-08-18 on Play, 2026-08-22 on the App Store' },
  { needle: 'not released yet', why: 'both apps shipped' },

  // Counts that moved. Five warm-up games ship (GameRegistry.allWarmupGames) and
  // Plus history is uncapped (StatsView.trendDays is nil for subscribers), so the
  // old "3 games" and "30-day trend" numbers are wrong wherever they survive.
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
  // The two live listings no longer share a name: verified 2026-08-30, the App
  // Store reads "WakeSharp: Loud Alarm Clock" while Play still reads
  // "WakeSharp: Math Alarm Clock". Both are legitimate; this bans only the dead
  // pre-launch name. Re-read both listings before changing anything here — it is
  // the one rule in this file whose ground truth lives outside both repos.
  // itunes.apple.com/lookup?id=6801198703&country=us needs no credential.
  { re: /WakeSharp: Alarm Clock &amp; Games|WakeSharp: Alarm Clock & Games/i, why: 'dead pre-launch name — the live listings are "WakeSharp: Loud Alarm Clock" (App Store) and "WakeSharp: Math Alarm Clock" (Play)' },
  { re: /\bcode[_-]scan\b/i, why: 'dead mission route — code_scan was deleted from GameRegistry.MissionRoute and never had a host on either platform' },
];

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

/** Every place a BANNED needle may hide: the rendered text plus each meta field. */
const banHaystacks = (text, fields) => [text, ...fields];

let problems = 0;
let sawCanonical = false;

for (const file of html) {
  const raw = readFileSync(file, 'utf8');
  const text = strip(raw).toLowerCase();
  const fields = metaFields(raw);
  const name = file.replace(DIST + '/', '');

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

// The two URLs frozen into both shipped app binaries must exist as real pages.
for (const required of ['privacy.html', 'terms.html', 'support.html']) {
  if (!html.some((f) => f.endsWith('/' + required))) {
    console.error(`  ✗ dist/${required} is missing — a paywall link in both shipped apps points at it`);
    problems++;
  }
}

if (problems) {
  console.error(`\n  ${problems} copy problem(s) in ${html.length} pages.\n`);
  process.exit(1);
}
console.log(`\n  Copy check passed across ${html.length} pages.\n`);
