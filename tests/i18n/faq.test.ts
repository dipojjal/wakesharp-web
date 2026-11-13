import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { faqFromMarkdown, plainText } from '../../src/lib/faq';

const body = `Intro paragraph.

## FAQ

### How long does sleep inertia last?

Typically **15 to 60 minutes**, see [the study](https://example.com/study).

A second paragraph with *emphasis*.

### Is it a disorder?

- Usually not.
- Ask a clinician.

## The evening version of this

### Not a question

Body after the FAQ.
`;

test('reads every ### question under the FAQ heading, and stops at the next ## heading', () => {
  const items = faqFromMarkdown(body);
  assert.deepEqual(
    items.map((i) => i.question),
    ['How long does sleep inertia last?', 'Is it a disorder?'],
  );
});

test('answers are plain text: links, emphasis and list markers are reduced to their words', () => {
  const [first, second] = faqFromMarkdown(body);
  assert.equal(first.answer, 'Typically 15 to 60 minutes, see the study. A second paragraph with emphasis.');
  assert.equal(second.answer, 'Usually not. Ask a clinician.');
});

test('a post without a FAQ heading yields nothing', () => {
  assert.deepEqual(faqFromMarkdown('## Something\n\n### A heading\n\nText.'), []);
});

test('translated FAQ headings count', () => {
  for (const heading of ['Preguntas frecuentes', 'Частые вопросы', 'SSS']) {
    const items = faqFromMarkdown(`## ${heading}\n\n### Q?\n\nA.`);
    assert.equal(items.length, 1, heading);
  }
});

test('plainText decodes the entities posts use for menu paths', () => {
  assert.equal(plainText('Settings &gt; Face ID &amp; Passcode'), 'Settings > Face ID & Passcode');
});

test('plainText keeps snake_case and arithmetic intact', () => {
  assert.equal(plainText('a snake_case name and 2 * 3 = 6'), 'a snake_case name and 2 * 3 = 6');
});

test('every post with a FAQ section yields at least three questions with answers', () => {
  const root = join(import.meta.dirname, '..', '..', 'src', 'content', 'blog');
  const files: string[] = [];
  (function walk(dir: string) {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) walk(p);
      else if (e.endsWith('.md')) files.push(p);
    }
  })(root);
  for (const file of files) {
    const text = readFileSync(file, 'utf8').replace(/^---[\s\S]*?\n---\n/, '');
    if (!/^## (?:FAQ|Preguntas frecuentes|Частые вопросы|SSS)\s*$/m.test(text)) continue;
    const items = faqFromMarkdown(text);
    assert.ok(items.length >= 3, `${file}: ${items.length} FAQ items`);
    for (const item of items) assert.ok(item.answer.length > 20, `${file}: "${item.question}" has no answer`);
  }
});
