import { ACCENT_TEXT } from "./accent-tone";
import type { AccentTone } from "./accent-tone";

type SectionHeadingProps = {
  /** Wired to the section's `aria-labelledby`. */
  id: string;
  /** Small cabinet label above the heading, e.g. "STAGE 02". */
  kicker: string;
  title: string;
  tone?: AccentTone;
};

/**
 * Every section header on the page: a pixel kicker, the h2 itself and a rule.
 * Centralised so the heading rhythm can only be changed in one place.
 */
export function SectionHeading({
  id,
  kicker,
  title,
  tone = "cyan",
}: SectionHeadingProps) {
  return (
    <header className="phase-heading flex flex-col gap-4">
      <p className="font-display text-[0.55rem] tracking-[0.35em] text-phosphor/60 uppercase">
        {kicker}
      </p>
      <h2
        id={id}
        className={`phase-title crt-text-glow font-display text-lg leading-relaxed tracking-wider uppercase sm:text-2xl ${ACCENT_TEXT[tone]}`}
      >
        {title}
      </h2>
      <hr className="border-0 border-t-2 border-dashed border-phosphor/20" />
    </header>
  );
}
