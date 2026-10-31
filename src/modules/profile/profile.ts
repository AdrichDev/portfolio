import type { Lang } from "@/shared/i18n/language";
import type { ContactLink, Profile, SkillGroup } from "@/shared/types/profile";

/**
 * The owner's real identity and bio, in every supported language.
 * Source: the Full Stack and QA versions of the CV (October 2026).
 *
 * Privacy note: the source CV also lists a personal phone number. It is
 * intentionally absent from this file and from the whole repository — a phone
 * number on a public page is scraped within days and cannot be withdrawn.
 * Email and LinkedIn are the only contact channels published here.
 */
const CONTACTS: readonly ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/AdrichDev",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adrichdev/",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:achozas9@gmail.com",
    external: false,
  },
];

const IDENTITY = {
  name: "Adrián Chozas Vinuesa",
  handle: "AdrichDev",
  contacts: CONTACTS,
} as const;

export const PROFILES: Record<Lang, Profile> = {
  es: {
    ...IDENTITY,
    role: "Desarrollador Full Stack",
    location: "Madrid, España",
    tagline:
      "Nueva partida, la misma misión: llevo más de 12 años resolviendo problemas de personas. Ahora también lo hago desarrollando software.",
    portrait: {
      src: "/adrian-chozas.jpg",
      alt: "Fotografía de perfil de Adrián Chozas Vinuesa, desarrollador Full Stack.",
      size: 1024,
    },
    bio: [
      "Desarrollador Full Stack con experiencia en React, Next.js, TypeScript, Java, Python y SQL. Me especializo en integrar y orquestar agentes de IA con herramientas como Gentle-AI y enfoques SDD y ODD, diseñando flujos multiagente que cubren todo el ciclo de desarrollo: requisitos, arquitectura, implementación, testing y despliegue.",
      "La calidad forma parte de mi forma de trabajar. En EXCELIA participé en la migración y el desarrollo de dos aplicaciones de imputación de horas que hoy están en producción, con React, Next.js, Node.js y Power Platform, y además diseñé pruebas funcionales y automaticé flujos E2E con Cypress y Cucumber (BDD). En mis proyectos propios cubro el código con tests unitarios y end-to-end con Vitest y Playwright.",
      "Antes del software fui Trabajador Social durante más de 12 años, coordinando equipos de hasta 60 profesionales y resolviendo incidencias complejas bajo presión. De esa etapa traigo lo que más valoro: por mucha tecnología que utilicemos, al otro lado siempre hay una persona. Por eso escucho antes de construir y resuelvo los problemas en cuanto aparecen.",
      "Terminé el Grado Superior en Desarrollo de Aplicaciones Multiplataforma en junio de 2026 y curso un Máster en Desarrollo con Inteligencia Artificial. Alegre, entusiasta y en formación constante.",
    ],
  },
  en: {
    ...IDENTITY,
    role: "Full Stack Developer",
    location: "Madrid, Spain",
    tagline:
      "New game, same mission: I have spent more than 12 years solving people's problems. Now I also do it by building software.",
    portrait: {
      src: "/adrian-chozas.jpg",
      alt: "Profile photo of Adrián Chozas Vinuesa, Full Stack developer.",
      size: 1024,
    },
    bio: [
      "Full Stack developer with experience in React, Next.js, TypeScript, Java, Python and SQL. I specialise in integrating and orchestrating AI agents with tools such as Gentle-AI and SDD and ODD approaches, designing multi-agent workflows that cover the whole development cycle: requirements, architecture, implementation, testing and deployment.",
      "Quality is part of the way I work. At EXCELIA I took part in migrating and building two time-tracking applications that are now in production, using React, Next.js, Node.js and Power Platform, and I also designed functional tests and automated E2E flows with Cypress and Cucumber (BDD). In my own projects I cover the code with unit and end-to-end tests using Vitest and Playwright.",
      "Before software I was a social worker for more than 12 years, coordinating teams of up to 60 professionals and solving complex incidents under pressure. From that stage I bring what I value most: however much technology we use, there is always a person on the other side. That is why I listen before building and solve problems as soon as they appear.",
      "I completed the Higher Technical Diploma in Cross-Platform Application Development in June 2026 and I am studying a Master's in Development with Artificial Intelligence. Cheerful, enthusiastic and always learning.",
    ],
  },
};

/** Default (Spanish) profile, used by server-rendered metadata. */
export const PROFILE: Profile = PROFILES.es;

/** Short facts for the player card. Kept to what the CV actually states. */
export const PROFILE_FACTS: Record<Lang, readonly { label: string; value: string }[]> = {
  es: [
    { label: "Rol", value: "Desarrollador Full Stack · QA" },
    { label: "Ubicación", value: PROFILES.es.location },
    { label: "Idiomas", value: "Español · Inglés B2" },
    { label: "Movilidad", value: "Carnet B · Vehículo propio" },
  ],
  en: [
    { label: "Role", value: "Full Stack Developer · QA" },
    { label: "Location", value: PROFILES.en.location },
    { label: "Languages", value: "Spanish · English B2" },
    { label: "Mobility", value: "Driving licence · Own car" },
  ],
};

const SKILL_ITEMS = {
  development: ["TypeScript", "React", "Next.js", "Vue", "Node.js", "Express", "Java", "Spring Boot", "Python", "FastAPI", "Tailwind CSS"],
  data: ["SQL", "PostgreSQL", "MySQL", "Supabase", "Prisma", "pgvector", "RabbitMQ", "Microsoft Power Platform", "Docker"],
  qa: ["Vitest", "Playwright", "Cypress", "Cucumber (BDD)", "Postman", "API REST", "E2E", "Regression"],
  ai: ["Claude Code", "Codex", "OpenCode", "Gentle-AI", "MCPs", "n8n", "RAG"],
  workflow: ["Git", "Bitbucket", "Jira", "Scrum", "Kanban", "SDD", "TDD", "ODD", "Warp"],
} as const;

const SKILL_TITLES: Record<Lang, Record<keyof typeof SKILL_ITEMS, string>> = {
  es: { development: "Desarrollo", data: "Datos y plataformas", qa: "Testing y QA", ai: "IA y automatización", workflow: "Metodologías y herramientas" },
  en: { development: "Development", data: "Data & platforms", qa: "Testing & QA", ai: "AI & automation", workflow: "Methods & tools" },
};

/** The few labels that read differently per language; everything else is a proper noun. */
const SKILL_LABELS: Record<Lang, Partial<Record<string, string>>> = {
  es: { Regression: "Regresión" },
  en: {},
};

function skillGroups(lang: Lang): SkillGroup[] {
  return (Object.keys(SKILL_ITEMS) as (keyof typeof SKILL_ITEMS)[]).map((id) => ({
    id,
    title: SKILL_TITLES[lang][id],
    items: SKILL_ITEMS[id].map((item) => SKILL_LABELS[lang][item] ?? item),
  }));
}

/** Technical inventory, grouped for the compact player card. */
export const SKILL_GROUPS: Record<Lang, readonly SkillGroup[]> = {
  es: skillGroups("es"),
  en: skillGroups("en"),
};

/** Selected interpersonal strengths, expressed as concise keywords. */
export const SOFT_SKILLS: Record<Lang, readonly string[]> = {
  es: [
    "Comunicación",
    "Empatía profesional",
    "Liderazgo de equipos",
    "Pensamiento analítico",
    "Resolución de conflictos",
    "Adaptabilidad",
    "Aprendizaje continuo",
    "Orientación a resultados",
  ],
  en: [
    "Communication",
    "Professional empathy",
    "Team leadership",
    "Analytical thinking",
    "Conflict resolution",
    "Adaptability",
    "Continuous learning",
    "Results-driven",
  ],
};
