/**
 * The owner's identity, as consumed by the hero and the profile section.
 *
 * Deliberately narrow: no phone number, no postal address. Only channels that
 * are safe to publish on a public, crawlable page.
 */
export type ContactLink = {
  id: string;
  label: string;
  href: string;
  /** Opens in a new tab. `mailto:` targets stay in the current one. */
  external: boolean;
};

export type Portrait = {
  /** Path under `public/`, consumed by `next/image`. */
  src: string;
  alt: string;
  /** Intrinsic pixel size of the source file. The asset is square. */
  size: number;
};

export type Profile = {
  name: string;
  handle: string;
  role: string;
  location: string;
  /** One line for the cabinet marquee. */
  tagline: string;
  portrait: Portrait;
  /** Long-form bio, one entry per paragraph. */
  bio: readonly string[];
  contacts: readonly ContactLink[];
};

/** A titled bag of short labels, rendered as pixel chips. */
export type SkillGroup = {
  id: string;
  title: string;
  items: readonly string[];
};
