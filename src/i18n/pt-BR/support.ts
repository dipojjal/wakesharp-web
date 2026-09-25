import { support as en } from '../en/support';

/**
 * /support - a URL de suporte do App Store Connect. Chaves de link usadas abaixo:
 * email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * `{ios}` e `{android}` são as strings de requisitos, e `{annual}`, `{monthly}`
 * e `{trialDays}` os preços, todos de src/config/site.ts.
 */
export const support = {
  title: `Suporte WakeSharp: alarme que não toca, missões e cobrança`,
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
    callout: `**Comece pelo app, não por aqui.** Abra o WakeSharp → Ajustes → _Alarm reliability_ (confiabilidade do alarme). Ele lê o estado atual do seu celular (permissões, volume do alarme, Não Perturbe, configurações de notificação, sobreposição à tela de bloqueio, restrições de bateria) e começa com um veredito claro: vai tocar, pode não tocar ou não consegue tocar. Quando a correção está a um toque de distância, ele oferece o toque; quando o celular não nos diz algo, ele admite em vez de mostrar um check verde. Ele também roda antes de dormir e sinaliza a pior coisa que encontrou.`,
    report: `Se um alarme já foi perdido, o WakeSharp mostra um relatório naquela manhã apontando a causa quando consegue comprová-la (permissão revogada, volume do alarme no zero, Silêncio total, o celular estava desligado) e dizendo “Não conseguimos descobrir por quê” quando não consegue. As listas abaixo são para quando ele não consegue.`,
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
    /** Heading over the same-language troubleshooting posts, when there are any. */
    guidesHeading: `Guias mais completos`,
  },

  ringsThrough: {
    heading: `O WakeSharp toca mesmo através do Modo Silencioso, do Foco e do Não Perturbe?`,
    body: `Em circunstâncias normais, sim: esse é o propósito inteiro do app, e é o mesmo mecanismo que o relógio nativo usa em cada plataforma.`,
    items: [
      `**No iPhone**, o WakeSharp usa o AlarmKit da Apple, que permite tocar através do Modo Silencioso e do Foco **depois que você concede a permissão de alarme**. Recuse ou revogue essa permissão e o WakeSharp não consegue agendar alarme nenhum.`,
      `**No Android**, o alarme usa o canal de áudio dedicado aos alarmes, que toca mesmo no modo silencioso, e no Não Perturbe quando ele permite alarmes (o Silêncio total cala todos os sons, inclusive os alarmes), e mostra um alerta em tela cheia sobre a tela de bloqueio: **quando as permissões de alarme exato, de notificação e de tela de bloqueio estão concedidas**. Não há uma solicitação extra para o canal de alarmes em si, mas uma notificação bloqueada ou uma restrição de bateria ainda podem impedir o alerta.`,
    ],
    limit: `O que nenhuma das plataformas consegue é tocar em um celular desligado, sem bateria ou que teve as permissões do app revogadas.`,
  },

  missions: {
    heading: `Missões e soneca`,
    items: [
      `**A missão** é o que garante a manhã, e há mais de uma dúzia: quebra-cabeças de aritmética e memória como _Mind Games_ e _Colour Clash_, uma foto de um lugar que você escolheu na noite anterior (_Photo Proof_), um objeto real do outro lado do quarto (_Scan an Object_, _Fetch_), passos (_Walk It Off_), a luz do dia em uma janela (_First Light_), digitar uma frase (_Type It Out_) ou responder em voz alta (_Serial Sevens_, _Name Five_). O _Surprise Me_ escolhe uma diferente a cada manhã. Um alarme pode pedir várias missões seguidas, na ordem que você escolher.`,
      `**My spots & codes** (meus lugares e códigos) é onde o _Scan an Object_ fica pessoal. Fotografe um lugar até onde você vai caminhar, como a cafeteira ou a porta da frente, ou registre um QR code ou um código de barras que você cola onde a manhã deve mandar você, como o espelho do banheiro ou a lata de café. Um alarme pode então pedir aquele alvo específico. É um recurso _dentro_ da missão de escaneamento, não uma missão própria, e nem a fotografia nem o código são armazenados: só uma impressão digital de cada um.`,
      `**Se uma missão não puder rodar** naquela manhã (uma câmera quebrada, um celular sem contador de passos), o WakeSharp recorre a outra que possa, para você não ficar com um alarme que não consegue concluir.`,
      `**Usar a soneca ou parar o alarme não conclui a manhã.** Não importa como você silencie o alarme: a manhã só conta quando a missão estiver feita. Os controles do seu próprio celular sempre funcionam: desligar o celular, por exemplo, nunca é bloqueado.`,
    ],
  },

  smartAlarms: {
    heading: `Alarmes inteligentes de calendário`,
    body: `Uma regra inteligente toca um número definido de minutos antes da sua primeira reunião, limitado entre um horário mais cedo e um mais tarde que você escolhe. O WakeSharp confere seu calendário de novo durante a noite, então, se a reunião mudar, o alarme muda. Se você recusar o acesso ao calendário, todo o resto continua funcionando: você só define os horários por conta própria. Seus eventos nunca saem do seu aparelho; veja a [Política de Privacidade](privacy).`,
    limits: `Uma escala de turnos é para padrões que não são semanais: 4 dias de trabalho por 4 de folga a partir de uma data de referência, cada fase com o próprio horário, e um calendário de prévia para você conferir antes de dormir contando com ela.`,
  },

  sharpness: {
    heading: `O Sharpness Score`,
    body: `Depois de uma missão, você pode fazer um aquecimento opcional: três dos cinco jogos de aquecimento a cada manhã, em rodízio, uns dois minutos no total, pulando o jogo que a missão acabou de fazer você jogar. Sua nota (o Sharpness Score, de quão afiado você acordou) é medida contra a sua própria referência móvel, não contra outras pessoas, então ela se acomoda em torno de 100 conforme o app aprende o seu normal. Uma manhã ruim é uma queda em relação ao seu eu de ontem, nada mais. É uma nota dentro do app, não um teste clínico nem cognitivo.`,
    physical: `**A nota vem do aquecimento.** A missão é o que tira você da cama; o aquecimento mental opcional que vem depois é o que produz seu Sharpness Score, então uma longa caminhada até a cozinha nunca conta contra você.`,
  },

  backup: {
    heading: `Backup e mudança para um celular novo`,
    body: `Não há conta nenhuma para criar, e nada fica bloqueado atrás de uma. Você pode, se quiser, fazer login com a **Apple** ou com o **Google** (essas são as únicas opções, e não existe login com e-mail e senha) com um único propósito: fazer backup dos seus alarmes, ajustes, notas e sequência para que eles voltem em um celular novo.`,
    items: [
      `**Vem desligado por padrão**, e todo recurso funciona sem login. O backup roda em silêncio depois que seus dados mudam, e um alarme nunca espera pela rede para tocar.`,
      `**Para mudar para um celular novo**, instale o WakeSharp, faça login com a mesma conta Apple ou Google e restaure. Alterações mais recentes que já estejam no aparelho novo são mantidas.`,
      `**Sair da conta** mantém tudo no seu celular e simplesmente para de fazer backup.`,
      `**Excluir a conta** (no app, em _Ajustes → Conta → Excluir conta_, ou como descrito em [wakesharp.app/account/delete](account-delete)) remove permanentemente o backup e o login, enquanto os dados no seu celular são mantidos.`,
    ],
    subscription: `A assinatura é separada de tudo isso: ela fica com a sua conta da App Store ou do Google Play, então Restaurar Compras traz o WakeSharp Unlimited de volta, tenha você feito login no WakeSharp ou não.`,
  },

  purchases: {
    heading: `Compras e WakeSharp Unlimited`,
    items: [
      `**WakeSharp Unlimited** é o app inteiro: todas as missões de despertar, o rodízio diário de aquecimento, seu histórico completo de Sharpness, os alarmes inteligentes de calendário, as escalas de turno e os perfis, e todas as cenas do Lark (a cotovia mascote) e todos os papéis de parede. Novos assinantes podem começar com **{trialDays} dias de teste grátis** do plano anual, depois {annual} por ano, ou escolher o plano mensal de {monthly} por mês, que não tem teste. O WakeSharp não mostra anúncios.`,
      `**Lifetime** (vitalício) foi uma compra única, e continua válido para todos que o compraram: nunca renova, e não há nada para cancelar.`,
      `**Para restaurar uma compra:** abra a tela de assinatura e toque em _Restore_ (restaurar). Confira se você está com a mesma conta Apple ou Google usada na compra.`,
      `**Para cancelar:** [assinaturas da App Store](apple-subs) ou [assinaturas do Google Play](google-subs), a qualquer momento, inclusive durante o teste grátis. Excluir o app não cancela uma assinatura.`,
      `**Reembolsos** são tratados pela Apple ou pelo Google, não por nós, mas me escreva se algo deu errado e eu ajudo no que puder.`,
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
