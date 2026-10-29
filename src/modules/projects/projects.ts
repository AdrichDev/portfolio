import type { Lang } from "@/shared/i18n/language";
import type { ProjectSummary } from "@/shared/types/project";

const GITHUB_OWNER_URL = "https://github.com/AdrichDev";

/** Pinned repositories verified against the public profile on 2026-09-15. */
const PROJECT_SEEDS: readonly { repo: string; language: string; description: Record<Lang, string> }[] = [
  { repo: "agents-agency", language: "TypeScript", description: { es: "Agencia de desarrollo de agentes de inteligencia artificial.", en: "Agency for building artificial intelligence agents." } },
  { repo: "crm_creator", language: "TypeScript", description: { es: "Creador de CRM.", en: "CRM builder." } },
  { repo: "gru_orchestrator", language: "TypeScript", description: { es: "Orquestador de agentes y workflows.", en: "Agent and workflow orchestrator." } },
  { repo: "nexus", language: "Python", description: { es: "Asistente personal tipo Jarvis.", en: "Jarvis-style personal assistant." } },
  { repo: "NumerosLoteria", language: "Java", description: { es: "Generador de números aleatorios de lotería.", en: "Random lottery number generator." } },
  { repo: "portfolio", language: "TypeScript", description: { es: "Este portfolio retro: una aventura construida con Next.js, React y Tailwind CSS.", en: "This retro portfolio: an adventure built with Next.js, React and Tailwind CSS." } },
];

function projects(lang: Lang): ProjectSummary[] {
  return PROJECT_SEEDS.map((seed) => ({
    repo: seed.repo,
    language: seed.language,
    description: seed.description[lang],
    repoUrl: `${GITHUB_OWNER_URL}/${seed.repo}`,
  }));
}

export const PROJECTS: Record<Lang, readonly ProjectSummary[]> = {
  es: projects("es"),
  en: projects("en"),
};
