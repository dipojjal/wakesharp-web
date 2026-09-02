import { contact as en } from '../en/contact';

/**
 * O formulário de contato e suas duas páginas de resultado. O `<select>` mantém
 * os atributos `value=` em inglês em todos os idiomas (src/templates/ContactPage.astro)
 * para que a caixa de suporte leia um só vocabulário; só os rótulos visíveis abaixo
 * são traduzidos.
 */
export const contact = {
  form: {
    title: `Contato — WakeSharp`,
    description: `Fale diretamente com o desenvolvedor do WakeSharp — relatos de bugs, problemas com alarmes, dúvidas sobre assinatura e sugestões de recursos.`,
    heading: `Contato`,
    intro: `O WakeSharp é uma equipe pequena, e uma pessoa de verdade lê tudo o que chega por aqui.`,
    callout: `Costumo responder em **2 a 3 dias úteis**. Se preferir usar seu próprio app de e-mail, escreva para [{email}](email) — chega na mesma caixa de entrada.`,
    nameLabel: `Seu nome`,
    emailLabel: `Seu e-mail`,
    emailHint: `Para eu poder responder. Não é usado para mais nada.`,
    topicLabel: `Sobre o que é?`,
    topicPlaceholder: `Escolha uma opção…`,
    topics: {
      alarm: `Um alarme não tocou`,
      bug: `Relato de bug`,
      billing: `Assinatura ou cobrança`,
      feature: `Sugestão de recurso`,
      other: `Outro assunto`,
    },
    deviceLabel: `Celular e versão do sistema`,
    deviceHint: `— opcional, mas responde metade das minhas perguntas de acompanhamento`,
    devicePlaceholder: `ex.: Pixel 9, Android 16`,
    messageLabel: `Mensagem`,
    messageHint: `Para um bug, o que você esperava e o que aconteceu em vez disso é a coisa mais útil que você pode me contar. Se um alarme falhou, o horário para o qual ele estava marcado e o horário em que você encontrou o celular ajudam muito.`,
    honeypotLabel: `Empresa`,
    submit: `Enviar mensagem`,
    privacyNote: `Sua mensagem e seu endereço de e-mail são enviados para mim por e-mail e não são armazenados em nenhum outro lugar. Veja a [Política de Privacidade](privacy).`,
  },
  sent: {
    title: `Mensagem enviada — WakeSharp`,
    description: `Sua mensagem para o WakeSharp foi enviada.`,
    heading: `Mensagem enviada`,
    intro: `Obrigado — ela está a caminho da minha caixa de entrada.`,
    body: `Costumo responder em **2 a 3 dias úteis**, a partir de [{email}](email). Se não receber nada, confira a pasta de spam antes de presumir que se perdeu.`,
    meanwhile: `Enquanto espera, a [página de Suporte](support) cobre as dúvidas mais comuns — incluindo a lista completa de verificação para um alarme que não tocou.`,
    backHome: `Voltar para a página inicial`,
  },
  error: {
    title: `Mensagem não enviada — WakeSharp`,
    description: `O formulário de contato do WakeSharp não conseguiu entregar sua mensagem.`,
    heading: `Não deu certo`,
    intro: `Sua mensagem não foi entregue, e prefiro avisar a fingir o contrário.`,
    callout: `Por favor, escreva diretamente para [{email}](email). Nada do que você digitou foi armazenado, então vai ser preciso digitar de novo — desculpe por isso.`,
    body: `Você também cai aqui se um campo obrigatório chegou vazio, se o endereço de e-mail não era válido ou se a mensagem passou do limite de 4.000 caracteres que o formulário permite.`,
    backToForm: `Voltar para o formulário`,
    support: `Suporte`,
    homepage: `Página inicial`,
  },
} satisfies typeof en;
