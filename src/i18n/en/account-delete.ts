/** /account/delete — the account-deletion resource Google Play's Data safety form links to. */
export const accountDelete = {
  title: `Delete your account — WakeSharp`,
  description: `How to delete your optional WakeSharp account and its cloud backup, from inside the app or by email.`,
  heading: `Delete your WakeSharp account`,
  intro: `WakeSharp accounts are optional — they exist only to back up your alarms, settings, scores and streak so you can restore them on a new phone. Deleting yours removes that backup and the login itself, permanently.`,
  inApp: {
    heading: `Delete it in the app`,
    steps: [
      `Open WakeSharp and go to **Settings**.`,
      `Tap **Account**.`,
      `Tap **Delete account** and confirm.`,
    ],
    body: `That's the whole flow. It permanently deletes your login (Sign in with Apple or Google), your cloud backup — alarms, settings, wake-up history, scores, streak, and any enrolled photo or scan reference thumbnails — and, for Sign in with Apple, revokes the sign-in token with Apple. There is no waiting period and no partial retention: the account row and everything attached to it are removed together.`,
  },
  kept: {
    heading: `What is not deleted`,
    items: [
      `**The data on your phone.** Your alarms, scores and settings stay on your device — deleting the account is not deleting your alarms. Remove the app itself if you want the on-device data gone too.`,
      `**Purchases.** WakeSharp Plus belongs to your App Store or Google Play account, not your WakeSharp account, and survives deletion.`,
      `**Anonymous usage analytics**, which were never linked to your account in the first place — see the [privacy policy](privacy).`,
    ],
  },
  byEmail: {
    heading: `If you no longer have the app`,
    body: `Email [{email}](email) from the address you signed in with (for Sign in with Apple with a hidden address, mention the approximate sign-up date instead) and we'll delete the account for you. We verify the request and complete the deletion within 30 days, almost always much sooner.`,
  },
};
