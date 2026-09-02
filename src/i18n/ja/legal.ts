import { legal as en } from '../en/legal';

/**
 * プライバシーポリシーと利用規約は英語のままです。拘束力を持つのは英語の
 * 本文で、両アプリがその英語版の URL を埋め込んでいるためです。言語切り替え
 * が行き止まりにならないようローカライズされた経路だけを用意し、そこに以下
 * の注記を英語の本文の上に表示します。訳すのは下の文字列だけです。
 */
export const legal = {
  privacy: {
    title: `プライバシーポリシー｜WakeSharp`,
    heading: `プライバシーポリシー`,
  },
  terms: {
    title: `利用規約｜WakeSharp`,
    heading: `利用規約`,
  },
  englishOnly: `この文書は英語版のみのご用意で、適用されるのは下の英語の本文です。わかりにくい点があれば[{email}](email)までメールをください。人間がご説明します。`,
} satisfies typeof en;
