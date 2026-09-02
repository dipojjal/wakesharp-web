import { accountDelete as en } from '../en/account-delete';

/** /account/delete — el recurso de eliminación de cuenta que enlaza el formulario de seguridad de datos de Google Play. */
export const accountDelete = {
  title: `Eliminar tu cuenta — WakeSharp`,
  description: `Cómo eliminar tu cuenta opcional de WakeSharp y su copia de seguridad en la nube, desde la app o por correo.`,
  heading: `Eliminar tu cuenta de WakeSharp`,
  intro: `Las cuentas de WakeSharp son opcionales: existen solo para hacer una copia de seguridad de tus alarmas, ajustes, puntuaciones y racha, y así poder restaurarlos en un teléfono nuevo. Eliminar la tuya borra esa copia de seguridad y el propio inicio de sesión, de forma permanente.`,
  inApp: {
    heading: `Elimínala en la app`,
    steps: [
      `Abre WakeSharp y ve a **Ajustes** (Settings).`,
      `Toca **Cuenta** (Account).`,
      `Toca **Eliminar cuenta** (Delete account) y confirma.`,
    ],
    body: `Ese es todo el proceso. Elimina permanentemente tu inicio de sesión (Iniciar sesión con Apple o Google), tu copia de seguridad en la nube —alarmas, ajustes, historial de despertares, puntuaciones, racha y cualquier miniatura de referencia de fotos o escaneos registrados— y, en el caso de Iniciar sesión con Apple, revoca el token de inicio de sesión ante Apple. No hay periodo de espera ni retención parcial: el registro de la cuenta y todo lo asociado a él se eliminan juntos.`,
  },
  kept: {
    heading: `Lo que no se elimina`,
    items: [
      `**Los datos de tu teléfono.** Tus alarmas, puntuaciones y ajustes se quedan en tu dispositivo: eliminar la cuenta no es eliminar tus alarmas. Desinstala la app si también quieres que desaparezcan los datos del dispositivo.`,
      `**Las compras.** WakeSharp Plus pertenece a tu cuenta de App Store o Google Play, no a tu cuenta de WakeSharp, y sobrevive a la eliminación.`,
      `**Las analíticas de uso anónimas**, que para empezar nunca estuvieron vinculadas a tu cuenta; consulta la [política de privacidad](privacy).`,
    ],
  },
  byEmail: {
    heading: `Si ya no tienes la app`,
    body: `Escribe a [{email}](email) desde la dirección con la que iniciaste sesión (si usaste Iniciar sesión con Apple con una dirección oculta, indica en su lugar la fecha aproximada de registro) y eliminaremos la cuenta por ti. Verificamos la solicitud y completamos la eliminación en un plazo de 30 días, casi siempre mucho antes.`,
  },
} satisfies typeof en;
