import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { publicMissions, HIDDEN_MISSIONS, WARMUP_ONLY, FEATURE_SLUGS, RELEASE } from '../../src/lib/product';
import { REFRESH } from '../../src/lib/refresh';
import { CATALOGS } from '../../src/i18n/catalog';
import { enabledLocales } from '../../src/i18n/config';
import { localePath } from '../../src/i18n/routes';
import { compareShape } from '../../src/i18n/shape';
import manifest from '../../src/data/store-2.14.json';
const read = (path:string) => readFileSync(`dist${path === '/' ? '/index' : path}.html`,'utf8');

test('production visibility excludes gated, retired and warm-up-only entries',()=>{
 const expected=['math_sprint','memory_match','sequence_recall','colour_clash','type_quote','photo_proof','object_scan','fetch','face_check','fruit_slash','walk_steps','first_light','name_five','surprise'];
 assert.deepEqual(publicMissions().map(m=>m.id),expected);
 const visible = new Set<string>(publicMissions().map(m=>m.id));
 for(const id of [...HIDDEN_MISSIONS.map(m=>m.id),...WARMUP_ONLY]) assert.ok(!visible.has(id));
 for(const locale of enabledLocales()) assert.deepEqual(CATALOGS[locale.code].home.mission.missions.map(m=>m.id),expected);
});
test('versioned artwork preserves submitted checksums, dimensions and frame order',()=>{
 assert.equal(manifest.version,'2.14');assert.equal(manifest.revision,2);
 for(const lang of ['en','es','ru','tr','de','fr','ar']){
  assert.deepEqual(manifest.assets.filter(a=>a.platform==='iphone'&&a.language===lang).map(a=>a.order),[1,2,3,4,5,6,7,8]);
 }
 assert.deepEqual(manifest.assets.filter(a=>a.platform==='watch').map(a=>[a.language,a.order]),[['en',1],['en',2],['en',3]]);
 for(const asset of manifest.assets){
  assert.ok(existsSync(asset.file));
  assert.equal(createHash('sha256').update(readFileSync(asset.file)).digest('hex'),asset.sha256,asset.file);
  assert.ok(asset.width>0 && asset.height>0);assert.ok(asset.captionKey);
 }
});
test('every locale has complete copy, a visible directory, all screenshots and linked feature pages',()=>{
 for(const locale of enabledLocales()){
  const t=REFRESH[locale.code];assert.deepEqual(compareShape(REFRESH.en,t),[],locale.code);
  const home=read(localePath(locale,'/'));
  assert.equal((home.match(/data-mission-id=/g)||[]).length,14,locale.code);
  assert.equal((home.match(/<a[^>]*data-enlarge/g)||[]).length,11,locale.code);
  assert.ok(home.includes('data-release-preview="2.14"'));
  assert.ok(!/\b(?:Squats|Serial Sevens|Mind Games|Gentle Start)\b|\u2014/i.test(home));
  assert.ok(home.indexOf('id="loud"')<home.indexOf('id="scan"'));
  assert.ok(home.indexOf('id="scan"')<home.indexOf('id="mission"'));
  assert.ok(home.indexOf('id="mission"')<home.indexOf('id="gallery"'));
  for(const slug of FEATURE_SLUGS){
   const html=read(localePath(locale,`/features/${slug}`));
   assert.ok(html.includes('data-release-preview="2.14"'));
   assert.ok(html.includes(`href="https://wakesharp.app${localePath(locale,`/features/${slug}`)}"`));
   assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,13);
  }
 }
 assert.equal(RELEASE.status,'preview');
 assert.ok(read('/ar').includes('dir="rtl"'));
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
