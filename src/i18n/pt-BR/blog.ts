import { blog as en } from '../en/blog';

/**
 * A casca do blog: a página de índice, o entorno do post e o cartão de fim de
 * artigo. Os corpos dos posts são Markdown em src/content/blog/<caminho do idioma>/,
 * não aqui. `{date}` e `{minutes}` são fornecidos pelos layouts.
 */
export const blog = {
  index: {
    title: `Ciência do sono e dicas para acordar — Blog do WakeSharp`,
    description: `Guias baseados em pesquisas para acordar na hora e com a cabeça clara: inércia do sono, soneca, alarmes que falham, cafeína, melatonina e manhãs melhores.`,
    heading: `O blog do WakeSharp`,
    intro: `Ciência do sono, rotinas matinais e, de vez em quando, uma novidade do produto — do criador do alarme que confere se você está afiado de verdade.`,
    empty: `O primeiro artigo está a caminho — volte em breve.`,
  },
  /** Anexado ao título de um post na aba do navegador, quando o título inteiro ainda cabe em 60 caracteres. */
  titleSuffix: ` — WakeSharp`,
  /** A linha abaixo do título de um post quando o fundador o revisou. `{name}` é um link para /about. */
  reviewedBy: `Revisado por {name}`,
  /** Carrega a própria seta, para que um idioma da direita para a esquerda possa apontá-la para o outro lado. */
  allArticles: `← Todos os artigos`,
  updated: `Atualizado em {date}`,
  minRead: `{minutes} min de leitura`,
  tagsAria: `Tags`,
  related: { aria: `Artigos relacionados`, heading: `Leituras relacionadas` },
  cta: {
    aria: `Baixar WakeSharp`,
    heading: `Acorde afiado amanhã`,
    /** `{trialDays}` e `{annual}` vêm de src/config/site.ts; o teste nunca aparece sem o preço. */
    body: `Comece com {trialDays} dias de teste grátis do WakeSharp Unlimited, depois {annual} por ano. Configurar seu primeiro alarme leva uns dez segundos.`,
  },
  /** Um rótulo por categoria de src/lib/blog-categories.ts; uma categoria nova precisa de um em cada idioma. */
  categories: {
    'sleep-science': `Ciência do sono`,
    'morning-routines': `Rotinas matinais`,
    productivity: `Produtividade`,
    'product-updates': `Novidades do produto`,
    'tips-and-tricks': `Dicas e truques`,
    company: `Empresa`,
  },
} satisfies typeof en;
