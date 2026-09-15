/**
 * One dated stage on the experience ladder.
 *
 * Shared by the work history and the education list: both are "period + what +
 * where", and only the work entries carry responsibilities, so `bullets` is
 * optional rather than duplicated into a second near-identical type.
 */
export type TimelineEntry = {
  id: string;
  /** Rendered in the display face, so keep it short. See `TimelineList`. */
  period: string;
  /** Job title or qualification. */
  title: string;
  /** Employer or institution. */
  subtitle: string;
  location?: string;
  bullets?: readonly string[];
};
