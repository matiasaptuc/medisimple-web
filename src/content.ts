// Todo el texto del sitio vive aquí. Fuente: Playbook – MediSimple (Notion, sept. 2026).
// Regla del playbook: no publicar precios ni cifras de clientes sin aprobación.

export const content = {
  nav: {
    links: [
      { id: "acr", label: "Metodología" },
      { id: "process", label: "Cómo trabajamos" },
      { id: "planes", label: "Planes" },
      { id: "results", label: "Clientes" },
    ],
    cta: "Agendar sesión",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    goHome: "Ir al inicio",
  },

  hero: {
    eyebrow: "Socio de crecimiento en salud",
    h1a: "Crece en pacientes,",
    h1b: "no en likes.",
    sub: "Ayudamos a profesionales de la salud y clínicas a crecer en pacientes y facturación. Conectamos marketing, ventas y tecnología, y lo medimos con datos reales.",
    ctaPrimary: "Agendar sesión estratégica",
    ctaVideo: "Ver video",
    metrics: [
      {
        t: "Marketing, ventas y tecnología",
        d: "Un solo equipo para todo el recorrido del paciente.",
      },
      {
        t: "Conectado a tu ficha clínica",
        d: "Integramos AgendaPro, Dentalink, Medilink y Reservo.",
      },
      {
        t: "Números reales",
        d: "Del anuncio al pago registrado en tu ficha clínica.",
      },
    ],
  },

  video: {
    title: "El sistema en acción",
    sub: "Cómo conectamos anuncios, WhatsApp, recepción y ficha clínica para medir cada paciente que llega.",
  },

  problem: {
    realityTitle: "La realidad de hoy",
    realityPre: "Anuncios, WhatsApp, recepción y ficha clínica funcionan por separado y",
    realityAccent: "no conversan entre sí",
    nodes: {
      ads: "Meta Ads / Google",
      social: "Instagram",
      whatsapp: "WhatsApp",
      reception: "Recepción y equipo",
      receptionMobileA: "Recepción",
      receptionMobileB: "y equipo",
      crm: "CRM",
      clinical: "Ficha clínica",
    },
    solutionAccent: "Conectamos y medimos",
    solutionRest: "todo el recorrido del paciente.",
    solutionSub:
      "Del primer anuncio al pago registrado en tu ficha clínica. Lo que no se mide, no escala.",
    problemsTitle: "Lo que vemos una y otra vez en consultas y clínicas",
    cards: [
      {
        t: "Contenido que no atrae pacientes",
        d: "Contenido genérico que no muestra lo que te hace distinto y atrae curiosos en vez de pacientes.",
      },
      {
        t: "Interés que no convierte",
        d: "Llegan mensajes, pero no hay un proceso claro para responder rápido, hacer seguimiento y cerrar la cita.",
      },
      {
        t: "La relación termina en la consulta",
        d: "Después de la atención no hay seguimiento: el paciente no vuelve a su control, no recomienda y no deja reseña.",
      },
      {
        t: "Métricas equivocadas",
        d: "Se mide en likes, clics y mensajes, no en pacientes ni facturación. Así cuesta saber qué funciona y dónde invertir.",
      },
      {
        t: "Herramientas desconectadas",
        d: "Anuncios, WhatsApp, Instagram, CRM y ficha clínica no conversan entre sí, y la información se pierde en el camino.",
      },
      {
        t: "Más presupuesto, mismas fugas",
        d: "Subir la inversión en anuncios sin ordenar el proceso es llenar un balde con hoyos.",
      },
    ],
    familiar: "¿Te suena familiar?",
    familiarSub: "Es justo lo que resolvemos. Primero ordenamos, después escalamos.",
  },

  process: {
    title: "Cómo trabajamos",
    sub: "Un proceso claro, con responsable y fecha en cada paso. Tu Key Account Manager coordina todo y responde por tu resultado.",
    steps: [
      {
        title: "Sesión estratégica",
        content:
          "Entendemos tu negocio, te mostramos la metodología y casos reales, y vemos juntos si somos un buen fit.",
        items: ["Videollamada 1 a 1 de 30 minutos", "Revisión de tu situación actual", "Propuesta según tu etapa"],
      },
      {
        title: "Diagnóstico ACR",
        content:
          "Evaluamos cómo atraes, conviertes y haces volver a tus pacientes, y lo convertimos en un plan de implementación con fechas.",
        items: ["Diagnóstico de adquisición, conversión y recurrencia", "Propuesta de implementación", "Estrategia de contenido"],
      },
      {
        title: "Implementación",
        content:
          "Conectamos tus canales en un CRM, integramos tu ficha clínica, configuramos el bot y capacitamos a tu equipo. Sales en vivo en pocas semanas.",
        items: ["CRM con WhatsApp, Instagram y web", "Integración con tu ficha clínica", "Bot IA y capacitación a recepción"],
      },
      {
        title: "Ciclo mensual",
        content:
          "Cada mes revisamos resultados contigo y ejecutamos: guiones, grabación, edición, campañas y campaña de recurrencia.",
        items: ["Reunión mensual de resultados", "Videos y campañas en Meta Ads", "Campaña de recurrencia por WhatsApp"],
      },
    ],
  },

  acr: {
    title: "Metodología ACR",
    sub: "Todo lo que hacemos cae en uno de tres pilares. Se repiten en consultas y clínicas de todos los tamaños.",
    pillars: [
      {
        title: "Adquisición",
        subtitle: "Que lleguen los pacientes correctos",
        desc: "Contenido que muestra lo que te hace distinto y anuncios que atraen pacientes, no curiosos.",
        items: [
          "Estrategia de contenido y guiones",
          "Grabación y edición de videos",
          "Meta Ads (y Google Ads)",
          "Reseñas de Google",
          "Landing pages y sitios web",
        ],
      },
      {
        title: "Conversión",
        subtitle: "Que el interesado se convierta en paciente",
        desc: "Un proceso comercial claro para responder rápido, hacer seguimiento y agendar.",
        items: [
          "CRM con todos tus canales en un lugar",
          "Bot IA que responde, califica y agenda",
          "Protocolos de seguimiento",
          "Capacitación a recepción y equipos",
        ],
      },
      {
        title: "Recurrencia",
        subtitle: "Que el paciente vuelva",
        desc: "La relación no termina en la consulta: controles, reactivación y recomendaciones.",
        items: [
          "Recordatorios de controles",
          "Flujos de reactivación",
          "Campañas mensuales por WhatsApp",
          "Reseñas automáticas",
        ],
      },
    ],
    quoteA: '"Lo que no se mide, no escala."',
    quoteB: "Por eso todo lo que hacemos parte por conectar y medir.",
  },

  measurement: {
    eyebrow: "Trazabilidad",
    title: "Medimos en pacientes y facturación",
    sub: "Cruzamos tres fuentes para seguir cada pago hasta el anuncio que originó al paciente. Tú y nosotros vemos los mismos números.",
    sources: [
      { t: "Inversión en anuncios", d: "Lo que se invierte en Meta y Google, campaña por campaña." },
      { t: "Leads y agendas del CRM", d: "Cada conversación, cita y asistencia, en un solo lugar." },
      { t: "Pagos en tu ficha clínica", d: "Los pagos reales registrados por tu consulta o clínica." },
    ],
    metricsTitle: "Lo que medimos",
    metrics: [
      "Pacientes nuevos",
      "Citas y asistencia",
      "Costo por agenda",
      "Venta atribuible",
      "Retorno de la inversión en anuncios (ROAS)",
    ],
    notMeasured: "No medimos el éxito en clics, likes ni visualizaciones.",
    integrationsTitle: "Software de ficha clínica que integramos",
    integrations: ["AgendaPro", "Dentalink", "Medilink", "Reservo"],
    floorNote:
      "No todo el efecto del marketing se puede medir. Lo que mostramos es un piso, no un techo.",
  },

  comparison: {
    title: "No somos una agencia más",
    sub: "Somos tu socio de crecimiento: marketing, ventas y tecnología trabajando juntos, medidos en pacientes y facturación.",
    agenciesTitle: "Agencias tradicionales",
    agencies: [
      { t: "Métricas de vanidad", d: "Reportes de seguidores, likes y clics que no muestran pacientes ni facturación." },
      { t: "Visión fragmentada", d: "Se encargan del anuncio o del video, sin conectar con recepción ni con tu ficha clínica." },
      { t: "Más presupuesto como respuesta", d: "Recomiendan invertir más sin revisar dónde se pierden los pacientes." },
      { t: "Cuentas que no son tuyas", d: "Si te cambias, partes de cero: la información queda con la agencia." },
    ],
    medisimple: [
      { t: "Números reales", d: "Medimos pacientes y facturación. Si algo no funciona, te lo decimos nosotros primero." },
      { t: "Todo el recorrido del paciente", d: "Adquisición, conversión y recurrencia en un solo sistema conectado." },
      { t: "Orden antes que escala", d: "Primero arreglamos las fugas; después recomendamos invertir más." },
      { t: "Lo construimos para que sea tuyo", d: "Las cuentas quedan a tu nombre y capacitamos a tu equipo para operar." },
    ],
    note: "¿Ya trabajas con una agencia? No tienes que cambiarla: nos coordinamos con ella.",
  },

  plans: {
    title: "Dos formas de trabajar juntos",
    sub: "Mismo equipo y misma metodología. Cambia cómo partimos según el tamaño de tu consulta o clínica.",
    options: [
      {
        name: "Growth Partner",
        audience: "Profesionales independientes y clínicas de 1 a 2 profesionales",
        desc: "Un fijo mensual más un porcentaje sobre la venta que generamos. Crecemos cuando tú creces.",
        highlights: [
          "Sin pago de implementación: partimos directo",
          "En vivo en 4 semanas",
          "Incluye un ejecutivo que llama a tus pacientes para agendar procedimientos",
        ],
        featured: true,
      },
      {
        name: "ACR + mensualidad",
        audience: "Clínicas pequeñas, medianas y grandes",
        desc: "Una implementación ACR de 8 semanas y luego una mensualidad según el tamaño de tu clínica.",
        highlights: [
          "Diagnóstico e implementación completa",
          "En vivo en la semana 6",
          "Coordinación con tu equipo y tus áreas",
        ],
        featured: false,
      },
    ],
    includesTitle: "Ambos incluyen",
    includes: [
      "CRM con WhatsApp, Instagram y web",
      "Integración con tu ficha clínica",
      "Bot IA con supervisión humana",
      "Capacitación a recepción",
      "Recordatorios y confirmaciones de citas",
      "Reseñas automáticas de Google",
      "Reunión mensual de resultados",
      "Guiones, grabación y edición de videos",
      "Manejo de campañas en Meta Ads",
      "Campaña de recurrencia por WhatsApp",
      "Trazabilidad y dashboard compartido",
      "Soporte completo del CRM",
    ],
    specialtiesTitle: "Especialidades con las que trabajamos",
    specialties: ["Estética", "Dermatología", "Dental", "Cirugía", "Capilar", "Traumatología", "Otras especialidades"],
    cta: "Ver cuál te conviene",
  },

  logos: {
    title: "Clínicas y profesionales que confían en nosotros",
    alt: "Logo de cliente",
  },

  cta: {
    h1a: "Primero ordenar.",
    h1b: "Después escalar.",
    sub: "En una sesión estratégica revisamos cómo atraes, conviertes y haces volver a tus pacientes, y te mostramos dónde se están perdiendo.",
    button: "Agendar sesión estratégica",
    note: "Sin costo y sin compromiso. Videollamada 1 a 1 de 30 minutos.",
  },

  footer: {
    tagline:
      "Socio de crecimiento para profesionales de la salud y clínicas. Marketing, ventas y tecnología, medidos en pacientes y facturación.",
    rights: "Todos los derechos reservados.",
  },

  whatsapp: {
    label: "¿Hablamos por WhatsApp?",
    aria: "Escríbenos por WhatsApp",
  },
};
