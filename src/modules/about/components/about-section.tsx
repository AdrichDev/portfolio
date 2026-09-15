import {
  PROFILE,
  PROFILE_FACTS,
  SKILL_GROUPS,
  SOFT_SKILLS,
} from "@/modules/profile/profile";
import { ArcadeButton } from "@/shared/ui/arcade-button";
import { ArcadeCard } from "@/shared/ui/arcade-card";
import { ArcadePanel } from "@/shared/ui/arcade-panel";
import { ArcadeSection } from "@/shared/ui/arcade-section";
import { PixelList } from "@/shared/ui/pixel-list";
import { PixelTagList } from "@/shared/ui/pixel-tag-list";
import type { AccentTone } from "@/shared/ui/accent-tone";

/** One accent per skill panel, so the two blocks read as distinct cabinets. */
const SKILL_TONES: readonly AccentTone[] = ["cyan", "amber"];

export function AboutSection() {
  return (
    <ArcadeSection
      id="about"
      kicker="Fase 01"
      title="Ficha de Jugador"
      tone="cyan"
    >
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-5 text-sm leading-7 text-phosphor/85 sm:text-base">
          {PROFILE.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ArcadeCard tone="green" className="flex flex-col gap-6 p-6">
          <dl className="flex flex-col gap-4">
            {PROFILE_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 border-b-2 border-dashed border-phosphor/20 pb-3 last:border-0 last:pb-0"
              >
                <dt className="font-display text-[0.5rem] tracking-[0.25em] text-signal-green uppercase">
                  {fact.label}
                </dt>
                <dd className="text-sm text-phosphor">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="flex flex-wrap gap-3">
            {PROFILE.contacts.map((contact) => (
              <li key={contact.id}>
                <ArcadeButton
                  href={contact.href}
                  tone="green"
                  size="sm"
                  external={contact.external}
                >
                  {contact.label}
                </ArcadeButton>
              </li>
            ))}
          </ul>
        </ArcadeCard>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {SKILL_GROUPS.map((group, index) => (
          <ArcadePanel
            key={group.id}
            title={group.title}
            tone={SKILL_TONES[index % SKILL_TONES.length]}
          >
            <PixelTagList items={group.items} />
          </ArcadePanel>
        ))}
      </div>

      <ArcadePanel title="Habilidades personales" tone="magenta">
        <PixelList items={SOFT_SKILLS} tone="magenta" />
      </ArcadePanel>
    </ArcadeSection>
  );
}
