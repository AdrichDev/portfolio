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
  "Portfolio de Adrián Chozas Vinuesa, Software Developer en Madrid. Trabajador Social durante más de 12 años, ahora centrado en React, Next.js, TypeScript, Tailwind CSS, IA y Power Platform.";

// A portable export has no public host until uploaded. Omit absolute previews
// rather than publishing localhost; set NEXT_PUBLIC_SITE_URL when the host is known.
const portableExport = process.env.PORTFOLIO_STATIC_EXPORT === "1" && !process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: portableExport ? undefined : SITE_URL,
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
    url: portableExport ? undefined : "/",
    ...(portableExport ? { images: [] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    ...(portableExport ? { images: [] } : {}),
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
