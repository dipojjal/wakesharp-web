/**
 * The link-landing pages: /c (a "Beat my wake" challenge), /p (a wake-up pact,
 * the shared alarm before group alarms; old links still open in the app) and
 * /g (a group alarm invite). The `script` strings are read by each page's
 * inline decoder; `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`, `{time}`
 * and `{days}` are filled in by that script from the link itself.
 */
export const share = {
  challenge: {
    title: `A wake-up challenge - WakeSharp`,
    description: `Someone challenged you to a WakeSharp morning.`,
    heading: `Beat my wake`,
    intro: `Someone thinks they woke up sharper than you will.`,
    opening: `Opening the challenge…`,
    cta: `Open this link on your phone with WakeSharp installed to play the same morning mission, with the same seed, and see whether you beat it.`,
    error: `This link could not be read. Chat apps sometimes cut long links in half, so ask whoever sent it to send it again.`,
    script: {
      anonymous: `Someone`,
      summary: `{name} solved {rounds} {difficulty} rounds in {seconds}s.`,
      difficulty: { easy: `easy`, standard: `standard`, hard: `hard` },
    },
  },
  pact: {
    title: `A wake-up invite - WakeSharp`,
    description: `Someone shared a WakeSharp alarm with you.`,
    heading: `A wake-up invite`,
    intro: `Someone wants to wake up with you.`,
    opening: `Opening your invite…`,
    cta: `Open this link on your phone with WakeSharp installed and it will set the alarm for you. Nothing is shared but the time: your phone rings it on its own, with no account and no server involved.`,
    error: `This link could not be read. Chat apps sometimes cut long links in half, so ask whoever sent it to send it again.`,
    script: {
      invited: `{name} invited you to {time} · {days}`,
      invitedAnonymous: `You have been invited to {time} · {days}`,
      once: `once`,
      /** Sunday first, matching the codec's weekday mask. */
      days: [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`],
    },
  },
  group: {
    title: `A group alarm invite - WakeSharp`,
    description: `Someone invited you to a WakeSharp group alarm.`,
    heading: `A group alarm invite`,
    intro: `Someone wants to wake up with you.`,
    opening: `Opening your invite…`,
    /** Shown once the link's code checks out. */
    cta: `Open this link on an iPhone with WakeSharp installed to join the group. Everyone’s alarm rings at the same time, on their own phone, and the group can see who is up. Joining needs a WakeSharp account, so your friends can see you are up. Group alarms are on iPhone for now: Google Play’s version 2.9 does not have them.`,
    /** The button that hands the code to the installed app. */
    open: `Open WakeSharp`,
    error: `This link could not be read. Ask whoever sent it to send it again, or to share a new invite link from the group.`,
    script: {
      /** When the link carries the schedule. */
      invited: `You’re invited to a group alarm at {time} · {days}`,
      /** When it does not (an older app’s link). */
      invitedNoTime: `You’re invited to a group alarm.`,
      once: `once`,
      /** Sunday first, matching the app's weekday mask. */
      days: [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`],
    },
  },
  get: {
    heading: `Get WakeSharp`,
    /** `{trialDays}` and `{annual}` come from src/config/site.ts; the trial never appears without its price. */
    body: `Start with a {trialDays}-day free trial of WakeSharp Unlimited, then {annual} a year. Setting your first alarm takes about ten seconds.`,
  },
};
