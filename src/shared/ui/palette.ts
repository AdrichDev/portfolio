/**
 * The arcade palette as raw hex, for the renderers that cannot read CSS.
 *
 * Why this file exists (deliberate duplication, not an oversight):
 * `globals.css` declares the same seven colours in a Tailwind v4 `@theme`
 * block. Tailwind v4 resolves `@theme` at CSS parse time from *literal* values
 * in the stylesheet, so it cannot import them from TypeScript — and CSS custom
 * properties mean nothing inside `ImageResponse`, which renders through Satori
 * with no cascade and no `:root`.
 *
 * The only ways to get a single source of truth would be a codegen step that
 * emits `globals.css` from this module, or a PostCSS plugin — both are new
 * build machinery for seven hex strings that change roughly never. So the
 * values are mirrored on purpose, and this is the *one* TypeScript copy: every
 * future non-CSS consumer imports from here rather than retyping hexes.
 *
 * Contract: if a token changes in `globals.css`, change it here in the same
 * commit. The names match the `--color-*` tokens one-to-one to make that grep-able.
 */
export const PALETTE = {
  /** Surfaces */
  crtVoid: "#0b0410",
  crtPanel: "#1d1030",

  /** Text */
  phosphor: "#ece6f8",

  /** Accents */
  signalMagenta: "#ff2d88",
  signalCyan: "#22e0ff",
  signalAmber: "#ffc31a",
  signalGreen: "#4dff9f",
} as const;
