import type { Lang } from "@/shared/i18n/language";
import type { TimelineEntry } from "@/shared/types/timeline";

/**
 * Real work history, newest first, in every supported language.
 * Source: the Full Stack and QA versions of the CV (October 2026), merged.
 *
 * Layout constraint on `period`: it renders in Press Start 2P, which is
 * strictly monospaced at a 1em advance, inside a `sm:w-48` (192px) column at
 * `text-[0.55rem]` with `tracking-[0.2em]` — that is 8.8px x 1.2 = 10.56px per
 * character, so the budget is 18 characters. "10/2025 – Hoy" instead of
 * "Actualmente" is that budget, not a stylistic whim.
 */
export const WORK_TIMELINE: Record<Lang, readonly TimelineEntry[]> = {
  es: [
    {
      id: "freelance",
      period: "01/2025 – Hoy",
      title: "Desarrollador Full Stack y QA",
      subtitle: "Freelance · Clientes y proyectos propios",
      location: "Madrid, España",
      bullets: [
        "Agents Agency: plataforma de agentes de IA con Next.js, Prisma, PostgreSQL y Supabase, desplegada en Vercel y Render. Tests de backend con Vitest.",
        "CRM Studio: CRM modular para distintos negocios con Next.js, Express, Prisma y PostgreSQL sobre Supabase. Tests E2E con Playwright de autenticación, navegación y gestión de clientes.",
        "Web Noel Martín: web profesional de un ciclista olímpico con React 19 y Tailwind CSS v4 en Cloudflare Workers, validada en responsive y entre dispositivos.",
        "Gru Orchestrator: orquestador de agentes de IA en TypeScript, Python y Node.js, con tests unitarios de clasificación de tareas, riesgos y casos límite.",
        "Nexus: asistente personal con IA y arquitectura RAG (Python/FastAPI, PostgreSQL, pgvector y embeddings), con tests unitarios y end-to-end.",
      ],
    },
    {
      id: "excelia",
      period: "02/2026 – 06/2026",
      title: "Desarrollador Full Stack y QA",
      subtitle: "EXCELIA · Contrato de prácticas",
      location: "Pozuelo de Alarcón, Madrid, España",
      bullets: [
        "Migración y desarrollo de dos aplicaciones web de imputación de horas y proyectos que hoy están en producción.",
        "Frontend con React, Next.js, TypeScript y Tailwind CSS; backend con Node.js, Express, Prisma ORM y PostgreSQL.",
        "Integración con Power Apps, Power Pages, Dataverse Web API y Power Automate, junto a Navision y Business Central.",
        "Automatizaciones con Jobs y Crons, y procesos asíncronos con RabbitMQ.",
        "Diseño y ejecución de pruebas funcionales y validación de la integridad de los datos durante la migración.",
        "Automatización de pruebas E2E con Cypress y escenarios BDD con Cucumber sobre los criterios de aceptación.",
        "Orquestación de agentes de IA en el ciclo de vida del software: tickets en Jira, SDD, ODD y versionado en Bitbucket.",
      ],
    },
    {
      id: "domusvi",
      period: "02/2023 – 04/2024",
      title: "Trabajador Social · Coordinador",
      subtitle: "DOMUSVI (SAD Ayto. de Madrid)",
      location: "Madrid, España",
      bullets: [
        "Liderazgo de un equipo de 60 profesionales y gestión integral de incidencias críticas.",
        "Planificación y optimización de recursos mediante cuadrantes y turnos del personal.",
        "Coordinación con entidades públicas para la correcta implementación de los servicios.",
      ],
    },
    {
      id: "essip-mundomayor",
      period: "01/2012 – 06/2022",
      title: "Trabajador Social · Coordinador, orientador y asesor",
      subtitle: "ESSIP – MUNDOMAYOR",
      location: "Madrid, España",
      bullets: [
        "Asesoramiento sobre recursos públicos y privados para personas mayores.",
        "Coordinación interinstitucional con entidades públicas y resolución de situaciones complejas bajo presión.",
        "Gestión de base de datos y herramientas de CRM, optimizando procesos y la experiencia de los usuarios.",
      ],
    },
  ],
  en: [
    {
      id: "freelance",
      period: "01/2025 – Now",
      title: "Full Stack Developer & QA",
      subtitle: "Freelance · Clients and own projects",
      location: "Madrid, Spain",
      bullets: [
        "Agents Agency: AI agent platform built with Next.js, Prisma, PostgreSQL and Supabase, deployed on Vercel and Render. Backend tests with Vitest.",
        "CRM Studio: modular CRM for different businesses with Next.js, Express, Prisma and PostgreSQL on Supabase. Playwright E2E tests for authentication, navigation and client management.",
        "Web Noel Martín: professional website for an Olympic cyclist with React 19 and Tailwind CSS v4 on Cloudflare Workers, validated for responsive design and across devices.",
        "Gru Orchestrator: AI agent orchestrator in TypeScript, Python and Node.js, with unit tests for task classification, risk assessment and edge cases.",
        "Nexus: AI personal assistant with a RAG architecture (Python/FastAPI, PostgreSQL, pgvector and embeddings), with unit and end-to-end tests.",
      ],
    },
    {
      id: "excelia",
      period: "02/2026 – 06/2026",
      title: "Full Stack Developer & QA",
      subtitle: "EXCELIA · Internship",
      location: "Pozuelo de Alarcón, Madrid, Spain",
      bullets: [
        "Migration and development of two time-tracking and project management web applications that are now in production.",
        "Frontend with React, Next.js, TypeScript and Tailwind CSS; backend with Node.js, Express, Prisma ORM and PostgreSQL.",
        "Integration with Power Apps, Power Pages, Dataverse Web API and Power Automate, alongside Navision and Business Central.",
        "Automations with Jobs and Crons, and asynchronous processes with RabbitMQ.",
        "Design and execution of functional tests and data integrity validation during the migration.",
        "E2E test automation with Cypress and BDD scenarios with Cucumber based on acceptance criteria.",
        "AI agent orchestration across the software lifecycle: Jira tickets, SDD, ODD and versioning in Bitbucket.",
      ],
    },
    {
      id: "domusvi",
      period: "02/2023 – 04/2024",
      title: "Social Worker · Coordinator",
      subtitle: "DOMUSVI (Madrid City Council home care)",
      location: "Madrid, Spain",
      bullets: [
        "Led a team of 60 professionals and handled critical incidents end to end.",
        "Resource planning and optimisation through staff rotas and shift scheduling.",
        "Coordination with public bodies to ensure services were delivered correctly.",
      ],
    },
    {
      id: "essip-mundomayor",
      period: "01/2012 – 06/2022",
      title: "Social Worker · Coordinator, counsellor and advisor",
      subtitle: "ESSIP – MUNDOMAYOR",
      location: "Madrid, Spain",
      bullets: [
        "Advice on public and private resources for older people.",
        "Inter-agency coordination with public bodies and handling complex situations under pressure.",
        "Database and CRM tool management, optimising processes and the user experience.",
      ],
    },
  ],
};

/** Academic record, newest first. Only the master's degree is in progress. */
export const EDUCATION_TIMELINE: Record<Lang, readonly TimelineEntry[]> = {
  es: [
    {
      id: "master-ia",
      period: "10/2025 – Hoy",
      title: "Máster en Desarrollo con Inteligencia Artificial",
      subtitle: "Big School",
      location: "Madrid, España",
    },
    {
      id: "dam",
      period: "09/2024 – 06/2026",
      title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)",
      subtitle: "FP Tech Hub Euroformac",
      location: "Madrid, España",
    },
    {
      id: "trabajo-social",
      period: "09/2007 – 06/2011",
      title: "Graduado en Trabajo Social",
      subtitle: "Universidad Complutense de Madrid",
      location: "Madrid, España",
    },
  ],
  en: [
    {
      id: "master-ia",
      period: "10/2025 – Now",
      title: "Master's in Development with Artificial Intelligence",
      subtitle: "Big School",
      location: "Madrid, Spain",
    },
    {
      id: "dam",
      period: "09/2024 – 06/2026",
      title: "Higher Technical Diploma in Cross-Platform Application Development (DAM)",
      subtitle: "FP Tech Hub Euroformac",
      location: "Madrid, Spain",
    },
    {
      id: "trabajo-social",
      period: "09/2007 – 06/2011",
      title: "Bachelor's Degree in Social Work",
      subtitle: "Complutense University of Madrid",
      location: "Madrid, Spain",
    },
  ],
};
