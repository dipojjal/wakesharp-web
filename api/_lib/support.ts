import { createHmac } from 'node:crypto';
import { z } from 'zod';
import { clientNetworks, rateBucketKey } from './rate-limit.js';

export const categories = {
  contact: { alarms_sound: 'Alarms & sound', missions: 'Missions', subscription_billing: 'Subscription & billing', account_backup: 'Account & backup', other: 'Other' },
  feature: { alarm_scheduling: 'Alarm scheduling', new_mission: 'New mission', customization: 'Customization', integrations: 'Integrations', other: 'Other' },
  feedback: { what_i_like: 'What I like', could_be_better: 'Could be better', confusing: 'Confusing experience', other: 'Other' },
  bug: { alarm_didnt_ring: 'Alarm didn’t ring', mission_wont_finish: 'Mission won’t finish', crash_freeze: 'Crash or freeze', subscription_access: 'Subscription/access', other: 'Other' },
} as const;
const email = z.string().trim().max(160).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const boundedLine = z.string().trim().min(1).max(120).regex(/^[^\r\n\x00-\x1f]*$/);
export const supportSchema = z.object({
  submissionId: z.uuid().transform(value => value.toLowerCase()),
  ticketType: z.enum(['contact', 'feature', 'feedback', 'bug']),
  category: z.string().max(40).default('other'),
  message: z.string().max(4000).trim().min(1),
  replyEmail: email.nullish().transform(value => value ?? undefined),
  platform: z.enum(['iOS', 'Android']),
  locale: z.string().min(2).max(40).regex(/^[A-Za-z0-9_-]+$/),
  source: z.enum(['settings', 'app_icon', 'cancellation']),
  diagnostics: z.object({ appVersion: boundedLine, os: boundedLine, deviceModel: boundedLine }).strict().nullish().transform(value => value ?? undefined),
}).strict().superRefine((value, ctx) => {
  if (!Object.hasOwn(categories[value.ticketType], value.category)) ctx.addIssue({ code: 'custom', path: ['category'], message: 'Invalid category' });
  if (value.ticketType === 'contact' && !value.replyEmail) ctx.addIssue({ code: 'custom', path: ['replyEmail'], message: 'Reply email required' });
});
export type SupportTicket = z.infer<typeof supportSchema>;
export interface DeliveryState { status: 'claimed' | 'received' | 'conflict' | 'rate_limited' | 'delivery_unknown' | 'invalid'; receiptId?: string; retryAfterSeconds?: number }
export interface DeliveryStore {
  claim(ticket: SupportTicket, request: Request): Promise<DeliveryState>;
  complete(ticket: SupportTicket, receiptId: string): Promise<DeliveryState>;
}
export const metadataToken = (key: string): string => createHmac('sha256', key).update('wakesharp-support-metadata-v1').digest('hex');
export function deliveryStore(key: string, transport: typeof fetch = fetch): DeliveryStore {
  const token = metadataToken(key);
  const rpc = async (ticket: SupportTicket, buckets: { key: string; factor: number }[], receiptId?: string): Promise<DeliveryState> => {
    const response = await transport('https://ltwchaijzcvncxzexdnk.supabase.co/rest/v1/rpc/support_delivery', {
      method: 'POST', signal: AbortSignal.timeout(5000), headers: {
        'Content-Type': 'application/json', apikey: 'sb_publishable_51NuCTKEC2zMdE3XlCXb4g_g1SqTr4H',
      }, body: JSON.stringify({ p_token: token, p_submission_id: ticket.submissionId,
        p_payload_hash: createHmac('sha256', token).update(JSON.stringify(ticket)).digest('hex'),
        p_buckets: buckets, p_receipt_id: receiptId ?? null }),
    });
    if (!response.ok) throw new Error('metadata_unavailable');
    return await response.json() as DeliveryState;
  };
  return {
    claim: (ticket, request) => rpc(ticket, clientNetworks(request).map(({ network, factor }) => ({
      key: rateBucketKey(token, 'native_support', network).toString('hex'), factor,
    }))),
    complete: (ticket, receipt) => rpc(ticket, [], receipt),
  };
}
const maxBodyBytes = 24_576;
class RequestProblem extends Error { constructor(readonly status: number, readonly code: string) { super(code); } }
async function boundedJSON(request: Request): Promise<unknown> {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) throw new RequestProblem(415, 'json_required');
  if (Number(request.headers.get('content-length')) > maxBodyBytes) throw new RequestProblem(413, 'request_too_large');
  const reader = request.body?.getReader();
  if (!reader) throw new RequestProblem(400, 'invalid_json');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) { await reader.cancel(); throw new RequestProblem(413, 'request_too_large'); }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
  } catch (error) {
    if (error instanceof RequestProblem) throw error;
    throw new RequestProblem(400, 'invalid_json');
  } finally { reader.releaseLock(); }
}
const json = (body: unknown, status: number, headers: Record<string, string> = {}): Response =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
const failure = (status: number, code: string, extra: Record<string, unknown> = {}): Response =>
  json({ error: { code, ...extra } }, status, status === 429 ? { 'Retry-After': String(extra.retryAfterSeconds ?? 3600) } : {});
export function deliveryEmail(ticket: SupportTicket) {
  const category = (categories[ticket.ticketType] as Record<string, string>)[ticket.category];
  return {
    from: 'WakeSharp <support@wakesharp.app>', to: ['support@wakesharp.app'],
    ...(ticket.replyEmail ? { reply_to: [ticket.replyEmail] } : {}),
    subject: `[WakeSharp][${ticket.ticketType.toUpperCase()}][${category}][${ticket.platform}]`,
    text: [`Type: ${ticket.ticketType}`, `Category: ${category}`, `Platform: ${ticket.platform}`,
      `Locale: ${ticket.locale}`, `Source: ${ticket.source}`, `Submission: ${ticket.submissionId}`,
      ...(ticket.diagnostics ? [`App: ${ticket.diagnostics.appVersion}`, `OS: ${ticket.diagnostics.os}`, `Device: ${ticket.diagnostics.deviceModel}`] : []),
      '', ticket.message].join('\n'),
    tags: [{ name: 'ticket_type', value: ticket.ticketType }, { name: 'category', value: ticket.category },
      { name: 'platform', value: ticket.platform }, { name: 'source', value: ticket.source }],
  };
}
export async function handleSupport(request: Request, dependencies: { key?: string; store?: DeliveryStore; transport?: typeof fetch } = {}): Promise<Response> {
  if (request.method !== 'POST') return json({ error: { code: 'method_not_allowed' } }, 405, { Allow: 'POST' });
  try {
    const parsed = supportSchema.safeParse(await boundedJSON(request));
    if (!parsed.success) return failure(400, 'validation_failed', { field: parsed.error.issues[0]?.path[0] ?? 'request' });
    const ticket = parsed.data;
    const key = dependencies.key ?? process.env.RESEND_API_KEY;
    if (!key) return failure(503, 'temporary_failure');
    const transport = dependencies.transport ?? fetch;
    const store = dependencies.store ?? deliveryStore(key, transport);
    const claim = await store.claim(ticket, request);
    if (claim.status === 'received' && claim.receiptId) return json({ receiptId: claim.receiptId }, 200);
    if (claim.status === 'rate_limited') return failure(429, 'rate_limited', { retryAfterSeconds: claim.retryAfterSeconds ?? 3600 });
    if (claim.status === 'conflict') return failure(409, 'submission_conflict');
    if (claim.status === 'delivery_unknown') return failure(503, 'delivery_unknown');
    if (claim.status !== 'claimed') return failure(503, 'temporary_failure');
    const sent = await transport('https://api.resend.com/emails', {
      method: 'POST', signal: AbortSignal.timeout(10_000), headers: { Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json', 'Idempotency-Key': `support/${ticket.submissionId}` },
      body: JSON.stringify(deliveryEmail(ticket)),
    });
    if (!sent.ok) return failure(503, 'temporary_failure');
    const body = await sent.json() as { id?: unknown };
    if (typeof body.id !== 'string' || !body.id || body.id.length > 100) return failure(503, 'temporary_failure');
    const completed = await store.complete(ticket, body.id);
    if (completed.status !== 'received' || !completed.receiptId) return failure(503, 'temporary_failure');
    return json({ receiptId: completed.receiptId }, 201);
  } catch (error) {
    if (error instanceof RequestProblem) return failure(error.status, error.code);
    // Never log request, provider response, email, diagnostics, or written content.
    return failure(503, 'temporary_failure');
  }
}
