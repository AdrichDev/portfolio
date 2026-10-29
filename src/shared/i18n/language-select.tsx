"use client";

import { useEffect } from "react";

import { setLanguage, useLanguage, type Lang } from "./language";
import { MESSAGES } from "./messages";

const OPTIONS: readonly { value: Lang; label: string; name: string }[] = [
  { value: "es", label: "ESP", name: "Español" },
  { value: "en", label: "ENG", name: "English" },
];

/** Native select: keyboard, screen readers and mobile pickers work for free. */
export function LanguageSelect() {
  const lang = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <label className="language-select">
      <span className="sr-only">{MESSAGES[lang].languageLabel}</span>
      <select value={lang} onChange={(event) => setLanguage(event.target.value as Lang)} data-language-select>
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value} lang={option.value} aria-label={option.name}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
