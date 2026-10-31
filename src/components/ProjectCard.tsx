import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col rounded-2xl border border-(--border-primary) bg-(--bg-card) overflow-hidden shadow-(--shadow-sm) hover:shadow-(--shadow-lg) hover:border-(--brand-primary)/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      {/* Top Index & Arrow Indicator */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="font-mono text-sm font-bold text-(--text-muted) group-hover:text-(--brand-primary) transition-colors">
          {formattedIndex}
        </span>
        <div className="w-8 h-8 rounded-full bg-(--bg-surface) border border-(--border-primary) flex items-center justify-center text-(--text-secondary) group-hover:bg-(--brand-primary) group-hover:text-white group-hover:border-transparent transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Image Preview Container */}
      <div className="px-5 pb-2">
        <div className="overflow-hidden rounded-xl border border-(--border-primary) aspect-[16/10] relative bg-slate-100 dark:bg-neutral-900/40">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5 pt-3 gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-(--accent-secondary)">
            {project.category}
          </span>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
              project.status.toLowerCase() === "live"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
            }`}
          >
            {project.status}
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-(--text-primary) group-hover:text-(--brand-primary) transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-(--text-secondary) line-clamp-2 leading-relaxed">
          {project.short_description || project.description}
        </p>

        {/* Technologies Badges */}
        <div className="mt-auto pt-3 border-t border-(--border-primary)">
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="text-xs px-2.5 py-1 rounded-md bg-(--bg-surface) text-(--text-secondary) border border-(--border-primary) font-medium"
              >
                {tech}
              </li>
            ))}
            {project.technologies.length > 4 && (
              <li className="text-xs px-2 py-1 rounded-md text-(--text-muted) font-mono">
                +{project.technologies.length - 4}
              </li>
            )}
          </ul>
        </div>
      </div>
    </Link>
  );
}
