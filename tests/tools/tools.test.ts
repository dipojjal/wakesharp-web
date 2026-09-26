import { test } from 'node:test';
import assert from 'node:assert/strict';
import { caffeine, clockMinutes, nextAlarm, sleepDebt, sleepTime } from '../../src/lib/tools/calculators';
import { Timer } from '../../src/lib/tools/timer';
import { buildDownloadUrl, pageIdFor } from '../../src/lib/download';
import { TOOL_COPY, TOOL_SLUGS } from '../../src/i18n/tools';
import { enabledLocales } from '../../src/i18n/config';
test('sleep planning accounts for latency, previous day, and fractional hours',()=>{
 assert.equal(sleepTime(420,8,15,'bedtime'),-75);
 assert.equal(sleepTime(1410,7.5,15,'wake'),1875);
 assert.throws(()=>sleepTime(420,NaN,15,'bedtime'));
 assert.throws(()=>clockMinutes('25:00'));
});
test('sleep debt never offsets shortfall with surplus',()=>{
 const d=sleepDebt([6,10,8,8,8,8,8],8);
 assert.equal(d.debt,2);assert.equal(d.surplus,2);assert.equal(d.average,8);assert.equal(d.range,4);
 assert.throws(()=>sleepDebt([],8));assert.throws(()=>sleepDebt([NaN,8,8,8,8,8,8],8));
});
test('caffeine half and quarter life, zero dose, invalid data',()=>{
 assert.equal(caffeine(100,5,5),50);assert.equal(caffeine(100,10,5),25);assert.equal(caffeine(0,2,5),0);
 assert.throws(()=>caffeine(100,-1,5));assert.throws(()=>caffeine(100,5,0));
});
test('next alarm rolls past times into tomorrow',()=>{
 const now=new Date(2026,8,26,8,0);const next=new Date(nextAlarm('07:00',now));
 assert.equal(next.getDate(),27);assert.equal(next.getHours(),7);
});
test('timer survives suspension, pauses/resumes and cannot resume an overdue alarm',()=>{
 const t=new Timer();t.start(2000,1000);t.pause(1500);assert.equal(t.remaining,1500);
 t.resume(10000);assert.equal(t.deadline,11500);t.tick(20000);assert.equal(t.state,'ringing');
 t.pause(22000);t.resume(23000);assert.equal(t.state,'ringing');t.stop();assert.equal(t.state,'idle');
 assert.throws(()=>t.start(NaN));
});
test('tracking links fix attribution and constrain desktop redirects',()=>{
 const u=new URL(buildDownloadUrl({pageId:'sleep-calculator',placement:'tool-result',locale:'ar'}));
 assert.equal(u.hostname,'wakesharp.onelink.me');assert.equal(u.searchParams.get('pid'),'wakesharp_website');
 assert.equal(u.searchParams.get('c'),'WakeSharp Website');assert.equal(u.searchParams.get('af_adset'),'sleep-calculator');
 const fallback=new URL(u.searchParams.get('af_web_dp')!);assert.equal(fallback.pathname,'/ar/download');
 assert.equal(fallback.searchParams.get('placement'),'tool-result');
 const malicious=new URL(buildDownloadUrl({pageId:'https://evil.test',placement:'x?pid=evil',locale:'nope'}));
 assert.equal(malicious.searchParams.get('af_adset'),'home');assert.equal(malicious.searchParams.get('af_ad'),'download');
 assert.equal(pageIdFor('/ar/c/private-payload'),'c');assert.equal(pageIdFor('/es/tools/nap-timer'),'tools-nap-timer');
 assert.equal(new URL(buildDownloadUrl({pageId:'home',placement:'header',locale:'en'},'ios')).pathname,'/id6801198703');
});
test('all twelve catalogs contain all controls and five unique localized pages',()=>{
 assert.equal(enabledLocales().length,12);
 const keys=Object.keys(TOOL_COPY.en).sort();
 for(const l of enabledLocales()) {const copy=TOOL_COPY[l.code];assert.deepEqual(Object.keys(copy).sort(),keys);assert.equal(copy.pages.length,TOOL_SLUGS.length);for(const p of copy.pages){assert.ok(p.title && p.description && p.method && p.cta);assert.ok(p.title.length+12<=60,`${l.code}: ${p.title}`);}}
});

import { sanitizeDimensions, sanitizedCampaign, sanitizeEnvelope } from '../../src/lib/website-events';
test('analytics rejects tool inputs, results, URLs and arbitrary campaign text',()=>{
 assert.deepEqual(sanitizeDimensions({tool:'nap-timer',duration:'20',result:'7',alarm:'07:00',locale:'ar',placement:'tool-result',page:'https://private.test'}),{tool:'nap-timer',locale:'ar',placement:'tool-result'});
 assert.deepEqual(sanitizedCampaign('?utm_source=newsletter&utm_campaign=hello%40example.com&pid=evil&sleep=6'),{utm_source:'newsletter'});
 assert.deepEqual(sanitizeEnvelope({distinct_id:'anon',surface:'website',$current_url:'https://wakesharp.app/c/private',$initial_referrer:'sensitive',dose:200,night0:4,$process_person_profile:false}),{distinct_id:'anon',surface:'website',$process_person_profile:false});
});
