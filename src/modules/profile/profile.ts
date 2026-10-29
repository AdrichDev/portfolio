import type { Lang } from "@/shared/i18n/language";
import type { ContactLink, Profile, SkillGroup } from "@/shared/types/profile";

/**
 * The owner's real identity and bio, in every supported language.
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
    href: "https://www.linkedin.com/in/adrichv/",
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
  role: "Software Developer",
  contacts: CONTACTS,
} as const;

export const PROFILES: Record<Lang, Profile> = {
  es: {
    ...IDENTITY,
    location: "Madrid, España",
    tagline:
      "Nueva partida. La misma misión: ayudar a resolver problemas a las personas. Tras más de 12 años en trabajo social, ahora construyo mi camino en el software.",
    portrait: {
      src: "/adrian-chozas.jpg",
      alt: "Fotografía de perfil de Adrián Chozas Vinuesa, desarrollador de aplicaciones multiplataforma.",
      size: 1024,
    },
    bio: [
      "Trabajador Social durante más de 12 años y hoy desarrollador de aplicaciones multiplataforma. Coordiné equipos y servicios de atención a personas mayores antes de dedicarme al software, y esa etapa sigue marcando mi forma de trabajar: escuchar antes de construir, entender a quién va dirigido cada producto y resolver los conflictos en cuanto aparecen.",
      "Terminé el Grado Superior en Desarrollo de Aplicaciones Multiplataforma en junio de 2026 y actualmente curso un Máster en Desarrollo con Inteligencia Artificial. Entre medias trabajé como Software Developer en prácticas en EXCELIA, desarrollando aplicaciones web con React, Next.js, TypeScript y Tailwind CSS, además de integraciones con Power Platform, Navision y Business Central.",
      "Alegre, entusiasta y apasionado por lo que hago. Me mantengo en formación constante, valoro profundamente el buen uso del tiempo y la eficiencia, y creo que un entorno positivo y la pasión por lo que uno hace marcan la diferencia.",
    ],
  },
  en: {
    ...IDENTITY,
    location: "Madrid, Spain",
    tagline:
      "New game. Same mission: helping people solve their problems. After more than 12 years in social work, I am now building my path in software.",
    portrait: {
      src: "/adrian-chozas.jpg",
      alt: "Profile photo of Adrián Chozas Vinuesa, cross-platform application developer.",
      size: 1024,
    },
    bio: [
      "Social worker for more than 12 years and now a cross-platform application developer. I coordinated teams and care services for older people before moving into software, and that stage still shapes the way I work: listening before building, understanding who each product is for and solving conflicts as soon as they appear.",
      "I completed the Higher Technical Diploma in Cross-Platform Application Development in June 2026 and I am currently studying a Master's in Development with Artificial Intelligence. In between, I worked as a Software Developer intern at EXCELIA, building web applications with React, Next.js, TypeScript and Tailwind CSS, plus integrations with Power Platform, Navision and Business Central.",
      "Cheerful, enthusiastic and passionate about what I do. I keep learning all the time, I deeply value making good use of time and working efficiently, and I believe a positive environment and passion for your work make all the difference.",
    ],
  },
};

/** Default (Spanish) profile, used by server-rendered metadata. */
export const PROFILE: Profile = PROFILES.es;

/** Short facts for the player card. Kept to labels the CV actually states. */
export const PROFILE_FACTS: Record<Lang, readonly { label: string; value: string }[]> = {
  es: [
    { label: "Rol", value: PROFILES.es.role },
    { label: "Ubicación", value: PROFILES.es.location },
    { label: "Idiomas", value: "Español · Inglés B1 (Cambridge Certificate)" },
  ],
  en: [
    { label: "Role", value: PROFILES.en.role },
    { label: "Location", value: PROFILES.en.location },
    { label: "Languages", value: "Spanish · English B1 (Cambridge Certificate)" },
  ],
};

const SKILL_ITEMS = {
  "languages-frameworks": ["Java", "Python", "Kotlin", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML", "CSS", "Maven"],
  "data-platforms": ["SQL", "MySQL", "Supabase", "Microsoft Power Platform", "Docker", "n8n"],
  "ai-workflows": ["Claude Code", "Codex", "OpenCode", "SDD", "MCPs", "GentleAI", "Playwright E2E", "NotebookLM"],
  tools: ["Git", "Jira", "IntelliJ", "VS Code", "Antigravity", "Warp", "SQL Developer", "VirtualBox"],
} as const;

const SKILL_TITLES: Record<Lang, Record<keyof typeof SKILL_ITEMS, string>> = {
  es: { "languages-frameworks": "Desarrollo", "data-platforms": "Datos y plataformas", "ai-workflows": "IA y calidad", tools: "Herramientas" },
  en: { "languages-frameworks": "Development", "data-platforms": "Data & platforms", "ai-workflows": "AI & quality", tools: "Tools" },
};

function skillGroups(lang: Lang): SkillGroup[] {
  return (Object.keys(SKILL_ITEMS) as (keyof typeof SKILL_ITEMS)[]).map((id) => ({
    id,
    title: SKILL_TITLES[lang][id],
    items: SKILL_ITEMS[id],
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
    "Habilidad comunicativa",
    "Empatía profesional",
    "Liderazgo",
    "Pensamiento analítico",
    "Adaptabilidad",
    "Aprendizaje continuo",
  ],
  en: [
    "Communication skills",
    "Professional empathy",
    "Leadership",
    "Analytical thinking",
    "Adaptability",
    "Continuous learning",
  ],
};
