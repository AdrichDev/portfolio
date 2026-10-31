import { useLanguage, type Lang } from "./language";

type StageCopy = { label: string; subtitle: string };

export type Messages = {
  languageLabel: string;
  stages: Record<"about" | "experience" | "projects" | "contact", StageCopy>;
  menuTitle: string;
  menuNav: string;
  exit: string;
  menuHelper: string;
  pause: string;
  back: string;
  credits: string;
  loading: string;
  about: { kicker: string; title: string };
  experience: { kicker: string; title: string; work: string; education: string };
  projects: { kicker: string; title: string; pinned: string; viewCode: string };
  contact: { kicker: string; title: string; text: string };
  notFound: { title: string; home: string };
};

/** Interface copy. Arcade jargon (Press Start, Insert Coin, Exit…) stays in English on purpose. */
export const MESSAGES: Record<Lang, Messages> = {
  es: {
    languageLabel: "Idioma",
    stages: {
      about: { label: "Perfil", subtitle: "Conoce al jugador" },
      experience: { label: "Experiencia y formación", subtitle: "Recorre los niveles" },
      projects: { label: "Proyectos", subtitle: "Seis aventuras en código" },
      contact: { label: "Contacto", subtitle: "¿Jugamos en equipo?" },
    },
    menuTitle: "Menú principal",
    menuNav: "Secciones principales",
    exit: "Exit",
    menuHelper: "Conoce al jugador. Recorre su historia y explora su código",
    pause: "PAUSA",
    back: "Volver",
    credits: "CRÉDITOS",
    loading: "Cargando",
    about: { kicker: "Fase 01", title: "Ficha de Jugador" },
    experience: { kicker: "Fase 02", title: "Mapa de Niveles", work: "Trayectoria profesional", education: "Formación" },
    projects: { kicker: "Fase 03", title: "Selecciona Juego", pinned: "REPOSITORIO FIJADO", viewCode: "Ver código" },
    contact: {
      kicker: "Fase 04",
      title: "Modo cooperativo",
      text: "No busco únicamente un nuevo puesto de trabajo. Busco formar parte de un equipo con el que aprender, afrontar retos y aportar una perspectiva diferente, tanto técnica como humana. Me encantaría conoceros y charlar sobre vuestros proyectos.",
    },
    notFound: { title: "404 · Nivel no encontrado", home: "Volver al inicio" },
  },
  en: {
    languageLabel: "Language",
    stages: {
      about: { label: "Profile", subtitle: "Meet the player" },
      experience: { label: "Experience & education", subtitle: "Play through the levels" },
      projects: { label: "Projects", subtitle: "Six adventures in code" },
      contact: { label: "Contact", subtitle: "Shall we team up?" },
    },
    menuTitle: "Main menu",
    menuNav: "Main sections",
    exit: "Exit",
    menuHelper: "Meet the player. Walk through his story and explore his code",
    pause: "PAUSE",
    back: "Back",
    credits: "CREDITS",
    loading: "Loading",
    about: { kicker: "Stage 01", title: "Player Card" },
    experience: { kicker: "Stage 02", title: "Level Map", work: "Career path", education: "Education" },
    projects: { kicker: "Stage 03", title: "Select Game", pinned: "PINNED REPOSITORY", viewCode: "View code" },
    contact: {
      kicker: "Stage 04",
      title: "Co-op Mode",
      text: "I am not just looking for a new job. I am looking to join a team where I can learn, take on challenges and bring a different perspective, both technical and human. I would love to meet you and talk about your projects.",
    },
    notFound: { title: "404 · Level not found", home: "Back to start" },
  },
};

export function useMessages(): Messages {
  return MESSAGES[useLanguage()];
}
