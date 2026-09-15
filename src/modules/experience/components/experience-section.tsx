import {
  EDUCATION_TIMELINE,
  WORK_TIMELINE,
} from "@/modules/experience/experience-entries";
import { ArcadeSection } from "@/shared/ui/arcade-section";

import { TimelineList } from "./timeline-list";

/**
 * Work history and education share this section rather than getting one of
 * their own: the section `id`s are wired into the `:has()` selectors in
 * `globals.css` and into the nav, so adding a fourth anchor would mean touching
 * three files to say something the same ladder already says.
 */
export function ExperienceSection() {
  return (
    <ArcadeSection
      id="experience"
      kicker="Fase 02"
      title="Mapa de Niveles"
      tone="magenta"
    >
      <TimelineList
        caption="Trayectoria profesional"
        entries={WORK_TIMELINE}
        tone="magenta"
      />
      <TimelineList
        caption="Formación"
        entries={EDUCATION_TIMELINE}
        tone="cyan"
      />
    </ArcadeSection>
  );
}
