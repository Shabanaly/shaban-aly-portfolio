"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, ProfileSettings } from "@/types";
import { useConfirm } from "@/context/ConfirmContext";
import {
  togglePublishAction,
  deleteProjectAction,
  updateProfileSettingsAction,
} from "@/app/admin/actions";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Layers,
  User,
  CheckCircle,
  Clock,
  Sparkles,
  Loader2,
  FileText,
  Quote,
} from "lucide-react";

interface Props {
  initialProjects: Project[];
  initialProfile: ProfileSettings;
}

export function DashboardClient({ initialProjects, initialProfile }: Props) {
  const { confirm, alert } = useConfirm();
  const [activeTab, setActiveTab] = useState<"projects" | "profile">("projects");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Filter projects by search
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const totalCount = projects.length;
  const publishedCount = projects.filter((p) => p.is_published).length;
  const inProgressCount = projects.filter(
    (p) => p.status.toLowerCase() === "in progress"
  ).length;

  async function handleTogglePublish(id: string, currentState: boolean) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_published: !currentState } : p))
    );
    await togglePublishAction(id, currentState);
  }

  async function handleDelete(id: string, slug: string, title: string) {
    const isConfirmed = await confirm({
      title: "Delete Project",
      message: `Are you sure you want to permanently delete "${title}"? This action cannot be undone.`,
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
      variant: "danger",
      icon: "trash",
    });

    if (!isConfirmed) {
      return;
    }

    setIsDeleting(id);
    const res = await deleteProjectAction(id, slug);
    setIsDeleting(null);

    if (res?.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } else {
      await alert({
        title: "Delete Failed",
        message: res?.error || "An unknown error occurred while deleting the project.",
        variant: "danger",
      });
    }
  }

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(false);

    const formData = new FormData(e.currentTarget);
    const res = await updateProfileSettingsAction(formData);

    setProfileSaving(false);
    if (res?.success) {
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 4000);
    } else {
      await alert({
        title: "Update Failed",
        message: res?.error || "An unknown error occurred while updating profile settings.",
        variant: "danger",
      });
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm) flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider">
              Total Projects
            </p>
            <p className="text-2xl font-black mt-1">{totalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-(--brand-primary) flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm) flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider">
              Live &amp; Published
            </p>
            <p className="text-2xl font-black text-emerald-500 mt-1">
              {publishedCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm) flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-(--text-muted) uppercase tracking-wider">
              In Progress
            </p>
            <p className="text-2xl font-black text-amber-500 mt-1">
              {inProgressCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-(--border-primary) gap-4">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "projects"
              ? "border-(--brand-primary) text-(--brand-primary)"
              : "border-transparent text-(--text-secondary) hover:text-(--text-primary)"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Projects Directory</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "profile"
              ? "border-(--brand-primary) text-(--brand-primary)"
              : "border-transparent text-(--text-secondary) hover:text-(--text-primary)"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile &amp; Bio Settings</span>
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
              <input
                type="text"
                placeholder="Search projects by name, category, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
              />
            </div>

            <Link
              href="/admin/projects/new"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-(--brand-primary) text-white text-sm font-bold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </Link>
          </div>

          <div className="border border-(--border-primary) rounded-xl bg-(--bg-card) overflow-hidden shadow-(--shadow-sm)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-(--bg-surface) border-b border-(--border-primary) text-xs text-(--text-muted) uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Visibility</th>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--border-primary)">
                  {filteredProjects.map((p, idx) => (
                    <tr
                      key={p.id}
                      className="hover:bg-(--bg-surface)/60 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-(--text-muted)">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="w-12 h-9 rounded overflow-hidden relative border border-(--border-primary) flex-shrink-0 bg-neutral-200 dark:bg-neutral-800">
                            <Image
                              src={p.image_url}
                              alt={p.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-(--text-primary)">
                              {p.title}
                            </div>
                            <div className="text-xs text-(--text-muted)">
                              /{p.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-(--text-secondary)">
                        {p.category}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                            p.status.toLowerCase() === "live"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleTogglePublish(p.id, p.is_published)}
                          className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border font-bold transition-colors ${
                            p.is_published
                              ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10"
                              : "border-gray-500/30 text-gray-500 bg-gray-500/5 hover:bg-gray-500/10"
                          }`}
                          title="Click to toggle visibility"
                        >
                          {p.is_published ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Public</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4 font-mono text-xs">
                        {p.order_index}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-(--border-primary) hover:bg-(--bg-card-hover) text-(--text-secondary)"
                            title="Preview details page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/admin/projects/${p.id}/edit`}
                            className="p-1.5 rounded-lg border border-(--border-primary) hover:bg-(--bg-card-hover) text-blue-500"
                            title="Edit project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleDelete(p.id, p.slug, p.title)}
                            disabled={isDeleting === p.id}
                            className="p-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-500 disabled:opacity-50"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredProjects.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-(--text-muted)"
                      >
                        No projects match your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Profile Settings Tab */}
      {activeTab === "profile" && (
        <div className="p-6 rounded-xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm) max-w-2xl">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-(--accent-secondary)" />
            <span>Edit Profile, Resume &amp; Bio</span>
          </h2>
          <p className="text-xs text-(--text-secondary) mb-6">
            Changes made here update the homepage hero section, resume link, and about text immediately.
          </p>

          {profileSuccess && (
            <div className="p-3 mb-6 rounded-lg text-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Profile settings saved and published successfully!</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  defaultValue={initialProfile.full_name}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
                  Job Title / Eyebrow
                </label>
                <input
                  type="text"
                  name="eyebrow"
                  defaultValue={initialProfile.eyebrow}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
                Hero Headline
              </label>
              <input
                type="text"
                name="hero_headline"
                defaultValue={initialProfile.hero_headline}
                required
                className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
                Hero Description
              </label>
              <textarea
                name="hero_description"
                rows={3}
                defaultValue={initialProfile.hero_description}
                className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
                About Me Bio
              </label>
              <textarea
                name="about_text"
                rows={4}
                defaultValue={initialProfile.about_text}
                className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
              />
            </div>

            {/* Resume / CV file link */}
            <div className="p-4 rounded-lg border border-(--border-primary) bg-(--bg-surface) space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-(--text-primary)">
                <FileText className="w-4 h-4 text-(--brand-primary)" />
                <span>Resume / CV Document</span>
              </div>
              <div>
                <label className="block text-xs text-(--text-secondary) mb-1">
                  Resume URL or File Path:
                </label>
                <input
                  type="text"
                  name="resume_url"
                  defaultValue={initialProfile.resume_url || "/resume.pdf"}
                  className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-card) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary) mb-2"
                />
                <input
                  type="file"
                  name="resume_file"
                  accept=".pdf,.doc,.docx"
                  className="text-xs text-(--text-secondary) file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-(--bg-card) file:text-(--text-primary) hover:file:bg-(--bg-card-hover) cursor-pointer"
                />
              </div>
            </div>

            {/* Testimonial / Recommendation or Philosophy Card */}
            <div className="p-4 rounded-lg border border-(--border-primary) bg-(--bg-surface) space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-(--text-primary)">
                <Quote className="w-4 h-4 text-(--brand-primary)" />
                <span>Footer Recommendation / Work Philosophy Card</span>
              </div>
              <p className="text-xs text-(--text-muted)">
                Customize the quote shown in the footer. You can write a recommendation from a client, or your personal work philosophy.
              </p>

              <div>
                <label className="block text-xs font-bold text-(--text-secondary) mb-1">
                  Quote / Statement Text
                </label>
                <textarea
                  name="testimonial_quote"
                  rows={3}
                  defaultValue={initialProfile.testimonial?.quote || ""}
                  placeholder="e.g. Shaban is a dedicated frontend developer..."
                  className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-card) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-(--text-secondary) mb-1">
                    Author / Heading Name
                  </label>
                  <input
                    type="text"
                    name="testimonial_author"
                    defaultValue={initialProfile.testimonial?.author || ""}
                    placeholder="e.g. Eng. Ahmed Hassan or Client Name"
                    className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-card) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-secondary) mb-1">
                    Role / Company
                  </label>
                  <input
                    type="text"
                    name="testimonial_role"
                    defaultValue={initialProfile.testimonial?.role || ""}
                    placeholder="e.g. Senior Engineering Lead or Startup Founder"
                    className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-card) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
                Profile Image URL (or upload below)
              </label>
              <input
                type="text"
                name="profile_image_url"
                defaultValue={initialProfile.profile_image_url}
                className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary) mb-2"
              />
              <input
                type="file"
                name="profile_image_file"
                accept="image/*"
                className="text-xs text-(--text-secondary) file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-(--bg-surface) file:text-(--text-primary) hover:file:bg-(--bg-card-hover) cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={profileSaving}
              className="mt-4 flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg font-bold text-white bg-(--brand-primary) hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {profileSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <span>Save Profile Settings</span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
