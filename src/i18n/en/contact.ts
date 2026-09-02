/**
 * The contact form and its two result pages. The `<select>` keeps English
 * `value=` attributes in every locale (src/templates/ContactPage.astro) so the
 * support inbox reads one vocabulary; only the visible labels below translate.
 */
export const contact = {
  form: {
    title: `Contact — WakeSharp`,
    description: `Message the developer of WakeSharp directly — bug reports, alarm problems, subscription questions and feature requests.`,
    heading: `Contact`,
    intro: `WakeSharp is a small team, and a human reads everything that arrives here.`,
    callout: `I usually reply within **2–3 business days**. If you would rather use your own mail client, write to [{email}](email) — it reaches the same inbox.`,
    nameLabel: `Your name`,
    emailLabel: `Your email`,
    emailHint: `So I can reply. It is used for nothing else.`,
    topicLabel: `What is this about?`,
    topicPlaceholder: `Choose one…`,
    topics: {
      alarm: `An alarm didn't ring`,
      bug: `Bug report`,
      billing: `Subscription or billing`,
      feature: `Feature request`,
      other: `Something else`,
    },
    deviceLabel: `Phone and OS version`,
    deviceHint: `— optional, but it answers half my follow-up questions`,
    devicePlaceholder: `e.g. Pixel 9, Android 16`,
    messageLabel: `Message`,
    messageHint: `For a bug, what you expected and what happened instead is the most useful thing you can tell me. If an alarm failed, the time it was set for and the time you found the phone helps a great deal.`,
    honeypotLabel: `Company`,
    submit: `Send message`,
    privacyNote: `Your message and email address are sent to me by email and are not stored anywhere else. See the [Privacy Policy](privacy).`,
  },
  sent: {
    title: `Message sent — WakeSharp`,
    description: `Your message to WakeSharp has been sent.`,
    heading: `Message sent`,
    intro: `Thanks — it is on its way to my inbox.`,
    body: `I usually reply within **2–3 business days**, from [{email}](email). If you hear nothing, check your spam folder before assuming it went missing.`,
    meanwhile: `While you wait, the [Support page](support) covers the questions that come up most — including the full checklist for an alarm that did not ring.`,
    backHome: `Back to the homepage`,
  },
  error: {
    title: `Message not sent — WakeSharp`,
    description: `The WakeSharp contact form could not deliver your message.`,
    heading: `That did not go through`,
    intro: `Your message was not delivered, and I would rather tell you than pretend otherwise.`,
    callout: `Please write to [{email}](email) directly instead. Nothing you typed was stored, so it will need retyping — sorry about that.`,
    body: `You will also land here if a required field arrived empty, the email address was not a valid one, or the message ran past the 4,000-character limit the form allows.`,
    backToForm: `Back to the form`,
    support: `Support`,
    homepage: `Homepage`,
  },
};
