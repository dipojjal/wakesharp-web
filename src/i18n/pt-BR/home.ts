import { home as en } from '../en/home';

/**
 * A página inicial. Os títulos vão em {pre, accent, post} porque a palavra em
 * destaque é um <span class="accent"> no template; os espaços ficam dentro das
 * strings. `{ios}`, `{android}`, `{annual}`, `{lifetime}` e `{trialDays}` vêm de
 * src/config/site.ts.
 */
export const home = {
  title: `WakeSharp — Acorde afiado. Não só acordado.`,

  hero: {
    heading: { pre: `Acorde `, accent: `afiado.`, post: `Não só acordado.` },
    lede: `Deslizar o dedo é algo que até uma pessoa quase inconsciente consegue fazer. O WakeSharp, em vez disso, pede uma missão — resolver, fotografar, escanear ou caminhar — e depois dá uma nota para o quanto você realmente acordou afiado.`,
    phoneAlt: `Tela inicial do WakeSharp à noite, mostrando um alarme às 6h40 e uma regra inteligente de calendário`,
  },

  trust: [
    `Toca no iPhone mesmo no Modo Silencioso e no Foco`,
    `Avisa o que pode impedir o toque — na noite anterior`,
    `Sem cadastro e sem anúncios`,
    `Seu calendário e sua câmera nunca saem do seu celular`,
    `Seu alarme toca de graça, para sempre`,
  ],

  ring: {
    alt: `O alarme do WakeSharp tocando, com os botões de iniciar a missão e de soneca`,
    heading: { pre: `Complete a missão para ganhar `, accent: `crédito total`, post: `` },
    lede: `No iPhone, o AlarmKit da Apple apresenta um alarme do sistema sobre a tela de bloqueio — através do Modo Silencioso e do Foco depois que o acesso a alarmes é concedido, mesmo que o app tenha sido encerrado à força. No Android, um alarme exato no canal de áudio de alarmes, que o Não Perturbe não silencia, com Extra Loud (volume extra alto) e uma rampa de volume que sobe aos poucos em vez de estourar de uma vez. O botão de parar do próprio sistema sempre funciona; a missão é o que conquista a manhã.`,
  },

  reliable: {
    heading: { pre: `Saiba que vai tocar, `, accent: `já na noite anterior`, post: `` },
    lede: `A maioria dos apps de alarme descobre que falhou no mesmo instante que você. O WakeSharp verifica o que de fato impede um alarme de tocar — permissões, volume do alarme, configurações de notificação, sobreposição à tela de bloqueio, restrições de bateria — e começa com um veredito, não com uma promessa.`,
    items: [
      { title: `Um veredito, não uma lista de verificação`, body: `Uma linha só, no topo: vai tocar, pode não tocar ou não consegue tocar.` },
      { title: `Honesto sobre o que não consegue ver`, body: `Quando o celular não nos diz, ele admite — nunca um check verde.` },
      { title: `Correções de um toque, quando existem`, body: `E instruções claras quando não existem.` },
      { title: `“Não tocou” tem resposta`, body: `A causa comprovável — ou a admissão de que não conseguimos descobrir.` },
    ],
    note: `É de graça, fica em Ajustes, e o lembrete de antes de dormir inclui o pior achado para você ver enquanto ainda dá tempo de corrigir.`,
  },

  smart: {
    alt: `O editor de regras de alarme inteligente, configurado para tocar 90 minutos antes da primeira reunião`,
    heading: { pre: `Acorda você antes da sua `, accent: `primeira reunião`, post: `` },
    lede: `“Toque 90 minutos antes da minha primeira reunião.” O WakeSharp lê seu calendário no próprio aparelho, confere de novo durante a noite e move o alarme quando a reunião muda de horário. Somente leitura, opcional e nunca transmitido.`,
    shifts: `Nem toda semana é uma semana, aliás. As escalas de turno cuidam dos padrões que não são semanais — dois dias, duas noites, quatro de folga — com um calendário de prévia e um jeito de pular uma data específica sem apagar nada. Os perfis trocam um conjunto inteiro de alarmes de uma vez: trabalho, férias ou plantão. Busca, ordenação e uma visualização Hoje mantêm a lista sob controle quando há muitos alarmes.`,
    labels: `Diga para que você está acordando — um treino, o trajeto para o trabalho, o café da manhã — e a etiqueta se escreve sozinha. Uma regra inteligente, uma escala e um perfil são de graça; o Plus tira o limite dos três.`,
  },

  mission: {
    alt: `A missão Mind Games: resolva 6 menos 3 para silenciar o alarme`,
    heading: { pre: `Sete jeitos de `, accent: `tirar você da cama`, post: `` },
    lede: `Alguma coisa precisa acontecer antes que a manhã conte, e você escolhe o quê. Mind Games (contas de aritmética) e Photo Proof (prova por foto) são de graça; o resto vem com o Plus. Todas têm uma saída que termina em Mind Games com crédito total, então uma câmera morta ou um celular sem contador de passos nunca deixa você preso.`,
    /** As sete missões que o editor de alarmes oferece, na ordem dele. `tier` é Grátis ou Plus. */
    missions: [
      { name: `Mind Games`, tier: `Grátis`, body: `Três problemas de aritmética, no nível fácil, padrão ou difícil. A missão à qual todas as outras recorrem.` },
      { name: `Photo Proof`, tier: `Grátis`, body: `Fotografe o céu, a cama arrumada, um copo d’água. Seis temas em rodízio diário, então não há nada para preparar na noite anterior.` },
      { name: `Memory Match`, tier: `Plus`, body: `Encontre os pares: vire as cartas duas a duas até emparelhar todas. Quatro pares no nível fácil, oito no difícil.` },
      { name: `Sequence Recall`, tier: `Plus`, body: `Repita a sequência: observe e depois reproduza. Ela começa com três passos e ganha um passo a cada rodada.` },
      { name: `Scan an Object`, tier: `Plus`, body: `Escaneie um objeto: aponte a câmera para algo do outro lado do quarto. Vinte objetos do dia a dia no catálogo, reconhecidos no próprio celular.` },
      { name: `Walk It Off`, tier: `Plus`, body: `Caminhe para despertar: saia da cama e dê os passos. Ele lê o contador de passos e observa sua cadência, então sacudir o celular não vale nada.` },
      { name: `Surprise me`, tier: `Plus`, body: `Surpreenda-me: sorteia uma das outras — fixada para aquele alarme naquele dia, então você só descobre quando ele toca.` },
    ],
    note: `A missão é escolhida quando você cria o alarme, nunca quando ele toca — um alarme que já carrega um escaneamento ou uma caminhada continua executando essa missão, aconteça o que acontecer com a assinatura. O Strict Mode (modo rigoroso), em aparelhos compatíveis, agenda quatro repetições do alarme com antecedência, e a soneca é uma política que você define, não uma regra imposta a você.`,
  },

  games: {
    alt: `O jogo de aquecimento Memory Match`,
    heading: { pre: `Um `, accent: `aquecimento`, post: ` de dois minutos enquanto o café passa` },
    lede: `Mind Games, Memory Match, Sequence Recall, Word Dash e Reaction Tap: cálculo rápido, memória, sequências, palavras e reflexos. No plano Grátis, você joga um depois da missão, sorteado de um par de jogos. Com o Plus, são três por manhã, em rodízio, então o conjunto inteiro passa em menos de uma semana — e nunca repete o que a missão acabou de fazer você fazer. Nada disso é obrigatório; a essa altura o alarme já está desligado.`,
  },

  sharp: {
    alt: `A revelação diária do Sharpness Score`,
    heading: { pre: `Saiba o quanto você acordou `, accent: `afiado`, post: `` },
    lede: `Um número em uma escala de 100 — seu Sharpness Score (a nota de quão afiado você acordou) —, medido contra a sua própria referência móvel, não contra desconhecidos. As missões físicas ficam de fora: um escaneamento, uma caminhada e uma foto só são comparados com eles mesmos, porque atravessar o quarto não é uma nota de aritmética. O seu eu de ontem é a única referência que significa alguma coisa às 6 da manhã.`,
  },

  stats: {
    alt: `O gráfico de tendência do Sharpness com um contador de sequência`,
    heading: { pre: `Veja você ficar `, accent: `mais afiado`, post: `` },
    lede: `Uma sequência, uma linha de tendência e um congelamento a cada sete manhãs — você pode guardar dois, então a vida tem permissão para acontecer duas vezes. Os marcos chegam aos 7, 30, 100 e 365 dias. Perca uma manhã por completo e uma missão de recuperação mantém a corrente viva com meio crédito. Sete dias de histórico de graça; com o Plus, tudo o que você já registrou, por mais longe que isso vá.`,
  },

  together: {
    heading: { pre: `Traga `, accent: `alguém com você`, post: `` },
    lede: `Compartilhe um link e o celular que o abre configura o mesmo alarme e depois o toca por conta própria. Nada para entrar, nada para se cadastrar e nenhum servidor no meio.`,
    cards: [
      { title: `Acorde com um amigo`, body: `Você envia um link; o celular da outra pessoa monta o alarme localmente. Cada um fica com a própria cópia, então mudar o seu não mexe no da outra pessoa.` },
      { title: `Supere meu despertar`, body: `Termine uma missão e você pode desafiar alguém para o mesmo conjunto de problemas — mesma semente, mesmas rodadas, mesma dificuldade. Depois é só descobrir qual dos dois estava acordado de verdade.` },
    ],
    note: `Os dois são de graça, e os dois são só links: o celular que recebe um faz todo o trabalho sozinho.`,
  },

  platforms: {
    heading: { pre: `O mesmo app. `, accent: `Nos dois celulares.`, post: `` },
    lede: `Construído de forma nativa duas vezes — SwiftUI no iOS, Kotlin e Compose no Android. Não é um site embrulhado em app, e é só por isso que cada lado consegue fazer o que só ele consegue fazer. Requer {ios} ou {android}.`,
    watch: `Também tem app de relógio para os dois pulsos — watchOS 26 ou Wear OS 3. Ele vibra no seu pulso para acordar você antes que o quarto ouça qualquer coisa, e o alarme do celular passa para alguns minutos depois, como reserva. Só dispensar o alarme no relógio o cancela: um relógio sem bateria, fora de alcance ou que você não abre há 36 horas deixa o alarme do celular exatamente onde estava. Também há uma complicação para o mostrador do relógio.`,
    account: `Não há conta nenhuma para criar, mas você pode fazer login com a Apple ou com o Google se quiser uma única coisa dela: um backup, para que seus alarmes, ajustes, notas e sequência voltem em um celular novo. Vem desligado por padrão, tudo funciona sem login, e nada às 6 da manhã fica esperando pela rede.`,
  },

  /** A galeria de capturas das lojas (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Escolha uma plataforma`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label} — como aparece na loja ({store})`,
    altTemplate: `WakeSharp no {label}: {caption}`,
    fallbackCaption: `captura de tela do app`,
    /** Número do quadro → o que ele mostra, com o título impresso (em inglês) incluído. */
    captions: {
      '01': `Tela inicial com o próximo alarme e uma regra inteligente de calendário, com o título “Wake up sharp. Not just awake.” (Acorde afiado. Não só acordado.)`,
      '02': `O alarme tocando sobre a tela de bloqueio, com o título “Complete a mission for full credit” (Complete uma missão para ganhar crédito total)`,
      '03': `A missão Mind Games que silencia o alarme, com o título “Solve to silence” (Resolva para silenciar)`,
      '04': `Os jogos de aquecimento, com o título “5 brain games. 3 every morning.” (5 jogos mentais. 3 toda manhã.) e a observação de que o rodízio vem com o WakeSharp Plus`,
      '05': `A revelação diária do Sharpness Score, medido contra a sua própria referência`,
      '06': `O editor de regras de alarme inteligente, com o título “Wakes you before your first meeting” (Acorda você antes da sua primeira reunião)`,
      '07': `As estatísticas de tendência e sequência do Sharpness: sequências e congelamentos de graça, histórico completo com o WakeSharp Plus`,
    },
  },

  yours: {
    heading: { pre: `Deixe a manhã `, accent: `com a sua cara`, post: `` },
    lede: `O alarme que você realmente quer ouvir, por trás da imagem que você realmente quer ver.`,
    cards: [
      { title: `13 toques, todos de graça`, body: `De Dawn (amanhecer) a Smoke Alarm (alarme de incêndio), e cada um deles vem também com uma versão mais suave.` },
      { title: `Papéis de parede e cenas`, body: `Três papéis de parede de graça e cinco com o Plus, e o Lark (a cotovia mascote) ganha mais quatro cenas, cada uma com a própria comemoração.` },
      { title: `Claro, escuro ou nenhum dos dois`, body: `Escolha uma aparência ou deixe seguir o aparelho; de qualquer forma, a paleta muda conforme a hora.` },
      { title: `Um pouso mais suave`, body: `O Gentle start (início suave) no iPhone começa o toque baixinho e sobe até o volume total por volta dos 25 segundos. No Android, um amanhecer clareia a tela e aumenta o volume antes do alarme.` },
    ],
  },

  pricing: {
    heading: { pre: `Seu alarme toca `, accent: `de graça, para sempre`, post: `` },
    lede: `E sem anúncios. Duas das sete missões também são de graça, junto com os 13 toques, o Strict Mode, as predefinições de soneca e a verificação de confiabilidade. O Plus é para a manhã depois do alarme — as outras missões, mais jogos de aquecimento, mais regras inteligentes e o histórico inteiro.`,
    free: {
      name: `Grátis`,
      price: `$0`,
      tagline: `Sem cadastro, sem período de teste para esquecer.`,
      /** Reflete os limites que o paywall realmente aplica. */
      features: [
        `Quantos alarmes você precisar`,
        `Duas missões de despertar — Mind Games e Photo Proof`,
        `Todos os 13 toques de alarme`,
        `Strict Mode, as predefinições de soneca e a verificação de confiabilidade`,
        `Um alarme inteligente de calendário, uma escala de turnos, um perfil`,
        `Busca, ordenação e a visualização Hoje`,
        `Sequências, congelamentos e marcos`,
        `Um jogo de aquecimento depois de cada missão, e sua tendência de 7 dias`,
        `Acorde com um amigo, e o app de relógio nos dois pulsos`,
        `Três papéis de parede de alarme e a cena Classic Lark`,
      ],
    },
    plus: {
      name: `WakeSharp Plus`,
      perMonth: `/mês`,
      annual: `ou **{annual}/ano**, com {trialDays} dias de teste grátis`,
      lifetime: `ou **{lifetime} uma única vez** — Lifetime (vitalício), que nunca renova`,
      /** Os itens 2-6 são os cinco pontos do paywall, na ordem dele. */
      features: [
        `Tudo do plano Grátis`,
        `Todas as missões de despertar além de Mind Games e Photo Proof`,
        `Três jogos de aquecimento toda manhã, em rodízio`,
        `Seu histórico completo de Sharpness`,
        `Alarmes inteligentes de calendário sem limite`,
        `Cenas do Lark, papéis de parede de alarme e comemorações`,
        `Quantas escalas de turno e perfis você quiser, e uma política de soneca personalizada`,
      ],
    },
    lapse: `O Plus é verificado quando você cria um alarme, não quando ele toca. Um alarme que já carrega um escaneamento ou uma caminhada continua executando essa missão com ou sem assinatura ativa — nada do que você já configurou para de funcionar. O que expira é a possibilidade de configurar novos.`,
    billing: `Os planos mensal e anual são cobrados pela Apple ou pelo Google e renovam até serem cancelados — cancele quando quiser na conta da sua loja, e lembre-se de que excluir o app não cancela uma assinatura. O Lifetime é um pagamento único, sem nada para cancelar. Veja os [Termos](terms).`,
    /** Só nas páginas localizadas: as lojas localizam os preços em tempo de execução. */
    usdNote: `Os preços são mostrados em dólares americanos; a App Store e o Google Play mostram o preço do seu país.`,
  },

  faq: {
    heading: { pre: `Perguntas, `, accent: `respondidas`, post: `` },
    items: [
      {
        q: `Ele toca mesmo no Modo Silencioso, no Foco ou no Não Perturbe?`,
        a: `O comportamento depende da plataforma, e depende de permissão. No iPhone, o WakeSharp usa o AlarmKit da Apple, que permite tocar através do Modo Silencioso e do Foco depois que você concede o acesso a alarmes — recuse ou revogue esse acesso e o WakeSharp não consegue agendar absolutamente nada. No Android, ele toca no canal de áudio dedicado aos alarmes, que o Não Perturbe não silencia, e mostra um alerta em tela cheia sobre a tela de bloqueio, desde que as permissões de alarme exato, de notificação e de tela de bloqueio estejam concedidas. O que nenhum app consegue é tocar em um celular desligado ou sem bateria, então, para qualquer coisa que você realmente não possa perder, configure um segundo alarme em outro aparelho.`,
      },
      {
        q: `Como eu confiro se meu alarme vai tocar mesmo?`,
        a: `Abra Ajustes → Alarm reliability (confiabilidade do alarme). O WakeSharp lê as condições do seu celular que podem impedir um alarme — permissões, volume do alarme, configurações de notificação, sobreposição à tela de bloqueio, restrições de bateria — e começa com um veredito claro, não com uma promessa. Quando a plataforma não nos diz algo, ele admite em vez de mostrar um check verde, porque uma lista que transforma incógnitas em aprovações sem avisar é pior do que lista nenhuma. Se um alarme falhar algum dia, o app pode dizer depois a causa comprovável — ou admitir que não conseguiu descobrir.`,
      },
      {
        q: `Eu preciso fazer contas às 6 da manhã?`,
        a: `Só se você quiser. As duas missões gratuitas são Mind Games, que são três problemas de aritmética, e Photo Proof, que só pede uma foto de alguma coisa — o céu, a cama arrumada, um copo d’água, seguindo um tema que muda todo dia. O Plus acrescenta Memory Match, Sequence Recall, escanear um objeto real do outro lado do quarto, caminhar um número definido de passos e o “Surprise me”, que escolhe uma delas e a fixa para aquele alarme naquele dia, então não há nada para preparar na noite anterior. Toda missão tem uma saída que termina em Mind Games com crédito total, então uma câmera morta ou um celular deixado na mesa de cabeceira nunca prende você.`,
      },
      {
        q: `Dá para trapacear e pular a missão?`,
        a: `Você pode desligar o alarme sem fazer uma — o botão de parar do seu próprio celular sempre funciona, e não gostaríamos que fosse de outro jeito. O WakeSharp então mostra uma tela de missão pendente na próxima vez que você abre o app, e uma missão de recuperação pode manter sua sequência viva com meio crédito. A soneca é uma política que você escolhe, não uma regra imposta a você: desligada, o padrão de duas sonecas de cinco minutos, ou Tighten (sonecas cada vez mais curtas), que encurta cada intervalo e aumenta a dificuldade ao longo do caminho. Cada soneca custa Sharpness. O Strict Mode (modo rigoroso), em aparelhos compatíveis, agenda quatro repetições do alarme com antecedência — aos 45 segundos e depois aos 4, 8 e 12 minutos — e completar a missão cancela as que ainda não tocaram.`,
      },
      {
        q: `O que a câmera faz?`,
        a: `Duas missões usam a câmera, e só enquanto essa missão está em andamento ou enquanto você a configura. O Scan an Object classifica os quadros no seu aparelho — o framework Vision da Apple no iPhone, um pequeno modelo embutido no app no Android — para conferir se você está olhando para a coisa que escolheu. O Photo Proof pede uma fotografia, e a versão verificada a compara com uma referência que você cadastrou, também no seu aparelho. Nada é enviado, nada é adicionado à sua galeria de fotos, e a fotografia completa nunca é guardada — só uma pequena impressão digital dela. Recuse a permissão e todas as outras missões continuam funcionando.`,
      },
      {
        q: `O WakeSharp monitora meu sono?`,
        a: `Não. Não há monitoramento de sono de nenhum tipo — nenhum microfone ouvindo durante a noite, nenhuma fase do sono, nenhuma nota para a sua noite e nenhuma opinião sobre quando você dormiu. O contador de passos é lido durante a missão de caminhada e em nenhum outro momento. O WakeSharp mede o quanto você está afiado depois de levantar, e nada antes disso. As únicas coisas com cara de sono nele são uma hora de dormir que você mesmo define e um lembrete opcional para desacelerar.`,
      },
      {
        q: `O que exatamente ele lê do meu calendário?`,
        a: `Seus próximos eventos, somente leitura, inteiramente no seu aparelho, com um único propósito: calcular a que horas acordar você. Nada é transmitido para lugar nenhum. É opcional, e todos os outros recursos funcionam se você recusar.`,
      },
      {
        q: `Eu preciso de uma conta?`,
        a: `Não, e nada fica bloqueado atrás de uma — não há e-mail nem senha em lugar nenhum do app. Você pode, se quiser, fazer login com a Apple ou com o Google com um único propósito: fazer backup dos seus alarmes, ajustes, notas e sequência para que eles voltem em um celular novo. Vem desligado por padrão, todo recurso funciona sem login, e um alarme nunca espera pela rede para tocar. Exclua a conta em Ajustes → Conta, ou em wakesharp.app/account/delete.`,
      },
      {
        q: `O que acontece se meu relógio estiver sem bateria?`,
        a: `Seu celular toca. O relógio acorda você primeiro, com vibrações, e o WakeSharp adia o alarme do celular alguns minutos como reserva, então só dispensar no relógio cancela o alarme do celular. Um relógio sem bateria, fora de alcance ou que você não abre há 36 horas deixa o alarme do celular exatamente onde estava. Os alarmes de guarda do Strict Mode tocam no celular de qualquer maneira.`,
      },
      {
        q: `O que é de graça e o que é Plus?`,
        a: `Seu alarme toca de graça, para sempre, sem anúncios. O plano Grátis inclui quantos alarmes você precisar, as missões Mind Games e Photo Proof, todos os 13 toques de alarme, o Strict Mode, as predefinições de soneca, a verificação de confiabilidade, sequências e congelamentos, um jogo de aquecimento depois de cada missão, um alarme inteligente de calendário, uma escala de turnos, um perfil, o app de relógio e sua tendência de Sharpness de 7 dias. O Plus acrescenta as outras cinco missões — Memory Match, Sequence Recall, escanear, caminhar e Surprise me —, três jogos de aquecimento em rodízio a cada manhã, alarmes inteligentes de calendário sem limite, quantas escalas e perfis você quiser, seu histórico completo de Sharpness, uma política de soneca personalizada e as cenas do Lark, os papéis de parede e as comemorações.`,
      },
      {
        q: `O que acontece com meus alarmes Plus se eu parar de pagar?`,
        a: `Eles continuam funcionando. A verificação acontece quando você cria um alarme, não quando ele toca, então um alarme que já carrega um escaneamento ou uma caminhada continua executando essa missão com ou sem assinatura ativa. O que você perde é a possibilidade de configurar novos, junto com os jogos de aquecimento extras e o histórico completo.`,
      },
      {
        q: `O Lifetime é uma assinatura?`,
        a: `Não. O Lifetime (vitalício) é um pagamento único pelos mesmos recursos do WakeSharp Plus — não renova, e não há nada para cancelar. Os planos mensal e anual, esses sim, renovam até você interrompê-los. O teste grátis de 7 dias pertence ao plano anual.`,
      },
      {
        q: `Como eu cancelo?`,
        a: `Pela App Store ou pelo Google Play, a qualquer momento. Excluir o app não cancela uma assinatura. O Lifetime não tem nada para cancelar — é uma compra única, e Restaurar Compras o traz de volta em um celular novo.`,
      },
      {
        q: `Ele me rastreia?`,
        a: `Sem ID de publicidade, sem localização e sem rastreamento entre outros apps. O que sai do seu aparelho: estatísticas de uso anônimas (um ID aleatório e quais telas você usa — nunca seus alarmes, calendário ou câmera), dados de assinatura se você comprar o Plus, e seu próprio backup se você optou por criar uma conta. Sua conta nunca é cruzada com essas estatísticas. A política de privacidade lista cada byte.`,
      },
    ],
  },

  cta: {
    heading: { pre: `A manhã de amanhã começa `, accent: `hoje à noite`, post: `` },
    lede: `Configure um alarme. Veja como é, de verdade, uma manhã afiada.`,
  },
} satisfies typeof en;
