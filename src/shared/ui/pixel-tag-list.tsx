type PixelTagListProps = {
  items: readonly string[];
};

/**
 * Short labels as a wrapping chip cloud.
 *
 * Chips stay in the body face on purpose: the display face has a 1em advance
 * per glyph, so "Business Central" alone would be ~190px wide and the cloud
 * would stop being scannable well before a phone viewport.
 */
export function PixelTagList({ items }: PixelTagListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="border border-phosphor/25 bg-crt-void/40 px-2 py-1 text-xs text-phosphor/85"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
