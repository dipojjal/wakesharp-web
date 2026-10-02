/**
 * The English metadata of the two legal pages. Shared by the root routes and
 * the localized wrappers so the intro and description exist exactly once.
 */
export const PRIVACY = {
  title: 'Privacy Policy - WakeSharp',
  description:
    'How WakeSharp handles optional accounts, purchases, product analytics and campaign measurement, and how you control your privacy. WakeSharp shows no ads.',
  heading: 'Privacy Policy',
  intro:
    'WakeSharp is an alarm clock that runs on your phone and requires no account. This policy explains local data, optional backups and weather, purchases, and product and marketing measurement. WakeSharp shows no adverts. Measurement records use pseudonymous identifiers that can link to your account when you sign in.',
  lastUpdated: '2026-10-01',
};

export const TERMS = {
  title: 'Terms of Service - WakeSharp',
  description:
    'The agreement covering your use of WakeSharp, including subscription terms and an important safety notice about relying on any alarm.',
  heading: 'Terms of Service',
  intro:
    'These terms cover your use of the WakeSharp app. They also serve as the end-user licence agreement for WakeSharp. Please read section 8 in particular. It is about relying on an alarm.',
};

/**
 * The 2.16 "Inviting friends" section of the privacy policy
 * (src/templates/PrivacyBody.astro, its line under "How long data is kept",
 * and its session-recording bullet). Published 2026-10-01, with
 * PRIVACY.lastUpdated, after every claim was checked against the code; the
 * comment above the section lists the behaviour it relies on. Setting this
 * back to false hides all three again.
 */
export const REFERRAL_DISCLOSURE: { published: boolean } = { published: true };
