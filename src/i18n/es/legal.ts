import { legal as en } from '../en/legal';

/**
 * La política de privacidad y los términos se quedan en inglés: son el texto
 * vinculante y ambas apps tienen sus URL en inglés fijas. La ruta localizada
 * existe para que el selector de idioma nunca acabe en un callejón sin salida,
 * y lleva este aviso sobre el cuerpo en inglés. Solo se traducen estas cadenas.
 */
export const legal = {
  privacy: {
    title: `Política de privacidad — WakeSharp`,
    heading: `Política de privacidad`,
  },
  terms: {
    title: `Términos del servicio — WakeSharp`,
    heading: `Términos del servicio`,
  },
  englishOnly: `Este documento está disponible solo en inglés, y el texto en inglés que aparece a continuación es la versión que se aplica. Si algo no queda claro, escribe a [{email}](email) y una persona te lo explicará.`,
} satisfies typeof en;
