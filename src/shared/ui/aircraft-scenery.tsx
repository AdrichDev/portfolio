"use client";

import { useEffect, useRef } from "react";

/** Original swept-wing fighter geometry; a decorative, non-interactive sortie. */
export function AircraftScenery() {
  const world = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const visibility = () => { if (world.current) world.current.dataset.paused = String(document.hidden); };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  return (
    <div ref={world} className="aircraft-world" data-aircraft-scenery aria-hidden="true">
      <svg className="aircraft-landscape" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="ocean-pixels" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M8 12h20v2H8zm30 33h18v2H38z" fill="#22e0ff" opacity=".12" /></pattern>
          <g id="arcade-fighter" stroke="#091b30" strokeWidth="2" strokeLinejoin="round">
            <path d="m50 0 8 22 4 29 33 32v10L62 78l-2 28 18 16v7l-24-8h-8l-24 8v-7l18-16-2-28L5 93V83l33-32 4-29z" fill="currentColor" />
            <path d="m50 8 4 20 3 64-7 18-7-18 3-64z" fill="#e0edf2" />
            <path d="m50 26 5 13-1 17h-8l-1-17z" fill="#12324b" />
            <path d="m15 82 22-20-2 11zm70 0L63 62l2 11zM41 74h5v22h-5zm13 0h5v22h-5z" fill="#416e80" />
            <path d="M43 108v10m14-10v10M24 80v16m52-16v16" stroke="#b4dde3" strokeWidth="4" />
            <path d="m45 122 5 17 5-17" fill="#ffc31a" stroke="none" />
          </g>
          <g id="pixel-cloud"><path d="M0 16h12V8h20V0h32v8h20v8h12v16H0z" fill="#72b7c5" /><path d="M0 28h96v8H0z" fill="#214c64" /></g>
          <g id="battle-burst"><circle r="16" fill="#ffc31a" opacity=".35" /><path d="M-28 0h14m28 0h14M0-28v14m0 28v14m-20-34 10 10m20 20 10 10m0-40L10-10m-20 20-10 10" stroke="#ffb676" strokeWidth="4" /><circle r="7" fill="#ffb676" /></g>
        </defs>
        <path fill="#0c182d" d="M0 0h1280v720H0z" />
        <path fill="url(#ocean-pixels)" d="M0 0h1280v720H0z" />
        <path d="M0 0h160v80h-24v72h-32v72H80v112H48v80H0zm1280 720h-180v-80h28v-80h32v-64h40v-96h40v-64h40z" fill="#163642" />
        <path d="M0 0h124v72h-24v80H72v72H48v96H16v80H0zm1280 720h-144v-64h28v-72h32v-64h40v-88h44z" fill="#28504a" />
        <g className="aircraft-clouds" opacity=".2"><use href="#pixel-cloud" x="165" y="98" /><use href="#pixel-cloud" x="1000" y="220" /><use href="#pixel-cloud" x="330" y="565" /></g>
      </svg>
      <svg className="battle-unit battle-fighter" viewBox="0 0 100 140" color="#74c7d5"><use href="#arcade-fighter" /><g className="battle-shot" stroke="#88efff" strokeWidth="3"><path d="M24 0v-23m52 23v-23M24-60v-12m52 12v-12" /></g></svg>
      <svg className="battle-unit battle-enemy" viewBox="0 0 100 140" color="#b17382"><use href="#arcade-fighter" transform="rotate(180 50 70)" /><g className="battle-shot battle-shot--enemy" stroke="#ff9a79" strokeWidth="3"><path d="M24 150v20m52 22v20" /></g></svg>
      <svg className="battle-unit battle-enemy battle-enemy--two" viewBox="0 0 100 140" color="#ad91b3"><use href="#arcade-fighter" transform="rotate(180 50 70)" /></svg>
      <svg className="battle-unit battle-enemy battle-enemy--three" viewBox="0 0 100 140" color="#809bad"><use href="#arcade-fighter" transform="rotate(180 50 70)" /></svg>
      <svg className="battle-blast battle-explosion" viewBox="-32 -32 64 64"><use href="#battle-burst" /></svg>
      <svg className="battle-blast battle-explosion battle-explosion--two" viewBox="-32 -32 64 64"><use href="#battle-burst" /></svg>
      <div className="aircraft-menu-shade" />
    </div>
  );
}
