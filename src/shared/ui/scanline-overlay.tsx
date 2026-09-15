/**
 * The CRT treatment for the whole viewport: drifting scanlines plus a vignette.
 *
 * Rendered once, near the root of the page. All of the heavy lifting lives in
 * `globals.css` under `.crt-overlay*` so the effect is defined in exactly one
 * place. The element is decorative, so it is hidden from assistive tech and
 * never receives pointer events.
 */
export function ScanlineOverlay() {
  return (
    <div aria-hidden="true" className="crt-overlay">
      <div className="crt-overlay__scanlines" />
      <div className="crt-overlay__vignette" />
    </div>
  );
}
