import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="projects section" id="projects">
      <div className="section-header">
        <p className="eyebrow">Selected Work</p>
        <h2>Projects</h2>
      </div>
      <div className="project-grid" aria-live="polite">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))
        ) : (
          <p className="error-message">No published projects available.</p>
        )}
      </div>
    </section>
  );
}
