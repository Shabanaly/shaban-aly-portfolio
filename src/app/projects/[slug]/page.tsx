import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/BrandIcons";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.short_description || project.description.slice(0, 160),
    openGraph: {
      title: `${project.title} | Shaban Aly`,
      description:
        project.short_description || project.description.slice(0, 160),
      images: [
        {
          url: project.image_url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="project-details section">
          <Link className="back-link" href="/#projects">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          <div className="project-details-layout">
            <div className="project-details-image">
              <Image
                src={project.image_url}
                alt={project.title}
                width={800}
                height={550}
                priority
                className="w-full aspect-[16/11] object-cover"
              />
            </div>

            <div className="project-details-content">
              <p className="project-category">{project.category}</p>
              <h1>{project.title}</h1>
              <p>{project.description}</p>

              <div className="project-meta">
                <span>Status: {project.status}</span>
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              {project.features && project.features.length > 0 && (
                <div className="project-details-block">
                  <h2>Key Features</h2>
                  <ul className="feature-list">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-6">
                {project.url && project.url !== "#" && (
                  <a
                    className="live-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {project.github_url && (
                  <a
                    className="live-link bg-indigo-600 text-white hover:bg-indigo-700"
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View Source Code</span>
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
