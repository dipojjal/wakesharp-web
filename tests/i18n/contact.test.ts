import assert from 'node:assert/strict';
import test from 'node:test';
import { POST } from '../../api/contact';
import { DEFAULT_LOCALE, enabledLocales } from '../../src/i18n/config';

const post = (body: string): Promise<Response> =>
  POST(new Request('http://localhost/api/contact', { method: 'POST', body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }));

const other = enabledLocales().find((l) => l.code !== DEFAULT_LOCALE);

test.before(() => {
  // Without the key the endpoint answers with the error page, which is enough to
  // observe the redirect target; nothing is sent.
  delete process.env.RESEND_API_KEY;
});

test('the honeypot redirects to the result page of the requested locale', async () => {
  const en = await post('company=bot&name=a&email=a@b.co&message=hi');
  assert.equal(en.status, 303);
  assert.equal(en.headers.get('Location'), '/contact-sent');
  if (other) {
    const local = await post(`company=bot&lang=${other.path}`);
    assert.equal(local.headers.get('Location'), `/${other.path}/contact-sent`);
  }
});

test('an unknown or default lang value falls back to the English pages', async () => {
  for (const lang of ['zz', 'EN', 'en', '../x', 'es/../../etc']) {
    const res = await post(`lang=${encodeURIComponent(lang)}&name=a&email=a@b.co&message=hi`);
    assert.equal(res.status, 303);
    assert.equal(res.headers.get('Location'), '/contact-error', `lang=${lang}`);
  }
});

test('a valid submission without the mail key lands on the localized error page', async () => {
  if (!other) return;
  const res = await post(`lang=${other.path}&name=a&email=a@b.co&message=hi`);
  assert.equal(res.headers.get('Location'), `/${other.path}/contact-error`);
});
