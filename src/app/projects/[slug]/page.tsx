import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Layers,
  Sparkles,
  Code2,
  Globe,
  Monitor,
  LayoutGrid,
  Calendar,
  Check,
} from "lucide-react";
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
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  // Find previous and next projects for navigation
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-(--bg-page) text-(--text-primary) flex flex-col justify-between selection:bg-(--brand-primary) selection:text-white">
      <Navbar />

      <main className="pt-20 sm:pt-24 lg:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex-1">
        {/* Top Navigation Row: Back Button & Live Status */}
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full bg-(--bg-card) border border-(--border-primary) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--brand-primary) transition-all shadow-xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{project.status || "Live"}</span>
          </span>
        </div>

        {/* Project Header */}
        <header className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
          <div className="inline-block">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-500 dark:text-amber-400 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
              {project.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-(--text-primary) tracking-tight leading-tight">
            {project.title}
          </h1>

          {project.short_description && (
            <p className="text-sm sm:text-base lg:text-lg text-(--text-secondary) max-w-2xl leading-relaxed">
              {project.short_description}
            </p>
          )}
        </header>

        {/* Project Showcase Mockup Frame (Contain-Mode to ensure zero image cut off) */}
        <div className="relative mb-6 sm:mb-10 overflow-hidden rounded-xl sm:rounded-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl blur-lg -z-10 pointer-events-none" />

          {/* Browser Container */}
          <div className="rounded-xl sm:rounded-2xl border border-(--border-primary) bg-(--bg-card) shadow-lg dark:shadow-2xl overflow-hidden">
            {/* Browser Window Title Bar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-(--border-primary) bg-neutral-100/90 dark:bg-neutral-900/80 backdrop-blur-sm text-xs text-(--text-muted)">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              <div className="font-mono text-[10px] sm:text-xs truncate max-w-[170px] sm:max-w-xs text-(--text-muted) px-2.5 py-0.5 rounded bg-(--bg-page) border border-(--border-subtle)">
                {project.url ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.slug}
              </div>

              <div className="w-8 sm:w-12 text-right">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-(--text-primary) transition-colors inline-flex items-center"
                    title="Open live link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Showcase Image Canvas (Centered & Contained without crop) */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[460px] bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900/90 dark:to-neutral-950 flex items-center justify-center p-4 sm:p-8">
              <div className="relative w-full h-full">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                  className="object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Full width on mobile, inline on desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 sm:mb-12">
          {project.url && project.url !== "#" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/30 transition-all text-center"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-(--bg-card) border border-(--border-primary) text-(--text-primary) hover:border-(--brand-primary) hover:bg-(--brand-primary)/5 transition-all shadow-xs text-center"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-(--bg-card) border border-(--border-primary) mb-8 sm:mb-12 shadow-xs">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-(--text-muted) block mb-0.5">
              Category
            </span>
            <span className="text-xs sm:text-sm font-bold text-(--text-primary) truncate block">
              {project.category}
            </span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-(--text-muted) block mb-0.5">
              Status
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-500 flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block flex-shrink-0" />
              <span className="truncate">{project.status || "Live"}</span>
            </span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-(--text-muted) block mb-0.5">
              Role
            </span>
            <span className="text-xs sm:text-sm font-bold text-(--text-primary) truncate block">
              Frontend Development
            </span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-(--text-muted) block mb-0.5">
              Responsive
            </span>
            <span className="text-xs sm:text-sm font-bold text-(--text-primary) truncate block">
              Mobile &amp; Desktop
            </span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 sm:space-y-12">
          {/* About the Project */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-(--brand-primary) border border-blue-500/20">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-(--text-primary)">
                About the Project
              </h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-(--bg-card) border border-(--border-primary) shadow-xs">
              <p className="text-xs sm:text-sm md:text-base text-(--text-secondary) leading-relaxed whitespace-pre-line font-normal">
                {project.description}
              </p>
            </div>
          </section>

          {/* Key Features & Highlights */}
          {project.features && project.features.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-(--text-primary)">
                  Key Features &amp; Highlights
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 sm:p-4 rounded-xl bg-(--bg-card) border border-(--border-primary) shadow-xs hover:border-(--brand-primary)/40 transition-colors"
                  >
                    <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/10 text-emerald-500 flex-shrink-0">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-(--text-primary) leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technologies & Architecture */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-(--text-primary)">
                Technologies &amp; Architecture
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-(--bg-card) border border-(--border-primary) text-(--text-primary) shadow-xs hover:border-(--brand-primary) transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-(--brand-primary)" />
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Hire / Contact Callout Banner */}
          <section className="rounded-xl sm:rounded-2xl border border-(--border-primary) bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold text-(--text-primary)">
                Have a project in mind?
              </h3>
              <p className="text-xs sm:text-sm text-(--text-secondary) max-w-xl">
                I can help build responsive, fast, and modern web applications tailored to your business needs.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-(--brand-primary) text-white hover:bg-(--brand-primary)/90 transition-all shadow-sm flex-shrink-0 w-full sm:w-auto"
            >
              Get in Touch &rarr;
            </Link>
          </section>
        </div>

        {/* Bottom Project Pagination: 2-Column Responsive Grid */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-(--border-primary) space-y-4">
          <div className="flex justify-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-(--bg-card) border border-(--border-primary) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--brand-primary) transition-all"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Projects</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="flex items-center gap-2 p-2.5 sm:p-4 rounded-xl border border-(--border-primary) bg-(--bg-card) hover:border-(--brand-primary) transition-all group min-w-0 overflow-hidden w-full"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-(--brand-primary) flex-shrink-0 transition-transform group-hover:-translate-x-1" />
                <div className="min-w-0 overflow-hidden">
                  <span className="text-[10px] sm:text-xs text-(--text-muted) block uppercase tracking-wider font-semibold">
                    Prev
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-(--text-primary) truncate block">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="flex items-center justify-end text-right gap-2 p-2.5 sm:p-4 rounded-xl border border-(--border-primary) bg-(--bg-card) hover:border-(--brand-primary) transition-all group min-w-0 overflow-hidden w-full ml-auto"
              >
                <div className="min-w-0 overflow-hidden">
                  <span className="text-[10px] sm:text-xs text-(--text-muted) block uppercase tracking-wider font-semibold">
                    Next
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-(--text-primary) truncate block">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-(--brand-primary) flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
