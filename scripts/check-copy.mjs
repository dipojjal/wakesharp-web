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

/** Substrings that must never appear in rendered text. */
const BANNED = [
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
  { re: /WakeSharp: Alarm Clock &amp; Games|WakeSharp: Alarm Clock & Games/i, why: 'the store name is "WakeSharp: Math Alarm Clock"' },
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

let problems = 0;
let sawCanonical = false;

for (const file of html) {
  const raw = readFileSync(file, 'utf8');
  const text = strip(raw).toLowerCase();
  const name = file.replace(DIST + '/', '');

  for (const { needle, why } of BANNED) {
    if (text.includes(needle)) {
      console.error(`  ✗ ${name}: banned phrase "${needle}" — ${why}`);
      problems++;
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
