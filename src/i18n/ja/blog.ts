import { blog as en } from '../en/blog';

/**
 * ブログの外枠。一覧ページ、記事まわりの部品、記事末尾のカードです。記事本文
 * は src/content/blog/<言語のパス>/ の Markdown にあり、ここにはありません。
 * `{date}` と `{minutes}` はレイアウトから渡されます。
 */
export const blog = {
  index: {
    title: `ブログ｜WakeSharp`,
    description: `睡眠の科学、朝の習慣、そして製品のお知らせ。会議に間に合う頭で起こすアラーム、WakeSharpの作り手から。`,
    heading: `WakeSharpブログ`,
    intro: `睡眠の科学、朝の習慣、そしてときどき製品のアップデート。本当に冴えているかを確かめるアラームの、作り手から。`,
    empty: `最初の記事を準備しています。しばらくしてからまたお越しください。`,
  },
  /** ブラウザーのタブで記事タイトルの後ろに付きます。 */
  titleSuffix: `｜WakeSharpブログ`,
  /** 矢印を文字列自体が持つので、右から左に読む言語では向きを変えられます。 */
  allArticles: `← 記事一覧`,
  updated: `{date}に更新`,
  minRead: `読了時間{minutes}分`,
  tagsAria: `タグ`,
  related: { aria: `関連記事`, heading: `あわせて読みたい` },
  cta: {
    aria: `WakeSharpを入手`,
    heading: `明日は冴えた頭で目覚める`,
    body: `アラームはずっと無料で鳴ります。広告もありません。Mind Games（暗算）、Photo Proof（写真で証明）、信頼性チェックも含まれます。最初のアラームの設定は10秒ほどで終わります。`,
  },
  /** src/lib/blog-categories.ts のカテゴリごとに1つ。新しいカテゴリはすべての言語で必要です。 */
  categories: {
    'sleep-science': `睡眠の科学`,
    'morning-routines': `朝の習慣`,
    productivity: `生産性`,
    'product-updates': `製品アップデート`,
    'tips-and-tricks': `ヒントとコツ`,
    company: `会社について`,
  },
} satisfies typeof en;
