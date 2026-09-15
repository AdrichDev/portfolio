import type { ReactNode } from "react";

import {
  ACCENT_BORDER,
  ACCENT_EDGE,
  ACCENT_TEXT,
  FOCUS_RING,
} from "./accent-tone";
import type { AccentTone } from "./accent-tone";

type ArcadeButtonSize = "sm" | "md";

type ArcadeButtonProps = {
  href: string;
  tone?: AccentTone;
  size?: ArcadeButtonSize;
  /** Opens in a new tab and announces it. Leave off for in-page and mailto. */
  external?: boolean;
  children: ReactNode;
};

const HOVER_FILL: Record<AccentTone, string> = {
  magenta: "hover:bg-signal-magenta",
  cyan: "hover:bg-signal-cyan",
  amber: "hover:bg-signal-amber",
  green: "hover:bg-signal-green",
};

/**
 * `sm` exists for the dense contexts — contact row, project cards — where two
 * `md` buttons side by side overflow a card at 375px. Whole class strings, same
 * Tailwind v4 reason as the accent maps.
 */
const SIZE_CLASS: Record<ArcadeButtonSize, string> = {
  sm: "gap-2 px-4 py-3 text-[0.55rem]",
  md: "gap-3 px-6 py-4 text-[0.7rem]",
};

/**
 * A squared-off cabinet button. Anchor-based: every target is either an in-page
 * section, an external profile or a `mailto:`, never an action.
 */
export function ArcadeButton({
  href,
  tone = "magenta",
  size = "md",
  external = false,
  children,
}: ArcadeButtonProps) {
  return (
    <a
      href={href}
      // `noreferrer` also implies `noopener`, so one token covers both.
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={[
        "pixel-edge inline-flex items-center border-2 bg-crt-panel/60",
        "font-display leading-none tracking-widest uppercase",
        "transition-colors duration-150 hover:text-crt-void",
        FOCUS_RING,
        SIZE_CLASS[size],
        ACCENT_BORDER[tone],
        ACCENT_TEXT[tone],
        ACCENT_EDGE[tone],
        HOVER_FILL[tone],
      ].join(" ")}
    >
      {children}
      {external ? (
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      ) : null}
    </a>
  );
}
