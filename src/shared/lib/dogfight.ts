/**
 * Decorative vertical-shmup dogfight, in the 1942 / Aero Fighters idiom.
 *
 * Everything is drawn on a canvas from pixel-matrix sprites: squadrons trade
 * fire, rounds travel, and a hit spawns a burst. Sprites and palette are
 * original and built from the portfolio tokens (`palette.ts`); the two darker
 * shades per aircraft are tints of those tokens, used for the underside so the
 * silhouette still reads at small sizes.
 */

type Palette = Record<string, string>;

/** Straight-wing interceptor, nose up: cowl, canopy, roundels, tail plane. */
const FIGHTER = [
  ".....BBBBB.....",
  ".....BMSMB.....",
  "....BBMCMBB....",
  "....BMMCMMB....",
  "....BMMCMMB....",
  "...BBMMMMMBB...",
  "BBBBBMMMMMBBBBB",
  "BMMMMMMMMMMMMMB",
  "BMRMMMMMMMMMRMB",
  "BSSMMMMMMMMMSSB",
  ".BBBBBMMMBBBBB.",
  ".....BMMMB.....",
  ".....BMSMB.....",
  "..BBBBMMMBBBB..",
  "..BMMMMMMMMMB..",
  "..BBBBBFBBBBB..",
] as const;

/** Swept-wing escort with a twin tail, so the two sides read apart at a glance. */
const INTERCEPTOR = [
  ".......B.......",
  "......BMB......",
  ".....BBMBB.....",
  ".....BMCMB.....",
  "....BBMCMBB....",
  ".BBBBMMMMMBBBB.",
  "BMMMMMMMMMMMMMB",
  "BMRMMMMMMMMMRMB",
  "BSSMMMMMMMMMSSB",
  ".BBBBMMMMMBBBB.",
  "....BBMMMBB....",
  ".....BMMMB.....",
  "..BBBBMMMBBBB..",
  "..BMMMBMBMMMB..",
  "..BBBBBBBBBBB..",
  "....F.....F....",
] as const;

const ALLY_PALETTE: Palette = { B: "#0b0410", M: "#22e0ff", S: "#0f7f9c", C: "#ece6f8", R: "#ff2d88", F: "#ffc31a" };
const ENEMY_PALETTES: readonly Palette[] = [
  { B: "#0b0410", M: "#ff2d88", S: "#8d1049", C: "#ffc31a", R: "#ece6f8", F: "#ffc31a" },
  { B: "#0b0410", M: "#ffc31a", S: "#8a6404", C: "#0b0410", R: "#ff2d88", F: "#ff2d88" },
  { B: "#0b0410", M: "#a06ad4", S: "#553276", C: "#22e0ff", R: "#ece6f8", F: "#ffc31a" },
];

const SPRITE_COLUMNS = 15;
const SPRITE_ROWS = 16;
const BURST_COLORS = ["#ece6f8", "#ffc31a", "#ff2d88", "#8d1049"];
const MAX_ENEMIES = 5;
const ALLY_COUNT = 2;

type Plane = {
  sprite: HTMLCanvasElement;
  side: "ally" | "enemy";
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  drift: number;
  phase: number;
  sway: number;
  cooldown: number;
  cadence: number;
  flame: string;
};

type Round = { x: number; y: number; speed: number; side: "ally" | "enemy"; color: string; length: number };
type Burst = { x: number; y: number; age: number; life: number; radius: number };

export type Dogfight = { destroy(): void; setPaused(paused: boolean): void };

function renderSprite(rows: readonly string[], palette: Palette, pixel: number) {
  const sprite = document.createElement("canvas");
  sprite.width = SPRITE_COLUMNS * pixel;
  sprite.height = SPRITE_ROWS * pixel;
  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;
  for (let row = 0; row < rows.length; row += 1) {
    for (let column = 0; column < rows[row].length; column += 1) {
      const color = palette[rows[row][column]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(column * pixel, row * pixel, pixel, pixel);
    }
  }
  return sprite;
}

export function createDogfight(canvas: HTMLCanvasElement): Dogfight {
  const context = canvas.getContext("2d");
  if (!context) return { destroy() {}, setPaused() {} };
  // Bound once, non-null, so every nested draw helper keeps the narrowed type.
  const ctx: CanvasRenderingContext2D = context;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  let width = 0;
  let height = 0;
  let pixel = 3;
  let allySprite = renderSprite(FIGHTER, ALLY_PALETTE, pixel);
  let enemySprites = ENEMY_PALETTES.map((palette) => renderSprite(INTERCEPTOR, palette, pixel));

  const planes: Plane[] = [];
  const rounds: Round[] = [];
  const bursts: Burst[] = [];
  let scroll = 0;
  let last = 0;
  let frame = 0;
  let paused = false;

  function spawnAlly(): Plane {
    const scale = 0.85 + Math.random() * 0.3;
    return {
      sprite: allySprite,
      side: "ally",
      x: width * (0.2 + Math.random() * 0.6),
      y: height * (0.72 + Math.random() * 0.28),
      width: allySprite.width * scale,
      height: allySprite.height * scale,
      speed: -(26 + Math.random() * 22),
      drift: height * 0.16,
      phase: Math.random() * Math.PI * 2,
      sway: width * 0.11,
      cooldown: Math.random() * 0.7,
      cadence: 0.42 + Math.random() * 0.26,
      flame: "#ffc31a",
    };
  }

  function spawnEnemy(initial = false): Plane {
    const sprite = enemySprites[Math.floor(Math.random() * enemySprites.length)];
    const scale = 0.7 + Math.random() * 0.45;
    return {
      sprite,
      side: "enemy",
      x: width * (0.12 + Math.random() * 0.76),
      // The opening wave starts on screen, so the sky is never empty at first look.
      y: initial ? Math.random() * height * 0.5 - sprite.height : -sprite.height * 1.4 - Math.random() * height * 0.8,
      width: sprite.width * scale,
      height: sprite.height * scale,
      speed: 95 + Math.random() * 70,
      drift: 0,
      phase: Math.random() * Math.PI * 2,
      sway: width * (0.06 + Math.random() * 0.1),
      cooldown: 0.4 + Math.random() * 1.1,
      cadence: 0.7 + Math.random() * 0.9,
      flame: "#ff2d88",
    };
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const box = canvas.getBoundingClientRect();
    width = Math.max(320, box.width);
    height = Math.max(240, box.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    const next = Math.max(3, Math.round(Math.min(width, height) / 140));
    if (next !== pixel || planes.length === 0) {
      pixel = next;
      allySprite = renderSprite(FIGHTER, ALLY_PALETTE, pixel);
      enemySprites = ENEMY_PALETTES.map((palette) => renderSprite(INTERCEPTOR, palette, pixel));
      planes.length = 0;
      rounds.length = 0;
      for (let index = 0; index < ALLY_COUNT; index += 1) planes.push(spawnAlly());
      for (let index = 0; index < MAX_ENEMIES; index += 1) planes.push(spawnEnemy(true));
    }
  }

  function fire(plane: Plane) {
    const up = plane.side === "ally";
    const muzzle = plane.y + (up ? -plane.height * 0.5 : plane.height * 0.5);
    const spread = plane.width * 0.3;
    const color = up ? "#88efff" : "#ffc31a";
    const speed = up ? -430 : 320;
    const length = Math.max(6, pixel * 3);
    if (up) {
      rounds.push({ x: plane.x - spread, y: muzzle, speed, side: "ally", color, length });
      rounds.push({ x: plane.x + spread, y: muzzle, speed, side: "ally", color, length });
    } else {
      rounds.push({ x: plane.x, y: muzzle, speed, side: "enemy", color, length });
    }
  }

  function burst(x: number, y: number, radius: number) {
    bursts.push({ x, y, age: 0, life: 0.42, radius });
  }

  function update(delta: number) {
    scroll = (scroll + delta * 46) % (pixel * 24);

    for (const plane of planes) {
      plane.phase += delta * (plane.side === "ally" ? 0.6 : 0.9);
      plane.x += Math.cos(plane.phase) * plane.sway * delta;
      plane.y += plane.speed * delta;
      if (plane.side === "ally") {
        // Allies hold the lower third, weaving rather than leaving the frame.
        const floor = height * 0.92;
        const ceiling = height * 0.58;
        if (plane.y < ceiling) plane.speed = Math.abs(plane.speed);
        if (plane.y > floor) plane.speed = -Math.abs(plane.speed);
      } else if (plane.y > height + plane.height) {
        Object.assign(plane, spawnEnemy());
      }
      plane.x = Math.min(width - plane.width * 0.55, Math.max(plane.width * 0.55, plane.x));

      plane.cooldown -= delta;
      if (plane.cooldown <= 0) {
        plane.cooldown = plane.cadence;
        if (plane.y > -plane.height * 0.2) fire(plane);
      }
    }

    for (let index = rounds.length - 1; index >= 0; index -= 1) {
      const round = rounds[index];
      round.y += round.speed * delta;
      if (round.y < -40 || round.y > height + 40) { rounds.splice(index, 1); continue; }
      for (const plane of planes) {
        if (plane.side === round.side) continue;
        const halfWidth = plane.width * 0.42;
        const halfHeight = plane.height * 0.4;
        if (Math.abs(round.x - plane.x) > halfWidth || Math.abs(round.y - plane.y) > halfHeight) continue;
        rounds.splice(index, 1);
        burst(round.x, round.y, plane.width * 0.62);
        if (plane.side === "enemy") Object.assign(plane, spawnEnemy());
        else { burst(plane.x, plane.y, plane.width * 0.8); Object.assign(plane, spawnAlly()); }
        break;
      }
    }

    for (let index = bursts.length - 1; index >= 0; index -= 1) {
      bursts[index].age += delta;
      if (bursts[index].age > bursts[index].life) bursts.splice(index, 1);
    }
  }

  /** Scrolling sea: pixel wave dashes plus two island silhouettes. */
  function drawSea() {
    ctx.fillStyle = "#0b0410";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#1d1030";
    const island = pixel * 18;
    for (let index = 0; index < 3; index += 1) {
      const offset = ((scroll * 0.4 + index * height * 0.52) % (height + island * 2)) - island;
      const left = index % 2 === 0 ? width * 0.06 : width * 0.74;
      ctx.fillRect(left, offset, island * 1.6, island * 0.5);
      ctx.fillRect(left + island * 0.3, offset - island * 0.34, island, island * 0.34);
      ctx.fillStyle = "#2c1a47";
      ctx.fillRect(left + island * 0.45, offset - island * 0.2, island * 0.7, island * 0.2);
      ctx.fillStyle = "#1d1030";
    }

    ctx.fillStyle = "rgba(34, 224, 255, 0.11)";
    const cell = pixel * 24;
    for (let y = -cell; y < height + cell; y += cell) {
      for (let x = 0; x < width; x += cell) {
        const jitter = ((x / cell) * 37 + Math.floor(y / cell) * 17) % 11;
        ctx.fillRect(x + jitter * pixel, y + ((scroll + jitter * pixel) % cell), pixel * 4, pixel);
      }
    }
  }

  function drawPlane(plane: Plane) {
    ctx.save();
    ctx.translate(plane.x, plane.y);
    if (plane.side === "enemy") ctx.rotate(Math.PI);
    ctx.drawImage(plane.sprite, -plane.width / 2, -plane.height / 2, plane.width, plane.height);
    // Prop disc: one blurred blade seen edge-on, alternating width each frame pair.
    const wide = (frame >> 1) % 2 === 0;
    const span = plane.width * (wide ? 0.44 : 0.24);
    ctx.fillStyle = "rgba(236, 230, 248, 0.6)";
    ctx.fillRect(-span / 2, -plane.height / 2 + pixel * 2, span, pixel);
    ctx.restore();
  }

  function drawRounds() {
    for (const round of rounds) {
      ctx.fillStyle = round.color;
      ctx.fillRect(round.x - pixel / 2, round.y - round.length / 2, Math.max(2, pixel), round.length);
    }
  }

  function drawBursts() {
    for (const item of bursts) {
      const progress = item.age / item.life;
      const radius = item.radius * (0.35 + progress * 1.5);
      const step = Math.max(2, pixel);
      ctx.globalAlpha = 1 - progress;
      for (let ring = 0; ring < BURST_COLORS.length; ring += 1) {
        const ringRadius = radius * (1 - ring * 0.2);
        if (ringRadius <= 0) continue;
        ctx.fillStyle = BURST_COLORS[ring];
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
          const x = item.x + Math.cos(angle + ring) * ringRadius;
          const y = item.y + Math.sin(angle + ring) * ringRadius;
          ctx.fillRect(Math.round(x / step) * step, Math.round(y / step) * step, step, step);
        }
      }
      ctx.globalAlpha = 1;
    }
  }

  function draw() {
    drawSea();
    for (const plane of planes) drawPlane(plane);
    drawRounds();
    drawBursts();
  }

  let handle = 0;
  function loop(now: number) {
    handle = requestAnimationFrame(loop);
    if (paused) { last = now; return; }
    const delta = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    frame += 1;
    update(delta);
    draw();
  }

  const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => resize());
  resize();

  if (reduced) {
    // One still frame: the scene reads without any motion at all.
    update(0.016);
    draw();
  } else {
    observer?.observe(canvas);
    handle = requestAnimationFrame(loop);
  }

  return {
    setPaused(value: boolean) { paused = value; },
    destroy() {
      if (handle) cancelAnimationFrame(handle);
      observer?.disconnect();
    },
  };
}
