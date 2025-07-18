import { ProjectsSection } from "../components/ProjectsSection";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { SkillsSection } from "../components/SkillsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { SocialSidebar } from "../components/SocialSidebar";

import { useEffect } from "react";

export default function Home() {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased">
      <div className="max-w-[1000px] mx-auto">
        <Navigation />
        <SocialSidebar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
