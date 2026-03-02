const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const services = [
  {
    title: 'Desarrollo de Software',
    description: 'Construimos aplicaciones web y móviles a medida con arquitectura escalable, código limpio y entregas ágiles adaptadas a tu negocio.',
    icon: 'Code2',
  },
  {
    title: 'Inteligencia Artificial',
    description: 'Agentes de IA, bases de datos vectorizadas y modelos de lenguaje integrados directamente con la data propietaria de tu empresa.',
    icon: 'Brain',
  },
  {
    title: 'Automatización de Procesos',
    description: 'Eliminamos tareas manuales repetitivas con flujos de trabajo autónomos que liberan tiempo y reducen errores operativos.',
    icon: 'Zap',
  },
  {
    title: 'Apps Móviles',
    description: 'Aplicaciones nativas e híbridas para iOS y Android con experiencias de usuario modernas, rápidas y sin fricciones.',
    icon: 'Smartphone',
  },
  {
    title: 'Transformación Digital',
    description: 'Digitalizamos operaciones completas: desde CRM y logística hasta atención al cliente, integrando todos los sistemas en un ecosistema centralizado.',
    icon: 'Globe',
  },
  {
    title: 'Analítica & Data',
    description: 'Dashboards en tiempo real, reportes automatizados y modelos de scoring que convierten tus datos en decisiones estratégicas.',
    icon: 'BarChart3',
  },
];

const projects = [
  {
    title: 'Proyecto Boost',
    category: 'Automatización & IA',
    image: '/projects/boost.png',
    description: 'Arquitectura de Agentes de IA con bases de datos vectorizadas implementada para 25 empresas simultáneamente. Automatización de procesos internos en ventas, logística, RRHH y finanzas, con consultas inteligentes basadas exclusivamente en data propietaria de cada organización.',
    link: null,
  },
  {
    title: 'Econova – Eco-Aventura',
    category: 'Gamificación Educativa',
    image: '/projects/econova.png',
    description: 'Videojuego de mundo abierto con estética pixel art desarrollado para Librero Cobre. Enseña a niños y jóvenes sobre sostenibilidad y procesos industriales a través de mecánicas de gestión, misiones educativas y una identidad visual propia.',
    link: null,
  },
  {
    title: 'Ascrudos – Ecosistema Digital',
    category: 'CRM & Automatización',
    image: '/projects/ascrudos-crm.png',
    description: 'Plataforma integral para la empresa líder en "Generación Verde" que combina CRM robusto con chatbot omnicanal. Gestión automatizada de PQRs, certificados legales y logística de residuos peligrosos bajo normativas ambientales.',
    link: null,
  },
  {
    title: 'Ascrudos – Motor de Certificaciones',
    category: 'Automatización Masiva',
    image: '/projects/ascrudos-certs.png',
    description: 'Motor de generación y envío masivo de más de 1,000 certificados ambientales diarios con procesamiento en 5 minutos. Incluye cálculo automático de huella de carbono y distribución directa al correo de cada cliente.',
    link: null,
  },
  {
    title: 'BeautyConnect',
    category: 'App Móvil & Web',
    image: '/projects/beautyconnect.png',
    description: 'Ecosistema digital 360° para la industria de la belleza: app iOS/Android para clientes con agendamiento en tiempo real, web app de gestión para negocios con control de agenda y análisis de desempeño, y landing de captación de alto impacto.',
    link: 'https://beautyapp.mainics.com/',
  },
  {
    title: 'LeadQuality',
    category: 'SaaS / IA',
    image: '/projects/leadquality.png',
    description: 'SaaS potenciado por IA que califica leads en tiempo real con score 0–100%, centraliza fuentes multicanal (Meta Ads, WhatsApp, formularios) y automatiza el envío al vendedor asignado. Permite entrenar la IA con reglas de negocio propias.',
    link: 'https://leadquality.app/',
  },
];

async function seed() {
  // Seed services
  console.log('Seeding services...');
  await prisma.service.deleteMany();
  for (const service of services) {
    await prisma.service.create({ data: service });
    console.log(`  ✓ ${service.title}`);
  }

  // Seed projects
  console.log('\nSeeding projects...');
  await prisma.project.deleteMany();
  for (const project of projects) {
    await prisma.project.create({ data: project });
    console.log(`  ✓ ${project.title}`);
  }

  console.log(`\nDone! ${services.length} services + ${projects.length} projects seeded.`);
}

seed()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
