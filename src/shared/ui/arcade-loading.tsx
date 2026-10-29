"use client";

import { useEffect, useRef, useState } from "react";

/** The boot screen lasts exactly three seconds: 100 ticks of 30 ms. */
const TOTAL_MS = 3000;
const STEPS = 100;
const TICK_MS = TOTAL_MS / STEPS;

/** 01…99, then 100 — a cabinet counter never shows a leading triple zero. */
function format(percent: number) {
  return percent >= STEPS ? String(STEPS) : String(percent).padStart(2, "0");
}

/**
 * Boot screen: a pixel progress bar with the live percentage and a blinking
 * "Cargando..." underneath. It is an overlay, so the title screen is already in
 * the DOM behind it and stays reachable without JavaScript.
 */
export function ArcadeLoading({ label, onDone }: { label: string; onDone: () => void }) {
  const [percent, setPercent] = useState(1);
  const done = useRef(onDone);
  // Kept in a ref so a new callback identity never restarts the three seconds.
  useEffect(() => { done.current = onDone; }, [onDone]);

  useEffect(() => {
    let value = 1;
    const tick = setInterval(() => {
      value += 1;
      setPercent(value);
      if (value >= STEPS) {
        clearInterval(tick);
        done.current();
      }
    }, TICK_MS);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="arcade-loading" role="status" aria-live="polite" aria-label={`${label} ${percent}%`}>
      <div className="arcade-loading__content">
        <div className="arcade-loading__bar" aria-hidden="true"><span style={{ width: `${percent}%` }} /></div>
        <p className="arcade-loading__percent font-display text-signal-amber" aria-hidden="true">{format(percent)}%</p>
        <p className="arcade-loading__hint font-display arcade-soft-blink" aria-hidden="true">{label}...</p>
      </div>
    </div>
  );
}
