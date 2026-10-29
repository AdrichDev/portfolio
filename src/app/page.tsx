import { AboutSection } from "@/modules/about/components/about-section";
import { ContactSection } from "@/modules/contact/components/contact-section";
import { ExperienceSection } from "@/modules/experience/components/experience-section";
import { ProjectsSection } from "@/modules/projects/components/projects-section";
import { ArcadeGame } from "@/shared/ui/arcade-game";
import { ScanlineOverlay } from "@/shared/ui/scanline-overlay";

// File-based previews are omitted only for host-agnostic manual exports.
export const metadata = process.env.PORTFOLIO_STATIC_EXPORT === "1" && !process.env.NEXT_PUBLIC_SITE_URL
  ? { openGraph: { images: [] }, twitter: { images: [] } }
  : {};

// Stage labels live in `shared/i18n/messages.ts`, keyed by these ids.
export default function HomePage() {
  return <><ScanlineOverlay /><ArcadeGame stages={[
    { id: "about", symbol: "☺", content: <AboutSection /> },
    { id: "experience", symbol: "⚑", content: <ExperienceSection /> },
    { id: "projects", symbol: "</>", content: <ProjectsSection /> },
    { id: "contact", symbol: "✉", content: <ContactSection /> },
  ]} /></>;
}
