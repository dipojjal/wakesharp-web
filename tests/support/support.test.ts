import assert from 'node:assert/strict';
import { test } from 'node:test';
import { handleSupport, deliveryEmail, deliveryStore, supportSchema, type DeliveryStore, type SupportTicket } from '../../api/_lib/support.js';
const base = { submissionId: '7b849b2e-a293-42ae-a369-640e2d860d14', ticketType: 'contact', category: 'missions', message: 'Mission test', replyEmail: 'person@example.com', platform: 'iOS', locale: 'en_CA', source: 'settings' };
const request = (body: unknown, headers = {}): Request => new Request('https://wakesharp.app/api/support', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
const received: DeliveryStore = { claim: async () => ({ status: 'claimed' }), complete: async (_, receiptId) => ({ status: 'received', receiptId }) };
test('all four forms use fixed mailbox, correct tags and optional email rules', async () => {
  for (const [type, category] of [['contact', 'missions'], ['feature', 'new_mission'], ['feedback', 'could_be_better'], ['bug', 'mission_wont_finish']]) {
    const ticket = supportSchema.parse({ ...base, ticketType: type, category, replyEmail: type === 'contact' ? base.replyEmail : null });
    const mail = deliveryEmail(ticket);
    assert.deepEqual(mail.to, ['support@wakesharp.app']);
    assert.equal(mail.from, 'WakeSharp <support@wakesharp.app>');
    assert.match(mail.subject, new RegExp(`\\[${type.toUpperCase()}\\]`));
    assert.deepEqual(mail.tags[0], { name: 'ticket_type', value: type });
    assert.equal(mail.reply_to?.[0], type === 'contact' ? base.replyEmail : undefined);
    const result = await handleSupport(request(ticket), { key: 'test-key', store: received, transport: async (_url, init) => {
      assert.equal((init?.headers as Record<string, string>)['Idempotency-Key'], `support/${base.submissionId}`);
      return Response.json({ id: 'receipt-1' });
    } });
    assert.equal(result.status, 201);
    assert.deepEqual(await result.json(), { receiptId: 'receipt-1' });
  }
});
test('rejects whitespace, oversize, malformed email, mismatched categories and unexpected fields', async () => {
  for (const patch of [{ message: ' \n ' }, { message: 'a'.repeat(4001) }, { replyEmail: null }, { replyEmail: 'x\r\nBcc:attacker@x.com' }, { category: 'new_mission' }, { diagnostics: { rawLogs: 'secret' } }, { recipient: 'attacker@example.com' }, { source: 'invented' }]) {
    const response = await handleSupport(request({ ...base, ...patch }));
    assert.equal(response.status, 400, JSON.stringify(patch));
    assert.equal((await response.json()).error.code, 'validation_failed');
  }
  assert.equal((await handleSupport(request({ ...base, message: 'x'.repeat(25000) }))).status, 413);
  assert.equal((await handleSupport(new Request('https://x.test', { method: 'POST', body: 'x' }))).status, 415);
  assert.equal((await handleSupport(new Request('https://x.test', { method: 'POST', body: '{', headers: { 'content-type': 'application/json' } }))).status, 400);
});
test('confirmed duplicate skips Resend; conflict, persistent limit, and ambiguous old delivery never send', async () => {
  for (const [status, expected] of [['received', 200], ['conflict', 409], ['rate_limited', 429], ['delivery_unknown', 503]] as const) {
    const result = await handleSupport(request(base), { key: 'test-key', store: { ...received, claim: async () => ({ status, receiptId: 'existing', retryAfterSeconds: 99 }) }, transport: async () => { throw new Error('must not send'); } });
    assert.equal(result.status, expected);
    if (expected === 429) assert.equal(result.headers.get('retry-after'), '99');
  }
});
test('provider timeout, rejection, malformed receipt and metadata failure preserve retry contract', async () => {
  for (const transport of [async () => { throw new DOMException('timeout', 'TimeoutError'); }, async () => new Response(null, { status: 429 }), async () => Response.json({}), async () => Response.json({ id: 'accepted' })]) {
    const result = await handleSupport(request(base), { key: 'test-key', store: { ...received, complete: async () => { throw new Error('metadata unavailable'); } }, transport });
    assert.equal(result.status, 503);
    assert.deepEqual(await result.json(), { error: { code: 'temporary_failure' } });
  }
});
test('store persists only keyed hashes, ID and receipt; IPv6 uses both network budgets', async () => {
  let body: Record<string, unknown> = {};
  const store = deliveryStore('private-provider-key', async (_url, init) => { body = JSON.parse(init?.body as string); return Response.json({ status: 'claimed' }); });
  await store.claim(supportSchema.parse(base), request(base, { 'x-real-ip': '2001:db8:abcd:1234::7' }));
  const encoded = JSON.stringify(body);
  for (const secret of [base.message, base.replyEmail, '2001:db8', 'private-provider-key']) assert.ok(!encoded.includes(secret));
  assert.deepEqual((body.p_buckets as Array<{ factor: number }>).map(value => value.factor), [1, 8]);
  assert.match(body.p_payload_hash as string, /^[a-f0-9]{64}$/);
});
test('canonical schema handles Android nulls and stable wire order for retry digests', () => {
  const android = supportSchema.parse({ ...base, platform: 'Android', diagnostics: null });
  const ios = supportSchema.parse({ diagnostics: undefined, source: base.source, locale: base.locale, platform: 'Android', replyEmail: base.replyEmail, message: base.message, category: base.category, ticketType: base.ticketType, submissionId: base.submissionId });
  assert.equal(JSON.stringify(android), JSON.stringify(ios));
});
