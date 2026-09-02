/**
 * The homepage. Headings are split into {pre, accent, post} because the
 * highlighted word is a <span class="accent"> in the template; keep the
 * surrounding spaces inside the strings. `{ios}`, `{android}`, `{annual}`,
 * `{lifetime}` and `{trialDays}` come from src/config/site.ts.
 */
export const home = {
  title: `WakeSharp — Wake up sharp. Not just awake.`,

  hero: {
    heading: { pre: `Wake up `, accent: `sharp.`, post: `Not just awake.` },
    lede: `A swipe is something a barely conscious person can do. WakeSharp asks for a mission instead — solve it, photograph it, scan it or walk it — and then scores how sharp you actually woke up.`,
    phoneAlt: `WakeSharp home screen at night, showing a 6:40 AM alarm and a smart calendar rule`,
  },

  trust: [
    `Rings through Silent and Focus on iPhone`,
    `Tells you what could stop it — the night before`,
    `No sign-up required, and no ads`,
    `Your calendar and your camera never leave your phone`,
    `Your alarm rings free, forever`,
  ],

  ring: {
    alt: `The WakeSharp alarm ringing, with Start Mission and Snooze`,
    heading: { pre: `Complete the mission for `, accent: `full credit`, post: `` },
    lede: `On iPhone, Apple’s AlarmKit presents a system alarm over the lock screen — through Silent mode and Focus once alarm access is granted, even if the app was force-quit. On Android, an exact alarm on the alarm stream that Do Not Disturb doesn’t silence, with Extra Loud and a build-up ramp that climbs instead of blasting. The system’s own stop button always works; the mission is what earns the morning.`,
  },

  reliable: {
    heading: { pre: `Know it will ring, `, accent: `the night before`, post: `` },
    lede: `Most alarm apps find out they failed at the same moment you do. WakeSharp checks the things that actually stop alarms — permissions, alarm volume, notification settings, lock-screen takeover, battery restrictions — and leads with a verdict, not a promise.`,
    items: [
      { title: `A verdict, not a checklist`, body: `One line at the top: it will ring, it may not, or it cannot.` },
      { title: `Honest about what it can’t see`, body: `Where the phone won’t tell us, it says so — never a green tick.` },
      { title: `One-tap fixes where they exist`, body: `And plain instructions where they don’t.` },
      { title: `“It didn’t ring” gets an answer`, body: `The provable cause — or an admission that we couldn’t tell.` },
    ],
    note: `It is free, it is in Settings, and the pre-bed reminder folds the worst finding in so you see it while there is still time to fix it.`,
  },

  smart: {
    alt: `The smart alarm rule editor, set to ring 90 minutes before the first meeting`,
    heading: { pre: `Wakes you before your `, accent: `first meeting`, post: `` },
    lede: `“Ring 90 minutes before my first meeting.” WakeSharp reads your calendar on your device, re-checks it overnight, and moves the alarm when the meeting moves. Read-only, optional, never transmitted.`,
    shifts: `Not every week is a week, either. Shift rotations handle the patterns that aren’t weekly — two days on, two nights, four off — with a preview calendar and a way to skip a single date without deleting anything. Profiles swap a whole set of alarms at once for work, vacation or on call. Search, sorting and a Today view keep the list honest when there are a lot of them.`,
    labels: `Name what you’re waking up for — a workout, a commute, breakfast — and the label writes itself. One smart rule, one rotation and one profile are free; Plus lifts all three.`,
  },

  mission: {
    alt: `The Mind Games mission: solve 6 minus 3 to silence the alarm`,
    heading: { pre: `Seven ways to `, accent: `get you up`, post: `` },
    lede: `Something has to happen before the morning counts, and you pick what. Mind Games and Photo Proof are free; the rest come with Plus. Every one of them has a way out that ends in Mind Games at full credit, so a dead camera or a phone with no step counter never leaves you stuck.`,
    /**
     * The seven missions the alarm editor offers, free ones first.
     *
     * Memory Match and Sequence Recall are warm-up games *and* missions — they
     * carry `supportsMission` in GameCatalog.json — which is why they appear in
     * both this list and `games`. Leaving them out here is what made this page
     * claim five missions while support.ts and check-copy.mjs both said seven.
     */
    missions: [
      { name: `Mind Games`, tier: `Free`, body: `Three arithmetic problems at easy, standard or hard. The one every other mission falls back to.` },
      { name: `Photo Proof`, tier: `Free`, body: `Photograph the sky, your bed made, a glass of water. Six prompts on a daily rotation, so there is nothing to line up the night before.` },
      { name: `Memory Match`, tier: `Plus`, body: `Turn cards over two at a time until every pair is matched. Four pairs at easy, eight at hard.` },
      { name: `Sequence Recall`, tier: `Plus`, body: `Watch a sequence, then play it back. It starts at three steps and grows a step each round.` },
      { name: `Scan an Object`, tier: `Plus`, body: `Point the camera at something across the room. Twenty everyday objects in the catalogue, recognised on the phone itself.` },
      { name: `Walk It Off`, tier: `Plus`, body: `Get out of bed and take the steps. It reads the step counter and watches your cadence, so shaking the phone counts for nothing.` },
      { name: `Surprise me`, tier: `Plus`, body: `Rolls one of the others — fixed for that alarm on that day, so you find out when it rings.` },
    ],
    note: `The mission is chosen when you build the alarm, never when it rings — an alarm already carrying a scan or a walk keeps running it whatever happens to a subscription. Strict Mode, where supported, books four re-rings in advance, and snoozing is a policy you set rather than a rule you’re given.`,
  },

  games: {
    alt: `The Memory Match warm-up game`,
    heading: { pre: `A two-minute `, accent: `warm-up`, post: ` while the kettle boils` },
    lede: `Mind Games, Memory Match, Sequence Recall, Word Dash and Reaction Tap. Free plays one after your mission, drawn from a pool of two. Plus plays three each morning and rotates them, so the whole set comes round inside a week — and never repeats whatever the mission just made you do. None of it is compulsory; the alarm is already off by then.`,
  },

  sharp: {
    alt: `The daily Sharpness Score reveal`,
    heading: { pre: `Know how `, accent: `sharp`, post: ` you woke up` },
    lede: `One number out of 100, scored against your own rolling baseline — not against strangers. The physical missions stay out of it: a scan, a walk and a photo are only ever compared against themselves, because crossing the room is not an arithmetic score. Yesterday’s you is the only benchmark that means anything at 6am.`,
  },

  stats: {
    alt: `The Sharpness trend chart with a streak counter`,
    heading: { pre: `Watch yourself get `, accent: `sharper`, post: `` },
    lede: `A streak, a trend line, and a freeze token every seven mornings — you can bank two, so life is allowed to happen twice. Milestones land at 7, 30, 100 and 365. Miss a morning outright and a makeup mission keeps the chain alive at half credit. Seven days of history free; with Plus, everything you have ever logged, however far back that goes.`,
  },

  together: {
    heading: { pre: `Bring `, accent: `someone with you`, post: `` },
    lede: `Share a link and the phone that opens it sets the same alarm, then rings it on its own. Nothing to join, nothing to sign up for, and no server in the middle.`,
    cards: [
      { title: `Wake with a friend`, body: `You send a link; their phone builds the alarm locally. Everyone keeps their own copy, so changing yours doesn’t reach into theirs.` },
      { title: `Beat my wake`, body: `Finish a mission and you can challenge someone to the identical problem set — same seed, same rounds, same difficulty. Then you find out which of you was actually awake.` },
    ],
    note: `Both are free, and both are just links: the phone that receives one does all the work itself.`,
  },

  platforms: {
    heading: { pre: `Same app. `, accent: `Both phones.`, post: `` },
    lede: `Built natively twice — SwiftUI on iOS, Kotlin and Compose on Android. Not a wrapper, which is the only reason each side can do the things only it can do. Requires {ios} or {android}.`,
    watch: `There’s a watch app on both wrists, too — watchOS 26 or Wear OS 3. It taps you awake before the room hears anything, and the phone alarm shifts a few minutes later as the backup. Only a dismissal from the watch cancels it: a flat watch, one out of range, or one you haven’t opened in 36 hours all leave the phone alarm exactly where it was. There’s a complication for the watch face as well.`,
    account: `There is no account to make, but you can sign in with Apple or Google if you want one thing from it: a backup, so your alarms, settings, scores and streak come back on a new phone. It is off by default, everything works signed out, and nothing at 6am ever waits on the network.`,
  },

  /** The store-screenshot gallery (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Choose a platform`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label} — as shown on the {store}`,
    altTemplate: `WakeSharp on {label}: {caption}`,
    fallbackCaption: `app screenshot`,
    /** Frame number → what that frame shows, its baked-in headline included. */
    captions: {
      '01': `Home screen with the next alarm and a smart calendar rule, headlined “Wake up sharp. Not just awake.”`,
      '02': `The alarm ringing over the lock screen, headlined “Complete a mission for full credit”`,
      '03': `The Mind Games mission that silences the alarm, headlined “Solve to silence”`,
      '04': `The warm-up games, headlined “5 brain games. 3 every morning.” and noting that the rotation comes with WakeSharp Plus`,
      '05': `The daily Sharpness Score reveal, scored against your own baseline`,
      '06': `The smart alarm rule editor, headlined “Wakes you before your first meeting”`,
      '07': `The Sharpness trend and streak stats: streaks and freezes free, full history with WakeSharp Plus`,
    },
  },

  yours: {
    heading: { pre: `Make the morning `, accent: `yours`, post: `` },
    lede: `The alarm you actually want to hear, behind the picture you actually want to see.`,
    cards: [
      { title: `13 tones, all free`, body: `From Dawn to Smoke Alarm, and every one of them ships a gentler twin as well.` },
      { title: `Wallpapers and scenes`, body: `Three wallpapers free and five with Plus, and the Lark gains four more scenes, each with its own celebration.` },
      { title: `Light, dark, or neither`, body: `Pick an appearance or let it match your device, and the palette shifts with the hour either way.` },
      { title: `A softer landing`, body: `Gentle start on iPhone opens the tone quiet and climbs to full about 25 seconds in. On Android, a sunrise brightens the screen and raises the volume before the alarm.` },
    ],
  },

  pricing: {
    heading: { pre: `Your alarm rings `, accent: `free, forever`, post: `` },
    lede: `No ads, either. Two of the seven missions are free as well, along with all 13 tones, Strict Mode, the snooze presets and the reliability check. Plus is for the morning after the alarm — the other missions, more warm-up games, more smart rules, and the whole history.`,
    free: {
      name: `Free`,
      price: `$0`,
      tagline: `No sign-up, no trial to forget about.`,
      /** Mirrors the gates the shipped paywall actually enforces. */
      features: [
        `As many alarms as you need`,
        `Two wake-up missions — Mind Games and Photo Proof`,
        `All 13 alarm tones`,
        `Strict Mode, the snooze presets, and the reliability check`,
        `One smart calendar alarm, one shift rotation, one profile`,
        `Search, sorting and the Today view`,
        `Streaks, freeze tokens and milestones`,
        `A warm-up game after every mission, and your 7-day trend`,
        `Wake with a friend, and the watch app on both wrists`,
        `Three alarm wallpapers and the Classic Lark scene`,
      ],
    },
    plus: {
      name: `WakeSharp Plus`,
      perMonth: `/month`,
      annual: `or **{annual}/year**, with a {trialDays}-day free trial`,
      lifetime: `or **{lifetime} once** — Lifetime, which never renews`,
      /** Items 2-6 are the paywall's five bullets, in the paywall's order. */
      features: [
        `Everything in Free`,
        `Every wake-up mission beyond Mind Games and Photo Proof`,
        `Three warm-up games every morning, rotating`,
        `Your full Sharpness history`,
        `Unlimited smart calendar alarms`,
        `Lark scenes, alarm wallpapers and celebrations`,
        `As many shift rotations and profiles as you like, and a custom snooze policy`,
      ],
    },
    lapse: `Plus is checked when you build an alarm, not when it rings. An alarm already carrying a scan or a walk keeps running it whether or not a subscription is active — nothing you have already set stops working. What lapses is setting up new ones.`,
    billing: `Monthly and annual are billed by Apple or Google and renew until cancelled — cancel any time in your store account, and note that deleting the app does not cancel a subscription. Lifetime is a single payment with nothing to cancel. See the [Terms](terms).`,
    /** Shown on localized pages only: the stores localize prices at runtime. */
    usdNote: `Prices are shown in US dollars; the App Store and Google Play show the price for your country.`,
  },

  faq: {
    heading: { pre: `Questions, `, accent: `answered`, post: `` },
    items: [
      {
        q: `Does it really ring in Silent, Focus or Do Not Disturb?`,
        a: `Behaviour is platform-specific, and it depends on permission. On iPhone, WakeSharp uses Apple’s AlarmKit, which supports ringing through Silent mode and Focus once you have granted alarm access — decline or revoke it and WakeSharp cannot schedule anything at all. On Android it plays on the dedicated alarm audio stream, which Do Not Disturb does not silence, and shows a full-screen alert over the lock screen, provided the exact-alarm, notification and lock-screen permissions are in place. What no app can do is ring on a phone that is switched off or out of battery, so for anything you truly cannot miss, set a second alarm on another device.`,
      },
      {
        q: `How do I check my alarm is actually going to ring?`,
        a: `Open Settings → Alarm reliability. WakeSharp reads the conditions on your phone that can stop an alarm — permissions, alarm volume, notification settings, lock-screen takeover, battery restrictions — and leads with a plain verdict rather than a promise. Where the platform will not tell us something, it says so instead of showing a green tick, because a checklist that quietly turns unknowns into passes is worse than no checklist at all. If an alarm ever does fail, the app can tell you the provable cause afterwards — or admit that it could not work it out.`,
      },
      {
        q: `Do I have to do maths at 6am?`,
        a: `Only if you want to. The two free missions are Mind Games, which is three arithmetic problems, and Photo Proof, which just asks for a photo of something — the sky, your bed made, a glass of water, on a prompt that rotates daily. Plus adds Memory Match, Sequence Recall, scanning a real object across the room, walking a set number of steps, and “Surprise me”, which picks one and fixes it for that alarm on that day so there is nothing to stage the night before. Every mission has a way out that ends in Mind Games at full credit, so a dead camera or a phone left on the nightstand never traps you.`,
      },
      {
        q: `Can I cheat past the mission?`,
        a: `You can dismiss the alarm without one — your phone’s own stop button always works, and we would not want it any other way. WakeSharp then shows an owed-mission screen next time you open it, and a makeup mission can keep your streak alive at half credit. Snoozing is a policy you choose rather than a rule you are given: off, a standard two snoozes of five minutes, or Tighten, which shortens each gap and raises the difficulty as it goes. Every snooze costs Sharpness. Strict Mode, where supported, books four re-rings in advance — at 45 seconds, then 4, 8 and 12 minutes — and completing the mission cancels whichever have not fired yet.`,
      },
      {
        q: `What does the camera do?`,
        a: `Two missions use it, and only while that mission is running or while you are setting it up. Scan an Object classifies frames on your device — Apple’s Vision framework on iPhone, a small bundled model on Android — to check you are looking at the thing you chose. Photo Proof asks for one photograph, and the verified version compares it against a reference you enrolled, also on your device. Nothing is uploaded, nothing is added to your photo library, and the full photograph is never kept — only a small fingerprint of it. Decline the permission and every other mission still works.`,
      },
      {
        q: `Does WakeSharp track my sleep?`,
        a: `No. There is no sleep tracking of any kind — no microphone listening overnight, no sleep staging, no score for your night, and no opinion about when you fell asleep. The step counter is read during the walking mission and at no other time. WakeSharp measures how sharp you are once you are up, and nothing before that. The only sleep-shaped things in it are a bedtime you set yourself and an optional wind-down reminder.`,
      },
      {
        q: `What exactly does it read from my calendar?`,
        a: `Your upcoming events, read-only, entirely on your device, for one purpose: working out what time to wake you. Nothing is transmitted anywhere. It is optional, and every other feature works if you decline it.`,
      },
      {
        q: `Do I need an account?`,
        a: `No, and nothing is gated behind one — there is no email and no password anywhere in the app. You can optionally sign in with Apple or Google for a single purpose: to back up your alarms, settings, scores and streak so they come back on a new phone. It is off by default, every feature works signed out, and an alarm never waits on the network to ring. Delete it from Settings → Account, or at wakesharp.app/account/delete.`,
      },
      {
        q: `What happens if my watch is dead?`,
        a: `Your phone rings. The watch taps you awake first and WakeSharp shifts the phone alarm a few minutes later as the backup, so only a dismissal on the watch cancels it. A flat watch, one out of range, or one you have not opened in 36 hours all leave the phone alarm exactly where it was. Strict Mode’s guard alarms ring on the phone regardless.`,
      },
      {
        q: `What is free and what is Plus?`,
        a: `Your alarm rings free, forever, with no ads. Free covers as many alarms as you need, the Mind Games and Photo Proof missions, all 13 alarm tones, Strict Mode, the snooze presets, the reliability check, streaks and freeze tokens, a warm-up game after each mission, one smart calendar alarm, one shift rotation, one profile, the watch app and your 7-day Sharpness trend. Plus adds the other five missions — Memory Match, Sequence Recall, scan, walk and Surprise me — three rotating warm-up games each morning, unlimited smart calendar alarms, as many rotations and profiles as you like, your full Sharpness history, a custom snooze policy, and the Lark scenes, wallpapers and celebrations.`,
      },
      {
        q: `What happens to my Plus alarms if I stop paying?`,
        a: `They keep working. The check happens when you build an alarm, not when it rings, so an alarm already carrying a scan or a walk goes on running it whether or not a subscription is active. What you lose is setting up new ones, along with the extra warm-up games and the full history.`,
      },
      {
        q: `Is Lifetime a subscription?`,
        a: `No. Lifetime is a single payment for the same WakeSharp Plus features — it does not renew, and there is nothing to cancel. Monthly and annual do renew until you stop them. The 7-day free trial belongs to the annual plan.`,
      },
      {
        q: `How do I cancel?`,
        a: `Through the App Store or Google Play, any time. Deleting the app does not cancel a subscription. Lifetime has nothing to cancel — it is a one-time purchase, and Restore Purchases brings it back on a new phone.`,
      },
      {
        q: `Does it track me?`,
        a: `No advertising ID, no location, and no tracking across other apps. What leaves your device: anonymous usage analytics (a random ID and which screens you use — never your alarms, calendar or camera), subscription data if you buy Plus, and your own backup if you chose to create an account. Your account is never joined to the analytics. The privacy policy lists every byte.`,
      },
    ],
  },

  cta: {
    heading: { pre: `Tomorrow morning starts `, accent: `tonight`, post: `` },
    lede: `Set one alarm. See what a sharp morning actually feels like.`,
  },
};
