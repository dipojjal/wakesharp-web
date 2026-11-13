# Blog SEO and AI-search pass, November 13, 2026

Every English post under `src/content/blog/` was checked against DataForSEO data for Google US (English, desktop) and against ChatGPT and Google AI Mode answers, then edited. The translations (`es/`, `ru/`, `tr/`) were not edited; they gain the FAQ structured data below automatically.

DataForSEO cost: $0.26 (Labs ranked keywords, keyword overview and keyword suggestions; 26 live Google SERPs with AI Overviews and People Also Ask; 7 AI-answer pulls; one on-page check). The account had $0.74 left afterwards.

## Baseline

- **Google:** wakesharp.app ranked for 19 US keywords, every one between positions 24 and 98. Fifteen of them belong to two posts: `iphone-alarm-didnt-go-off-causes` (best: position 24 for "iphone alarm going off when not set") and `will-alarm-ring-on-silent-dnd`. The tools pages held three (online alarm clock, nap timer, caffeine calculator); `melatonin-less-is-more` held one at 96.
- **SERP shape:** all 26 target SERPs show an AI Overview and People Also Ask, and none shows a featured snippet. The AI Overviews cite health systems (Cleveland Clinic, Sleep Foundation, Healthline), Reddit, YouTube and Apple Support.
- **AI answers:** WakeSharp appeared in none of 7 answers (5 ChatGPT search, 2 Google AI Mode) and none of the 24 pages ChatGPT fetched. On app queries ChatGPT and AI Mode cite the recommended apps' own sites and store listings, and pick apps that review roundups repeat (Alarmy in 6 of 12 fetched roundups). On how-to and health queries ChatGPT often answers without searching, and AI Mode answered sleep inertia from Sleep Foundation alone. 5 of 7 answers open with a one-sentence answer with the key term in bold.
- **On-page:** DataForSEO's on-page check scored a post 97/100. Its only flags were the logo images' empty alt text (deliberate: the visible name is screen-reader text beside them) and two render-blocking stylesheets. Neither was changed.

## Keyword map

Search volume is Google US monthly; KD is DataForSEO keyword difficulty (0 to 100). The tool and feature pages own the head terms marked, so the posts link to them instead of competing.

| Post | Primary target (volume, KD) | Also targets |
| --- | --- | --- |
| sleep-inertia-why-you-wake-up-groggy | sleep inertia (74,000, 46) | how long does sleep inertia last (320), how to get rid of sleep inertia (320), sleep inertia after a nap |
| iphone-alarm-didnt-go-off-causes | iphone alarm not going off (14,800, 6) | iphone alarm not working (1,600), why didn't my alarm go off (1,300), iphone alarm didn't go off (880) |
| will-alarm-ring-on-silent-dnd | will my alarm go off on do not disturb (6,600) | will my alarm go off on silent (1,000, 1) |
| caffeine-cutoff-time-sleep | how long does caffeine stay in your system (33,100, 27) | caffeine half life (12,100, 20), how long before bed should you stop drinking caffeine (320) |
| melatonin-less-is-more | how much melatonin should i take (18,100, 21) | melatonin dosage (22,200), how much melatonin is too much (18,100), how long does melatonin take to work (8,100), does melatonin make you groggy the next day (880) |
| back-to-school-sleep-schedule-reset | how to fix sleep schedule (8,100, 11) | how to fix your sleep schedule (6,600), how to reset sleep schedule (1,300), back to school sleep schedule |
| what-time-to-go-to-bed-work-backward | what time should i go to bed (4,400, 46) | bedtime chart, what time should i go to sleep (880); `/tools/sleep-calculator` owns "sleep calculator" and "bedtime calculator" |
| become-morning-person-realistic | how to wake up early (4,400, 19) | how to become a morning person (1,600, 20) |
| sleep-cycles-90-minute-myth | how long is a sleep cycle (6,600, 45) | 90 minute sleep cycle (880), sleep cycle length (1,300); the tool owns "sleep calculator" (135,000) |
| morning-reaction-time-cognition | average reaction time (5,400, 6) | psychomotor vigilance task (260) |
| revenge-bedtime-procrastination | revenge bedtime procrastination (8,100, 40) | revenge sleep procrastination (1,600), how to stop revenge bedtime procrastination (170, 2) |
| white-pink-brown-noise-sleep | brown noise vs white noise (8,100, 1) | brown noise for sleep (33,100, 7), pink noise vs white noise (3,600) |
| sleep-debt-weekend-lie-ins | can you catch up on sleep (1,900, 9) | how to recover from sleep debt (590), can you make up for lost sleep (480, 2) |
| sleep-in-heat-late-summer | too hot to sleep (390, 12) | best temperature for sleep (18,100, 23), how to sleep when it's hot (170) |
| alcohol-sleep-architecture | does alcohol affect sleep (1,300, 46) | alcohol rem sleep (260), alcohol and sleep quality (170) |
| all-nighter-vs-sleep-exam | all nighter before exam | how to stay awake after an all-nighter (1,000, 5); the head term "all nighter" (14,800) is mostly definition and film intent |
| sleep-through-alarm-dismissed-no-memory | sleeping through alarm (880) | why do i sleep through my alarm (590), how to stop sleeping through alarm (390) |
| snooze-button-psychology-cost | is hitting snooze bad | hitting snooze (260, 3), how to stop hitting snooze (170, 2), does hitting snooze make you more tired (90) |
| social-jet-lag-monday-tax | social jet lag (1,000, 29) | social jetlag (880), what is social jet lag (320) |
| phone-in-bedroom-at-night | is sleeping with your phone bad (210, 6) | effects of sleeping with phone near head (320, 4), can sleeping with your phone cause cancer (320), sleeping with phone under pillow (260) |
| first-30-minutes-brain-after-waking | morning brain fog (480, 4) | brain fog in the morning (480, 6), cortisol awakening response (2,400) |
| alarm-reliability-checklist-tonight | how to make sure your alarm goes off (140, 5) | how to make sure i wake up to my alarm (260, 5) |
| android-alarm-not-ringing-battery-optimizer | android alarm not going off (260) | samsung alarm not going off (260), alarm not going off (720, 1) |
| math-alarm-science-solving-beats-snoozing | do math alarm clocks work | alarm clock with math problems (140); `/features/math-alarm-clock` owns "math alarm clock" (4,400, 4) |
| best-alarm-apps-for-heavy-sleepers | alarm app for heavy sleepers (590, 20) | best alarm app for heavy sleepers (260), alarmy alternative (50) |
| meeting-ready-morning-calendar-alarm | how long before a meeting should I wake up | `/features/calendar-alarm-clock` owns "calendar alarm" (110) |
| long-weekend-sleep-tuesday-monday | long weekend sleep schedule | no measurable volume; kept as seasonal |

## What changed

Site-wide:

- **FAQPage structured data.** `src/lib/faq.ts` reads the `###` questions under a post's FAQ heading (in any of the blog's languages) and `BlogPostJsonLd.astro` types the post's WebPage as FAQPage with those questions and answers. Tested in `tests/i18n/faq.test.ts`, including a check that every post with a FAQ yields at least three answered questions.
- **Readable keywords** in BlogPosting (`sleep inertia, grogginess` instead of `sleep-inertia, grogginess`). This surfaced one stale tag, `smart-alarms` on the meeting post, renamed `calendar-alarms` because the copy rules ban "smart alarms".
- **`/llms.txt`**, generated from the same collections as the pages: every live English post, tool and feature page with its description, for AI assistants that read the file.
- **The authoring guide** (`docs/blog-schedule.md`, "Article shape") now asks for a data-picked target query, a short-answer paragraph, People Also Ask questions as headings or FAQs, and a link to the matching tool or feature page.

Every English post:

- A bold **"The short answer:"** paragraph after the opening scene, answering the target query in two to four sentences with the key number in it.
- `seoTitle` and `description` rewritten to lead with the target query (all titles at most 60 characters, descriptions 141 to 159). Two headlines changed: the iPhone post ("iPhone Alarm Not Going Off? The 7 Real Causes (and Fixes)") and the back-to-school post ("How to Fix Your Sleep Schedule in One Week (the Back-to-School Reset)"), plus "or Do Not Disturb" in the silent post. URLs did not change.
- New sections or FAQ questions taken from People Also Ask and related searches, for example sleep inertia symptoms, causes and naps; a bedtime chart by wake-up time and recommended sleep by age; how long caffeine stays in your system; how long melatonin takes to work; the average reaction time; radiation and charging in bed; can you fix a sleep schedule in one day; how to stay awake after an all-nighter; Samsung and Pixel alarm fixes; Alarmy alternatives.
- More internal links between related posts, and from posts to the sleep, caffeine, sleep debt and nap tools.
- `updatedDate` set to 2026-11-13, which also moves each post's sitemap `lastmod`.

New sources cited: Woods et al. 2015 (simple reaction time, PMC4374455), Harpsøe et al. 2015 (melatonin pharmacokinetics, PubMed 26008214), Karipidis et al. 2024 (WHO-commissioned review of mobile phones and cancer, PubMed 39241333), Brooks and Lack 2006 (nap length, PubMed 16796222), Apple's iPhone safety information (charging under a pillow) and Low Power Mode pages. Each was read before it was cited.

## Not changed, and why

- **`reviewedBy` / `reviewedDate`.** 26 posts carry the founder's review dated 2026-09-24. The new sections were added after that review, so the structured data still says `lastReviewed` 2026-09-24 while `dateModified` is 2026-11-13. Only the reviewer can move that date, after reading the posts.
- **Translations.** The `es`, `ru` and `tr` versions of three posts keep their own titles and bodies.
- **Off-site work.** Nothing on this site changes what other pages say about WakeSharp, which is what decides app recommendations in AI answers (see below).

## Follow-ups worth doing

1. **Tools for the biggest head terms.** "reaction time test" (110,000 a month, KD 28), "brown noise" (90,500, KD 8), "white noise for sleep" (60,500) and "brown noise for sleep" (33,100) are mostly tool intent: people want to take the test or play the sound. A `/tools/reaction-time-test` and a noise player would fit the existing tools section and link naturally from the reaction-time and noise posts.
2. **Get onto other people's lists.** AI answers about alarm apps name the apps that review roundups and "Alarmy alternatives" pages repeat, and link the apps' own sites and store listings. Pitching WakeSharp to those roundups, and a store subtitle that says what a mission does ("solve math to turn it off"), would do more for AI recommendations than anything on this blog.
3. **New posts for uncovered demand**, checked against the keyword map first: "best temperature for sleep" (18,100) deserves its own page beyond the heat post's FAQ; an "Alarmy alternatives" comparison; "cortisol awakening response" (2,400).
4. **Re-measure in four to six weeks** with DataForSEO Labs `ranked_keywords` for wakesharp.app (about $0.02) and the same seven AI prompts (about $0.03), and compare with the baseline above.
