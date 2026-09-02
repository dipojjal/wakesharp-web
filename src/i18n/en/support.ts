/**
 * /support — the App Store Connect support URL. Link keys used below:
 * email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * `{ios}` and `{android}` are the requirement strings from src/config/site.ts.
 */
export const support = {
  title: `Support — WakeSharp`,
  description: `Get help with WakeSharp: why an alarm might not ring, how missions and the Sharpness Score work, and how to manage your subscription.`,
  heading: `Support`,
  intro: `WakeSharp is a small team, and a human answers the email.`,

  getInTouch: {
    heading: `Get in touch`,
    body: `Email [{email}](email). I usually reply within **2–3 business days**. Including your phone model, OS version and the WakeSharp version from Settings will almost always get you a faster answer.`,
  },

  requirements: {
    heading: `Requirements`,
    body: `WakeSharp needs {ios} on iPhone, or {android} on Android. The watch apps need watchOS 26 or Wear OS 3.`,
  },

  didntRing: {
    heading: `My alarm didn't ring`,
    callout: `**Start in the app, not here.** Open WakeSharp → Settings → _Alarm reliability_. It reads the live state of your phone — permissions, alarm volume, Do Not Disturb, notification settings, lock-screen takeover, battery restrictions — and leads with a plain verdict: it will ring, it may not, or it cannot. Where a fix is one tap away it offers the tap; where the phone will not tell us something, it says so rather than showing a green tick. It also runs before bed and flags the worst thing it found.`,
    report: `If an alarm has already been missed, WakeSharp shows a report that morning naming the cause where it can prove one — permission revoked, alarm volume at zero, Total Silence, the phone was off — and saying “We couldn't tell why” where it cannot. The checklists below are for when it cannot.`,
    iphone: {
      heading: `On iPhone`,
      steps: [
        `**Check the alarm is actually enabled** on the Home screen, and that its repeat days include today.`,
        `**Check alarm permission.** Settings → WakeSharp. If alarm access was declined, WakeSharp cannot schedule anything. Turn it on and re-save the alarm.`,
        `**Check the volume and the silent switch.** WakeSharp rings through Silent mode and Focus, but it cannot ring through a device that is switched off or out of battery.`,
        `**Check Bluetooth.** If your phone is still connected to headphones or a car, the alarm may be playing there.`,
        `**Restart the phone** and re-save the alarm if it still misbehaves.`,
      ],
    },
    android: {
      heading: `On Android`,
      steps: [
        `**Check the alarm is enabled** and that its repeat days include today.`,
        `**Allow notifications.** Settings → Apps → WakeSharp → Notifications. The ring screen arrives as a full-screen notification; blocking notifications suppresses it.`,
        `**Turn off battery optimisation for WakeSharp.** Settings → Apps → WakeSharp → Battery → _Unrestricted_. This is the single most common cause on Samsung, Xiaomi, OPPO, vivo and OnePlus devices, which are more aggressive than stock Android. On Samsung, also check Settings → Battery → Background usage limits and make sure WakeSharp is not in "Sleeping" or "Deep sleeping apps".`,
        `**Check Do Not Disturb isn't set to Total Silence.** Priority and Alarms-only modes let alarms through; Total Silence mutes them too, and no app can override it.`,
        `**Don't "Force stop" WakeSharp.** Force-stopping cancels its scheduled alarms until you open the app again.`,
        `**After a restart, open WakeSharp once.** It re-arms your alarms on boot, but opening it guarantees the sync ran.`,
      ],
    },
    warning: `**If being woken really matters, set a second alarm on another device.** WakeSharp schedules alarms through the operating system, and the OS decides whether they sound. See the [safety notice](terms-safety).`,
  },

  ringsThrough: {
    heading: `Does WakeSharp really ring through Silent, Focus and Do Not Disturb?`,
    body: `In normal circumstances, yes — that is the whole point of the app, and it is the same mechanism the built-in clock uses on each platform.`,
    items: [
      `**On iPhone**, WakeSharp uses Apple's AlarmKit, which supports sounding through Silent mode and Focus **once you have granted alarm permission**. Decline or revoke it and WakeSharp cannot schedule an alarm at all.`,
      `**On Android**, the alarm plays on the dedicated alarm audio stream, which Do Not Disturb does not silence, and shows a full-screen alert over the lock screen — **when the exact-alarm, notification and lock-screen permissions are in place**. There is no extra prompt for the alarm stream itself, but a blocked notification or a battery restriction can still stop the alert.`,
    ],
    limit: `What neither platform can do is ring on a phone that is powered off, out of battery, or has had the app's permissions revoked.`,
  },

  missions: {
    heading: `Missions, snoozing and Strict Mode`,
    items: [
      `**The mission** is what earns you full credit for the morning. Two are free: _Mind Games_, three quick arithmetic problems at easy, standard or hard, and _Photo Proof_, which asks for a single photograph — the day's rotating prompt, or a target you enrolled for that alarm. WakeSharp Plus adds _Memory Match_, _Sequence Recall_, _Scan an Object_, _Walk It Off_ and _Surprise Me_, which picks one for you and fixes it for that alarm on that day, so you cannot stage it the night before. **The choice is gated when you create or edit an alarm, never when one rings** — an alarm already set to a Plus mission keeps running it.`,
      `**My spots & codes** is where _Scan an Object_ gets personal. Photograph a place you will walk to, like the kettle or the front door, or register a QR or barcode you stick where the morning should send you, like the bathroom mirror or the coffee tin. An alarm can then ask for that specific target. It is a feature _inside_ the scan mission rather than a mission of its own, and neither the photograph nor the code is stored — only a fingerprint of each.`,
      `**Every mission has a way out** that ends in Mind Games at full credit, so a dead camera or a phone with no step counter can never leave you stuck with an alarm you cannot silence.`,
      `**Snoozing** is a setting per alarm, not a fixed rule. _Off_ removes the button entirely. _Standard_ allows two snoozes of five minutes, at 5 Sharpness each and no worse than −10 for the day. _Tighten_ allows three, at 10, then 5, then 2 minutes, raises the mission's difficulty each time, and stops at −15. All three presets are free; a fully custom policy is part of WakeSharp Plus.`,
      `**Strict Mode**, where supported, pre-schedules four guard alarms — 45 seconds later, then at 4, 8 and 12 minutes. They are real alarms booked in advance, so they ring whether or not the app is running, and completing the mission cancels whichever have not fired yet. It is four re-rings, not an endless loop, and the system's own stop button still ends each one. Turn it on per alarm.`,
      `**Dismissing without a mission** is possible — the system's own stop button always works. WakeSharp then shows an owed-mission screen the next time you open it, so your streak can still be repaired.`,
    ],
  },

  smartAlarms: {
    heading: `Smart calendar alarms`,
    body: `A smart rule rings a set number of minutes before your first meeting, clamped between an earliest and a latest wake time you choose. WakeSharp re-checks your calendar overnight, so if the meeting moves, the alarm moves. If you decline calendar access, everything else still works — you just set times yourself. Your events never leave your device; see the [Privacy Policy](privacy).`,
    limits: `Free includes one smart rule, one shift rotation and one alarm profile; Plus lifts all three limits. A shift rotation is for patterns that aren't weekly — 4-on / 4-off from an anchor date, each phase with its own time, and a preview calendar so you can check it before you sleep on it.`,
  },

  sharpness: {
    heading: `The Sharpness Score`,
    body: `After a mission you can run an optional warm-up. Free draws one game from a two-game pool, Math Sprint and Reaction Tap; Plus plays three of the five each morning on a rotation, around two minutes in all. Either way the warm-up skips whichever game the mission just made you play, so solving arithmetic to silence the alarm never hands you more arithmetic as a warm-up. Your score is measured against your own rolling baseline, not against other people, so it settles around 100 as the app learns your normal. A bad morning is a dip against yesterday's you, nothing more. It is not a clinical or cognitive test.`,
    physical: `**The physical missions do not feed the score.** Scan an Object, Walk It Off and Photo Proof are recorded in full, but they are only ever compared against themselves. A walk to the bathroom takes thirty seconds and a mental sum takes two, so folding one into a score built from accuracy and speed would peg a flawless morning near the floor. Getting up is counted — just not as sharpness.`,
  },

  backup: {
    heading: `Backup, and moving to a new phone`,
    body: `There is no account to make, and nothing is gated behind one. You can optionally sign in with **Apple** or **Google** — those are the only options, and there is no email-and-password login — for a single purpose: to back up your alarms, settings, scores and streak so they come back on a new phone.`,
    items: [
      `**It is off by default**, and every feature works signed out. Backup runs quietly after your data changes, and an alarm never waits on the network to ring.`,
      `**To move to a new phone**, install WakeSharp, sign in with the same Apple or Google account, and restore. Newer changes already on the new device are kept.`,
      `**Signing out** keeps everything on your phone and simply stops backing it up.`,
      `**Deleting the account** — in the app at _Settings → Account → Delete account_, or as described at [wakesharp.app/account/delete](account-delete) — permanently removes the backup and the login, while the data on your phone is kept.`,
    ],
    subscription: `A subscription is separate from all of this: it lives with your App Store or Google Play account, so Restore Purchases brings Plus back whether or not you ever sign in to WakeSharp.`,
  },

  purchases: {
    heading: `Purchases and WakeSharp Plus`,
    items: [
      `**What Plus adds:** every wake-up mission beyond Mind Games and Photo Proof, three warm-up games every morning on a rotation, your full Sharpness history, unlimited smart calendar alarms, and the Lark scenes, alarm wallpapers and celebrations. It also lifts the one-each limit on alarm profiles and shift rotations, unlocks the two Plus wallpapers and the four Plus Lark scenes, and lets you write a custom snooze policy. **Your alarm rings free, forever. No ads.** Every alarm you set, both free missions, Strict Mode where supported, the snooze presets, all 13 alarm tones, streaks and freezes and the reliability check cost nothing.`,
      `**Plus Lifetime** is a one-time purchase rather than a subscription: it never renews, and there is nothing to cancel.`,
      `**Restoring a purchase:** open the paywall and tap _Restore_. Make sure you are signed in with the same Apple or Google account you bought with.`,
      `**Cancelling:** [App Store subscriptions](apple-subs) or [Google Play subscriptions](google-subs). Deleting the app does not cancel a subscription.`,
      `**Refunds** are handled by Apple or Google, not by us — but email me if something went wrong and I will help where I can.`,
    ],
  },

  deleting: {
    heading: `Deleting your data`,
    body: `Everything WakeSharp records lives on your phone. Uninstalling the app deletes all of it, and we hold no copy. For the anonymous subscription record held by our payments processor, see [how long data is kept](privacy).`,
  },

  feedback: {
    heading: `Bugs, feedback and feature requests`,
    body: `All welcome, at [{email}](email). For a bug, the most useful things to include are your phone model, your OS version, what you expected, and what happened instead. If an alarm failed to ring, the time it was set for and the time you found the phone helps a great deal.`,
  },
};
