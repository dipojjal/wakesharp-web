import { contact as en } from '../en/contact';

/**
 * お問い合わせフォームと、その結果ページ2つ。`<select>` の `value=` 属性は
 * どの言語でも英語のまま（src/templates/ContactPage.astro）なので、サポート
 * の受信箱では語彙がひとつに保たれます。訳すのは表示ラベルだけです。
 */
export const contact = {
  form: {
    title: `お問い合わせ｜WakeSharp`,
    description: `WakeSharpの開発者に直接メッセージを送れます。不具合の報告、アラームの不調、サブスクリプションのご質問、機能のご要望など。`,
    heading: `お問い合わせ`,
    intro: `WakeSharpは小さなチームで、ここに届くものはすべて人間が読んでいます。`,
    callout: `通常は**2〜3営業日**以内に返信します。ご自分のメールソフトをお使いになりたい場合は、[{email}](email)までどうぞ。同じ受信箱に届きます。`,
    nameLabel: `お名前`,
    emailLabel: `メールアドレス`,
    emailHint: `返信のために使います。ほかの用途には一切使いません。`,
    topicLabel: `ご用件は何でしょうか？`,
    topicPlaceholder: `選択してください…`,
    topics: {
      alarm: `アラームが鳴らなかった`,
      bug: `不具合の報告`,
      billing: `サブスクリプション・お支払い`,
      feature: `機能のご要望`,
      other: `その他`,
    },
    deviceLabel: `端末とOSのバージョン`,
    deviceHint: `（任意ですが、これがあると折り返しの質問が半分に減ります）`,
    devicePlaceholder: `例: Pixel 9、Android 16`,
    messageLabel: `メッセージ`,
    messageHint: `不具合の場合は、期待していた動作と実際に起きたことを教えていただくのが何より役に立ちます。アラームが鳴らなかった場合は、設定していた時刻と端末を見つけた時刻がわかると、たいへん助かります。`,
    honeypotLabel: `会社名`,
    submit: `メッセージを送信`,
    privacyNote: `メッセージとメールアドレスはメールで開発者に届き、ほかのどこにも保存されません。[プライバシーポリシー](privacy)をご覧ください。`,
  },
  sent: {
    title: `メッセージを送信しました｜WakeSharp`,
    description: `WakeSharpへのメッセージを送信しました。`,
    heading: `メッセージを送信しました`,
    intro: `ありがとうございます。受信箱に向かっています。`,
    body: `通常は**2〜3営業日**以内に、[{email}](email)から返信します。何も届かないときは、なくなったと判断する前に迷惑メールフォルダーを確認してみてください。`,
    meanwhile: `お待ちいただくあいだに、[サポートページ](support)もどうぞ。よくいただく質問をまとめてあり、アラームが鳴らなかったときのチェックリストも全文載せています。`,
    backHome: `ホームページに戻る`,
  },
  error: {
    title: `メッセージを送信できませんでした｜WakeSharp`,
    description: `WakeSharpのお問い合わせフォームからメッセージを送信できませんでした。`,
    heading: `送信できませんでした`,
    intro: `メッセージは届きませんでした。黙っているより、お伝えします。`,
    callout: `お手数ですが、代わりに[{email}](email)まで直接メールをお送りください。入力された内容は保存していないため、もう一度入力していただくことになります。申し訳ありません。`,
    body: `必須項目が空のまま届いた場合、メールアドレスの形式が正しくなかった場合、メッセージがフォームの上限である4,000文字を超えた場合にも、このページが表示されます。`,
    backToForm: `フォームに戻る`,
    support: `サポート`,
    homepage: `ホームページ`,
  },
} satisfies typeof en;
