/**
 * The two link-landing pages, /c (a "Beat my wake" challenge) and /p (a
 * wake-up pact). The `script` strings are read by each page's inline decoder;
 * `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`, `{time}` and `{days}` are
 * filled in by that script from the link itself.
 */
export const share = {
  challenge: {
    title: `A wake-up challenge — WakeSharp`,
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
    title: `A wake-up invite — WakeSharp`,
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
  get: {
    heading: `Get WakeSharp`,
    body: `It’s free, and setting your first alarm takes about ten seconds.`,
  },
};
