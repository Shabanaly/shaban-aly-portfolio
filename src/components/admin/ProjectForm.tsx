"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { createProjectAction, updateProjectAction } from "@/app/admin/actions";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const isEditing = Boolean(project);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    let res;
    if (isEditing && project) {
      res = await updateProjectAction(project.id, formData);
    } else {
      res = await createProjectAction(formData);
    }

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-(--text-secondary) hover:text-(--text-primary) transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin</span>
        </Link>
        <h1 className="text-2xl font-black">
          {isEditing ? `Edit: ${project?.title}` : "Add New Project"}
        </h1>
      </div>

      {error && (
        <div className="p-3 mb-6 rounded-lg text-sm bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 rounded-xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm)"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange}
              required
              placeholder="e.g. Daleel Al-Suez"
              className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="e.g. daleel-al-suez"
              className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary) font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
              Category *
            </label>
            <input
              type="text"
              name="category"
              defaultValue={project?.category || ""}
              required
              placeholder="e.g. Web Tools Platform"
              className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
              Status *
            </label>
            <select
              name="status"
              defaultValue={project?.status || "Live"}
              className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
            >
              <option value="Live">Live</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
              Order Index
            </label>
            <input
              type="number"
              name="order_index"
              defaultValue={project?.order_index || 0}
              className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
            Short Description (for cards)
          </label>
          <input
            type="text"
            name="short_description"
            defaultValue={project?.short_description || ""}
            placeholder="One-line summary shown on homepage cards"
            className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
            Full Description *
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={project?.description || ""}
            required
            placeholder="Detailed description of the project, problem solved, and architecture..."
            className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
              Live URL
            </label>
            <input
              type="url"
              name="url"
              defaultValue={project?.url || ""}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
              GitHub Repo URL
            </label>
            <input
              type="url"
              name="github_url"
              defaultValue={project?.github_url || ""}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            name="technologies"
            defaultValue={project?.technologies.join(", ") || ""}
            placeholder="React, Next.js, Tailwind CSS, TypeScript"
            className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary) mb-1">
            Key Features (one per line)
          </label>
          <textarea
            name="features"
            rows={4}
            defaultValue={project?.features.join("\n") || ""}
            placeholder="Responsive UI&#10;Dark mode support&#10;Fast performance"
            className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-surface) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary)"
          />
        </div>

        {/* Image upload / URL */}
        <div className="p-4 rounded-lg border border-dashed border-(--border-primary) bg-(--bg-surface) space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
            <UploadCloud className="w-4 h-4 text-(--brand-primary)" />
            <span>Project Image</span>
          </div>

          <div>
            <label className="block text-xs text-(--text-secondary) mb-1">
              Upload New Image file (Uploads to Supabase Storage):
            </label>
            <input
              type="file"
              name="image_file"
              accept="image/*"
              className="text-xs text-(--text-secondary) file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-(--bg-card) file:text-(--text-primary) hover:file:bg-(--bg-card-hover) cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-(--text-secondary) mb-1">
              Or specify Image URL / Local path:
            </label>
            <input
              type="text"
              name="image_url"
              defaultValue={project?.image_url || "/assets/images/projects/suez.png"}
              className="w-full px-3 py-2 rounded-lg border border-(--border-primary) bg-(--bg-card) text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-primary) font-mono text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="is_published"
            name="is_published"
            defaultChecked={project ? project.is_published : true}
            className="w-4 h-4 rounded text-(--brand-primary) focus:ring-(--brand-primary)"
          />
          <label htmlFor="is_published" className="text-sm font-bold cursor-pointer">
            Publish this project immediately (Visible on homepage)
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-(--border-primary)">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-lg border border-(--border-primary) text-sm font-bold hover:bg-(--bg-surface) transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-(--brand-primary) text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{isEditing ? "Update Project" : "Create Project"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

