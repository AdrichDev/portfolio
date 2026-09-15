import { FOCUS_RING } from "./accent-tone";

/**
 * `id` matches the section anchor and the `:has()` rules in `globals.css`, so
 * it stays in English. Only `label` is user-facing copy.
 */
const NAV_ITEMS = [
  { id: "about", label: "Perfil" },
  { id: "experience", label: "Experiencia" },
  { id: "projects", label: "Proyectos" },
] as const;

/**
 * Arcade menu for the three real sections.
 *
 * The selected-item marker is pure CSS: `:target` + `:has()` in `globals.css`
 * light up the entry matching the current hash, and hover/focus preview it.
 * That keeps this a Server Component — no state, no hydration cost.
 */
export function ArcadeNav() {
  return (
    <nav
      aria-label="Secciones principales"
      className="sticky top-0 z-40 border-b-2 border-crt-panel bg-crt-void/90 backdrop-blur-sm"
    >
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.id} data-nav-target={item.id}>
            <a
              href={`#${item.id}`}
              className={[
                "arcade-nav__link inline-flex items-center gap-2 py-1",
                "font-display text-[0.6rem] tracking-[0.2em] text-phosphor uppercase",
                "transition-colors hover:text-signal-amber focus-visible:text-signal-amber",
                FOCUS_RING,
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="arcade-nav__marker text-signal-amber"
              >
                &#9654;
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
