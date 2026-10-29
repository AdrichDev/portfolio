import { useSyncExternalStore } from "react";

export const LANGUAGES = ["es", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];

const STORAGE_KEY = "portfolio.lang";
const listeners = new Set<() => void>();
let current: Lang | null = null;

function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

/**
 * First visit: the browser language decides (Spanish for any `es-*`, English
 * otherwise). After that the visitor's explicit choice wins. Storage can throw
 * in private windows, so every access is guarded and the page still works.
 */
function detect(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

function getSnapshot(): Lang {
  current ??= detect();
  return current;
}

/** The static export is rendered in Spanish; the client switches after hydration. */
function getServerSnapshot(): Lang {
  return "es";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setLanguage(lang: Lang) {
  current = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  listeners.forEach((listener) => listener());
}

export function useLanguage(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
