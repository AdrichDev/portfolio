"use client";

import { useEffect, useRef, useState } from "react";
import { ArcadeMusic, type MusicStatus } from "@/shared/lib/arcade-music";

export function useArcadeMusic() {
  const engine = useRef<ArcadeMusic | null>(null);
  const mutedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState<MusicStatus>("idle");

  useEffect(() => {
    const music = new ArcadeMusic(setStatus);
    engine.current = music;
    const visibility = () => music.setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      music.dispose();
      engine.current = null;
    };
  }, []);

  function toggle() {
    if (status === "idle") {
      engine.current?.start(true);
      return;
    }
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    engine.current?.setEnabled(!mutedRef.current);
  }

  return { muted, status, toggle, start: () => engine.current?.start(!mutedRef.current) };
}

export function MusicControl({ muted, status, toggle }: Pick<ReturnType<typeof useArcadeMusic>, "muted" | "status" | "toggle">) {
  const unavailable = status === "unavailable";
  const label = unavailable ? "Música no disponible" : muted || status === "idle" ? "Activar música" : "Silenciar música";
  return (
    <button type="button" className="music-control" onClick={toggle} disabled={unavailable}
      aria-label={label} aria-pressed={!muted && !unavailable && status !== "idle"} data-music-state={status}
      title={label}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M9 17V5l11-2v12M9 8l11-2" /><ellipse cx="6" cy="18" rx="3" ry="2" /><ellipse cx="17" cy="16" rx="3" ry="2" />
        {muted || unavailable ? <path d="m3 3 18 18" /> : null}
      </svg>
    </button>
  );
}
