import { getProfile, getProjects } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const revalidate = 3600;

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <>
      <Navbar />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection profile={profile} />
        <ProjectsSection projects={projects} />
        <ContactSection profile={profile} />
      </main>
      <Footer />
    </>
  );
}
