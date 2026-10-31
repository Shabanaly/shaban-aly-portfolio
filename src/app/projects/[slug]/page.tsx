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

      <main className="pt-24 sm:pt-28 lg:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex-1">
        {/* Top Navigation Bar: Back Button & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-(--bg-card) border border-(--border-primary) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--brand-primary) hover:shadow-sm transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {project.status || "Live Project"}
            </span>
          </div>
        </div>

        {/* Project Header Info */}
        <header className="mb-10 sm:mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-500 dark:text-amber-400">
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-(--text-primary) tracking-tight">
            {project.title}
          </h1>

          {project.short_description && (
            <p className="text-base sm:text-lg lg:text-xl text-(--text-secondary) max-w-3xl leading-relaxed font-normal">
              {project.short_description}
            </p>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {project.url && project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/35 transition-all"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-(--bg-card) border border-(--border-primary) text-(--text-primary) hover:border-(--brand-primary) hover:bg-(--brand-primary)/5 transition-all shadow-xs"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </header>

        {/* Browser Window Showcase Frame */}
        <div className="relative mb-12 sm:mb-16">
          {/* Ambient Glow Backdrop */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10 pointer-events-none" />

          {/* Window Container */}
          <div className="rounded-2xl sm:rounded-3xl border border-(--border-primary) bg-(--bg-card) shadow-xl dark:shadow-2xl overflow-hidden">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-(--border-primary) bg-neutral-100/80 dark:bg-neutral-900/70 backdrop-blur-sm text-xs text-(--text-muted)">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="font-mono text-[11px] sm:text-xs truncate max-w-[180px] sm:max-w-md text-(--text-muted) px-3 py-1 rounded-md bg-(--bg-page) border border-(--border-subtle)">
                {project.url ? project.url.replace(/^https?:\/\//, "") : project.slug}
              </div>
              <div className="w-12 text-right">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-(--text-primary) transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5 inline" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-neutral-100 dark:bg-neutral-950">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Two-Column Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Story & Features (8 cols) */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {/* About Project */}
            <section className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-(--brand-primary) border border-blue-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary)">
                  About the Project
                </h2>
              </div>
              <p className="text-(--text-secondary) leading-relaxed text-base sm:text-lg whitespace-pre-line font-normal">
                {project.description}
              </p>
            </section>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary)">
                    Key Features &amp; Highlights
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-(--bg-card) border border-(--border-primary) shadow-xs hover:border-(--brand-primary)/40 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-(--text-primary) leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technologies Used */}
            <section className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <Code2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary)">
                  Technologies &amp; Architecture
                </h2>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-(--bg-card) border border-(--border-primary) text-(--text-primary) hover:border-(--brand-primary) hover:shadow-xs transition-all"
                  >
                    <span className="w-2 h-2 rounded-full bg-(--brand-primary)" />
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Project Sidebar Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Metadata Card */}
            <div className="rounded-2xl border border-(--border-primary) bg-(--bg-card) p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-(--text-primary) pb-3 border-b border-(--border-primary)">
                Project Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-1">
                    Category
                  </span>
                  <span className="font-semibold text-(--text-primary)">
                    {project.category}
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-1">
                    Status
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span className="font-semibold text-(--text-primary)">
                      {project.status || "Completed / Live"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-1">
                    Role &amp; Scope
                  </span>
                  <span className="font-semibold text-(--text-primary)">
                    Frontend Development &amp; UI Architecture
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-1">
                    Devices &amp; Responsiveness
                  </span>
                  <div className="flex items-center gap-2 text-(--text-primary)">
                    <Monitor className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-xs">
                      100% Mobile, Tablet &amp; Desktop Optimized
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar Action Link */}
              <div className="pt-4 border-t border-(--border-primary) space-y-3">
                {project.url && project.url !== "#" && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-(--brand-primary) text-white hover:bg-(--brand-primary)/90 transition-all shadow-sm"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Launch Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-(--bg-page) border border-(--border-primary) text-(--text-primary) hover:border-(--brand-primary) transition-all"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>

            {/* Hire / Collaborate Callout */}
            <div className="rounded-2xl border border-(--border-primary) bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-(--brand-primary)/10 dark:to-(--brand-secondary)/10 p-6 space-y-4">
              <h3 className="text-base font-bold text-(--text-primary)">
                Have a project in mind?
              </h3>
              <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                I can help build responsive, fast, and modern web applications tailored to your business needs.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-(--bg-card) border border-(--border-primary) text-(--text-primary) hover:border-(--brand-primary) hover:text-(--brand-primary) transition-all shadow-xs"
              >
                Let&apos;s Discuss Your Project &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Project Pagination Navigation (Previous / All / Next) */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-(--border-primary)">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Prev Project */}
            <div>
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="flex flex-col p-4 rounded-xl border border-(--border-primary) bg-(--bg-card) hover:border-(--brand-primary) transition-all group"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs text-(--text-muted) font-medium mb-1">
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    Previous Project
                  </span>
                  <span className="text-sm font-bold text-(--text-primary) truncate">
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Center: All Projects */}
            <div className="text-center">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-(--bg-card) border border-(--border-primary) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--brand-primary) transition-all"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Projects</span>
              </Link>
            </div>

            {/* Next Project */}
            <div className="text-right">
              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="flex flex-col items-end p-4 rounded-xl border border-(--border-primary) bg-(--bg-card) hover:border-(--brand-primary) transition-all group"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs text-(--text-muted) font-medium mb-1">
                    Next Project
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-sm font-bold text-(--text-primary) truncate">
                    {nextProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
