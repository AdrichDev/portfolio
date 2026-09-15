/**
 * Shape of a project card, mirroring the subset of the GitHub repository
 * payload we would consume later (`name`, `description`, `language`,
 * `html_url`, `homepage`), so the static list can be swapped for a real fetch
 * without touching the components.
 *
 * `stargazers_count` is deliberately absent: every repository here sits at
 * zero, so a star readout would render an identical "00000" on every card and
 * actively work against the work it is meant to showcase. The honest signal is
 * the language and whether the project is deployed.
 */
export type ProjectSummary = {
  /** GitHub repository name. Doubles as the React key and the card title. */
  repo: string;
  description: string;
  language: string;
  repoUrl: string;
  /** Present only when the project is publicly deployed. */
  demoUrl?: string;
};
