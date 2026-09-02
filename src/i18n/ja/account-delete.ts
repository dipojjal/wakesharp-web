import { accountDelete as en } from '../en/account-delete';

/** /account/delete — Google Play のデータセーフティで参照するアカウント削除の案内。 */
export const accountDelete = {
  title: `アカウントの削除｜WakeSharp`,
  description: `任意で作成したWakeSharpアカウントとそのクラウドバックアップを、アプリ内またはメールで削除する方法。`,
  heading: `WakeSharpアカウントを削除する`,
  intro: `WakeSharpのアカウントは任意です。アラーム、設定、スコア、連続記録をバックアップし、新しい端末で復元するためだけに存在します。削除すると、そのバックアップとログイン自体が完全になくなります。`,
  inApp: {
    heading: `アプリ内で削除する`,
    steps: [
      `WakeSharpを開いて**設定**へ進みます。`,
      `**Account**をタップします。`,
      `**Delete account**をタップして確定します。`,
    ],
    body: `手順はこれだけです。ログイン（Sign in with AppleまたはGoogle）、クラウドバックアップ（アラーム、設定、起床の履歴、スコア、連続記録、登録した写真やスキャンの参照サムネイル）が完全に削除され、Sign in with Appleの場合はAppleとのサインイントークンも取り消されます。待機期間はなく、一部だけ残ることもありません。アカウントの行と、それにひも付くすべてが一緒に削除されます。`,
  },
  kept: {
    heading: `削除されないもの`,
    items: [
      `**端末の中のデータ。**アラーム、スコア、設定は端末に残ります。アカウントの削除は、アラームの削除ではありません。端末上のデータも消したい場合は、アプリ自体を削除してください。`,
      `**購入。**WakeSharp PlusはWakeSharpのアカウントではなく、App StoreまたはGoogle Playのアカウントに属しているので、削除後も残ります。`,
      `**匿名の利用状況分析。**そもそもアカウントとひも付いていません。[プライバシーポリシー](privacy)をご覧ください。`,
    ],
  },
  byEmail: {
    heading: `アプリがもう手元にない場合`,
    body: `サインインに使ったアドレスから[{email}](email)までメールをお送りください（Sign in with Appleでアドレスを非公開にしている場合は、代わりにおおよその登録時期をお知らせください）。こちらでアカウントを削除します。ご依頼を確認したうえで、30日以内に、ほとんどの場合はもっと早く削除を完了します。`,
  },
} satisfies typeof en;
