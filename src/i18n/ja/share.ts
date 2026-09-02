import { share as en } from '../en/share';

/**
 * リンクの受け皿となる2つのページ、/c（「目覚め対決」の挑戦）と /p（起床の
 * 約束）。`script` の文字列は各ページのインラインのデコーダーが読み、
 * `{name}`、`{rounds}`、`{difficulty}`、`{seconds}`、`{time}`、`{days}` は
 * リンク自体からそのスクリプトが埋めます。
 */
export const share = {
  challenge: {
    title: `目覚め対決の招待｜WakeSharp`,
    description: `WakeSharpの朝の対決に招待されています。`,
    heading: `目覚め対決`,
    intro: `だれかが、あなたより冴えて起きたと思っているようです。`,
    opening: `対決を開いています…`,
    cta: `WakeSharpをインストールしたスマホでこのリンクを開くと、同じ朝のミッションを同じシードでプレイして、勝てるかどうか確かめられます。`,
    error: `このリンクを読み取れませんでした。チャットアプリが長いリンクを途中で切ってしまうことがあるので、送ってくれた相手にもう一度送ってもらってください。`,
    script: {
      anonymous: `だれか`,
      summary: `{name}が{difficulty}の{rounds}ラウンドを{seconds}秒で解きました。`,
      difficulty: { easy: `かんたん`, standard: `ふつう`, hard: `むずかしい` },
    },
  },
  pact: {
    title: `起床の招待｜WakeSharp`,
    description: `だれかがWakeSharpのアラームをあなたと共有しました。`,
    heading: `起床の招待`,
    intro: `だれかが、あなたと一緒に起きたいそうです。`,
    opening: `招待を開いています…`,
    cta: `WakeSharpをインストールしたスマホでこのリンクを開くと、アラームが設定されます。共有されるのは時刻だけ。アカウントもサーバーも介さず、あなたのスマホが自分で鳴らします。`,
    error: `このリンクを読み取れませんでした。チャットアプリが長いリンクを途中で切ってしまうことがあるので、送ってくれた相手にもう一度送ってもらってください。`,
    script: {
      invited: `{name}から{time}・{days}に招待されました`,
      invitedAnonymous: `{time}・{days}に招待されました`,
      once: `1回のみ`,
      /** 日曜始まり。コーデックの曜日マスクに合わせています。 */
      days: [`日`, `月`, `火`, `水`, `木`, `金`, `土`],
    },
  },
  get: {
    heading: `WakeSharpを入手`,
    body: `無料です。最初のアラームの設定は10秒ほどで終わります。`,
  },
} satisfies typeof en;
