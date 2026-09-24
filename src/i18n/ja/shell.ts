import { shell as en } from '../en/shell';

/**
 * すべてのページで共有する文字列。`{publisher}`、`{year}`、`{email}`、`{date}`
 * は src/config/site.ts からテンプレートが渡します。英語版で site.ts から
 * 読み込んでいる文字列は、ここでは訳文をそのまま書いています。
 */
export const shell = {
  /** 検索結果で切れないよう90文字前後で、トップページが狙う検索語から始めます。 */
  siteDescription: `起きられない人のための目覚まし。すばやい計算を解く、前の晩に決めた場所を撮る、歩くといったミッションでアラームを鳴りやませ、どれだけ冴えて起きられたかをスコアで確かめられます。`,
  tagline: `目覚めるなら、冴えた頭で。ただ起きるだけじゃない。`,
  requirements: { ios: `iOS 26以降`, android: `Android 8.0以降` },
  ogImageAlt: `WakeSharp。目覚めるなら、冴えた頭で。ただ起きるだけじゃない。`,
  rssTitle: `WakeSharpブログ`,
  skipLink: `本文へスキップ`,
  brandHome: `WakeSharpホーム`,

  nav: {
    aria: `メイン`,
    features: `機能`,
    pricing: `料金`,
    blog: `ブログ`,
    contact: `問い合わせ`,
    faq: `FAQ`,
    cta: `WakeSharpを入手`,
  },

  language: {
    label: `言語`,
    listAria: `サイトの言語`,
  },

  footer: {
    product: `製品`,
    legal: `法的情報`,
    contact: `問い合わせ`,
    features: `機能`,
    sharpnessScore: `Sharpness Score`,
    pricing: `料金`,
    blog: `ブログ`,
    faq: `よくある質問`,
    privacy: `プライバシーポリシー`,
    terms: `利用規約`,
    support: `サポート`,
    deleteAccount: `アカウントを削除`,
    about: `私たちについて`,
    contactForm: `お問い合わせフォーム`,
    builtBy: `小さな独立系スタジオ、{publisher}が作っています。`,
    pleaseNote: `ご注意ください。`,
    /** 免責の一文。忠実に訳し、決して和らげないこと。 */
    safetyNotice: `WakeSharpは医療機器ではありません。端末の設定、バッテリーの制限、電源の状態によっては、どんなアラームも鳴らないことがあります。絶対に遅れられない用事には、独立した2つ目のアラームを併用してください。`,
    fullSafetyNotice: `安全に関する注意事項の全文`,
    rights: `© {year} {publisher}. 無断複製・転載を禁じます。`,
  },

  /**
   * アプリ自体が対応していない言語のページで、ストアボタンの近くに表示します
   * （StoreButtons が SITE.appLanguages を読みます）。サイトが日本語版のアプリ
   * があるかのように示唆しないためです。言語名はこのページの言語で書きます。
   */
  appLanguageNote: `WakeSharpアプリは、英語、スペイン語、ロシア語、トルコ語、ドイツ語、フランス語、アラビア語で利用できます。`,

  legalLayout: {
    lastUpdated: `最終更新日 {date}`,
    questions: `このページについてご不明な点は、[{email}](email)までメールでお問い合わせください。`,
  },

  /** マスコットのポーズごとの代替テキスト（src/components/Lark.astro）。 */
  lark: {
    hero: `WakeSharpのマスコット、メインポーズ`,
    asleep: `WakeSharpのマスコット、眠っているところ`,
    waking: `WakeSharpのマスコット、目覚めるところ`,
    focused: `WakeSharpのマスコット、集中しているところ`,
    celebrating: `WakeSharpのマスコット、喜んでいるところ`,
    encouraging: `WakeSharpのマスコット、励ましているところ`,
  },
} satisfies typeof en;
