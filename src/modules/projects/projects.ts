import type { ProjectSummary } from "@/shared/types/project";

/** Every repository below lives under this account. */
const GITHUB_OWNER_URL = "https://github.com/AdrichDev";

/** The repository list minus the URL the owner name already determines. */
type ProjectSeed = Omit<ProjectSummary, "repoUrl">;

/**
 * Real repositories from github.com/AdrichDev, ordered by how well they
 * represent current work. The two Java entries are earlier pieces and are kept
 * because they are part of the record; the ordering says the rest.
 */
const PROJECT_SEEDS: readonly ProjectSeed[] = [
  {
    repo: "agents-agency",
    description:
      "Agencia para el desarrollo de agentes de inteligencia artificial.",
    language: "TypeScript",
    demoUrl: "https://agents-agency-mauve.vercel.app",
  },
  {
    repo: "crm_creator",
    description: "Herramienta para la creación de CRM a medida.",
    language: "TypeScript",
    demoUrl: "https://operaos-black.vercel.app",
  },
  {
    repo: "gru_orchestrator",
    description: "Orquestador de agentes y flujos de trabajo.",
    language: "TypeScript",
  },
  {
    repo: "nexus",
    description: "Asistente personal inspirado en Jarvis.",
    language: "Python",
  },
  {
    repo: "vybe-ai-google_studio",
    description:
      "Aplicación de inteligencia artificial construida con Google AI Studio.",
    language: "TypeScript",
  },
  {
    repo: "Juego_Del_Ahorcado",
    description: "Implementación del clásico juego del ahorcado.",
    language: "Java",
  },
  {
    repo: "NumerosLoteria",
    description: "Generador de números aleatorios para sorteos de lotería.",
    language: "Java",
  },
];

/**
 * Derived rather than hand-written so the owner URL exists exactly once; a
 * typo in one of seven pasted links is the kind of bug nothing here would
 * catch.
 */
export const PROJECTS: readonly ProjectSummary[] = PROJECT_SEEDS.map(
  (seed) => ({ ...seed, repoUrl: `${GITHUB_OWNER_URL}/${seed.repo}` }),
);
