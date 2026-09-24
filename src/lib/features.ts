import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type FeaturePage = CollectionEntry<'features'>;

/** Every landing page, in hub order. */
export async function getFeaturePages(): Promise<FeaturePage[]> {
  const pages = await getCollection('features');
  return pages.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

export const featurePath = (page: FeaturePage): string => `/features/${page.id}`;

/** English mission name → the landing page that covers it, for the homepage cards. */
export async function missionPages(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  for (const page of await getFeaturePages()) {
    for (const mission of page.data.missions) map.set(mission, featurePath(page));
  }
  return map;
}
