import { legal as en } from '../en/legal';

/**
 * A política de privacidade e os termos ficam em inglês: são o texto vinculante e
 * os dois apps têm as URLs em inglês fixas no código. Uma rota localizada existe
 * para que o seletor de idioma nunca leve a um beco sem saída, e ela carrega este
 * aviso acima do corpo em inglês. Só as strings abaixo são traduzidas.
 */
export const legal = {
  privacy: {
    title: `Política de Privacidade — WakeSharp`,
    heading: `Política de Privacidade`,
  },
  terms: {
    title: `Termos de Serviço — WakeSharp`,
    heading: `Termos de Serviço`,
  },
  englishOnly: `Este documento está disponível apenas em inglês, e o texto em inglês abaixo é a versão que se aplica. Se algo nele não estiver claro, escreva para [{email}](email) e uma pessoa de verdade explica.`,
} satisfies typeof en;
