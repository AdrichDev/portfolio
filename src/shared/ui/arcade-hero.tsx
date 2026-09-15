import type { Profile } from "@/shared/types/profile";

import { ArcadeButton } from "./arcade-button";
import { ArcadePortrait } from "./arcade-portrait";

type ArcadeHeroProps = {
  profile: Profile;
};

/**
 * The cabinet marquee: attract-mode title screen for the portfolio.
 *
 * Presentational — every fact arrives through `profile`, so the identity lives
 * in one data module instead of being retyped here. Static content, CSS-only
 * blink, no state: Server Component.
 *
 * Type sizes are deliberately smaller than a Latin-alphabet eyeball would
 * suggest. Press Start 2P has a 1em advance per glyph, so "Desarrollador de
 * Aplicaciones Multiplataforma" is 44 glyphs wide; nothing here is
 * `whitespace-nowrap`, and every individual word fits a 375px viewport.
 */
export function ArcadeHero({ profile }: ArcadeHeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col items-center gap-6 border-b-2 border-crt-panel px-6 py-16 text-center sm:gap-8 sm:py-24"
    >
      <ArcadePortrait portrait={profile.portrait} />

      <p className="font-display text-[0.55rem] tracking-[0.4em] text-signal-cyan uppercase">
        {profile.location}
      </p>

      <h1
        id="hero-title"
        className="crt-text-glow font-display text-2xl leading-tight tracking-tight text-signal-magenta uppercase sm:text-4xl lg:text-5xl"
      >
        {profile.name}
      </h1>

      <p className="max-w-xl text-balance font-display text-[0.6rem] leading-loose tracking-[0.25em] text-signal-amber uppercase sm:text-xs">
        {profile.role}
      </p>

      <p className="max-w-xl text-sm leading-7 text-phosphor/80 sm:text-base">
        {profile.tagline}
      </p>

      <ArcadeButton href="#about" tone="magenta">
        <span className="crt-blink">Pulsa Start</span>
      </ArcadeButton>

      <p className="font-display text-[0.5rem] tracking-[0.3em] text-phosphor/50 uppercase">
        Créditos 01 &#183; <span className="crt-blink">Inserta Moneda</span>
      </p>
    </section>
  );
}
