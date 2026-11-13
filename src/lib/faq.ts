/**
 * The questions and answers under a post's FAQ heading, as plain text, for the
 * FAQPage structured data (BlogPostJsonLd). The authoring contract already puts
 * every FAQ question in a `###` heading under one `## FAQ` heading
 * (docs/blog-schedule.md), so the markdown is the single source: a question
 * added to a post reaches its structured data in the same build, and nothing
 * can describe a question the page does not show.
 *
 * Translations use their own heading for the section ("Preguntas frecuentes",
 * "Частые вопросы", "SSS"), so the heading is matched against a list rather
 * than the English word alone.
 *
 * Pure and free of `astro:content`, so the tests can run it under tsx.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/** The FAQ section's heading in each language a post may be written in, lowercased. */
const FAQ_HEADINGS = new Set([
  'faq',
  'faqs',
  'frequently asked questions',
  'preguntas frecuentes',
  'perguntas frequentes',
  'частые вопросы',
  'часті запитання',
  'sss',
  'sıkça sorulan sorular',
  'häufige fragen',
  'questions fréquentes',
  'foire aux questions',
  'pertanyaan umum',
  'الأسئلة الشائعة',
  'अक्सर पूछे जाने वाले प्रश्न',
  'よくある質問',
]);

/** Markdown inline syntax reduced to the words a reader sees. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[^\w*])[*_]([^*_\n]+)[*_](?=[^\w*]|$)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/^>\s?/gm, '')
    // Posts write menu paths as "Settings &gt; Sounds &amp; Haptics"; structured data wants the characters.
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Every `###` question under the post's FAQ heading, with its answer, in page order. */
export function faqFromMarkdown(body: string): FaqItem[] {
  const lines = body.split(/\r?\n/);
  const items: FaqItem[] = [];
  let inFaq = false;
  let question: string | undefined;
  let answer: string[] = [];

  const flush = () => {
    if (question) {
      const text = plainText(answer.join('\n'));
      if (text) items.push({ question: plainText(question), answer: text });
    }
    question = undefined;
    answer = [];
  };

  for (const line of lines) {
    const h2 = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (h2 && !line.startsWith('###')) {
      flush();
      inFaq = FAQ_HEADINGS.has(plainText(h2[1]).toLowerCase());
      continue;
    }
    if (!inFaq) continue;
    const h3 = /^###\s+(.+?)\s*#*\s*$/.exec(line);
    if (h3) {
      flush();
      question = h3[1];
      continue;
    }
    if (question) answer.push(line);
  }
  flush();
  return items;
}
