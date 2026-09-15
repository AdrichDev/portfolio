import { AboutSection } from "@/modules/about/components/about-section";
import { ExperienceSection } from "@/modules/experience/components/experience-section";
import { PROFILE } from "@/modules/profile/profile";
import { ProjectsSection } from "@/modules/projects/components/projects-section";
import { ArcadeHero } from "@/shared/ui/arcade-hero";
import { ArcadeNav } from "@/shared/ui/arcade-nav";
import { ScanlineOverlay } from "@/shared/ui/scanline-overlay";

export default function HomePage() {
  return (
    <>
      <ScanlineOverlay />
      <ArcadeNav />

      <main className="crt-grid flex flex-1 flex-col">
        <ArcadeHero profile={PROFILE} />

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-6 py-20 sm:py-24">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
        </div>
      </main>

      <footer className="border-t-2 border-crt-panel px-6 py-8 text-center font-display text-[0.5rem] leading-loose tracking-[0.3em] text-phosphor/50 uppercase">
        &#169; {PROFILE.name} &#183; {PROFILE.handle}
      </footer>
    </>
  );
}
