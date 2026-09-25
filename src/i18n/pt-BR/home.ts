import { home as en } from '../en/home';

/**
 * A página inicial. Os títulos vão em {pre, accent, post} porque a palavra em
 * destaque é um <span class="accent"> no template; os espaços ficam dentro das
 * strings. `{ios}`, `{android}`, `{annual}`, `{monthly}` e `{trialDays}` vêm de
 * src/config/site.ts.
 *
 * Toda afirmação aqui precisa valer para a versão que o leitor baixa hoje e para
 * a próxima (da 2.10 à 2.13, em 24/09/2026), e é por isso que a página descreve
 * as missões por tipo e nunca diz quantas vezes o alarme volta a tocar: esse
 * mecanismo muda entre essas versões. A fonte é o
 * Docs/marketing-execution/claims-matrix.md do repositório do app e a descrição
 * da App Store. O app não tem português, então os nomes de recursos ficam em
 * inglês, como aparecem na tela.
 */
export const home = {
  title: `WakeSharp - Despertador para quem tem sono pesado`,

  hero: {
    /** Fica dentro do <h1>, acima do slogan: a busca que a página quer atender. */
    kicker: `O despertador para quem tem sono pesado`,
    heading: { pre: `Acorde `, accent: `afiado.`, post: `Não só acordado.` },
    lede: `Para quem tem sono pesado e precisa de mais do que um botão de soneca. Deslizar o dedo é algo que até uma pessoa quase inconsciente consegue fazer, então o WakeSharp pede uma missão (resolver, fotografar, caminhar ou responder em voz alta) e depois dá uma nota para o quanto você realmente acordou afiado.`,
    phoneAlt: `Tela inicial do WakeSharp à noite, mostrando um alarme às 6h40 e uma regra inteligente de calendário`,
  },

  trust: [
    `Toca no iPhone mesmo no Modo Silencioso e no Foco`,
    `Avisa o que pode impedir o toque: na noite anterior`,
    `Não exige conta do WakeSharp`,
    `O processamento da câmera e do calendário acontece no seu celular`,
    `O WakeSharp não mostra anúncios`,
  ],

  ring: {
    alt: `O alarme do WakeSharp tocando, com os botões de iniciar a missão e de soneca`,
    heading: { pre: `Complete a missão para ganhar `, accent: `crédito total`, post: `` },
    lede: `No iPhone, o AlarmKit da Apple apresenta um alarme do sistema sobre a tela de bloqueio: através do Modo Silencioso e do Foco depois que o acesso a alarmes é concedido, mesmo que o app tenha sido encerrado à força. No Android, um alarme exato no canal de áudio de alarmes toca mesmo no modo silencioso, e no Não Perturbe quando ele permite alarmes, com Extra Loud (volume extra alto) e uma rampa de volume que sobe aos poucos em vez de estourar de uma vez. Não importa como você o silencie: a manhã só conta depois que a missão é concluída.`,
  },

  reliable: {
    heading: { pre: `Saiba que vai tocar, `, accent: `já na noite anterior`, post: `` },
    lede: `A maioria dos apps de alarme descobre que falhou no mesmo instante que você. O WakeSharp verifica o que de fato impede um alarme de tocar (permissões, volume do alarme, configurações de notificação, sobreposição à tela de bloqueio, restrições de bateria) e começa com um veredito, não com uma promessa.`,
    items: [
      { title: `Um veredito, não uma lista de verificação`, body: `Uma linha só, no topo: vai tocar, pode não tocar ou não consegue tocar.` },
      { title: `Honesto sobre o que não consegue ver`, body: `Quando o celular não nos diz, ele admite: nunca um check verde.` },
      { title: `Correções de um toque, quando existem`, body: `E instruções claras quando não existem.` },
      { title: `“Não tocou” tem resposta`, body: `A causa comprovável, ou a admissão de que não conseguimos descobrir.` },
    ],
    note: `Fica em Ajustes, e o lembrete de antes de dormir inclui o pior achado para você ver enquanto ainda dá tempo de corrigir.`,
  },

  smart: {
    alt: `O editor de regras de alarme inteligente, configurado para tocar 90 minutos antes da primeira reunião`,
    heading: { pre: `Acorda você antes da sua `, accent: `primeira reunião`, post: `` },
    lede: `“Toque 90 minutos antes da minha primeira reunião.” O WakeSharp lê seu calendário no próprio aparelho, confere de novo durante a noite e move o alarme quando a reunião muda de horário. Somente leitura, opcional e nunca transmitido.`,
    shifts: `Nem toda semana é uma semana, aliás. As escalas de turno cuidam dos padrões que não são semanais (dois dias, duas noites, quatro de folga) com um calendário de prévia e um jeito de pular uma data específica sem apagar nada. Os perfis trocam um conjunto inteiro de alarmes de uma vez: trabalho, férias ou plantão. Busca, ordenação e uma visualização Hoje mantêm a lista sob controle quando há muitos alarmes.`,
    labels: `Diga para que você está acordando (um treino, o trajeto para o trabalho, o café da manhã) e a etiqueta se escreve sozinha.`,
  },

  mission: {
    alt: `A missão Mind Games: resolva 9 menos 4 para silenciar o alarme`,
    heading: { pre: `Missões que `, accent: `tiram você da cama`, post: `` },
    lede: `Alguma coisa precisa acontecer antes que a manhã conte, e você escolhe o quê: aritmética, um quebra-cabeça, uma foto do lugar que você escolheu ontem à noite, passos de verdade ou uma resposta dita em voz alta. Um alarme pode pedir várias seguidas, na ordem que você escolher, e, se uma não puder rodar naquela manhã (uma câmera quebrada, um celular sem contador de passos), o WakeSharp recorre a outra que possa.`,
    /**
     * Todas as missões que o editor de alarmes oferece (as entradas do
     * GameCatalog.json com `supportsMission`), agrupadas pelo que pedem de você.
     * `kind` é o rótulo pequeno no canto de cada cartão. Os nomes ficam em inglês,
     * como no app; as frases seguem as descrições do próprio catálogo.
     */
    missions: [
      { name: `Mind Games`, kind: `Mente`, body: `Rodadas rápidas de aritmética que você precisa acertar.` },
      { name: `Memory Match`, kind: `Mente`, body: `Vire as cartas e encontre todos os pares.` },
      { name: `Sequence Recall`, kind: `Mente`, body: `Repita uma sequência de toques que cresce a cada rodada.` },
      { name: `Colour Clash`, kind: `Mente`, body: `Toque na cor da tinta, não na palavra.` },
      { name: `Type It Out`, kind: `Mente`, body: `Digite uma frase palavra por palavra, com o corretor automático desligado.` },
      { name: `Photo Proof`, kind: `Câmera`, body: `Tire de novo a foto do lugar que você escolheu na noite anterior.` },
      { name: `Scan an Object`, kind: `Câmera`, body: `Levante-se e aponte a câmera para uma garrafa, uma caneca ou uma pia.` },
      { name: `Fetch`, kind: `Câmera`, body: `Vá buscar algo azul, ou algo que você usa para beber.` },
      { name: `Face Check`, kind: `Câmera`, body: `Abra os olhos para a câmera e depois siga a instrução.` },
      { name: `Fruit Slash`, kind: `Câmera`, body: `Corte as frutas no ar com o dedo.` },
      { name: `Walk It Off`, kind: `Movimento`, body: `Dê passos de verdade, contados pelo seu celular.` },
      { name: `First Light`, kind: `Movimento`, body: `Vá até uma janela e segure o celular na luz.` },
      { name: `Serial Sevens`, kind: `Voz`, body: `Conte de trás para a frente, de sete em sete, em voz alta.` },
      { name: `Name Five`, kind: `Voz`, body: `Diga cinco coisas de uma categoria, em voz alta.` },
      { name: `Surprise Me`, kind: `Qualquer uma`, body: `Uma missão diferente a cada manhã.` },
    ],
    note: `As missões fazem parte do alarme que você cria, então o trato é fechado na noite anterior, e não negociado às 6 da manhã.`,
  },

  games: {
    alt: `O jogo de aquecimento Memory Match`,
    heading: { pre: `Um `, accent: `aquecimento`, post: ` de dois minutos enquanto o café passa` },
    lede: `Mind Games, Memory Match, Sequence Recall, Word Dash e Reaction Tap: cálculo rápido, memória, sequências, palavras e reflexos. Três são jogados a cada manhã, em rodízio, então o conjunto inteiro passa em menos de uma semana, e o aquecimento nunca repete o que a missão acabou de pedir a você. Nada disso é obrigatório; a essa altura o alarme já está desligado.`,
  },

  sharp: {
    alt: `A revelação diária do Sharpness Score`,
    heading: { pre: `Saiba o quanto você acordou `, accent: `afiado`, post: `` },
    lede: `Um número em uma escala de 100, tirado do aquecimento (seu Sharpness Score (a nota de quão afiado você acordou)), medido contra a sua própria referência móvel, não contra desconhecidos. É uma nota dentro do app, não um teste clínico, e o seu eu de ontem é a única referência que significa alguma coisa às 6 da manhã.`,
  },

  stats: {
    alt: `O gráfico de tendência do Sharpness com um contador de sequência`,
    heading: { pre: `Veja você ficar `, accent: `mais afiado`, post: `` },
    lede: `Uma sequência, uma linha de tendência e congelamentos para as manhãs em que a vida atrapalha. Os marcos chegam aos 7, 30, 100 e 365 dias, e seu histórico completo de Sharpness vai até o seu primeiro dia no app.`,
  },

  together: {
    heading: { pre: `Traga `, accent: `alguém com você`, post: `` },
    lede: `Compartilhe um link e o celular que o abre configura o mesmo alarme e depois o toca por conta própria. Nada para entrar, nada para se cadastrar e nenhum servidor no meio.`,
    cards: [
      { title: `Wake with a friend`, body: `Acorde com um amigo: você envia um link; o celular da outra pessoa monta o alarme localmente. Cada um fica com a própria cópia, então mudar o seu não mexe no da outra pessoa.` },
      { title: `Beat my wake`, body: `Supere meu despertar: termine uma missão e você pode desafiar alguém para o mesmo conjunto de problemas: mesma semente, mesmas rodadas, mesma dificuldade. Depois é só descobrir qual dos dois estava acordado de verdade.` },
    ],
    note: `Os dois são só links: o celular que recebe um faz todo o trabalho sozinho.`,
  },

  platforms: {
    heading: { pre: `O mesmo app. `, accent: `Nos dois celulares.`, post: `` },
    lede: `Construído de forma nativa duas vezes: SwiftUI no iOS, Kotlin e Compose no Android. Não é um site embrulhado em app, e é só por isso que cada lado consegue fazer o que só ele consegue fazer. Requer {ios} ou {android}.`,
    watch: `Também tem app de relógio para os dois pulsos: watchOS 26 ou Wear OS 3. Ele vibra no seu pulso para acordar você antes que o quarto ouça qualquer coisa, e o alarme do celular passa para alguns minutos depois, como reserva. Só dispensar o alarme no relógio o cancela: um relógio sem bateria, fora de alcance ou que você não abre há 36 horas deixa o alarme do celular exatamente onde estava. Também há uma complicação para o mostrador do relógio.`,
    account: `Não há conta nenhuma para criar, mas você pode fazer login com a Apple ou com o Google se quiser uma única coisa dela: um backup, para que seus alarmes, ajustes, notas e sequência voltem em um celular novo. Vem desligado por padrão, tudo funciona sem login, e nada às 6 da manhã fica esperando pela rede.`,
  },

  /** A galeria de capturas das lojas (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Escolha uma plataforma`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label}: como aparece na loja ({store})`,
    altTemplate: `WakeSharp no {label}: {caption}`,
    fallbackCaption: `captura de tela do app`,
    /**
     * Número do quadro → o que ele mostra, com o título impresso (em inglês)
     * incluído. Os quadros 04 e 07 ficam de fora (StoreGallery.astro) porque a arte
     * ainda mostra os preços retirados na 2.10; eles não têm legenda até o
     * repositório do app gerar as imagens de novo.
     */
    captions: {
      '01': `Tela inicial com o próximo alarme e uma regra inteligente de calendário, com o título “Wake up sharp. Not just awake.” (Acorde afiado. Não só acordado.)`,
      '02': `O alarme tocando sobre a tela de bloqueio, com o título “Complete a mission for full credit” (Complete uma missão para ganhar crédito total)`,
      '03': `A missão Mind Games que silencia o alarme, com o título “Solve to silence” (Resolva para silenciar)`,
      '05': `A revelação diária do Sharpness Score, medido contra a sua própria referência`,
      '06': `O editor de regras de alarme inteligente, com o título “Wakes you before your first meeting” (Acorda você antes da sua primeira reunião)`,
    },
  },

  yours: {
    heading: { pre: `Deixe a manhã `, accent: `com a sua cara`, post: `` },
    lede: `O alarme que você realmente quer ouvir, por trás da imagem que você realmente quer ver.`,
    cards: [
      { title: `Toques para todo tipo de dorminhoco`, body: `De Dawn (amanhecer) a Smoke Alarm (alarme de incêndio), e cada um deles vem também com uma versão mais suave.` },
      { title: `Papéis de parede e cenas`, body: `Todos os papéis de parede de alarme e todas as cenas do Lark (a cotovia mascote) estão incluídos, e cada cena traz a própria comemoração.` },
      { title: `Claro, escuro ou nenhum dos dois`, body: `Escolha uma aparência ou deixe seguir o aparelho; de qualquer forma, a paleta muda conforme a hora.` },
      { title: `Um pouso mais suave`, body: `O Gentle start (início suave) no iPhone começa o toque baixinho e sobe até o volume total por volta dos 25 segundos. No Android, um amanhecer clareia a tela e aumenta o volume antes do alarme.` },
    ],
  },

  pricing: {
    heading: { pre: `Um plano, `, accent: `tudo incluído`, post: `` },
    lede: `O WakeSharp Unlimited é o app inteiro: todas as missões de despertar, o aquecimento diário, os alarmes inteligentes de calendário, as escalas de turno e os perfis, seu histórico completo de Sharpness, e todas as cenas do Lark e todos os papéis de parede. O WakeSharp não mostra anúncios.`,
    unlimited: {
      name: `WakeSharp Unlimited`,
      perYear: `/ano`,
      /** O teste e o preço que vem depois dele sempre andam juntos. */
      trial: `Comece com **{trialDays} dias de teste grátis**, depois {annual} por ano`,
      monthly: `ou **{monthly} por mês**, sem teste`,
      features: [
        `Todas as missões de despertar, e várias seguidas se você quiser`,
        `Três jogos de aquecimento toda manhã, em rodízio`,
        `Seu histórico completo de Sharpness`,
        `Alarmes inteligentes de calendário que podem mudar quando sua primeira reunião muda`,
        `Escalas de turno, perfis e quantos alarmes você precisar`,
        `A verificação de confiabilidade e todos os toques de alarme`,
        `Todas as cenas do Lark, papéis de parede de alarme e comemorações`,
        `Wake with a friend, e o app de relógio nos dois pulsos`,
        `Sem anúncios`,
      ],
    },
    billing: `Os planos anual e mensal são cobrados pela Apple ou pelo Google e renovam até serem cancelados: cancele quando quiser na conta da sua loja, e lembre-se de que excluir o app não cancela uma assinatura. O teste grátis é para novos assinantes elegíveis. Veja os [Termos](terms).`,
    /** Só nas páginas localizadas: as lojas localizam os preços em tempo de execução. */
    usdNote: `Os preços são mostrados em dólares americanos; a App Store e o Google Play mostram o preço do seu país.`,
  },

  faq: {
    heading: { pre: `Perguntas, `, accent: `respondidas`, post: `` },
    /** As respostas podem usar {annual}, {monthly} e {trialDays}; preços nunca aparecem em um catálogo. */
    items: [
      {
        q: `Ele toca mesmo no Modo Silencioso, no Foco ou no Não Perturbe?`,
        a: `O comportamento depende da plataforma, e depende de permissão. No iPhone, o WakeSharp usa o AlarmKit da Apple, que permite tocar através do Modo Silencioso e do Foco depois que você concede o acesso a alarmes: recuse ou revogue esse acesso e o WakeSharp não consegue agendar absolutamente nada. No Android, ele usa o canal dedicado aos alarmes, que toca mesmo no modo silencioso, e no Não Perturbe quando ele permite alarmes (o Silêncio total cala todos os sons, inclusive os alarmes), e mostra um alerta em tela cheia sobre a tela de bloqueio, desde que as permissões de alarme exato, de notificação e de tela de bloqueio estejam concedidas. O que nenhum app consegue é tocar em um celular desligado ou sem bateria, então, para qualquer coisa que você realmente não possa perder, configure um segundo alarme em outro aparelho.`,
      },
      {
        q: `Como eu confiro se meu alarme vai tocar mesmo?`,
        a: `Abra Ajustes → Alarm reliability (confiabilidade do alarme). O WakeSharp lê as condições do seu celular que podem impedir um alarme (permissões, volume do alarme, configurações de notificação, sobreposição à tela de bloqueio, restrições de bateria) e começa com um veredito claro, não com uma promessa. Quando a plataforma não nos diz algo, ele admite em vez de mostrar um check verde, porque uma lista que transforma incógnitas em aprovações sem avisar é pior do que lista nenhuma. Se um alarme falhar algum dia, o app pode dizer depois a causa comprovável, ou admitir que não conseguiu descobrir.`,
      },
      {
        q: `Eu preciso fazer contas às 6 da manhã?`,
        a: `Só se você quiser. As missões são de vários tipos: aritmética e quebra-cabeças, uma foto de um lugar que você escolheu na noite anterior, escanear um objeto real do outro lado do quarto, caminhar ou ir até uma janela, digitar uma frase ou responder em voz alta. Escolha as que combinam com você, e um alarme pode pedir mais de uma. O Surprise Me escolhe uma diferente a cada manhã, então não há nada para preparar na noite anterior.`,
      },
      {
        q: `Dá para trapacear e pular a missão?`,
        a: `Os controles do seu próprio celular sempre funcionam: você pode desligá-lo, e nenhum app deveria conseguir impedir isso. Dentro do WakeSharp, porém, parar o alarme ou usar a soneca não conclui a manhã: ela só conta quando a missão estiver feita.`,
      },
      {
        q: `O que a câmera faz?`,
        a: `Só as missões que precisam dela a usam (entre elas Photo Proof, Scan an Object, Fetch, Face Check e Fruit Slash), e só enquanto uma delas está em andamento ou enquanto você a configura. O reconhecimento de objetos e a comparação de fotos acontecem no seu aparelho. Recuse a permissão e todas as missões que não precisam da câmera continuam funcionando. A política de privacidade diz exatamente o que sai do seu celular, se é que sai alguma coisa, e quando.`,
      },
      {
        q: `O WakeSharp monitora meu sono?`,
        a: `Não. Não há monitoramento de sono de nenhum tipo: nenhum microfone ouvindo durante a noite, nenhuma fase do sono, nenhuma nota para a sua noite e nenhuma opinião sobre quando você dormiu. O contador de passos é lido durante a missão de caminhada e em nenhum outro momento. O WakeSharp mede o quanto você está afiado depois de levantar, e nada antes disso. As únicas coisas com cara de sono nele são uma hora de dormir que você mesmo planeja e sons opcionais para relaxar antes de dormir.`,
      },
      {
        q: `O que exatamente ele lê do meu calendário?`,
        a: `Seus próximos eventos, somente leitura, inteiramente no seu aparelho, com um único propósito: calcular a que horas acordar você. Nada é transmitido para lugar nenhum. É opcional, e todos os outros recursos funcionam se você recusar.`,
      },
      {
        q: `Eu preciso de uma conta?`,
        a: `Nenhuma conta do WakeSharp é necessária, não há e-mail nem senha em lugar nenhum do app. Você pode, se quiser, fazer login com a Apple ou com o Google com um único propósito: fazer backup dos seus alarmes, ajustes, notas e sequência para que eles voltem em um celular novo. Vem desligado por padrão, todo recurso funciona sem login, e um alarme nunca espera pela rede para tocar. Exclua a conta em Ajustes → Conta, ou em wakesharp.app/account/delete.`,
      },
      {
        q: `O que acontece se meu relógio estiver sem bateria?`,
        a: `Seu celular toca. O relógio acorda você primeiro, com vibrações, e o WakeSharp adia o alarme do celular alguns minutos como reserva, então só dispensar no relógio cancela o alarme do celular. Um relógio sem bateria, fora de alcance ou que você não abre há 36 horas deixa o alarme do celular exatamente onde estava.`,
      },
      {
        q: `Quanto custa o WakeSharp?`,
        a: `Há um único plano, o WakeSharp Unlimited, e ele inclui tudo. Novos assinantes podem começar com {trialDays} dias de teste grátis do plano anual, depois {annual} por ano, ou escolher o plano mensal de {monthly} por mês, que não tem teste. Os preços estão em dólares americanos; a App Store e o Google Play mostram o preço do seu país. O WakeSharp não mostra anúncios.`,
      },
      {
        q: `Eu comprei o Lifetime (vitalício). Continuo com ele?`,
        a: `Sim. O Lifetime foi um pagamento único e continua sendo seu: nada renova e não há nada para cancelar. Restaurar Compras o traz de volta em um celular novo, usando a mesma conta Apple ou Google.`,
      },
      {
        q: `Como eu cancelo?`,
        a: `Pela App Store ou pelo Google Play, a qualquer momento, inclusive durante o teste grátis. Excluir o app não cancela uma assinatura.`,
      },
      {
        q: `Ele me rastreia?`,
        a: `O WakeSharp não mostra anúncios, mas compra anúncios em outros lugares, e mede qual anúncio ou link trouxe você ao app e se isso levou a um teste ou a uma assinatura. No iPhone, ele pergunta antes: se você recusar, seu identificador de publicidade nunca é lido e as redes de anúncios só veem resultados agregados das campanhas. No Android, funciona como a política de privacidade descreve. As estatísticas do produto podem ser desativadas em Ajustes, e as etiquetas dos seus alarmes e os detalhes do seu calendário nunca são enviados. A política de privacidade lista exatamente o que sai do seu aparelho.`,
      },
    ],
  },

  /** The "From the blog" block; shown only where this language has the featured posts. */
  fromBlog: {
    heading: { pre: `Do `, accent: `blog`, post: `` },
    more: `Ver todos os artigos`,
  },

  cta: {
    heading: { pre: `A manhã de amanhã começa `, accent: `hoje à noite`, post: `` },
    lede: `Configure um alarme. Veja como é, de verdade, uma manhã afiada.`,
  },
} satisfies typeof en;
