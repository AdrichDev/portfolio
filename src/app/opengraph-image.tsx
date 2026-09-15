import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { PROFILE } from "@/modules/profile/profile";
import { PALETTE } from "@/shared/ui/palette";

/**
 * The link preview card: an attract-mode screen for the cabinet.
 *
 * File-based convention on purpose. Next resolves the emitted URL against
 * `metadataBase` (see `shared/lib/site-url`), so the card follows whatever host
 * the deployment happens to live on — no domain is named anywhere in the repo.
 *
 * Every fact is imported from the profile module, never retyped, so the card
 * cannot drift from the page it advertises. The palette comes from
 * `shared/ui/palette` for the same reason: Satori has no cascade, so the CSS
 * custom properties the site uses are meaningless here.
 */

export const alt = `${PROFILE.name} — ${PROFILE.role}`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/** One line of arcade chrome. Lives here because it appears exactly once. */
const ARCADE_LINE = "Portfolio · Pulsa Start";

/**
 * Press Start 2P as a raw TTF. `next/font/google` serves woff2, which Satori
 * cannot parse (ttf/otf/woff only), so the display face is vendored under
 * `assets/` and read once at module scope — the card is prerendered at build
 * time, so this never runs per request.
 */
const pressStart2P = await readFile(
  join(process.cwd(), "assets", "PressStart2P-Regular.ttf"),
);

/**
 * CRT scanlines, drawn as stacked rows rather than a repeating gradient:
 * Satori only guarantees a subset of CSS, and a flex column of fixed-height
 * children is in the part that is not a gamble.
 */
const SCANLINE_HEIGHT = 2;
const SCANLINE_GAP = 4;
const SCANLINE_COUNT = Math.ceil(
  size.height / (SCANLINE_HEIGHT + SCANLINE_GAP),
);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: PALETTE.crtVoid,
          fontFamily: "Press Start 2P",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            margin: 36,
            padding: "48px 56px",
            border: `4px solid ${PALETTE.signalMagenta}`,
            backgroundColor: PALETTE.crtPanel,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 16,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: PALETTE.signalCyan }}>
              {PROFILE.location}
            </span>
            <span style={{ color: PALETTE.signalAmber }}>{PROFILE.handle}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                lineHeight: 1.3,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: PALETTE.signalMagenta,
                textShadow: `0 0 24px ${PALETTE.signalMagenta}`,
              }}
            >
              {PROFILE.name}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 22,
                lineHeight: 1.7,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: PALETTE.signalAmber,
              }}
            >
              {PROFILE.role}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: PALETTE.signalGreen,
            }}
          >
            {ARCADE_LINE}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from({ length: SCANLINE_COUNT }, (_, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: SCANLINE_HEIGHT,
                marginBottom: SCANLINE_GAP,
                flexShrink: 0,
                backgroundColor: "rgba(0, 0, 0, 0.38)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Press Start 2P",
          data: pressStart2P,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
