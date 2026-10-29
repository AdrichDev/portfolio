import type { Lang } from "@/shared/i18n/language";
import type { TimelineEntry } from "@/shared/types/timeline";

/**
 * Real work history, newest first, in every supported language.
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
      id: "excelia",
      period: "02/2026 – 06/2026",
      title: "Software Developer",
      subtitle: "EXCELIA · Contrato de prácticas",
      location: "Pozuelo de Alarcón, Madrid, España",
      bullets: [
        "Análisis, desarrollo y mejora de aplicaciones web para la gestión de imputación de horas.",
        "Desarrollo frontend con React, Next.js, TypeScript y Tailwind CSS, centrado en la experiencia de usuario.",
        "Integración con Power Apps, Power Pages, Dataverse y Power Automate, junto a Navision y Business Central.",
        "Backend: lógica de negocio, flujos de aprobación, automatizaciones con Jobs y Crons y colas con RabbitMQ.",
        "Metodologías ágiles (Scrum y Kanban), gestión y automatización de tareas en Jira y comunicación en Teams.",
        "Uso supervisado y orquestado de IA en el ciclo de vida del software (GPT, Claude, Gemini, agentes, workflows y SDD).",
      ],
    },
    {
      id: "domusvi",
      period: "02/2023 – 04/2024",
      title: "Trabajador Social · Coordinador",
      subtitle: "DOMUSVI (SAD Ayto. de Madrid)",
      location: "Madrid, España",
      bullets: [
        "Coordinación y gestión eficiente de urgencias e incidencias.",
        "Liderazgo y supervisión de equipos, impulsando un clima de trabajo colaborativo.",
        "Elaboración y control de cuadrantes, fomentando la conciliación.",
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
        "Orientación y asesoramiento sobre recursos públicos y privados dirigidos a personas mayores.",
        "Coordinación y supervisión de entidades colaboradoras, y trabajo conjunto con servicios sociales y otras entidades públicas.",
        "Gestión de base de datos y herramientas de CRM, optimizando procesos y mejorando la experiencia de los usuarios.",
      ],
    },
  ],
  en: [
    {
      id: "excelia",
      period: "02/2026 – 06/2026",
      title: "Software Developer",
      subtitle: "EXCELIA · Internship",
      location: "Pozuelo de Alarcón, Madrid, Spain",
      bullets: [
        "Analysis, development and improvement of web applications for time-tracking management.",
        "Frontend development with React, Next.js, TypeScript and Tailwind CSS, focused on user experience.",
        "Integration with Power Apps, Power Pages, Dataverse and Power Automate, alongside Navision and Business Central.",
        "Backend: business logic, approval flows, automations with Jobs and Crons, and queues with RabbitMQ.",
        "Agile methodologies (Scrum and Kanban), task management and automation in Jira, and communication in Teams.",
        "Supervised, orchestrated use of AI across the software lifecycle (GPT, Claude, Gemini, agents, workflows and SDD).",
      ],
    },
    {
      id: "domusvi",
      period: "02/2023 – 04/2024",
      title: "Social Worker · Coordinator",
      subtitle: "DOMUSVI (Madrid City Council home care)",
      location: "Madrid, Spain",
      bullets: [
        "Efficient coordination and handling of emergencies and incidents.",
        "Team leadership and supervision, fostering a collaborative work environment.",
        "Preparing and managing staff rotas, supporting work-life balance.",
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
        "Guidance and advice on public and private resources for older people.",
        "Coordination and supervision of partner organisations, working jointly with social services and other public bodies.",
        "Database and CRM tool management, optimising processes and improving the user experience.",
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
      title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
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
      title: "Higher Technical Diploma in Cross-Platform Application Development",
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
