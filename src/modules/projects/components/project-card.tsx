import { ArcadeButton } from "@/shared/ui/arcade-button";
import { ArcadeCard } from "@/shared/ui/arcade-card";
import { ACCENT_TEXT } from "@/shared/ui/accent-tone";
import type { AccentTone } from "@/shared/ui/accent-tone";
import type { ProjectSummary } from "@/shared/types/project";

type ProjectCardProps = {
  project: ProjectSummary;
  tone: AccentTone;
};

/**
 * One game in the cabinet's select screen.
 *
 * The stat readout keeps the arcade idiom but drops the star counter it used to
 * show: every repository here has zero stars, so that row rendered "00000"
 * seven times and read as "nobody looked at this". Language and deployment
 * status are true, differentiating, and in the owner's favour — a deployed demo
 * is the headline, so it glows.
 *
 * The title is the literal repository name, underscores and all. It is what the
 * link resolves to, and inventing a prettier one would quietly break that
 * correspondence.
 */
export function ProjectCard({ project, tone }: ProjectCardProps) {
  const hasDemo = project.demoUrl !== undefined;

  const stats = [
    {
      label: "Lenguaje",
      value: project.language,
      valueClassName: "text-phosphor",
    },
    {
      label: "Demo",
      value: hasDemo ? "Disponible" : "No publicada",
      valueClassName: hasDemo
        ? "crt-text-glow text-signal-green"
        : "text-phosphor/40",
    },
  ];

  return (
    <ArcadeCard
      as="article"
      tone={tone}
      className="flex w-full flex-col gap-5 p-6"
    >
      <h3
        className={`font-display text-[0.7rem] leading-relaxed tracking-wider break-words uppercase ${ACCENT_TEXT[tone]}`}
      >
        {project.repo}
      </h3>

      <p className="flex-1 text-sm leading-6 text-phosphor/80">
        {project.description}
      </p>

      <dl className="flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-dashed border-phosphor/20 pt-4 font-display text-[0.5rem] leading-relaxed tracking-[0.2em] uppercase">
        {stats.map((stat) => (
          <div key={stat.label} className="flex gap-2">
            <dt className="text-phosphor/50">{stat.label}</dt>
            <dd className={stat.valueClassName}>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-3">
        <ArcadeButton href={project.repoUrl} tone={tone} size="sm" external>
          Ver código
        </ArcadeButton>
        {project.demoUrl ? (
          <ArcadeButton href={project.demoUrl} tone="green" size="sm" external>
            Ver demo
          </ArcadeButton>
        ) : null}
      </div>
    </ArcadeCard>
  );
}
