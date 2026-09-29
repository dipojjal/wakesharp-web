import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { localePath } from '../i18n/routes';
import type { EnabledLocaleCode } from '../i18n/config';
export type FeaturePage = CollectionEntry<'features'>;
export async function getFeaturePages(locale?: EnabledLocaleCode): Promise<FeaturePage[]> {
  const pages = await getCollection('features');
  return pages.filter(p => !locale || p.data.lang === locale).sort((a,b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}
export const featurePath = (page: FeaturePage): string => localePath(page.data.lang, `/features/${page.data.translationOf}`);
/** Stable mission ID, never an English display name. */
export async function missionPages(locale: EnabledLocaleCode = 'en'): Promise<Map<string,string>> {
  const map = new Map<string,string>();
  for (const page of await getFeaturePages(locale)) for (const id of page.data.missions) map.set(id,featurePath(page));
  return map;
}
