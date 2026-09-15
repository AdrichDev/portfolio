import type { ReactNode } from "react";

import { SectionHeading } from "./section-heading";
import type { AccentTone } from "./accent-tone";

type ArcadeSectionProps = {
  /**
   * Anchor for the nav hash, the `:target` rules in `globals.css` and
   * `scroll-mt-24`. The heading id is derived from it, never passed in.
   */
  id: string;
  /** Small cabinet label above the heading, e.g. "FASE 02". */
  kicker: string;
  title: string;
  tone?: AccentTone;
  children: ReactNode;
};

/**
 * The shell every top-level page section shares: the anchor, the scroll offset,
 * the vertical rhythm and its accessible name.
 *
 * The `id` -> `aria-labelledby` wiring is derived here instead of being written
 * out by each caller. That pairing is an accessibility invariant: a typo on
 * either half silently strips the section's accessible name, and nothing in the
 * build would catch it. Deriving it means there is only one place to get wrong.
 */
export function ArcadeSection({
  id,
  kicker,
  title,
  tone,
  children,
}: ArcadeSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="flex flex-col gap-10 scroll-mt-24"
    >
      {/* `tone` is passed through undefined on purpose so SectionHeading keeps
          ownership of the default accent. */}
      <SectionHeading id={titleId} kicker={kicker} title={title} tone={tone} />
      {children}
    </section>
  );
}
