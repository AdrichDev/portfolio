import type { ReactNode } from "react";

import { ACCENT_TEXT } from "./accent-tone";
import type { AccentTone } from "./accent-tone";

type PanelHeadingProps = {
  tone?: AccentTone;
  children: ReactNode;
};

/**
 * The `h3` rung of the heading ladder: sits under a `SectionHeading`, labels a
 * panel or a group of cards. Same reason `SectionHeading` exists — the rhythm
 * of one heading level is defined in exactly one place.
 */
export function PanelHeading({ tone = "cyan", children }: PanelHeadingProps) {
  return (
    <h3
      className={`font-display text-[0.6rem] leading-relaxed tracking-[0.25em] uppercase ${ACCENT_TEXT[tone]}`}
    >
      {children}
    </h3>
  );
}
