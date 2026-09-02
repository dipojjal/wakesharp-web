import { accountDelete as en } from '../en/account-delete';

/** /account/delete — o recurso de exclusão de conta para o qual o formulário de segurança de dados do Google Play aponta. */
export const accountDelete = {
  title: `Excluir sua conta — WakeSharp`,
  description: `Como excluir sua conta opcional do WakeSharp e o backup dela na nuvem, de dentro do app ou por e-mail.`,
  heading: `Excluir sua conta do WakeSharp`,
  intro: `As contas do WakeSharp são opcionais — elas existem só para fazer backup dos seus alarmes, ajustes, notas e sequência, para que você possa restaurá-los em um celular novo. Excluir a sua remove esse backup e o próprio login, permanentemente.`,
  inApp: {
    heading: `Exclua pelo app`,
    steps: [
      `Abra o WakeSharp e vá em **Ajustes**.`,
      `Toque em **Conta**.`,
      `Toque em **Excluir conta** e confirme.`,
    ],
    body: `É só isso. A exclusão apaga permanentemente seu login (Iniciar sessão com a Apple ou login com o Google), seu backup na nuvem — alarmes, ajustes, histórico de despertares, notas, sequência e quaisquer miniaturas de referência de foto ou de escaneamento que você cadastrou — e, no caso do Iniciar sessão com a Apple, revoga o token de login junto à Apple. Não há período de espera nem retenção parcial: o registro da conta e tudo o que está ligado a ele são removidos juntos.`,
  },
  kept: {
    heading: `O que não é excluído`,
    items: [
      `**Os dados no seu celular.** Seus alarmes, notas e ajustes continuam no aparelho — excluir a conta não é excluir seus alarmes. Remova o próprio app se quiser que os dados do aparelho também sumam.`,
      `**As compras.** O WakeSharp Plus pertence à sua conta da App Store ou do Google Play, não à sua conta do WakeSharp, e sobrevive à exclusão.`,
      `**As estatísticas de uso anônimas**, que nunca estiveram ligadas à sua conta, para começo de conversa — veja a [política de privacidade](privacy).`,
    ],
  },
  byEmail: {
    heading: `Se você não tem mais o app`,
    body: `Escreva para [{email}](email) a partir do endereço com o qual você fez login (no caso do Iniciar sessão com a Apple com endereço oculto, mencione a data aproximada do cadastro) e nós excluímos a conta para você. Verificamos a solicitação e concluímos a exclusão em até 30 dias, quase sempre bem antes disso.`,
  },
} satisfies typeof en;
