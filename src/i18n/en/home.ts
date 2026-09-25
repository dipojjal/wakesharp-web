/**
 * The homepage. Headings are split into {pre, accent, post} because the
 * highlighted word is a <span class="accent"> in the template; keep the
 * surrounding spaces inside the strings. `{ios}`, `{android}`, `{annual}`,
 * `{monthly}` and `{trialDays}` come from src/config/site.ts.
 *
 * Every claim here has to hold for the build a reader downloads today and for
 * the next one (2.10 through 2.13 as of 2026-09-24), which is why the page
 * describes missions by kind and never how many times the alarm comes back:
 * that mechanism changes between those versions. The source is the app repo's
 * Docs/marketing-execution/claims-matrix.md and the App Store description.
 */
export const home = {
  title: `WakeSharp - Alarm Clock for Heavy Sleepers, With Missions`,

  hero: {
    /** Rendered inside the <h1>, above the tagline: the query the page targets. */
    kicker: `The alarm clock for heavy sleepers`,
    heading: { pre: `Wake up `, accent: `sharp.`, post: `Not just awake.` },
    lede: `For heavy sleepers who need more than a snooze button. A swipe is something a barely conscious person can do, so WakeSharp asks for a mission instead (solve it, photograph it, walk it or say it out loud) and then scores how sharp you actually woke up.`,
    phoneAlt: `WakeSharp home screen at night, showing a 6:40 AM alarm and a smart calendar rule`,
  },

  trust: [
    `Rings through Silent and Focus on iPhone`,
    `Tells you the night before what could stop it`,
    `No WakeSharp account required`,
    `Camera and calendar processing happen on your phone`,
    `WakeSharp shows no ads`,
  ],

  ring: {
    alt: `The WakeSharp alarm ringing, with Start Mission and Snooze`,
    heading: { pre: `Complete the mission for `, accent: `full credit`, post: `` },
    lede: `On iPhone, Apple’s AlarmKit presents a system alarm over the lock screen, through Silent mode and Focus once alarm access is granted, even if the app was force-quit. On Android, an exact alarm on the alarm stream rings through silent mode, and through Do Not Disturb when it allows alarms, with Extra Loud and a build-up ramp that climbs instead of blasting. However you quiet it, the morning only counts once the mission is done.`,
  },

  reliable: {
    heading: { pre: `Know it will ring, `, accent: `the night before`, post: `` },
    lede: `Most alarm apps find out they failed at the same moment you do. WakeSharp checks the things that actually stop alarms (permissions, alarm volume, notification settings, lock-screen takeover, battery restrictions) and leads with a verdict, not a promise.`,
    items: [
      { title: `A verdict, not a checklist`, body: `One line at the top: it will ring, it may not, or it cannot.` },
      { title: `Honest about what it can’t see`, body: `Where the phone won’t tell us, it says so, and never shows a green tick.` },
      { title: `One-tap fixes where they exist`, body: `And plain instructions where they don’t.` },
      { title: `“It didn’t ring” gets an answer`, body: `The provable cause, or an admission that we couldn’t tell.` },
    ],
    note: `It lives in Settings, and the pre-bed reminder folds the worst finding in so you see it while there is still time to fix it.`,
  },

  smart: {
    alt: `The smart alarm rule editor, set to ring 90 minutes before the first meeting`,
    heading: { pre: `Wakes you before your `, accent: `first meeting`, post: `` },
    lede: `“Ring 90 minutes before my first meeting.” WakeSharp reads your calendar on your device, re-checks it overnight, and moves the alarm when the meeting moves. Read-only, optional, never transmitted.`,
    shifts: `Not every week is a week, either. Shift rotations handle the patterns that aren’t weekly (two days on, two nights, four off) with a preview calendar and a way to skip a single date without deleting anything. Profiles swap a whole set of alarms at once for work, vacation or on call. Search, sorting and a Today view keep the list honest when there are a lot of them.`,
    labels: `Name what you’re waking up for (a workout, a commute, breakfast) and the label writes itself.`,
  },

  mission: {
    alt: `The Mind Games mission: solve 9 minus 4 to silence the alarm`,
    heading: { pre: `Missions that `, accent: `get you up`, post: `` },
    lede: `Something has to happen before the morning counts, and you pick what: arithmetic, a puzzle, a photo of the spot you chose last night, real steps, or an answer said out loud. An alarm can ask for several in a row, in the order you choose, and if one can’t run that morning (a dead camera, a phone with no step counter), WakeSharp falls back to one that can.`,
    /**
     * Every mission the alarm editor offers (GameCatalog.json entries with
     * `supportsMission`), grouped by what they ask of you. `kind` is the small
     * label in each card's corner. The one-liners are the catalog's own
     * `blurb`s, which claims-matrix.md rules Supported as written.
     */
    missions: [
      { name: `Mind Games`, kind: `Brain`, body: `Quick arithmetic rounds you have to get right.` },
      { name: `Memory Match`, kind: `Brain`, body: `Turn over the cards and find every pair.` },
      { name: `Sequence Recall`, kind: `Brain`, body: `Repeat a tap pattern that grows each round.` },
      { name: `Colour Clash`, kind: `Brain`, body: `Tap the ink colour, not the word.` },
      { name: `Type It Out`, kind: `Brain`, body: `Type out a line word for word, with autocorrect off.` },
      { name: `Photo Proof`, kind: `Camera`, body: `Retake the photo of the spot you chose the night before.` },
      { name: `Scan an Object`, kind: `Camera`, body: `Get up and point the camera at a bottle, a mug or a sink.` },
      { name: `Fetch`, kind: `Camera`, body: `Go and find something blue, or something you drink from.` },
      { name: `Face Check`, kind: `Camera`, body: `Open your eyes for the camera, then follow the prompt.` },
      { name: `Fruit Slash`, kind: `Camera`, body: `Slice the fruit out of the air with your finger.` },
      { name: `Walk It Off`, kind: `Movement`, body: `Take real steps, counted by your phone.` },
      { name: `First Light`, kind: `Movement`, body: `Walk to a window and hold your phone in the light.` },
      { name: `Serial Sevens`, kind: `Voice`, body: `Count down by sevens, out loud.` },
      { name: `Name Five`, kind: `Voice`, body: `Name five things from a category, out loud.` },
      { name: `Surprise Me`, kind: `Any`, body: `A different mission every morning.` },
    ],
    note: `Missions are part of the alarm you build, so the deal is made the night before, not negotiated at 6am.`,
  },

  games: {
    alt: `The Memory Match warm-up game`,
    heading: { pre: `A two-minute `, accent: `warm-up`, post: ` while the kettle boils` },
    lede: `Mind Games, Memory Match, Sequence Recall, Word Dash and Reaction Tap. Three play each morning and rotate, so the whole set comes round inside a week, and the warm-up never repeats whatever the mission just made you do. None of it is compulsory; the alarm is already off by then.`,
  },

  sharp: {
    alt: `The daily Sharpness Score reveal`,
    heading: { pre: `Know how `, accent: `sharp`, post: ` you woke up` },
    lede: `One number out of 100 from the warm-up, scored against your own rolling baseline, not against strangers. It is an in-app score, not a clinical test, and yesterday’s you is the only benchmark that means anything at 6am.`,
  },

  stats: {
    alt: `The Sharpness trend chart with a streak counter`,
    heading: { pre: `Watch yourself get `, accent: `sharper`, post: `` },
    lede: `A streak, a trend line, and freeze tokens for the mornings life gets in the way. Milestones land at 7, 30, 100 and 365, and your full Sharpness history goes back as far as you do.`,
  },

  together: {
    heading: { pre: `Bring `, accent: `someone with you`, post: `` },
    lede: `Share a link and the phone that opens it sets the same alarm, then rings it on its own. Nothing to join, nothing to sign up for, and no server in the middle.`,
    cards: [
      { title: `Wake with a friend`, body: `You send a link; their phone builds the alarm locally. Everyone keeps their own copy, so changing yours doesn’t reach into theirs.` },
      { title: `Beat my wake`, body: `Finish a mission and you can challenge someone to the identical problem set: same seed, same rounds, same difficulty. Then you find out which of you was actually awake.` },
    ],
    note: `Both are just links: the phone that receives one does all the work itself.`,
  },

  platforms: {
    heading: { pre: `Same app. `, accent: `Both phones.`, post: `` },
    lede: `Built natively twice: SwiftUI on iOS, Kotlin and Compose on Android. Not a wrapper, which is the only reason each side can do the things only it can do. Requires {ios} or {android}.`,
    watch: `There’s a watch app on both wrists, too, on watchOS 26 or Wear OS 3. It taps you awake before the room hears anything, and the phone alarm shifts a few minutes later as the backup. Only a dismissal from the watch cancels it: a flat watch, one out of range, or one you haven’t opened in 36 hours all leave the phone alarm exactly where it was. There’s a complication for the watch face as well.`,
    account: `There is no account to make, but you can sign in with Apple or Google if you want one thing from it: a backup, so your alarms, settings, scores and streak come back on a new phone. It is off by default, everything works signed out, and nothing at 6am ever waits on the network.`,
  },

  /** The store-screenshot gallery (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Choose a platform`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label} - as shown on the {store}`,
    altTemplate: `WakeSharp on {label}: {caption}`,
    fallbackCaption: `app screenshot`,
    /**
     * Frame number → what that frame shows, its baked-in headline included.
     * Frames 04 and 07 are withheld (StoreGallery.astro) because their artwork
     * still prints the retired free tier and "WakeSharp Plus", so they have no
     * caption until the app repo re-renders them.
     */
    captions: {
      '01': `Home screen with the next alarm and a smart calendar rule, headlined “Wake up sharp. Not just awake.”`,
      '02': `The alarm ringing over the lock screen, headlined “Complete a mission for full credit”`,
      '03': `The Mind Games mission that silences the alarm, headlined “Solve to silence”`,
      '05': `The daily Sharpness Score reveal, scored against your own baseline`,
      '06': `The smart alarm rule editor, headlined “Wakes you before your first meeting”`,
    },
  },

  yours: {
    heading: { pre: `Make the morning `, accent: `yours`, post: `` },
    lede: `The alarm you actually want to hear, behind the picture you actually want to see.`,
    cards: [
      { title: `Tones for every sleeper`, body: `From Dawn to Smoke Alarm, and every one of them ships a gentler twin as well.` },
      { title: `Wallpapers and scenes`, body: `Every alarm wallpaper and every Lark scene is included, and each scene brings its own celebration.` },
      { title: `Light, dark, or neither`, body: `Pick an appearance or let it match your device, and the palette shifts with the hour either way.` },
      { title: `A softer landing`, body: `Gentle start on iPhone opens the tone quiet and climbs to full about 25 seconds in. On Android, a sunrise brightens the screen and raises the volume before the alarm.` },
    ],
  },

  pricing: {
    heading: { pre: `One plan, `, accent: `everything in it`, post: `` },
    lede: `WakeSharp Unlimited is the whole app: every wake-up mission, the daily warm-up, smart calendar alarms, shift rotations and profiles, your full Sharpness history, and every Lark scene and wallpaper. WakeSharp shows no ads.`,
    unlimited: {
      name: `WakeSharp Unlimited`,
      perYear: `/year`,
      /** The trial and the price that follows it always travel together. */
      trial: `Start with a **{trialDays}-day free trial**, then {annual} a year`,
      monthly: `or **{monthly} a month**, with no trial`,
      features: [
        `Every wake-up mission, and several in a row if you like`,
        `Three warm-up games every morning, rotating`,
        `Your full Sharpness history`,
        `Smart calendar alarms that can move when your first meeting does`,
        `Shift rotations, profiles, and as many alarms as you need`,
        `The reliability check and every alarm tone`,
        `Every Lark scene, alarm wallpaper and celebration`,
        `Wake with a friend, and the watch app on both wrists`,
        `No ads`,
      ],
    },
    billing: `Yearly and monthly are billed by Apple or Google and renew until cancelled. Cancel any time in your store account, and note that deleting the app does not cancel a subscription. The free trial is for eligible new subscribers. See the [Terms](terms).`,
    /** Shown on localized pages only: the stores localize prices at runtime. */
    usdNote: `Prices are shown in US dollars; the App Store and Google Play show the price for your country.`,
  },

  faq: {
    heading: { pre: `Questions, `, accent: `answered`, post: `` },
    /** Answers may use {annual}, {monthly} and {trialDays}; prices never appear in a catalog. */
    items: [
      {
        q: `Does it really ring in Silent, Focus or Do Not Disturb?`,
        a: `Behaviour is platform-specific, and it depends on permission. On iPhone, WakeSharp uses Apple’s AlarmKit, which supports ringing through Silent mode and Focus once you have granted alarm access. Decline or revoke it and WakeSharp cannot schedule anything at all. On Android it plays on the dedicated alarm stream, which rings through silent mode, and through Do Not Disturb when it allows alarms (Total Silence mutes every sound, alarms included) and it shows a full-screen alert over the lock screen, provided the exact-alarm, notification and lock-screen permissions are in place. What no app can do is ring on a phone that is switched off or out of battery, so for anything you truly cannot miss, set a second alarm on another device.`,
      },
      {
        q: `How do I check my alarm is actually going to ring?`,
        a: `Open Settings → Alarm reliability. WakeSharp reads the conditions on your phone that can stop an alarm (permissions, alarm volume, notification settings, lock-screen takeover, battery restrictions) and leads with a plain verdict rather than a promise. Where the platform will not tell us something, it says so instead of showing a green tick, because a checklist that quietly turns unknowns into passes is worse than no checklist at all. If an alarm ever does fail, the app can tell you the provable cause afterwards, or admit that it could not work it out.`,
      },
      {
        q: `Do I have to do maths at 6am?`,
        a: `Only if you want to. Missions come in several kinds: arithmetic and puzzles, a photo of a spot you chose the night before, scanning a real object across the room, walking or heading to a window, typing a line, or answering out loud. Pick the ones that suit you, and an alarm can ask for more than one. Surprise Me picks a different one every morning, so there is nothing to stage the night before.`,
      },
      {
        q: `Can I cheat past the mission?`,
        a: `Your phone’s own controls always work. You can switch it off, and no app should be able to stop that. Inside WakeSharp, though, stopping or snoozing the alarm doesn’t finish the morning: it only counts once the mission is done.`,
      },
      {
        q: `What does the camera do?`,
        a: `Only the missions that need it (Photo Proof, Scan an Object, Fetch, Face Check and Fruit Slash among them) and only while one of them is running or while you are setting it up. Recognising objects and matching photos happen on your device. Decline the permission and every mission that doesn’t need the camera still works. The privacy policy says exactly what, if anything, leaves your phone and when.`,
      },
      {
        q: `Does WakeSharp track my sleep?`,
        a: `No. There is no sleep tracking of any kind: no microphone listening overnight, no sleep staging, no score for your night, and no opinion about when you fell asleep. The step counter is read during the walking mission and at no other time. WakeSharp measures how sharp you are once you are up, and nothing before that. The only sleep-shaped things in it are a bedtime you plan yourself and optional wind-down audio.`,
      },
      {
        q: `What exactly does it read from my calendar?`,
        a: `Your upcoming events, read-only, entirely on your device, for one purpose: working out what time to wake you. Nothing is transmitted anywhere. It is optional, and every other feature works if you decline it.`,
      },
      {
        q: `Do I need an account?`,
        a: `No WakeSharp account is required. There is no email and no password anywhere in the app. You can optionally sign in with Apple or Google for a single purpose: to back up your alarms, settings, scores and streak so they come back on a new phone. It is off by default, every feature works signed out, and an alarm never waits on the network to ring. Delete it from Settings → Account, or at wakesharp.app/account/delete.`,
      },
      {
        q: `What happens if my watch is dead?`,
        a: `Your phone rings. The watch taps you awake first and WakeSharp shifts the phone alarm a few minutes later as the backup, so only a dismissal on the watch cancels it. A flat watch, one out of range, or one you have not opened in 36 hours all leave the phone alarm exactly where it was.`,
      },
      {
        q: `What does WakeSharp cost?`,
        a: `There is one plan, WakeSharp Unlimited, and it includes everything. New subscribers can start with a {trialDays}-day free trial of the yearly plan, then {annual} a year, or choose the monthly plan at {monthly} a month, which has no trial. Prices are in US dollars; the App Store and Google Play show the price for your country. WakeSharp shows no ads.`,
      },
      {
        q: `I bought Lifetime. Do I keep it?`,
        a: `Yes. Lifetime was a single payment and it stays yours: nothing renews and there is nothing to cancel. Restore Purchases brings it back on a new phone, using the same Apple or Google account.`,
      },
      {
        q: `How do I cancel?`,
        a: `Through the App Store or Google Play, any time, including during the free trial. Deleting the app does not cancel a subscription.`,
      },
      {
        q: `Does it track me?`,
        a: `WakeSharp shows no ads, but it does buy ads elsewhere, and it measures which ad or link brought you to the app and whether that led to a trial or a subscription. On iPhone it asks first: refuse, and your advertising identifier is never read and ad networks see only aggregated campaign results. Android works as the privacy policy describes. Product analytics can be turned off in Settings, and your alarm labels and calendar details are never sent. The privacy policy lists exactly what leaves your device.`,
      },
    ],
  },

  /** The "From the blog" block; shown only where this language has the featured posts. */
  fromBlog: {
    heading: { pre: `From the `, accent: `blog`, post: `` },
    more: `Read every article`,
  },

  cta: {
    heading: { pre: `Tomorrow morning starts `, accent: `tonight`, post: `` },
    lede: `Set one alarm. See what a sharp morning actually feels like.`,
  },
};
