import Image from "next/image";

import type { Portrait } from "@/shared/types/profile";

type ArcadePortraitProps = {
  portrait: Portrait;
};

/**
 * The character-select portrait.
 *
 * A smooth circle and a 16-bit cabinet are opposite instincts, so the circle is
 * not left to fend for itself: the disc sits inside a square targeting reticle
 * (`.pixel-portrait` corner brackets), wears chunky concentric palette rings
 * with hard edges instead of a hairline border, and carries the same scanline
 * texture as the rest of the page. All of that lives in `globals.css` under
 * `.pixel-portrait*` so the treatment is defined in exactly one place.
 *
 * `priority` is unconditional: this component only ever renders above the fold.
 */
export function ArcadePortrait({ portrait }: ArcadePortraitProps) {
  return (
    <div className="pixel-portrait">
      <div className="pixel-portrait__disc h-36 w-36 sm:h-44 sm:w-44">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.size}
          height={portrait.size}
          priority
          sizes="(min-width: 640px) 176px, 144px"
          className="h-full w-full object-cover"
        />
        <div aria-hidden="true" className="pixel-portrait__scanlines" />
      </div>
    </div>
  );
}
