"use client";

import { PROJECTS } from "@/modules/projects/projects";
import { useLanguage } from "@/shared/i18n/language";
import { MESSAGES } from "@/shared/i18n/messages";
import { ArcadeSection } from "@/shared/ui/arcade-section";
import type { AccentTone } from "@/shared/ui/accent-tone";

import { ProjectCard } from "./project-card";

/** Rotates the accent per card so the grid reads as a Neo Geo game select. */
const CARD_TONES: readonly AccentTone[] = ["cyan", "magenta", "amber"];

export function ProjectsSection() {
  const lang = useLanguage();
  const t = MESSAGES[lang].projects;
  return (
    <ArcadeSection
      id="projects"
      kicker={t.kicker}
      title={t.title}
      tone="amber"
    >
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS[lang].map((project, index) => (
          <li key={project.repo} className="flex">
            <ProjectCard
              project={project}
              tone={CARD_TONES[index % CARD_TONES.length]}
              pinnedLabel={t.pinned}
              codeLabel={t.viewCode}
            />
          </li>
        ))}
      </ul>
    </ArcadeSection>
  );
}
