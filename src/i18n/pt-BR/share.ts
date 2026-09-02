import { share as en } from '../en/share';

/**
 * As duas páginas de destino de link, /c (um desafio "Supere meu despertar") e
 * /p (um pacto de despertar). As strings em `script` são lidas pelo decodificador
 * embutido de cada página; `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`,
 * `{time}` e `{days}` são preenchidos por esse script a partir do próprio link.
 */
export const share = {
  challenge: {
    title: `Um desafio de despertar — WakeSharp`,
    description: `Alguém desafiou você para uma manhã no WakeSharp.`,
    heading: `Supere meu despertar`,
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
    title: `Um convite para acordar — WakeSharp`,
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
  get: {
    heading: `Baixe o WakeSharp`,
    body: `É de graça, e configurar seu primeiro alarme leva uns dez segundos.`,
  },
} satisfies typeof en;
