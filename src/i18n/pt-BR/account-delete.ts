import { accountDelete as en } from '../en/account-delete';

/** /account/delete - o recurso de exclusão de conta para o qual o formulário de segurança de dados do Google Play aponta. */
export const accountDelete = {
  title: `Excluir sua conta - WakeSharp`,
  description: `Como excluir sua conta opcional do WakeSharp e o backup dela na nuvem, de dentro do app ou por e-mail.`,
  heading: `Excluir sua conta do WakeSharp`,
  intro: `As contas do WakeSharp são opcionais: elas existem só para fazer backup dos seus alarmes, ajustes, notas e sequência, para que você possa restaurá-los em um celular novo. Excluir a sua remove esse backup e o próprio login, permanentemente.`,
  inApp: {
    heading: `Exclua pelo app`,
    steps: [
      `Abra o WakeSharp e vá em **Ajustes**.`,
      `Toque em **Conta**.`,
      `Toque em **Excluir conta** e confirme.`,
    ],
    body: `É só isso. A exclusão apaga permanentemente seu login (Iniciar sessão com a Apple ou login com o Google), seu backup na nuvem (alarmes, ajustes, histórico de despertares, notas, sequência e quaisquer miniaturas de referência de foto ou de escaneamento que você cadastrou) e, no caso do Iniciar sessão com a Apple, revoga o token de login junto à Apple. Não há período de espera: o registro da conta e tudo o que fica guardado com ele no seu backup são removidos juntos. Alguns registros são mantidos por mais tempo, como listado abaixo.`,
  },
  kept: {
    heading: `O que não é excluído`,
    items: [
      `**Os dados no seu celular.** Seus alarmes, notas e ajustes continuam no aparelho: excluir a conta não é excluir seus alarmes. Remova o próprio app se quiser que os dados do aparelho também sumam.`,
      `**As compras.** Uma assinatura do WakeSharp Unlimited, assim como uma compra Lifetime (vitalícia), pertence à sua conta da App Store ou do Google Play, não à sua conta do WakeSharp, e sobrevive à exclusão.`,
      `**Nossa cópia dos eventos de compra.** Cada evento de assinatura que o RevenueCat nos envia é mantido por 400 dias, mesmo depois que a conta é excluída, e então apagado.`,
      `**As cópias por e-mail das respostas de cancelamento e das mensagens ao suporte.** Elas ficam na nossa caixa de suporte até não precisarmos mais delas; escreva para nós se quiser que sejam apagadas.`,
      `**Os registros de análise e marketing** no PostHog e no AppsFlyer. Eles usam IDs pseudônimos que podem ser ligados à sua conta depois do login e são apagados mediante solicitação: veja a [política de privacidade](privacy).`,
    ],
  },
  byEmail: {
    heading: `Se você não tem mais o app`,
    body: `Escreva para [{email}](email) a partir do endereço com o qual você fez login (no caso do Iniciar sessão com a Apple com endereço oculto, mencione a data aproximada do cadastro) e nós excluímos a conta para você. Verificamos a solicitação e concluímos a exclusão em até 30 dias, quase sempre bem antes disso.`,
  },
} satisfies typeof en;
