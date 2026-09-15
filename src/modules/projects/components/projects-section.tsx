import { PROJECTS } from "@/modules/projects/projects";
import { ArcadeSection } from "@/shared/ui/arcade-section";
import type { AccentTone } from "@/shared/ui/accent-tone";

import { ProjectCard } from "./project-card";

/** Rotates the accent per card so the grid reads as a Neo Geo game select. */
const CARD_TONES: readonly AccentTone[] = ["cyan", "magenta", "amber"];

export function ProjectsSection() {
  return (
    <ArcadeSection
      id="projects"
      kicker="Fase 03"
      title="Selecciona Juego"
      tone="amber"
    >
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <li key={project.repo} className="flex">
            <ProjectCard
              project={project}
              tone={CARD_TONES[index % CARD_TONES.length]}
            />
          </li>
        ))}
      </ul>
    </ArcadeSection>
  );
}
