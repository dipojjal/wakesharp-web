export const support = {
  "title": "WakeSharp Support: Alarm Not Ringing, Missions & Billing",
  "description": "Get help with WakeSharp: why an alarm might not ring, how missions and the Sharpness Score work, and how to manage your subscription.",
  "heading": "Support",
  "intro": "WakeSharp is a small team, and a human answers the email.",
  "getInTouch": {
    "heading": "Get in touch",
    "body": "Email [{email}](email). I usually reply within **2–3 business days**. Including your phone model, OS version and the WakeSharp version from Settings will almost always get you a faster answer."
  },
  "requirements": {
    "heading": "Requirements",
    "body": "WakeSharp needs {ios} on iPhone, or {android} on Android. The watch apps need watchOS 26 or Wear OS 3."
  },
  "didntRing": {
    "heading": "My alarm didn't ring",
    "callout": "**Start in the app, not here.** Open WakeSharp → Settings → _Alarm reliability_. It reads the live state of your phone (permissions, alarm volume, Do Not Disturb, notification settings, lock-screen takeover, battery restrictions) and leads with a plain verdict: it will ring, it may not, or it cannot. Where a fix is one tap away it offers the tap; where the phone will not tell us something, it says so rather than showing a green tick. It also runs before bed and flags the worst thing it found.",
    "report": "If an alarm has already been missed, WakeSharp shows a report that morning naming the cause where it can prove one (permission revoked, alarm volume at zero, Total Silence, the phone was off) and saying “We couldn't tell why” where it cannot. The checklists below are for when it cannot.",
    "iphone": {
      "heading": "On iPhone",
      "steps": [
        "**Check the alarm is actually enabled** on the Home screen, and that its repeat days include today.",
        "**Check alarm permission.** Settings → WakeSharp. If alarm access was declined, WakeSharp cannot schedule anything. Turn it on and re-save the alarm.",
        "**Check the volume and the silent switch.** WakeSharp rings through Silent mode and Focus, but it cannot ring through a device that is switched off or out of battery.",
        "**Check Bluetooth.** If your phone is still connected to headphones or a car, the alarm may be playing there.",
        "**Restart the phone** and re-save the alarm if it still misbehaves."
      ]
    },
    "android": {
      "heading": "On Android",
      "steps": [
        "**Check the alarm is enabled** and that its repeat days include today.",
        "**Allow notifications.** Settings → Apps → WakeSharp → Notifications. The ring screen arrives as a full-screen notification; blocking notifications suppresses it.",
        "**Turn off battery optimisation for WakeSharp.** Settings → Apps → WakeSharp → Battery → _Unrestricted_. This is the single most common cause on Samsung, Xiaomi, OPPO, vivo and OnePlus devices, which are more aggressive than stock Android. On Samsung, also check Settings → Battery → Background usage limits and make sure WakeSharp is not in \"Sleeping\" or \"Deep sleeping apps\".",
        "**Check Do Not Disturb isn't set to Total Silence.** Priority and Alarms-only modes let alarms through; Total Silence mutes them too, and no app can override it.",
        "**Don't \"Force stop\" WakeSharp.** Force-stopping cancels its scheduled alarms until you open the app again.",
        "**After a restart, open WakeSharp once.** It re-arms your alarms on boot, but opening it guarantees the sync ran."
      ]
    },
    "warning": "**If being woken really matters, set a second alarm on another device.** WakeSharp schedules alarms through the operating system, and the OS decides whether they sound. See the [safety notice](terms-safety).",
    "guidesHeading": "Longer guides"
  },
  "ringsThrough": {
    "heading": "Does WakeSharp really ring through Silent, Focus and Do Not Disturb?",
    "body": "In normal circumstances, yes. That is the whole point of the app, and it is the same mechanism the built-in clock uses on each platform.",
    "items": [
      "**On iPhone**, WakeSharp uses Apple's AlarmKit, which supports sounding through Silent mode and Focus **once you have granted alarm permission**. Decline or revoke it and WakeSharp cannot schedule an alarm at all.",
      "**On Android**, the alarm plays on the dedicated alarm audio stream, which rings through silent mode, and through Do Not Disturb when it allows alarms (Total Silence mutes every sound, alarms included), and shows a full-screen alert over the lock screen, **when the exact-alarm, notification and lock-screen permissions are in place**. There is no extra prompt for the alarm stream itself, but a blocked notification or a battery restriction can still stop the alert."
    ],
    "limit": "What neither platform can do is ring on a phone that is powered off, out of battery, or has had the app's permissions revoked."
  },
  "missions": {
    "heading": "Missions and snoozing",
    "items": [
      "Choose from the missions below, or put several in a sequence. This is the public iPhone 2.14 selection. Camera, movement and voice missions need their corresponding permissions and supported hardware.",
      "Choose a target such as a bottle, mug or sink. When the alarm rings, point the camera at that object. The green match confirmation tells you when WakeSharp has recognised it. Object recognition runs on your phone.",
      "**If a mission can't run** that morning (a dead camera, a phone with no step counter), WakeSharp falls back to one that can, so you are not left with an alarm you cannot finish.",
      "In iPhone 2.14, stopping or snoozing delays the alarm by one minute. It can repeat for up to one hour unless you finish the mission. Your phone’s own controls still work."
    ]
  },
  "smartAlarms": {
    "heading": "Smart calendar alarms",
    "body": "A smart rule rings a set number of minutes before your first meeting, clamped between an earliest and a latest wake time you choose. WakeSharp re-checks your calendar overnight, so if the meeting moves, the alarm moves. If you decline calendar access, everything else still works. You just set times yourself. Your events never leave your device; see the [Privacy Policy](privacy).",
    "limits": "A shift rotation is for patterns that aren't weekly: 4-on / 4-off from an anchor date, each phase with its own time, and a preview calendar so you can check it before you sleep on it."
  },
  "sharpness": {
    "heading": "The Sharpness Score",
    "body": "Sharpness is a daily in-app score. Review it alongside your history, streaks and badges, then visit Nest for your progress with Lark. It is not a sleep score or a medical assessment. A single number does not tell you whether you are safe to drive or work.",
    "physical": "The brain warm-up is optional. Math Problems, Memory Match and Sequence Recall can also be alarm missions. Word Dash and Reaction Tap are warm-up games, not choices in the alarm mission directory."
  },
  "backup": {
    "heading": "Backup, and moving to a new phone",
    "body": "No WakeSharp account is required. Optional sign-in with Apple or Google backs up alarms, history, preferences and small photo-target thumbnails. Camera matching and calendar processing happen on your device. Calendar event content stays there. Read the privacy policy for the full details.",
    "items": [
      "**It is off by default**, and every feature works signed out. Backup runs quietly after your data changes, and an alarm never waits on the network to ring.",
      "**To move to a new phone**, install WakeSharp, sign in with the same Apple or Google account, and restore. Newer changes already on the new device are kept.",
      "**Signing out** keeps everything on your phone and simply stops backing it up.",
      "**Deleting the account** (in the app at _Settings → Account → Delete account_, or as described at [wakesharp.app/account/delete](account-delete)) permanently removes the backup and the login, while the data on your phone is kept."
    ],
    "subscription": "A subscription is separate from all of this: it lives with your App Store or Google Play account, so Restore Purchases brings WakeSharp Unlimited back whether or not you ever sign in to WakeSharp."
  },
  "purchases": {
    "heading": "Purchases and WakeSharp Unlimited",
    "items": [
      "**WakeSharp Unlimited** is the whole app: every wake-up mission, the daily warm-up rotation, your full Sharpness history, smart calendar alarms, shift rotations and profiles, and every Lark scene and wallpaper. New subscribers can start with a **{trialDays}-day free trial** of the yearly plan, then {annual} a year, or choose the monthly plan at {monthly} a month, which has no trial. WakeSharp shows no ads.",
      "**Lifetime** was a one-time purchase, and it stays valid for everyone who bought it: it never renews, and there is nothing to cancel.",
      "**Restoring a purchase:** open the paywall and tap _Restore_. Make sure you are signed in with the same Apple or Google account you bought with.",
      "**Cancelling:** [App Store subscriptions](apple-subs) or [Google Play subscriptions](google-subs), any time, including during the free trial. Deleting the app does not cancel a subscription.",
      "**Refunds** are handled by Apple or Google, not by us, but email me if something went wrong and I will help where I can."
    ]
  },
  "deleting": {
    "heading": "Deleting your data",
    "body": "Uninstalling removes local app data, but does not delete an optional cloud backup or cancel a store subscription. Delete the backup through Settings → Account → Delete account, or use the account deletion page. Manage your subscription separately in the store. [WakeSharp](privacy)."
  },
  "feedback": {
    "heading": "Bugs, feedback and feature requests",
    "body": "All welcome, at [{email}](email). For a bug, the most useful things to include are your phone model, your OS version, what you expected, and what happened instead. If an alarm failed to ring, the time it was set for and the time you found the phone helps a great deal."
  }
};
