import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { publicMissions, HIDDEN_MISSIONS, IPHONE_ONLY_MISSIONS, WARMUP_ONLY, FEATURE_SLUGS, RELEASE } from '../../src/lib/product';
import { REFRESH } from '../../src/lib/refresh';
import { CATALOGS } from '../../src/i18n/catalog';
import { enabledLocales } from '../../src/i18n/config';
import { localePath } from '../../src/i18n/routes';
import { compareShape } from '../../src/i18n/shape';
import { PRESS } from '../../src/config/press';
import { SITE } from '../../src/config/site';
import { toolCopy } from '../../src/i18n/tools';
import manifest from '../../src/data/store-assets.json';
const read = (path:string) => readFileSync(`dist${path === '/' ? '/index' : path}.html`,'utf8');
const releaseStamp = `data-release-version="${RELEASE.version}" data-release-status="${RELEASE.status}"`;

test('production visibility excludes retired and warm-up-only entries and names every public mission in every locale',()=>{
 const expected=['math_sprint','memory_match','sequence_recall','colour_clash','type_quote','photo_proof','object_scan','fetch','face_check','fruit_slash','walk_steps','first_light','squats','push_ups','name_five','surprise'];
 assert.deepEqual(publicMissions().map(m=>m.id),expected);
 const visible = new Set<string>(publicMissions().map(m=>m.id));
 for(const id of [...HIDDEN_MISSIONS.map(m=>m.id),...WARMUP_ONLY]) assert.ok(!visible.has(id));
 for(const id of IPHONE_ONLY_MISSIONS) assert.ok(visible.has(id));
 for(const locale of enabledLocales()) assert.deepEqual(CATALOGS[locale.code].home.mission.missions.map(m=>m.id),expected,locale.code);
});
test('store artwork: the bold gallery, the 2.29 in-app screens and the 2.14 watch frames match their manifest',()=>{
 // The gallery shows the "Bold designed screenshots" set (app repo, Design/Store/ab-bold:
 // nine iPhone frames in the seven languages the listing's images ship in); the hero,
 // feature rows and feature pages show in-app screens cut from the 2.29 listing frames.
 // scripts/import-store.mjs writes both and this manifest.
 assert.equal(manifest.gallery.set,'ab-bold');assert.equal(manifest.captures.version,'2.29');
 for(const lang of ['en','es','ru','tr','de','fr','ar']){
  assert.deepEqual(manifest.assets.filter(a=>a.platform==='iphone'&&a.language===lang).map(a=>a.order),[1,2,3,4,5,6,7,8,9],lang);
  assert.deepEqual(manifest.assets.filter(a=>a.platform==='capture'&&a.language===lang).map(a=>a.key).sort(),['home','missions','rotation','scan','stats','tones'],lang);
 }
 assert.deepEqual(manifest.assets.filter(a=>a.platform==='watch').map(a=>[a.language,a.order]),[['en',1],['en',2],['en',3]]);
 for(const asset of manifest.assets){
  assert.ok(existsSync(asset.file),asset.file);
  assert.equal(createHash('sha256').update(readFileSync(asset.file)).digest('hex'),asset.sha256,asset.file);
  assert.ok(asset.width>0 && asset.height>0);
 }
 // One caption per gallery frame in every language.
 for(const locale of enabledLocales()) assert.equal(REFRESH[locale.code].captions.length,9,locale.code);
});
test('pricing shows both plans with the trial beside the yearly price, every download button says "Try WakeSharp For Free", and no retired price',()=>{
 for(const locale of enabledLocales()){
  const home=read(localePath(locale,'/'));
  const yearly=home.slice(home.indexOf('data-plan="yearly"'),home.indexOf('data-plan="monthly"'));
  assert.ok(yearly.includes('class="trial-badge"'),locale.code);
  assert.ok(yearly.includes(SITE.unlimited.annual),locale.code);
  assert.ok(home.slice(home.indexOf('data-plan="monthly"')).includes(SITE.unlimited.monthly),locale.code);
  // One label on every download button, the header's included (owner, 2026-11-07); the
  // trial's price is in the pricing section, not in a note under the button.
  const label=toolCopy(locale.code).download;
  assert.equal(CATALOGS[locale.code].shell.nav.cta,label,locale.code);
  const buttons=[...home.matchAll(/<a\b[^>]*\bdata-download\b[^>]*>([^<]*)<\/a>/g)].map(m=>m[1]!.replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&'));
  assert.ok(buttons.length>=3,`${locale.code}: ${buttons.length} download buttons`);
  for(const text of buttons) assert.equal(text,label,locale.code);
  assert.ok(!home.includes('data-offer'),locale.code);
  for(const path of ['/','/support','/terms',...FEATURE_SLUGS.map(slug=>`/features/${slug}`)]){
   const html=read(localePath(locale,path));
   assert.ok(!html.includes('$34.99'),`${locale.code} ${path} still says $34.99`);
  }
 }
});
test('every locale has complete copy, a visible directory, all screenshots and linked feature pages',()=>{
 for(const locale of enabledLocales()){
  const t=REFRESH[locale.code];assert.deepEqual(compareShape(REFRESH.en,t),[],locale.code);
  const home=read(localePath(locale,'/'));
  assert.equal((home.match(/data-mission-id=/g)||[]).length,16,locale.code);
  assert.equal((home.match(/<a[^>]*data-enlarge/g)||[]).length,12,locale.code);
  assert.ok(home.includes(releaseStamp),locale.code);
  assert.ok(!home.includes('data-release-preview'));
  assert.ok(!/\b(?:Serial Sevens|Mind Games|Gentle Start|Colour Clash)\b|—/i.test(home),locale.code);
  assert.ok(home.indexOf('id="loud"')<home.indexOf('id="scan"'));
  assert.ok(home.indexOf('id="scan"')<home.indexOf('id="mission"'));
  assert.ok(home.indexOf('id="mission"')<home.indexOf('id="gallery"'));
  for(const slug of FEATURE_SLUGS){
   const html=read(localePath(locale,`/features/${slug}`));
   assert.ok(html.includes(releaseStamp),`${locale.code} ${slug}`);
   assert.ok(!html.includes('data-release-preview'));
   assert.ok(html.includes(`href="https://wakesharp.app${localePath(locale,`/features/${slug}`)}"`));
   assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,13);
  }
 }
 assert.equal(RELEASE.status,'live');
 assert.equal(RELEASE.publicIOS,RELEASE.version);
 // Google Play lags the App Store (its upload key was lost on 2026-09-23); the
 // copy names both versions, so the two must stay in the release record.
 assert.match(RELEASE.publicAndroid,/^\d+\.\d+$/);
 assert.ok(read('/ar').includes('dir="rtl"'));
});

test('the "As seen on" badge is on the hero and the closing CTA of every homepage, with its label in the page language',()=>{
 for(const locale of enabledLocales()){
  const home=read(localePath(locale,'/'));
  const label=CATALOGS[locale.code].shell.press.label;
  const badges=home.match(/data-press-badge="(full|compact)"/g)||[];
  if(!PRESS.enabled){ assert.equal(badges.length,0,locale.code); continue; }
  // hero + closing CTA (full) and the footer (compact)
  assert.deepEqual(badges,['data-press-badge="full"','data-press-badge="full"','data-press-badge="compact"'],locale.code);
  const escaped=label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  assert.match(home,new RegExp(`<figcaption class="press-label"[^>]*>${escaped}</figcaption>`),locale.code);
  if(locale.code!=='en') assert.notEqual(label,CATALOGS.en.shell.press.label,`${locale.code}: the label is untranslated`);
  for(const outlet of PRESS.outlets) assert.ok(home.includes(`aria-label="${outlet.name}"`),`${locale.code}: ${outlet.name}`);
 }
 for(const outlet of PRESS.outlets) assert.ok(existsSync(`src/assets/press/${outlet.logo}.png`),outlet.logo);
});

test('the group invite page decodes nothing on its own and is noindex in every language',()=>{
 for(const locale of enabledLocales()){
  const html=read(localePath(locale,'/g'));
  assert.match(html,/<meta name="robots" content="noindex/,locale.code);
  assert.ok(!/rel="alternate" hreflang=/.test(html),locale.code);
  assert.ok(html.includes('id="group-open"'),locale.code);
  assert.ok(html.includes("var ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'"),locale.code);
 }
 const aasa=JSON.parse(readFileSync('public/.well-known/apple-app-site-association','utf8'));
 assert.ok(aasa.applinks.details[0].components.some((c:{ '/': string })=>c['/']==='/g/*'));
});

test('download attribution retains the actual source page without JavaScript',()=>{
 for(const route of ['/features/object-scan-alarm','/es/features/object-scan-alarm','/blog/iphone-alarm-didnt-go-off-causes','/tools/sleep-calculator']) {
  const html=read(route);
  const page=route.replace(/^\/es/, '').slice(1).replaceAll('/','-');
  const links=[...html.matchAll(/<a[^>]*data-download[^>]*>/g)];
  assert.ok(links.length>=3);
  for(const [link] of links) assert.ok(link.includes(`data-page="${page}"`),`${route}: ${link}`);
 }
});
