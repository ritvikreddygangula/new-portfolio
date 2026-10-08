import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="relative">
      {/* Nav + hero sit inside a thin printed frame */}
      <div className="plate m-2.5 md:m-4">
        <Navigation />
        <HeroSection />
      </div>
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />

      <footer className="relative overflow-hidden px-6 pt-16 pb-10">
        <p
          aria-hidden="true"
          className="display pointer-events-none select-none absolute inset-x-0 -bottom-[0.12em] text-center uppercase leading-none text-[clamp(7rem,30vw,26rem)] text-foreground/[0.06]"
        >
          Gangula
        </p>
        <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-4 label text-foreground/80">
          <p>&copy; 2026 Ritvik Reddy Gangula</p>
          <div className="flex gap-6">
            <a href="https://github.com/ritvikreddygangula" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>
            <a href="https://linkedin.com/in/gritvik" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
            <a href="mailto:ritvikreddygangula@gmail.com" className="hover:text-primary">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
