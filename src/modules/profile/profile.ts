import type { Profile, SkillGroup } from "@/shared/types/profile";

/**
 * The owner's real identity and bio.
 *
 * Privacy note: the source CV also lists a personal phone number. It is
 * intentionally absent from this file and from the whole repository — a phone
 * number on a public page is scraped within days and cannot be withdrawn.
 * Email and LinkedIn are the only contact channels published here.
 */
export const PROFILE: Profile = {
  name: "Adrián Chozas Vinuesa",
  handle: "AdrichDev",
  role: "Desarrollador de Aplicaciones Multiplataforma",
  location: "Madrid, España",
  tagline:
    "Del trabajo social al desarrollo de software: más de doce años coordinando equipos y servicios de atención a personas mayores, ahora aplicados a construir aplicaciones web.",
  portrait: {
    src: "/adrian-chozas.jpg",
    alt: "Fotografía de perfil de Adrián Chozas Vinuesa, desarrollador de aplicaciones multiplataforma.",
    size: 1024,
  },
  bio: [
    "Trabajador Social durante más de doce años y hoy desarrollador de aplicaciones multiplataforma. Coordiné equipos y servicios de atención a personas mayores antes de dedicarme al software, y esa etapa sigue marcando mi forma de trabajar: escuchar antes de construir, entender a quién va dirigido cada producto y resolver los conflictos en cuanto aparecen.",
    "Terminé el Grado Superior en Desarrollo de Aplicaciones Multiplataforma en junio de 2026 y actualmente curso un Máster en Desarrollo con Inteligencia Artificial. Entre medias trabajé como Junior Software Developer en EXCELIA, desarrollando aplicaciones web con React, Next.js, TypeScript y Tailwind CSS, además de integraciones con Power Platform, Navision y Business Central.",
    "Alegre, entusiasta y apasionado por lo que hago. Me mantengo en formación constante, valoro profundamente el buen uso del tiempo y la eficiencia, y creo que un entorno positivo y la pasión por lo que uno hace marcan la diferencia.",
  ],
  contacts: [
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
  ],
};

/** Short facts for the player card. Kept to labels the CV actually states. */
export const PROFILE_FACTS: readonly { label: string; value: string }[] = [
  { label: "Rol", value: PROFILE.role },
  { label: "Ubicación", value: PROFILE.location },
  { label: "Idiomas", value: "Español · Inglés B1 (Cambridge Certificate)" },
];

/**
 * Split into two panels on purpose: a single 30-item chip cloud is a wall, and
 * "what I build with" answers a different question than "what I work in".
 */
export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: "languages-frameworks",
    title: "Lenguajes y frameworks",
    items: [
      "Java",
      "Swing",
      "Maven",
      "Hibernate",
      "Python",
      "Kotlin",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "SQL",
      "MySQL",
      "RabbitMQ",
    ],
  },
  {
    id: "tools-platforms",
    title: "Herramientas y plataformas",
    items: [
      "Git",
      "Jira",
      "Power Apps",
      "Power Pages",
      "Dataverse",
      "Power Automate",
      "Navision",
      "Business Central",
      "Eclipse",
      "IntelliJ",
      "VS Code",
      "PyCharm",
      "SQL Developer",
      "VirtualBox",
      "n8n",
      "Claude Code",
      "Codex",
      "NotebookLM",
      "Firebase Studio",
    ],
  },
];

/** Full sentences from the CV, so these render as a list rather than chips. */
export const SOFT_SKILLS: readonly string[] = [
  "Excelentes habilidades comunicativas y empatía profesional.",
  "Liderazgo y coordinación de equipos multidisciplinares.",
  "Pensamiento analítico y resolución de conflictos.",
  "Facilidad de adaptación a nuevos entornos.",
  "Creatividad, proactividad y aprendizaje continuo.",
  "Orientación a resultados y compromiso con la eficiencia.",
  "Metodologías ágiles (Scrum y Kanban).",
];
