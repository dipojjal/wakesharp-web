import { support as en } from '../en/support';

/**
 * /support — a URL de suporte do App Store Connect. Chaves de link usadas abaixo:
 * email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * `{ios}` e `{android}` são as strings de requisitos de src/config/site.ts.
 */
export const support = {
  title: `Suporte — WakeSharp`,
  description: `Ajuda com o WakeSharp: por que um alarme pode não tocar, como funcionam as missões e o Sharpness Score, e como gerenciar sua assinatura.`,
  heading: `Suporte`,
  intro: `O WakeSharp é uma equipe pequena, e quem responde ao e-mail é uma pessoa de verdade.`,

  getInTouch: {
    heading: `Entre em contato`,
    body: `Escreva para [{email}](email). Costumo responder em **2 a 3 dias úteis**. Incluir o modelo do celular, a versão do sistema e a versão do WakeSharp que aparece em Ajustes quase sempre garante uma resposta mais rápida.`,
  },

  requirements: {
    heading: `Requisitos`,
    body: `O WakeSharp precisa de {ios} no iPhone, ou {android} no Android. Os apps de relógio precisam de watchOS 26 ou Wear OS 3.`,
  },

  didntRing: {
    heading: `Meu alarme não tocou`,
    callout: `**Comece pelo app, não por aqui.** Abra o WakeSharp → Ajustes → _Alarm reliability_ (confiabilidade do alarme). Ele lê o estado atual do seu celular — permissões, volume do alarme, Não Perturbe, configurações de notificação, sobreposição à tela de bloqueio, restrições de bateria — e começa com um veredito claro: vai tocar, pode não tocar ou não consegue tocar. Quando a correção está a um toque de distância, ele oferece o toque; quando o celular não nos diz algo, ele admite em vez de mostrar um check verde. Ele também roda antes de dormir e sinaliza a pior coisa que encontrou.`,
    report: `Se um alarme já foi perdido, o WakeSharp mostra um relatório naquela manhã apontando a causa quando consegue comprová-la — permissão revogada, volume do alarme no zero, Silêncio total, o celular estava desligado — e dizendo “Não conseguimos descobrir por quê” quando não consegue. As listas abaixo são para quando ele não consegue.`,
    iphone: {
      heading: `No iPhone`,
      steps: [
        `**Confira se o alarme está mesmo ativado** na tela inicial, e se os dias de repetição incluem hoje.`,
        `**Confira a permissão de alarme.** Ajustes → WakeSharp. Se o acesso a alarmes foi recusado, o WakeSharp não consegue agendar nada. Ative e salve o alarme de novo.`,
        `**Confira o volume e a chave de silencioso.** O WakeSharp toca através do Modo Silencioso e do Foco, mas não consegue tocar em um aparelho desligado ou sem bateria.`,
        `**Confira o Bluetooth.** Se o celular ainda estiver conectado a fones de ouvido ou a um carro, o alarme pode estar tocando lá.`,
        `**Reinicie o celular** e salve o alarme de novo se ele continuar se comportando mal.`,
      ],
    },
    android: {
      heading: `No Android`,
      steps: [
        `**Confira se o alarme está ativado** e se os dias de repetição incluem hoje.`,
        `**Permita as notificações.** Configurações → Apps → WakeSharp → Notificações. A tela do alarme chega como uma notificação em tela cheia; bloquear as notificações a suprime.`,
        `**Desative a otimização de bateria para o WakeSharp.** Configurações → Apps → WakeSharp → Bateria → _Sem restrições_. Essa é, de longe, a causa mais comum em aparelhos Samsung, Xiaomi, OPPO, vivo e OnePlus, que são mais agressivos que o Android puro. Na Samsung, confira também Configurações → Bateria → Limites de uso em segundo plano e garanta que o WakeSharp não está em “Apps em suspensão” nem em “Apps em suspensão profunda”.`,
        `**Confira se o Não Perturbe não está em Silêncio total.** Os modos Somente prioridade e Somente alarmes deixam os alarmes passar; o Silêncio total silencia até eles, e nenhum app consegue contornar isso.`,
        `**Não use “Forçar parada” no WakeSharp.** Forçar a parada cancela os alarmes agendados até você abrir o app de novo.`,
        `**Depois de reiniciar, abra o WakeSharp uma vez.** Ele rearma seus alarmes na inicialização, mas abrir o app garante que a sincronização rodou.`,
      ],
    },
    warning: `**Se acordar realmente importa, configure um segundo alarme em outro aparelho.** O WakeSharp agenda os alarmes através do sistema operacional, e é o sistema que decide se eles tocam. Veja o [aviso de segurança](terms-safety).`,
  },

  ringsThrough: {
    heading: `O WakeSharp toca mesmo através do Modo Silencioso, do Foco e do Não Perturbe?`,
    body: `Em circunstâncias normais, sim — esse é o propósito inteiro do app, e é o mesmo mecanismo que o relógio nativo usa em cada plataforma.`,
    items: [
      `**No iPhone**, o WakeSharp usa o AlarmKit da Apple, que permite tocar através do Modo Silencioso e do Foco **depois que você concede a permissão de alarme**. Recuse ou revogue essa permissão e o WakeSharp não consegue agendar alarme nenhum.`,
      `**No Android**, o alarme toca no canal de áudio dedicado aos alarmes, que o Não Perturbe não silencia, e mostra um alerta em tela cheia sobre a tela de bloqueio — **quando as permissões de alarme exato, de notificação e de tela de bloqueio estão concedidas**. Não há uma solicitação extra para o canal de alarmes em si, mas uma notificação bloqueada ou uma restrição de bateria ainda podem impedir o alerta.`,
    ],
    limit: `O que nenhuma das plataformas consegue é tocar em um celular desligado, sem bateria ou que teve as permissões do app revogadas.`,
  },

  missions: {
    heading: `Missões, soneca e Strict Mode`,
    items: [
      `**A missão** é o que garante o crédito total pela manhã. Duas são gratuitas: _Mind Games_, três problemas rápidos de aritmética no nível fácil, padrão ou difícil, e _Photo Proof_, que pede uma única fotografia — o tema do dia, em rodízio, ou um alvo que você cadastrou para aquele alarme. O WakeSharp Plus acrescenta _Memory Match_ (memória), _Sequence Recall_ (sequências), _Scan an Object_ (escanear um objeto), _Walk It Off_ (caminhar) e _Surprise Me_ (surpreenda-me), que escolhe uma por você e a fixa para aquele alarme naquele dia, então você não consegue preparar nada na noite anterior. **A escolha é verificada quando você cria ou edita um alarme, nunca quando um toca** — um alarme já configurado com uma missão do Plus continua executando essa missão.`,
      `**My spots & codes** (meus lugares e códigos) é onde o _Scan an Object_ fica pessoal. Fotografe um lugar até onde você vai caminhar, como a cafeteira ou a porta da frente, ou registre um QR code ou um código de barras que você cola onde a manhã deve mandar você, como o espelho do banheiro ou a lata de café. Um alarme pode então pedir aquele alvo específico. É um recurso _dentro_ da missão de escaneamento, não uma missão própria, e nem a fotografia nem o código são armazenados — só uma impressão digital de cada um.`,
      `**Toda missão tem uma saída** que termina em Mind Games com crédito total, então uma câmera morta ou um celular sem contador de passos nunca deixa você preso a um alarme que você não consegue silenciar.`,
      `**A soneca** é uma configuração por alarme, não uma regra fixa. _Desligada_ (Off) remove o botão por completo. _Padrão_ (Standard) permite duas sonecas de cinco minutos, a 5 pontos de Sharpness cada e nunca pior que −10 no dia. _Tighten_ (cada vez mais curta) permite três, de 10, depois 5, depois 2 minutos, aumenta a dificuldade da missão a cada vez e para em −15. As três predefinições são gratuitas; uma política totalmente personalizada faz parte do WakeSharp Plus.`,
      `**O Strict Mode** (modo rigoroso), em aparelhos compatíveis, pré-agenda quatro alarmes de guarda — 45 segundos depois, e então aos 4, 8 e 12 minutos. São alarmes reais, marcados com antecedência, então tocam com o app aberto ou não, e completar a missão cancela os que ainda não tocaram. São quatro repetições, não um loop sem fim, e o botão de parar do próprio sistema ainda encerra cada uma delas. Ative por alarme.`,
      `**Desligar sem fazer a missão** é possível — o botão de parar do próprio sistema sempre funciona. O WakeSharp então mostra uma tela de missão pendente na próxima vez que você abre o app, para que sua sequência ainda possa ser recuperada.`,
    ],
  },

  smartAlarms: {
    heading: `Alarmes inteligentes de calendário`,
    body: `Uma regra inteligente toca um número definido de minutos antes da sua primeira reunião, limitado entre um horário mais cedo e um mais tarde que você escolhe. O WakeSharp confere seu calendário de novo durante a noite, então, se a reunião mudar, o alarme muda. Se você recusar o acesso ao calendário, todo o resto continua funcionando — você só define os horários por conta própria. Seus eventos nunca saem do seu aparelho; veja a [Política de Privacidade](privacy).`,
    limits: `O plano Grátis inclui uma regra inteligente, uma escala de turnos e um perfil de alarmes; o Plus tira os três limites. Uma escala de turnos é para padrões que não são semanais — 4 dias de trabalho por 4 de folga a partir de uma data de referência, cada fase com o próprio horário, e um calendário de prévia para você conferir antes de dormir contando com ela.`,
  },

  sharpness: {
    heading: `O Sharpness Score`,
    body: `Depois de uma missão, você pode fazer um aquecimento opcional. O plano Grátis sorteia um jogo de um par, Math Sprint (cálculo rápido) e Reaction Tap (reflexos); o Plus joga três dos cinco a cada manhã, em rodízio, uns dois minutos no total. Nos dois casos, o aquecimento pula o jogo que a missão acabou de fazer você jogar, então resolver aritmética para silenciar o alarme nunca entrega mais aritmética como aquecimento. Sua nota — o Sharpness Score, de quão afiado você acordou — é medida contra a sua própria referência móvel, não contra outras pessoas, então ela se acomoda em torno de 100 conforme o app aprende o seu normal. Uma manhã ruim é uma queda em relação ao seu eu de ontem, nada mais. Não é um teste clínico nem cognitivo.`,
    physical: `**As missões físicas não alimentam a nota.** Scan an Object, Walk It Off e Photo Proof são registradas por inteiro, mas só são comparadas com elas mesmas. Uma caminhada até o banheiro leva trinta segundos e uma conta de cabeça leva dois, então enfiar uma delas em uma nota construída sobre precisão e velocidade deixaria uma manhã impecável cravada perto do mínimo. Levantar conta — só não como Sharpness.`,
  },

  backup: {
    heading: `Backup e mudança para um celular novo`,
    body: `Não há conta nenhuma para criar, e nada fica bloqueado atrás de uma. Você pode, se quiser, fazer login com a **Apple** ou com o **Google** — essas são as únicas opções, e não existe login com e-mail e senha — com um único propósito: fazer backup dos seus alarmes, ajustes, notas e sequência para que eles voltem em um celular novo.`,
    items: [
      `**Vem desligado por padrão**, e todo recurso funciona sem login. O backup roda em silêncio depois que seus dados mudam, e um alarme nunca espera pela rede para tocar.`,
      `**Para mudar para um celular novo**, instale o WakeSharp, faça login com a mesma conta Apple ou Google e restaure. Alterações mais recentes que já estejam no aparelho novo são mantidas.`,
      `**Sair da conta** mantém tudo no seu celular e simplesmente para de fazer backup.`,
      `**Excluir a conta** — no app, em _Ajustes → Conta → Excluir conta_, ou como descrito em [wakesharp.app/account/delete](account-delete) — remove permanentemente o backup e o login, enquanto os dados no seu celular são mantidos.`,
    ],
    subscription: `A assinatura é separada de tudo isso: ela fica com a sua conta da App Store ou do Google Play, então Restaurar Compras traz o Plus de volta, tenha você feito login no WakeSharp ou não.`,
  },

  purchases: {
    heading: `Compras e WakeSharp Plus`,
    items: [
      `**O que o Plus acrescenta:** todas as missões de despertar além de Mind Games e Photo Proof, três jogos de aquecimento toda manhã em rodízio, seu histórico completo de Sharpness, alarmes inteligentes de calendário sem limite, e as cenas do Lark (a cotovia mascote), os papéis de parede de alarme e as comemorações. Ele também tira o limite de um só para perfis de alarme e escalas de turno, desbloqueia os dois papéis de parede Plus e as quatro cenas Plus do Lark, e permite escrever uma política de soneca personalizada. **Seu alarme toca de graça, para sempre. Sem anúncios.** Todo alarme que você configura, as duas missões gratuitas, o Strict Mode em aparelhos compatíveis, as predefinições de soneca, todos os 13 toques de alarme, sequências e congelamentos e a verificação de confiabilidade não custam nada.`,
      `**O Plus Lifetime** (vitalício) é uma compra única, não uma assinatura: nunca renova, e não há nada para cancelar.`,
      `**Para restaurar uma compra:** abra a tela de assinatura e toque em _Restore_ (restaurar). Confira se você está com a mesma conta Apple ou Google usada na compra.`,
      `**Para cancelar:** [assinaturas da App Store](apple-subs) ou [assinaturas do Google Play](google-subs). Excluir o app não cancela uma assinatura.`,
      `**Reembolsos** são tratados pela Apple ou pelo Google, não por nós — mas me escreva se algo deu errado e eu ajudo no que puder.`,
    ],
  },

  deleting: {
    heading: `Excluindo seus dados`,
    body: `Tudo o que o WakeSharp registra fica no seu celular. Desinstalar o app apaga tudo isso, e nós não guardamos cópia. Sobre o registro anônimo de assinatura mantido pelo nosso processador de pagamentos, veja [por quanto tempo os dados são mantidos](privacy).`,
  },

  feedback: {
    heading: `Bugs, feedback e sugestões de recursos`,
    body: `Tudo é bem-vindo, em [{email}](email). Para um bug, as coisas mais úteis a incluir são o modelo do celular, a versão do sistema, o que você esperava e o que aconteceu em vez disso. Se um alarme não tocou, o horário para o qual ele estava marcado e o horário em que você encontrou o celular ajudam muito.`,
  },
} satisfies typeof en;
