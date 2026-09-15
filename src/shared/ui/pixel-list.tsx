import { ACCENT_TEXT } from "./accent-tone";
import type { AccentTone } from "./accent-tone";

type PixelListProps = {
  items: readonly string[];
  tone?: AccentTone;
};

/**
 * Body copy as a bulleted list with a pixel marker instead of a disc.
 *
 * Shared by the timeline entries and the soft-skills panel: the marker is
 * decorative, so it is hidden from assistive tech and the list keeps its native
 * semantics.
 */
export function PixelList({ items, tone = "cyan" }: PixelListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-6 text-phosphor/80"
        >
          <span
            aria-hidden="true"
            className={`mt-1 shrink-0 font-display text-[0.5rem] ${ACCENT_TEXT[tone]}`}
          >
            &#9656;
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
