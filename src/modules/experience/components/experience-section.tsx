"use client";

import {
  EDUCATION_TIMELINE,
  WORK_TIMELINE,
} from "@/modules/experience/experience-entries";
import { useLanguage } from "@/shared/i18n/language";
import { MESSAGES } from "@/shared/i18n/messages";
import { ArcadeSection } from "@/shared/ui/arcade-section";

import { TimelineList } from "./timeline-list";

/**
 * Work history and education share this section rather than getting one of
 * their own: the section `id`s are wired into the `:has()` selectors in
 * `globals.css` and into the nav, so adding a fourth anchor would mean touching
 * three files to say something the same ladder already says.
 */
export function ExperienceSection() {
  const lang = useLanguage();
  const t = MESSAGES[lang].experience;
  return (
    <ArcadeSection
      id="experience"
      kicker={t.kicker}
      title={t.title}
      tone="magenta"
    >
      <TimelineList
        caption={t.work}
        entries={WORK_TIMELINE[lang]}
        tone="magenta"
      />
      <TimelineList
        caption={t.education}
        entries={EDUCATION_TIMELINE[lang]}
        tone="cyan"
      />
    </ArcadeSection>
  );
}
