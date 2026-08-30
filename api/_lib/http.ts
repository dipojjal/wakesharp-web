import type { ZodType } from 'zod';

const JSON_HEADERS = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
} as const;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message = code,
  ) {
    super(message);
  }
}

export const json = (value: unknown, status = 200): Response =>
  new Response(JSON.stringify(value), { status, headers: JSON_HEADERS });

export async function readJson<T>(request: Request, schema: ZodType<T>): Promise<{ value: T; raw: string }> {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim();
  if (contentType !== 'application/json') throw new ApiError(415, 'json_required');
  const raw = await request.text();
  if (raw.length > 48_000) throw new ApiError(413, 'body_too_large');
  let decoded: unknown;
  try {
    decoded = JSON.parse(raw);
  } catch {
    throw new ApiError(400, 'invalid_json');
  }
  const parsed = schema.safeParse(decoded);
  if (!parsed.success) throw new ApiError(400, 'invalid_request');
  return { value: parsed.data, raw };
}

export async function endpoint(work: () => Promise<Response>): Promise<Response> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof ApiError) return json({ error: error.code }, error.status);
    // Bodies, credentials, signatures, attestation payloads, and provider
    // responses must never be logged. The error class is enough for operations.
    console.error('[growth-api] unhandled error class:', error instanceof Error ? error.name : 'unknown');
    return json({ error: 'internal_error' }, 500);
  }
}

export const methodNotAllowed = (allowed: string): Response =>
  new Response(null, { status: 405, headers: { Allow: allowed, 'Cache-Control': 'no-store' } });
