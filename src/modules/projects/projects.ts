import type { Lang } from "@/shared/i18n/language";
import type { ProjectSummary } from "@/shared/types/project";

const GITHUB_OWNER_URL = "https://github.com/AdrichDev";

/** Pinned repositories verified against the public profile on 2026-09-15. Descriptions follow the CV. */
const PROJECT_SEEDS: readonly { repo: string; language: string; description: Record<Lang, string> }[] = [
  { repo: "agents-agency", language: "TypeScript", description: {
    es: "Plataforma de agentes de IA con Next.js, Prisma, PostgreSQL y Supabase, desplegada en Vercel y Render.",
    en: "AI agent platform with Next.js, Prisma, PostgreSQL and Supabase, deployed on Vercel and Render." } },
  { repo: "crm_creator", language: "TypeScript", description: {
    es: "CRM Studio: CRM modular para distintos negocios con Next.js, Express y Prisma, con tests E2E en Playwright.",
    en: "CRM Studio: modular CRM for different businesses with Next.js, Express and Prisma, with Playwright E2E tests." } },
  { repo: "gru_orchestrator", language: "TypeScript", description: {
    es: "Orquestador de agentes de IA en TypeScript, Python y Node.js, con tests unitarios en Vitest.",
    en: "AI agent orchestrator in TypeScript, Python and Node.js, with Vitest unit tests." } },
  { repo: "nexus", language: "Python", description: {
    es: "Asistente personal con IA y arquitectura RAG: FastAPI, PostgreSQL, pgvector y búsqueda semántica.",
    en: "AI personal assistant with a RAG architecture: FastAPI, PostgreSQL, pgvector and semantic search." } },
  { repo: "NumerosLoteria", language: "Java", description: {
    es: "Generador de números aleatorios de lotería.",
    en: "Random lottery number generator." } },
  { repo: "portfolio", language: "TypeScript", description: {
    es: "Este portfolio retro y bilingüe: una aventura construida con Next.js, React y Tailwind CSS.",
    en: "This bilingual retro portfolio: an adventure built with Next.js, React and Tailwind CSS." } },
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
