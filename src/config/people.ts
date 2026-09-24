/**
 * The people the site names. Articles are published by the company (the
 * BlogPosting author stays KineticBit Inc.); a person appears only as the one
 * who reviewed a post, and only on posts they actually read. The routine that
 * drafts posts never sets `reviewedBy` — docs/blog-schedule.md says so.
 */
export const PEOPLE = {
  founder: {
    name: 'Dipojjal Chakrabarti',
    /** English on purpose: a job title, like the name, is not translated. */
    jobTitle: 'Founder, WakeSharp',
    /** The page that says who this is. */
    path: '/about',
    /** Fragment on that page, and the JSON-LD @id suffix. */
    anchor: 'founder',
  },
} as const;

export type ReviewerId = keyof typeof PEOPLE;
export const REVIEWERS = Object.keys(PEOPLE) as [ReviewerId, ...ReviewerId[]];

/** The JSON-LD @id of a person, stable across every page that mentions them. */
export const personId = (id: ReviewerId, siteUrl: string): string =>
  `${siteUrl}${PEOPLE[id].path}#${PEOPLE[id].anchor}`;
