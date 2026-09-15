import type { ReactNode } from "react";

import { ArcadeCard } from "./arcade-card";
import { PanelHeading } from "./panel-heading";
import type { AccentTone } from "./accent-tone";

type ArcadePanelProps = {
  title: string;
  tone?: AccentTone;
  children: ReactNode;
};

/**
 * `ArcadeCard` plus a `PanelHeading`, for the sub-blocks that sit under a
 * section heading. What goes inside is the caller's business.
 */
export function ArcadePanel({
  title,
  tone = "cyan",
  children,
}: ArcadePanelProps) {
  return (
    <ArcadeCard tone={tone} className="flex flex-col gap-5 p-6">
      <PanelHeading tone={tone}>{title}</PanelHeading>
      {children}
    </ArcadeCard>
  );
}
