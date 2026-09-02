import { blog as en } from '../en/blog';

/**
 * A casca do blog: a página de índice, o entorno do post e o cartão de fim de
 * artigo. Os corpos dos posts são Markdown em src/content/blog/<caminho do idioma>/,
 * não aqui. `{date}` e `{minutes}` são fornecidos pelos layouts.
 */
export const blog = {
  index: {
    title: `Blog — WakeSharp`,
    description: `Ciência do sono, rotinas matinais e novidades do produto, do criador do WakeSharp — o alarme que deixa você pronto para a reunião.`,
    heading: `O blog do WakeSharp`,
    intro: `Ciência do sono, rotinas matinais e, de vez em quando, uma novidade do produto — do criador do alarme que confere se você está afiado de verdade.`,
    empty: `O primeiro artigo está a caminho — volte em breve.`,
  },
  /** Anexado ao título de um post na aba do navegador. */
  titleSuffix: ` — Blog do WakeSharp`,
  /** Carrega a própria seta, para que um idioma da direita para a esquerda possa apontá-la para o outro lado. */
  allArticles: `← Todos os artigos`,
  updated: `Atualizado em {date}`,
  minRead: `{minutes} min de leitura`,
  tagsAria: `Tags`,
  related: { aria: `Artigos relacionados`, heading: `Leituras relacionadas` },
  cta: {
    aria: `Baixar WakeSharp`,
    heading: `Acorde afiado amanhã`,
    body: `Seu alarme toca de graça, para sempre, sem anúncios. Mind Games (contas de aritmética), Photo Proof (prova por foto) e a verificação de confiabilidade estão incluídos. Configurar seu primeiro alarme leva uns dez segundos.`,
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
