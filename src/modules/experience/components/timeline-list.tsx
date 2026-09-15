import { ArcadeCard } from "@/shared/ui/arcade-card";
import { PanelHeading } from "@/shared/ui/panel-heading";
import { PixelList } from "@/shared/ui/pixel-list";
import type { AccentTone } from "@/shared/ui/accent-tone";
import type { TimelineEntry } from "@/shared/types/timeline";

type TimelineListProps = {
  caption: string;
  entries: readonly TimelineEntry[];
  tone: AccentTone;
};

/**
 * An ordered ladder of dated stages — used for both the work history and the
 * academic record, which are the same shape.
 *
 * Layout note, learned the hard way: `period` used to live in a
 * `whitespace-nowrap sm:w-40` box. Press Start 2P is monospaced at a 1em
 * advance, so at `text-[0.55rem]` with `tracking-[0.2em]` each glyph costs
 * 10.56px and a real date range ("02/2026 – 06/2026", 17 glyphs) needs 180px.
 * The column is now `sm:w-48` (192px) and nothing forbids wrapping, so a longer
 * label degrades to two lines instead of escaping the card.
 *
 * Nothing else here is `whitespace-nowrap` either: "Trabajador Social ·
 * Coordinador, orientador y asesor" and "DOMUSVI (SAD Ayto. de Madrid)" are
 * both wider than a 375px card and must be free to wrap.
 */
export function TimelineList({ caption, entries, tone }: TimelineListProps) {
  return (
    <div className="flex flex-col gap-5">
      <PanelHeading tone={tone}>{caption}</PanelHeading>

      <ol className="flex flex-col gap-6">
        {entries.map((entry) => (
          <li key={entry.id}>
            <ArcadeCard
              tone={tone}
              className="flex flex-col gap-4 p-6 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <p className="font-display text-[0.55rem] leading-relaxed tracking-[0.2em] text-signal-amber uppercase sm:w-48 sm:shrink-0">
                {entry.period}
              </p>

              <div className="flex flex-col gap-2">
                <h4 className="font-display text-[0.65rem] leading-relaxed tracking-wider text-phosphor uppercase">
                  {entry.title}
                </h4>
                <p className="font-display text-[0.5rem] leading-relaxed tracking-[0.2em] text-signal-cyan uppercase">
                  {entry.subtitle}
                </p>
                {entry.location ? (
                  <p className="text-xs text-phosphor/50">{entry.location}</p>
                ) : null}
                {entry.bullets ? (
                  <PixelList items={entry.bullets} tone={tone} />
                ) : null}
              </div>
            </ArcadeCard>
          </li>
        ))}
      </ol>
    </div>
  );
}
