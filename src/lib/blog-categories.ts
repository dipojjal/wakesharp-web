/**
 * The blog's category taxonomy, enforced as a zod enum in src/content.config.ts.
 *
 * Deliberately an enum, not a free string: posts are authored by an unattended
 * scheduled routine, and "Morning Routine" / "morning-routines" drift would
 * silently break the related-posts grouping. With the enum, drift is a build
 * error on the first bad file instead. Adding a category is a one-line change
 * here plus a label below; every publish is already a fresh deploy.
 */
export const CATEGORIES = [
  'sleep-science',
  'morning-routines',
  'productivity',
  'product-updates',
  'tips-and-tricks',
  'company',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  'sleep-science': 'Sleep Science',
  'morning-routines': 'Morning Routines',
  productivity: 'Productivity',
  'product-updates': 'Product Updates',
  'tips-and-tricks': 'Tips & Tricks',
  company: 'Company',
};
