# Arcade journey verification

This dependency-free Node test runner uses an existing Playwright installation and installed Chrome. It exercises the rendered application; it does not report statement or unit coverage.

1. Install project dependencies with `pnpm install` and start `pnpm dev` (port 3001).
2. Make Playwright available in the local environment, or set `PLAYWRIGHT_MODULE` to the absolute path of an existing Playwright package. No runtime dependency is added to the app.
3. Run `node tests/arcade-journey.mjs`.

Optional environment variables:
- `BASE_URL`: running application URL (default `http://localhost:3001`).
- `PLAYWRIGHT_MODULE`: existing Playwright module directory; otherwise resolves `playwright` normally.
- `BROWSER_CHANNEL`: installed browser channel (default `chrome`; `msedge` is another option).
- `QA_OUTPUT`: screenshot folder (default OS temporary directory / `portfolio-arcade-qa`).

The runner covers six responsive viewport sizes, all four dialogs, internal scrolling, keyboard focus containment and restoration, pinned repository links, player skills, reduced motion, immediate startup without a loader, tiny-height layout and no-JavaScript reading. Screenshots are written outside the repository by default. A failing assertion exits with a non-zero status.

Initial RED: the existing page had a hash link labelled Pulsa Start, not the required START button / game journey. The executed browser test timed out locating START before implementation. Checkpoint commits were deferred to the parent review and human approval gate.

Historical refinement RED: the former `Portfolio ACV` label assertion returned zero matches before that batch. Additional scenarios now verify the centered menu Exit roundtrip without replaying startup, normal/reduced-motion blinking, nested keyword skill cards, and the dialog animation's initial rectangle matching its clicked menu button. No extra test dependency was added.

Aircraft/audio RED: the executed journey timed out finding the new exact `Press Start` button before implementation. The journey now checks five credits through exhaustion/refill, helper placement, equal menu boxes, reverse close while the background stays inert, repeated Escape, and real browser AudioContext start/mute/visibility/fallback behavior.

Run `node --test tests/arcade-music.test.mjs` for three additional deterministic synth lifecycle checks. These use the already-installed TypeScript compiler and a minimal AudioContext double to prove scheduler/voice cleanup, interrupted-resume safety, and unavailable-audio handling. No numeric coverage threshold is inferred from these tests.

## Immediate startup, battle and sound regression

The latest journey first failed with `No artificial startup loader` (2 unwanted elements), before removing the overlay. It now requires a Home-only `portfolio Adrián Chozas` label, shared computed menu typography, moving fighters/enemies/shots, visible mobile actors at three animation times, and a direct intro music gesture. Visibility and reduced-motion checks remain included.

Run `node tests/arcade-output.mjs` to render the **actual production synth** using Chrome's real OfflineAudioContext. Only the scheduler clock is controlled; oscillators, envelopes, filters and mixing are real. The baseline failed at RMS 0.002905 / peak 0.02583. The adjusted master gain yields RMS 0.01549 / peak 0.13778, with more than 17 dB peak headroom. This proves generated output, not the listener's OS volume or speaker audibility.

## Export verification

After `pnpm export:netlify`, run `node tests/static-export.mjs` with the same Playwright configuration. It starts and closes an isolated ephemeral-port static HTTP server, checks every exported CSS/JS/font/image resource, disallows external runtime requests, checks fonts/portrait/music/dialogs, then runs the complete journey against the **built artifact**, including six viewport sizes, reduced motion and no JavaScript. Static screenshots go to the OS temporary directory / `portfolio-static-qa`.
