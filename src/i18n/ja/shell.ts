import { shell as en } from '../en/shell';

/**
 * すべてのページで共有する文字列。`{publisher}`、`{year}`、`{email}`、`{date}`
 * は src/config/site.ts からテンプレートが渡します。英語版で site.ts から
 * 読み込んでいる文字列は、ここでは訳文をそのまま書いています。
 */
export const shell = {
  siteDescription: `会議に間に合う頭で起こすアラーム。ミッションをこなして朝を勝ち取ります。計算する、撮影する、スキャンする、歩く。頭のウォームアップがどれだけ冴えて起きられたかを採点し、スマートアラームがカレンダーを読んで最初の会議の前に起こします。`,
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
    contactForm: `お問い合わせフォーム`,
    builtBy: `小さな独立系スタジオ、{publisher}が作っています。`,
    pleaseNote: `ご注意ください。`,
    /** 免責の一文。忠実に訳し、決して和らげないこと。 */
    safetyNotice: `WakeSharpは医療機器ではありません。端末の設定、バッテリーの制限、電源の状態によっては、どんなアラームも鳴らないことがあります。絶対に遅れられない用事には、独立した2つ目のアラームを併用してください。`,
    fullSafetyNotice: `安全に関する注意事項の全文`,
    rights: `© {year} {publisher}. 無断複製・転載を禁じます。`,
  },

  /**
   * ローカライズされた各ページでストアボタンの近くに表示します（英語版には出
   * ません）。アプリは英語のみで提供しているので、サイトがそれ以外を示唆して
   * はいけません。
   */
  appLanguageNote: `WakeSharpアプリ自体は、現在のところ英語のみです。`,

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
