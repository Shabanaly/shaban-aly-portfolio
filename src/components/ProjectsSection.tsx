import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="projects section" id="projects">
      <div className="section-header text-center sm:text-left">
        <p className="eyebrow">Featured Projects</p>
        <h2>Some of My Recent Work</h2>
      </div>

      <div className="project-grid" aria-live="polite">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard
              key={project.id || project.slug}
              project={project}
              index={index}
            />
          ))
        ) : (
          <p className="error-message">No published projects available.</p>
        )}
      </div>
    </section>
  );
}
