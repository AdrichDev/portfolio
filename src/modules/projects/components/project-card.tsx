import { ArcadeButton } from "@/shared/ui/arcade-button";
import { ArcadeCard } from "@/shared/ui/arcade-card";
import { ACCENT_TEXT, type AccentTone } from "@/shared/ui/accent-tone";
import type { ProjectSummary } from "@/shared/types/project";

export function ProjectCard({ project, tone, pinnedLabel, codeLabel }: { project: ProjectSummary; tone: AccentTone; pinnedLabel: string; codeLabel: string }) {
  return (
    <ArcadeCard as="article" tone={tone} className="project-card flex w-full min-w-0 flex-col gap-5 p-5">
      <p className="text-xs text-phosphor/60">{pinnedLabel}</p>
      <h3 className={`font-display text-[0.65rem] leading-loose break-words uppercase ${ACCENT_TEXT[tone]}`}>{project.repo}</h3>
      <p className="flex-1 text-sm leading-6 text-phosphor/85">{project.description}</p>
      <p className="border-t-2 border-dotted border-phosphor/20 pt-4 text-xs text-phosphor/70">{project.language}</p>
      <div><ArcadeButton href={project.repoUrl} tone={tone} size="sm" external>{codeLabel}</ArcadeButton></div>
    </ArcadeCard>
  );
}
