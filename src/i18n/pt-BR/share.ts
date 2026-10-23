import { share as en } from '../en/share';

/**
 * As páginas de destino de link: /c (um desafio "Beat my wake"), /p (um pacto
 * de despertar, o alarme compartilhado anterior aos alarmes de grupo; links
 * antigos continuam abrindo o app) e /g (um convite para um alarme de grupo).
 * As strings em `script` são lidas pelo decodificador
 * embutido de cada página; `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`,
 * `{time}` e `{days}` são preenchidos por esse script a partir do próprio link.
 */
export const share = {
  challenge: {
    title: `Um desafio de despertar - WakeSharp`,
    description: `Alguém desafiou você para uma manhã no WakeSharp.`,
    heading: `Beat my wake (supere meu despertar)`,
    intro: `Alguém acha que acordou mais afiado do que você vai acordar.`,
    opening: `Abrindo o desafio…`,
    cta: `Abra este link no seu celular com o WakeSharp instalado para jogar a mesma missão da manhã, com a mesma semente, e ver se você consegue superar.`,
    error: `Não foi possível ler este link. Apps de mensagens às vezes cortam links longos ao meio, então peça para quem enviou mandar de novo.`,
    script: {
      anonymous: `Alguém`,
      summary: `{name} resolveu {rounds} rodadas no nível {difficulty} em {seconds}s.`,
      difficulty: { easy: `fácil`, standard: `padrão`, hard: `difícil` },
    },
  },
  pact: {
    title: `Um convite para acordar - WakeSharp`,
    description: `Alguém compartilhou um alarme do WakeSharp com você.`,
    heading: `Um convite para acordar`,
    intro: `Alguém quer acordar com você.`,
    opening: `Abrindo seu convite…`,
    cta: `Abra este link no seu celular com o WakeSharp instalado e ele vai configurar o alarme para você. Nada é compartilhado além do horário: seu celular toca o alarme por conta própria, sem conta e sem servidor envolvido.`,
    error: `Não foi possível ler este link. Apps de mensagens às vezes cortam links longos ao meio, então peça para quem enviou mandar de novo.`,
    script: {
      invited: `{name} convidou você para as {time} · {days}`,
      invitedAnonymous: `Você recebeu um convite para as {time} · {days}`,
      once: `uma vez`,
      /** Domingo primeiro, como na máscara de dias da semana do codec. */
      days: [`dom`, `seg`, `ter`, `qua`, `qui`, `sex`, `sáb`],
    },
  },
  group: {
    title: `Um convite para um alarme de grupo - WakeSharp`,
    description: `Alguém convidou você para um Group alarm (alarme de grupo) do WakeSharp.`,
    heading: `Um convite para um alarme de grupo`,
    intro: `Alguém quer acordar com você.`,
    opening: `Abrindo seu convite…`,
    /** Aparece quando o código do link é válido. */
    cta: `Abra este link em um iPhone com o WakeSharp instalado para entrar no grupo. O alarme de todos toca na mesma hora, cada um no próprio celular, e o grupo vê quem já levantou. Para entrar é preciso ter uma conta no WakeSharp, para que seus amigos vejam que você levantou. Os Group alarms (alarmes de grupo) por enquanto são só para iPhone: a versão 2.9 do Google Play não tem esse recurso.`,
    /** O botão que entrega o código ao app instalado. */
    open: `Abrir o WakeSharp`,
    error: `Não foi possível ler este link. Peça para quem enviou mandar de novo, ou compartilhar um novo link de convite a partir do grupo.`,
    script: {
      /** Quando o link traz o horário. */
      invited: `Você foi convidado para um alarme de grupo às {time} · {days}`,
      /** Quando não traz (link de um app mais antigo). */
      invitedNoTime: `Você foi convidado para um alarme de grupo.`,
      once: `uma vez`,
      /** Domingo primeiro, como na máscara de dias da semana do app. */
      days: [`dom`, `seg`, `ter`, `qua`, `qui`, `sex`, `sáb`],
    },
  },
  get: {
    heading: `Baixe o WakeSharp`,
    /** `{trialDays}` e `{annual}` vêm de src/config/site.ts; o teste nunca aparece sem o preço. */
    body: `Comece com {trialDays} dias de teste grátis do WakeSharp Unlimited, depois {annual} por ano. Configurar seu primeiro alarme leva uns dez segundos.`,
  },
} satisfies typeof en;
