#!/usr/bin/env node
/**
 * Guard the marketing copy against claims the app does not actually make good on.
 *
 * This exists because the shipped apps' own paywall copy drifted from the code —
 * it advertises "All 5 warm-up games" and "Lark scenes" when GameRegistry returns
 * at most three game IDs and no scene feature exists. The website must not repeat
 * that, and it must not contradict the paywall a store reviewer is looking at.
 *
 * It also enforces the platform-scoping rule the app repo already applies to store
 * screenshots (tools/screenshots/verify.py fails the build if "Focus" or "AlarmKit"
 * appear in Play copy). Marketing claims about how the alarm rings must name the
 * platform they are true of.
 *
 *   node scripts/check-copy.mjs        # checks dist/ after a build
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

/** Substrings that must never appear in rendered text. */
const BANNED = [
  { needle: 'all five games', why: 'warmupPlan(premium:) returns at most 3 game IDs on both platforms' },
  { needle: 'all 5 games', why: 'warmupPlan(premium:) returns at most 3 game IDs' },
  { needle: 'all 5 warm-up games', why: 'warmupPlan(premium:) returns at most 3 game IDs' },
  { needle: 'lark scenes', why: 'not a gated feature — no scene system exists in the codebase' },
  { needle: 'celebration styles', why: 'not a feature in the codebase' },
  { needle: 'unlimited alarms', why: 'AlarmSchedulingError.maximumLimitReached is a real handled case' },
  { needle: 'unlimited smart', why: 'smart alarms are not gated by the premium entitlement at all' },
  { needle: 'trusted by', why: 'the app has no users yet — no social proof may be fabricated' },
  { needle: 'apple app store', why: 'Apple style: "the App Store", never "Apple App Store"' },
  { needle: 'itunes app store', why: 'Apple style: "the App Store"' },
];

/**
 * Claims that are only true on one platform. Each must appear within 240
 * characters of a platform word, so the site never tells Android users about Focus.
 */
const SCOPED = [
  { needle: 'alarmkit', scope: ['iphone', 'ios', 'apple'] },
  { needle: 'focus', scope: ['iphone', 'ios', 'apple', 'silent'] },
  { needle: 'force-quit', scope: ['iphone', 'ios', 'apple'] },
];

/**
 * While no listing exists, no page may link to an app LISTING. Account-management
 * links (apps.apple.com/account/subscriptions, play.google.com/store/account/...)
 * are required by the subscription terms and are explicitly fine.
 */
const PREMATURE_LINKS = [/apps\.apple\.com\/(?:[a-z-]+\/)?app\//i, /play\.google\.com\/store\/apps\/details/i];

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
    let i = -1;
    while ((i = text.indexOf(needle, i + 1)) !== -1) {
      const window = text.slice(Math.max(0, i - 240), i + 240);
      if (!scope.some((w) => window.includes(w))) {
        console.error(`  ✗ ${name}: "${needle}" used without naming the platform it applies to`);
        console.error(`      …${text.slice(Math.max(0, i - 70), i + 70).trim()}…`);
        problems++;
      }
    }
  }

  for (const link of PREMATURE_LINKS) {
    if (link.test(raw)) {
      console.error(`  ✗ ${name}: links to an app listing (${link.source}) that does not exist yet`);
      console.error(`      Flip src/config/site.ts to state:'live' only once the store listing is live.`);
      problems++;
    }
  }
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
