import type { Profile } from "@/shared/types/profile";
import { ArcadePortrait } from "./arcade-portrait";

export function ArcadeHero({ profile, credits, creditsLabel, onStart, onInsertCoin }: { profile: Profile; credits: number; creditsLabel: string; onStart: () => void; onInsertCoin: () => void }) {
  return (
    <section aria-labelledby="hero-title" className="title-screen">
      <div className="title-screen__content">
        <p className="cabinet-label text-signal-cyan">PLAYER 01 · {profile.location}</p>
        <ArcadePortrait portrait={profile.portrait} />
        <div className="title-screen__identity">
          <h1 id="hero-title" className="crt-text-glow font-display text-signal-magenta">{profile.name}</h1>
          <p className="title-screen__role font-display text-signal-amber">{profile.role}</p>
          <p className="title-screen__story">{profile.tagline}</p>
        </div>
        <button type="button" className="game-button start-button" onClick={credits > 0 ? onStart : onInsertCoin}>{credits > 0 ? "Press Start" : "Insert Coin"}</button>
        <p className="cabinet-label text-phosphor/70" role="status">{creditsLabel} <span data-credits>{String(credits).padStart(2, "0")}</span> · <span className="arcade-hard-blink text-signal-cyan">{credits > 0 ? "Press Start" : "Insert Coin"}</span></p>
      </div>
    </section>
  );
}
