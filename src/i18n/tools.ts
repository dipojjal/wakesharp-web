import en from './tools/en.json';
import es from './tools/es.json';
import fr from './tools/fr.json';
import de from './tools/de.json';
import ru from './tools/ru.json';
import uk from './tools/uk.json';
import tr from './tools/tr.json';
import pt from './tools/pt-BR.json';
import id from './tools/id.json';
import ja from './tools/ja.json';
import hi from './tools/hi.json';
import ar from './tools/ar.json';
import type { EnabledLocaleCode } from './config';
export type ToolCopy = typeof en;
export const TOOL_COPY = { en, es, fr, de, ru, uk, tr, 'pt-BR': pt, id, ja, hi, ar } satisfies Record<EnabledLocaleCode, ToolCopy>;
export const toolCopy = (code: EnabledLocaleCode) => TOOL_COPY[code];
export const TOOL_SLUGS = ['sleep-calculator', 'online-alarm-clock', 'nap-timer', 'sleep-debt-calculator', 'caffeine-calculator'] as const;
export type ToolSlug = typeof TOOL_SLUGS[number];
export const SOURCES = [
  'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
  'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices',
  'https://www.cdc.gov/niosh/work-hour-training-for-nurses/longhours/mod7/05.html',
  'https://www.nhlbi.nih.gov/health/sleep-deprivation',
  'https://www.cdc.gov/niosh/work-hour-training-for-nurses/longhours/mod6/11.html',
];
