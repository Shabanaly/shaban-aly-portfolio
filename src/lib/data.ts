import { getPublicClient } from "./supabase/public";
import { createClient as createServerClient } from "./supabase/server";
import { fallbackProjects, fallbackProfile } from "./supabase/fallbackData";
import { Project, ProfileSettings } from "@/types";

export async function getProfile(): Promise<ProfileSettings> {
  try {
    const supabase = getPublicClient();
    if (!supabase) return fallbackProfile;

    const { data, error } = await supabase
      .from("profile_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      return fallbackProfile;
    }

    return data as ProfileSettings;
  } catch (error) {
    console.error("Error fetching profile settings:", error);
    return fallbackProfile;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = getPublicClient();
    if (!supabase) return fallbackProjects;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackProjects;
    }

    return data as Project[];
  } catch (error) {
    console.error("Error fetching public projects:", error);
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = getPublicClient();
    if (!supabase) {
      return fallbackProjects.find((p) => p.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return fallbackProjects.find((p) => p.slug === slug) || null;
    }

    return data as Project;
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error);
    return fallbackProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  try {
    const supabase = await createServerClient();
    if (!supabase) return fallbackProjects;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data) {
      return fallbackProjects;
    }

    return data as Project[];
  } catch (error) {
    console.error("Error fetching admin projects:", error);
    return fallbackProjects;
  }
}
