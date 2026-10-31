import { getProfile, getProjects } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

// Revalidate page data every hour or on-demand
export const revalidate = 3600;

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={profile} />
        <ProjectsSection projects={projects} />
        <AboutSection profile={profile} />
        <ContactSection profile={profile} />
      </main>
      <Footer />
    </>
  );
}
