import { notFound as en } from '../en/not-found';

/** 404 ページ。有効な言語ごとに1ブロックずつ事前生成されます（src/pages/404.astro）。 */
export const notFound = {
  title: `ページが見つかりません｜WakeSharp`,
  mascotAlt: `WakeSharpのマスコット、眠っているところ`,
  heading: { pre: `このページはまだ`, accent: `眠っています。`, post: `` },
  body: `そのページは見つかりませんでした。Lark（マスコットの鳥）は、最初に戻ることをおすすめしています。`,
  backHome: `WakeSharpに戻る`,
  support: `サポートを見る`,
} satisfies typeof en;
