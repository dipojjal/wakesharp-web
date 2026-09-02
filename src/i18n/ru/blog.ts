import { blog as en } from '../en/blog';

export const blog = {
  index: {
    title: `Блог — WakeSharp`,
    description: `Наука о сне, утренние ритуалы и новости продукта от создателя WakeSharp — будильника, после которого вы готовы к встречам.`,
    heading: `Блог WakeSharp`,
    intro: `Наука о сне, утренние ритуалы и время от времени новости продукта — от создателя будильника, который проверяет, действительно ли у вас ясная голова.`,
    empty: `Первая статья уже в пути — загляните чуть позже.`,
  },
  titleSuffix: ` — Блог WakeSharp`,
  allArticles: `← Все статьи`,
  updated: `Обновлено {date}`,
  minRead: `{minutes} мин чтения`,
  tagsAria: `Теги`,
  related: { aria: `Похожие статьи`, heading: `Читайте также` },
  cta: {
    aria: `Скачать WakeSharp`,
    heading: `Проснитесь завтра с ясной головой`,
    body: `Ваш будильник звонит бесплатно, навсегда, и без рекламы. Mind Games, Photo Proof и проверка надёжности включены. Первый будильник ставится секунд за десять.`,
  },
  categories: {
    'sleep-science': `Наука о сне`,
    'morning-routines': `Утренние ритуалы`,
    productivity: `Продуктивность`,
    'product-updates': `Новости продукта`,
    'tips-and-tricks': `Советы и приёмы`,
    company: `О компании`,
  },
} satisfies typeof en;
