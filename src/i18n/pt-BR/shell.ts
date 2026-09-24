import { shell as en } from '../en/shell';

/**
 * Strings compartilhadas por todas as páginas. `{publisher}`, `{year}`, `{email}`
 * e `{date}` são fornecidos pelos templates a partir de src/config/site.ts. As
 * strings que em inglês vêm de site.ts entram aqui como texto literal.
 */
export const shell = {
  siteDescription: `Um despertador para quem tem sono pesado: para silenciar, resolva contas rápidas, fotografe um lugar ou caminhe, e veja o quanto você acordou afiado.`,
  tagline: `Acorde afiado. Não só acordado.`,
  requirements: { ios: `iOS 26 ou posterior`, android: `Android 8.0 ou posterior` },
  ogImageAlt: `WakeSharp — acorde afiado, não só acordado.`,
  rssTitle: `Blog do WakeSharp`,
  skipLink: `Pular para o conteúdo`,
  brandHome: `WakeSharp — início`,

  nav: {
    aria: `Principal`,
    features: `Recursos`,
    pricing: `Preços`,
    blog: `Blog`,
    contact: `Contato`,
    faq: `Dúvidas`,
    cta: `Baixar WakeSharp`,
  },

  language: {
    label: `Idioma`,
    listAria: `Idioma do site`,
  },

  footer: {
    product: `Produto`,
    legal: `Legal`,
    contact: `Contato`,
    features: `Recursos`,
    sharpnessScore: `Sharpness Score`,
    pricing: `Preços`,
    blog: `Blog`,
    faq: `Perguntas frequentes`,
    privacy: `Política de Privacidade`,
    terms: `Termos de Serviço`,
    support: `Suporte`,
    deleteAccount: `Excluir sua conta`,
    about: `Sobre`,
    contactForm: `Formulário de contato`,
    builtBy: `Feito por {publisher}, um pequeno estúdio independente.`,
    pleaseNote: `Atenção.`,
    safetyNotice: `O WakeSharp não é um dispositivo médico. As configurações do seu celular, as restrições de bateria ou o fato de ele estar desligado ou sem bateria podem impedir qualquer alarme de tocar. Use um segundo alarme, independente, para tudo aquilo a que você não pode se dar ao luxo de chegar atrasado.`,
    fullSafetyNotice: `Aviso de segurança completo`,
    rights: `© {year} {publisher}. Todos os direitos reservados.`,
  },

  /**
   * Aparece perto dos botões das lojas nas páginas em um idioma que o app não
   * oferece (StoreButtons lê SITE.appLanguages), como o português, para o site
   * nunca dar a entender que existe um app em português.
   */
  appLanguageNote: `O app WakeSharp está disponível em inglês, espanhol, russo, turco, alemão, francês e árabe.`,

  legalLayout: {
    lastUpdated: `Última atualização: {date}`,
    questions: `Dúvidas sobre esta página? Escreva para [{email}](email).`,
  },

  lark: {
    hero: `Mascote do WakeSharp, pose principal`,
    asleep: `Mascote do WakeSharp, dormindo`,
    waking: `Mascote do WakeSharp, acordando`,
    focused: `Mascote do WakeSharp, concentrado`,
    celebrating: `Mascote do WakeSharp, comemorando`,
    encouraging: `Mascote do WakeSharp, incentivando`,
  },
} satisfies typeof en;
