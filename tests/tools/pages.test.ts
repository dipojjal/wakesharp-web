import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { enabledLocales } from '../../src/i18n/config';
import { TOOL_SLUGS } from '../../src/i18n/tools';
import { localePath } from '../../src/i18n/routes';
import { buildDownloadUrl } from '../../src/lib/download';
const read=(path:string)=>readFileSync(`dist${path}.html`,'utf8');
test('72 indexable tool pages have reciprocal languages, canonical, schema, accessible controls and sitemap entries',()=>{
 const sitemap=readFileSync('dist/sitemap.xml','utf8');let count=0;
 for(const locale of enabledLocales()) for(const slug of ['',...TOOL_SLUGS]){
  const route='/tools'+(slug?'/'+slug:'');const path=localePath(locale,route);const html=read(path);
  assert.equal((html.match(/<h1[ >]/g)??[]).length,1,path);
  assert.ok(html.includes(`rel="canonical" href="https://wakesharp.app${path}"`),path);
  assert.ok(!html.includes('content="noindex'),path);
  assert.ok(sitemap.includes(`<loc>https://wakesharp.app${path}</loc>`),path);
  for(const alt of enabledLocales()) assert.ok(html.includes(`hreflang="${alt.hreflang}" href="https://wakesharp.app${localePath(alt,route)}"`),`${path} -> ${alt.code}`);
  assert.ok(html.includes('BreadcrumbList'));
  if(slug){assert.ok(html.includes('WebApplication'));assert.ok(html.includes('<noscript>'));assert.ok(html.includes('aria-live="polite"'));assert.ok(html.includes('data-controls'));}
  if(locale.code==='ar')assert.ok(html.includes('dir="rtl"'));
  count++;
 }
 assert.equal(count,72);
});
test('localized download pages stay out of search and supply tracked no-JavaScript store fallbacks',()=>{
 const sitemap=readFileSync('dist/sitemap.xml','utf8');
 for(const locale of enabledLocales()){
  const path=localePath(locale,'/download');const html=read(path);
  assert.ok(html.includes('content="noindex'));assert.ok(!/<link[^>]*hreflang=/.test(html));assert.ok(!sitemap.includes(`<loc>https://wakesharp.app${path}</loc>`));
  for(const platform of ['ios','android'] as const) assert.ok(html.includes(buildDownloadUrl({pageId:'home',placement:'download',locale:locale.code},platform).replaceAll('&','&amp;')));
  assert.ok(html.includes('<svg'),path);
 }
});
