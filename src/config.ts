export const SITE_URL = "https://www.getmedisimple.com";

export const LOGO_URL =
  "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/698b95cdca717cb5cec872f7.png";

/** Página de agendamiento de la sesión estratégica (vive en el sitio actual). */
export const BOOKING_URL = `${SITE_URL}/agendar`;

/**
 * Número de WhatsApp de MediSimple (+56 9 4170 6406), en formato internacional y solo dígitos.
 * Se puede sobrescribir con la variable de entorno VITE_WHATSAPP_NUMBER (ver .env.example).
 */
export const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || "56941706406").replace(/\D/g, "");

export const WHATSAPP_MESSAGE =
  "Hola MediSimple, quiero saber más sobre cómo pueden ayudar a mi consulta o clínica.";

export const WISTIA_MEDIA_ID = "cha4s3l3zq";

export const CONTACT_EMAIL = "contacto@getmedisimple.com";

export const LEGAL_LINKS = [
  { label: "Términos y Condiciones", href: `${SITE_URL}/terminos` },
  { label: "Política de Privacidad", href: `${SITE_URL}/privacidad` },
  { label: "Política de Reembolsos", href: `${SITE_URL}/reembolsos` },
];

export const CLIENT_LOGOS = [
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafdc649f7fe117ab8ce96.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafdc6357b4e3bfd8e50f4.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafdc610510f8db213f2d9.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafdc68c44373ee2cf9cf9.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafdc62a25a164d02ef5eb.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafdc62a25a1acb22ef5f5.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafdc61d8e8638feedbb97.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafdc61d8e866673edbb98.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/68cafe5f8c4437526ccfb328.png", width: 500, height: 500 },
  { src: "https://storage.googleapis.com/msgsndr/fYP5vfIsftUCUDfZOvjM/media/696e4d5615885e5fd0ba797b.png", width: 2259, height: 1531 },
];
