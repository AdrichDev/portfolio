/**
 * The origin this deployment is actually reachable at, resolved at build time.
 *
 * Open Graph and Twitter images must be advertised as absolute URLs, which in
 * Next.js means `metadata.metadataBase` has to be set. The production domain
 * for this portfolio is not decided yet, and hardcoding a guess would emit
 * previews pointing at a host that does not exist — so the origin is derived
 * from the environment instead, and nothing in this repository names a domain.
 *
 * The chain below mirrors Next's own internal fallback
 * (`next/dist/lib/metadata/resolvers/resolve-url.js` →
 * `getSocialImageMetadataBaseFallback`) so that setting `metadataBase`
 * explicitly cannot *change* the resolved URL — it only silences the
 * "metadataBase property in metadata export is not set" build warning and makes
 * the precedence auditable here instead of buried in the framework.
 */

/** Vercel exposes hosts without a scheme; every Vercel URL is https. */
function fromVercelHost(host: string | undefined): URL | undefined {
  return host ? new URL(`https://${host}`) : undefined;
}

/**
 * Explicit override. Must be a full absolute URL (`https://example.com`),
 * unlike the Vercel variables, which are bare hostnames.
 *
 * `NEXT_PUBLIC_` prefixed so the same value is usable from client code later;
 * this module itself only ever runs on the server.
 */
function fromExplicitEnv(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return undefined;

  try {
    return new URL(raw);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be an absolute URL including the protocol (e.g. "https://example.com"), received: ${raw}`,
    );
  }
}

/**
 * Resolution order, highest priority first:
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — the custom domain, once there is one.
 * 2. `VERCEL_BRANCH_URL` / `VERCEL_URL` — but only on preview deployments, so a
 *    production build never advertises a per-deployment throwaway host.
 * 3. `VERCEL_PROJECT_PRODUCTION_URL` — the stable `*.vercel.app` production host.
 * 4. `http://localhost:<PORT>` — local development and local `next build`.
 *
 * Steps 2–4 are Vercel's System Environment Variables; they are only populated
 * when that project setting is enabled. On any other host, step 1 is the answer
 * and step 4 is the safety net.
 */
function resolveSiteUrl(): URL {
  const explicit = fromExplicitEnv();
  if (explicit) return explicit;

  if (process.env.VERCEL_ENV === "preview") {
    const preview = fromVercelHost(
      process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL,
    );
    if (preview) return preview;
  }

  const production = fromVercelHost(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (production) return production;

  return new URL(`http://localhost:${process.env.PORT ?? "3000"}`);
}

export const SITE_URL: URL = resolveSiteUrl();
