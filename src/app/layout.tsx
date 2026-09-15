import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Press_Start_2P } from "next/font/google";

import { PROFILE } from "@/modules/profile/profile";
import { SITE_URL } from "@/shared/lib/site-url";

import "./globals.css";

/** Display face: headings, labels and UI chrome only. Never running text. */
const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Body face: everything a human has to actually read. */
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const PAGE_TITLE = `${PROFILE.name} — ${PROFILE.role}`;

const PAGE_DESCRIPTION =
  "Portfolio de Adrián Chozas Vinuesa, desarrollador de aplicaciones multiplataforma en Madrid. Trabajador Social durante más de doce años, ahora centrado en React, Next.js, TypeScript, Tailwind CSS y Power Platform.";

/**
 * The preview image is not listed here: `app/opengraph-image.tsx` is picked up
 * by the file convention, and Next fills in `og:image` plus its type and
 * dimensions. `twitter.images` is then inherited from `openGraph.images`, so
 * `card` is the only Twitter field worth stating.
 *
 * `metadataBase` is derived from the environment rather than hardcoded — the
 * production domain is still undecided, and a guessed host would ship previews
 * pointing at nothing. See `shared/lib/site-url` for the precedence chain.
 */
export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: PROFILE.name, url: "https://github.com/AdrichDev" }],
  creator: PROFILE.name,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "profile",
    locale: "es_ES",
    siteName: PAGE_TITLE,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0410",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${pressStart2P.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="font-body flex min-h-full flex-col">{children}</body>
    </html>
  );
}
