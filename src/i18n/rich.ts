/**
 * The inline markup catalogs may use, and nothing else:
 *
 *   **strong**           <strong>
 *   _em_                 <em>  (underscores at word boundaries only)
 *   [label](key)         <a href={links[key]}> — the href is supplied by the
 *                        template, never written in a catalog
 *   {name}               a variable supplied by the template (prices, email…)
 *
 * No nesting, no raw HTML. Unbalanced markup throws at build time so a broken
 * translation can never ship as literal asterisks. Rendering is in Rich.astro,
 * which emits JSX text nodes — there is no set:html anywhere in this path.
 */

export type RichNode =
  | { type: 'text'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'em'; value: string }
  | { type: 'link'; key: string; value: string };

export type Vars = Record<string, string | number>;

const TOKEN = /\*\*([^*]+?)\*\*|(?<![\p{L}\p{N}])_([^_]+?)_(?![\p{L}\p{N}])|\[([^\]]+)\]\(([A-Za-z0-9_.-]+)\)/gu;
const PLACEHOLDER = /\{([A-Za-z0-9_]+)\}/g;

const excerpt = (s: string): string => (s.length > 80 ? `${s.slice(0, 77)}…` : s);

export function parseRich(text: string): RichNode[] {
  const nodes: RichNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const index = m.index ?? 0;
    if (index > last) nodes.push({ type: 'text', value: text.slice(last, index) });
    if (m[1] !== undefined) nodes.push({ type: 'strong', value: m[1] });
    else if (m[2] !== undefined) nodes.push({ type: 'em', value: m[2] });
    else nodes.push({ type: 'link', key: m[4] as string, value: m[3] as string });
    last = index + m[0].length;
  }
  if (last < text.length) nodes.push({ type: 'text', value: text.slice(last) });

  for (const n of nodes) {
    if (n.type !== 'text') continue;
    if (n.value.includes('**')) throw new Error(`Unbalanced ** in "${excerpt(text)}"`);
    if (/\]\(/.test(n.value)) throw new Error(`Malformed link in "${excerpt(text)}"`);
  }
  return nodes;
}

/** Replace `{name}` placeholders. A placeholder with no value is a build error. */
export function interpolate(text: string, vars: Vars = {}): string {
  return text.replace(PLACEHOLDER, (_all, name: string) => {
    if (!(name in vars)) throw new Error(`Missing variable {${name}} in "${excerpt(text)}"`);
    return String(vars[name]);
  });
}

/** Parsed nodes with variables substituted per node, so a value can never inject markup. */
export function richNodes(text: string, vars: Vars = {}): RichNode[] {
  return parseRich(text).map((n) => ({ ...n, value: interpolate(n.value, vars) }));
}

/** Markup stripped, variables substituted — for `<title>`, meta descriptions and alt text. */
export function plainText(text: string, vars: Vars = {}): string {
  return richNodes(text, vars).map((n) => n.value).join('');
}
