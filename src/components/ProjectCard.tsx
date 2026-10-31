import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="card-image">
        <Image
          src={project.image_url}
          alt={project.title}
          width={600}
          height={375}
          className="w-full aspect-[16/10] object-cover transition-transform duration-350"
        />
      </div>
      <div className="card-content">
        <div>
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
        </div>
        <p>
          {project.short_description ||
            project.description.slice(0, 120) + "..."}
        </p>
        <ul className="technology-list">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <Link href={`/projects/${project.slug}`}>View Details</Link>
      </div>
    </article>
  );
}
