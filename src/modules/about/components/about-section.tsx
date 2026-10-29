"use client";

import { PROFILES, PROFILE_FACTS, SKILL_GROUPS, SOFT_SKILLS } from "@/modules/profile/profile";
import { useLanguage } from "@/shared/i18n/language";
import { MESSAGES } from "@/shared/i18n/messages";
import { ArcadeCard } from "@/shared/ui/arcade-card";
import { ArcadeSection } from "@/shared/ui/arcade-section";
import { PixelTagList } from "@/shared/ui/pixel-tag-list";

export function AboutSection() {
  const lang = useLanguage();
  const t = MESSAGES[lang].about;
  return (
    <ArcadeSection id="about" kicker={t.kicker} title={t.title} tone="cyan">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="flex min-w-0 flex-col gap-6 text-sm leading-7 text-phosphor/85 sm:text-base">
          {PROFILES[lang].bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <ArcadeCard tone="green" className="player-card flex min-w-0 flex-col gap-6 p-5">
          <div data-player-card>
            <h3 className="mb-5 font-display text-xs text-signal-green">PLAYER 01</h3>
            <dl className="flex flex-col gap-4">
              {PROFILE_FACTS[lang].map((fact) => <div key={fact.label} className="border-b border-dotted border-phosphor/20 pb-3"><dt className="mb-1 text-xs text-signal-green">{fact.label}</dt><dd className="text-sm">{fact.value}</dd></div>)}
            </dl>
            <section data-skill-card="soft" className="skill-card skill-card--soft" aria-labelledby="soft-skills-title">
              <h4 id="soft-skills-title" className="mb-4 font-display text-[0.65rem] text-signal-magenta">Soft skills</h4>
              <PixelTagList items={SOFT_SKILLS[lang]} />
            </section>
            <section data-skill-card="hard" className="skill-card skill-card--hard" aria-labelledby="hard-skills-title">
              <h4 id="hard-skills-title" className="mb-4 font-display text-[0.65rem] text-signal-cyan">Hard skills</h4>
              <div className="flex flex-col gap-5">{SKILL_GROUPS[lang].map((group) => <div key={group.id}><h5 className="mb-2 text-xs text-signal-amber">{group.title}</h5><PixelTagList items={group.items} /></div>)}</div>
            </section>
          </div>
        </ArcadeCard>
      </div>
    </ArcadeSection>
  );
}
