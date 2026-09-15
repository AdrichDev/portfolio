import type { ReactNode } from "react";

import { ACCENT_BORDER, ACCENT_EDGE } from "./accent-tone";
import type { AccentTone } from "./accent-tone";

/** Kept to a closed union so the component never degrades into `any`. */
type ArcadeCardElement = "div" | "article" | "section";

type ArcadeCardProps = {
  as?: ArcadeCardElement;
  tone?: AccentTone;
  className?: string;
  children: ReactNode;
};

/**
 * The shared panel frame: hard 2px border, offset pixel bevel, panel fill.
 * Renders whichever element the caller needs so the semantics stay honest
 * without an extra wrapper div.
 */
export function ArcadeCard({
  as: Element = "div",
  tone = "cyan",
  className = "",
  children,
}: ArcadeCardProps) {
  return (
    <Element
      className={[
        "pixel-edge border-2 bg-crt-panel/70",
        ACCENT_BORDER[tone],
        ACCENT_EDGE[tone],
        className,
      ].join(" ")}
    >
      {children}
    </Element>
  );
}
