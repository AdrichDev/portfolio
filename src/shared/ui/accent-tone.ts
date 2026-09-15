/**
 * The four accents of the arcade palette, plus the literal Tailwind class
 * strings that apply them.
 *
 * These maps hold *whole* class names on purpose. Tailwind v4 scans source
 * files as plain text, so a composed string like `text-signal-${tone}` would
 * never be generated.
 */
export type AccentTone = "magenta" | "cyan" | "amber" | "green";

export const ACCENT_TEXT: Record<AccentTone, string> = {
  magenta: "text-signal-magenta",
  cyan: "text-signal-cyan",
  amber: "text-signal-amber",
  green: "text-signal-green",
};

export const ACCENT_BORDER: Record<AccentTone, string> = {
  magenta: "border-signal-magenta",
  cyan: "border-signal-cyan",
  amber: "border-signal-amber",
  green: "border-signal-green",
};

/** Recolours the `.pixel-edge` offset bevel. */
export const ACCENT_EDGE: Record<AccentTone, string> = {
  magenta: "[--pixel-edge-color:var(--color-signal-magenta)]",
  cyan: "[--pixel-edge-color:var(--color-signal-cyan)]",
  amber: "[--pixel-edge-color:var(--color-signal-amber)]",
  green: "[--pixel-edge-color:var(--color-signal-green)]",
};

/**
 * The keyboard affordance shared by every focusable control.
 *
 * Cyan is deliberately off-palette-rotation: the focus ring must stay the same
 * colour everywhere, or keyboard users have to relearn it per component. Lives
 * here as one literal string — same Tailwind v4 reason as the maps above — so
 * buttons and nav links physically cannot drift apart.
 */
export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-cyan";
