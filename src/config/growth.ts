/** Stable cross-channel IDs shared with the native growth package manifests. */
export const GROWTH_DESTINATIONS = {
  REL: {
    id: 'rel-v01',
    appStoreReference: 'WS-REL-v01',
    playListingReference: 'ws-rel-v01',
  },
  MTG: {
    id: 'mtg-v01',
    appStoreReference: 'WS-MTG-v01',
    playListingReference: 'ws-mtg-v01',
  },
  HSL: {
    id: 'hsl-v01',
    appStoreReference: 'WS-HSL-v01',
    playListingReference: 'ws-hsl-v01',
  },
  SHP: {
    id: 'shp-v01',
    appStoreReference: 'WS-SHP-v01',
    playListingReference: 'ws-shp-v01',
  },
} as const;

export type GrowthAngle = keyof typeof GROWTH_DESTINATIONS;

