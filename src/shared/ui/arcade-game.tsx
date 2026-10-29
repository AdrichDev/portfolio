"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { PROFILES } from "@/modules/profile/profile";
import { useLanguage } from "@/shared/i18n/language";
import { LanguageSelect } from "@/shared/i18n/language-select";
import { MESSAGES, type Messages } from "@/shared/i18n/messages";
import { ArcadeHero } from "./arcade-hero";
import { ArcadeDialog } from "./arcade-dialog";
import { ArcadeLoading } from "./arcade-loading";

type Stage = { id: keyof Messages["stages"]; symbol: string; content: ReactNode };

export function ArcadeGame({ stages }: { stages: Stage[] }) {
  const lang = useLanguage();
  const t = MESSAGES[lang];
  const profile = PROFILES[lang];
  const [booting, setBooting] = useState(true);
  const [started, setStarted] = useState(false);
  const [credits, setCredits] = useState(5);
  const session = useRef({ started: false, credits: 5 });
  const [active, setActive] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const finishBoot = useCallback(() => {
    setBooting(false);
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".start-button")?.focus());
  }, []);

  function startGame() {
    if (session.current.started || session.current.credits === 0) return;
    session.current.started = true;
    session.current.credits -= 1;
    setCredits(session.current.credits);
    setStarted(true);
    requestAnimationFrame(() => heading.current?.focus());
  }

  function insertCoin() {
    if (session.current.started || session.current.credits !== 0) return;
    session.current.credits = 1;
    setCredits(1);
  }

  function exitGame() {
    session.current.started = false;
    setStarted(false);
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".start-button")?.focus());
  }
  return (
    <>
      <main className="game-shell crt-grid">
        <header className="cabinet-top"><span>{started ? <span data-cabinet-brand>Portfolio <span className="cabinet-brand__name">Adrián Chozas</span></span> : null}</span><div className="cabinet-controls"><LanguageSelect /><span className="text-signal-green">● PLAYER 01</span></div></header>
        {!started ? <ArcadeHero profile={profile} credits={credits} creditsLabel={t.credits} onStart={startGame} onInsertCoin={insertCoin} /> : (
          <section className="game-home" aria-labelledby="game-home-title">
            <div className="game-home__content">
              <h1 ref={heading} tabIndex={-1} id="game-home-title" className="sr-only">{t.menuTitle}</h1>
              <nav aria-label={t.menuNav} className="stage-grid">
                {stages.map((stage) => <button key={stage.id} type="button" className="stage-button" onClick={(event) => { trigger.current = event.currentTarget; setActive(stage.id); }}><span aria-hidden="true" className="stage-symbol">{stage.symbol}</span><span className="stage-label">{t.stages[stage.id].label}</span><span aria-hidden="true" className="stage-arrow">▶</span></button>)}
                <button type="button" className="stage-button exit-button" onClick={exitGame}><span className="stage-label">{t.exit}</span></button>
              </nav>
              <p className="intro-helper arcade-soft-blink">{t.menuHelper}</p>
            </div>
          </section>
        )}
        <footer className="cabinet-bottom"><span>2026 {profile.handle}</span></footer>
        {booting ? <ArcadeLoading label={t.loading} onDone={finishBoot} /> : null}
      </main>
      {stages.map((stage) => <ArcadeDialog key={stage.id} open={active === stage.id} label={t.stages[stage.id].label} pauseLabel={t.pause} backLabel={t.back} trigger={trigger} onClose={() => setActive(null)}>{stage.content}</ArcadeDialog>)}
      <noscript><style>{`.arcade-loading{display:none!important}.start-button,.dialog-toolbar{display:none!important}.game-shell{height:auto;min-height:100svh}.arcade-dialog:not([open]){display:block;position:static;width:calc(100% - 32px);max-width:none;max-height:none;margin:24px auto}.dialog-scroll{overflow:visible}.title-screen{overflow:visible}.title-screen__content{margin:24px auto}.language-select{display:none}`}</style><p className="p-4 text-center">Modo lectura: el menú interactivo necesita JavaScript. Todas las fases están disponibles en esta página.</p></noscript>
    </>
  );
}
