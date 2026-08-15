/**
 * The /contact form endpoint.
 *
 * A root-level `api/` directory is a Vercel convention, not an Astro one: Vercel
 * builds `api/**` with @vercel/node alongside Astro's static `dist/`, so the site
 * keeps `output: 'static'` with no adapter, and `npm run verify` keeps checking
 * dist/*.html exactly as before. Astro never sees this file.
 *
 * It does get typechecked, though — tsconfig.json includes `**\/*` and excludes only
 * `dist`, so a type error here fails `astro check`, and therefore `npm run build`.
 *
 * The response is a 303 to a static result page rather than JSON. That is what lets
 * the form work with zero client-side JavaScript.
 */

const TO = 'support@wakesharp.app';
const FROM = 'WakeSharp Contact <support@wakesharp.app>';
/** User-facing mail drops the "Contact" qualifier — this is the product speaking. */
const AUTO_FROM = 'WakeSharp <support@wakesharp.app>';

/**
 * Acknowledgement sent to the submitter. Deliberately static: echoing form input
 * back out would let the form push attacker-written text to arbitrary addresses.
 */
const AUTO_REPLY_TEXT = [
  'Thanks for contacting WakeSharp — your message has reached the developer.',
  'Replies usually take 2–3 business days.',
  '',
  "If you didn't submit the contact form at wakesharp.app, you can ignore this email.",
].join('\n');

const SENT = '/contact-sent';
const FAILED = '/contact-error';

/** Longest accepted value per field. Anything longer is treated as junk. */
const LIMITS = { name: 80, email: 160, topic: 60, device: 120, message: 4000 } as const;

/**
 * `Response.redirect()` requires an absolute URL and throws a TypeError on a
 * relative one, so the Location header is built by hand.
 */
const seeOther = (path: string): Response =>
  new Response(null, { status: 303, headers: { Location: path } });

/** Flatten anything that could break out of a header line. */
const oneLine = (s: string): string => s.replace(/[\r\n]+/g, ' ').trim();

export function GET(): Response {
  return seeOther('/contact');
}

export async function POST(request: Request): Promise<Response> {
  let form: URLSearchParams;
  try {
    form = new URLSearchParams(await request.text());
  } catch {
    return seeOther(FAILED);
  }

  const field = (key: string): string => (form.get(key) ?? '').trim();

  // Honeypot. A bot that fills it gets the success page and nothing is sent, so a
  // scripted submitter never learns it was rejected.
  if (field('company') !== '') return seeOther(SENT);

  const name = field('name');
  const email = field('email');
  const topic = field('topic');
  const device = field('device');
  const message = field('message');

  const tooLong =
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    topic.length > LIMITS.topic ||
    device.length > LIMITS.device ||
    message.length > LIMITS.message;

  // Deliberately loose. The browser already applied type="email"; this only has to
  // reject values that would poison the Reply-To header.
  const emailLooksReal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !message || !emailLooksReal || tooLong) return seeOther(FAILED);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set — nothing was sent.');
    return seeOther(FAILED);
  }

  const text = [
    `Name:   ${name}`,
    `Email:  ${email}`,
    `Topic:  ${topic || '(not given)'}`,
    `Device: ${device || '(not given)'}`,
    '',
    message,
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // From has to stay on the verified sending domain. Putting the submitter's
        // address here instead would fail DMARC alignment and get the mail
        // quarantined — Reply-To carries no alignment requirement, which is why
        // untrusted input belongs there and only there.
        from: FROM,
        to: [TO],
        reply_to: [email],
        subject: `[WakeSharp] ${oneLine(topic) || 'Contact'} — ${oneLine(name)}`,
        text,
      }),
    });

    if (!res.ok) {
      console.error(`[contact] Resend returned ${res.status}: ${await res.text()}`);
      return seeOther(FAILED);
    }
  } catch (err) {
    console.error('[contact] Request to Resend failed:', err);
    return seeOther(FAILED);
  }

  // Best-effort acknowledgement to the submitter. The notification above has already
  // succeeded, so a failure here must never surface as /contact-error.
  try {
    const ack = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: AUTO_FROM,
        to: [email],
        subject: 'We received your message — WakeSharp',
        text: AUTO_REPLY_TEXT,
        // RFC 3834, so out-of-office autoresponders don't answer back in a loop.
        headers: { 'Auto-Submitted': 'auto-replied' },
      }),
    });
    if (!ack.ok) {
      console.error(`[contact] Auto-reply send returned ${ack.status}: ${await ack.text()}`);
    }
  } catch (err) {
    console.error('[contact] Auto-reply request failed:', err);
  }

  return seeOther(SENT);
}
