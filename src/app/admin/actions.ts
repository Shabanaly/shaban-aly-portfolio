"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      error:
        "Supabase credentials not configured in environment variables. Please check .env.local.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/admin/dashboard");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function uploadImageToStorage(file: File): Promise<string | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from("portfolio")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Storage upload error:", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio").getPublicUrl(filePath);

  return publicUrl;
}

export async function createProjectAction(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase client not available." };
  }

  const title = (formData.get("title") as string)?.trim();
  const slug = (
    formData.get("slug") as string ||
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  )?.trim();
  const category = (formData.get("category") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const short_description = (
    formData.get("short_description") as string
  )?.trim();
  const status = (formData.get("status") as string) || "Live";
  const url = (formData.get("url") as string)?.trim() || null;
  const github_url = (formData.get("github_url") as string)?.trim() || null;
  const order_index = parseInt(
    (formData.get("order_index") as string) || "0",
    10
  );
  const is_published = formData.get("is_published") === "on";

  const technologiesRaw = (formData.get("technologies") as string) || "";
  const technologies = technologiesRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const featuresRaw = (formData.get("features") as string) || "";
  const features = featuresRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  let image_url = (formData.get("image_url") as string)?.trim();

  const imageFile = formData.get("image_file") as File;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImageToStorage(imageFile);
    if (uploadedUrl) {
      image_url = uploadedUrl;
    }
  }

  if (!image_url) {
    image_url = "/assets/images/projects/suez.png";
  }

  const { error } = await supabase.from("projects").insert({
    title,
    slug,
    category,
    description,
    short_description,
    status,
    url,
    github_url,
    image_url,
    order_index,
    is_published,
    technologies,
    features,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  redirect("/admin/dashboard");
}

export async function updateProjectAction(id: string, formData: FormData) {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase client not available." };
  }

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const short_description = (
    formData.get("short_description") as string
  )?.trim();
  const status = (formData.get("status") as string) || "Live";
  const url = (formData.get("url") as string)?.trim() || null;
  const github_url = (formData.get("github_url") as string)?.trim() || null;
  const order_index = parseInt(
    (formData.get("order_index") as string) || "0",
    10
  );
  const is_published = formData.get("is_published") === "on";

  const technologiesRaw = (formData.get("technologies") as string) || "";
  const technologies = technologiesRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const featuresRaw = (formData.get("features") as string) || "";
  const features = featuresRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  let image_url = (formData.get("image_url") as string)?.trim();

  const imageFile = formData.get("image_file") as File;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImageToStorage(imageFile);
    if (uploadedUrl) {
      image_url = uploadedUrl;
    }
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      slug,
      category,
      description,
      short_description,
      status,
      url,
      github_url,
      image_url,
      order_index,
      is_published,
      technologies,
      features,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  redirect("/admin/dashboard");
}

export async function deleteProjectAction(id: string, slug: string) {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase client not available" };

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  return { success: true };
}

export async function togglePublishAction(id: string, currentState: boolean) {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase client not available" };

  const { error } = await supabase
    .from("projects")
    .update({ is_published: !currentState })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  return { success: true };
}

export async function updateProfileSettingsAction(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase client not available" };

  const full_name = (formData.get("full_name") as string)?.trim();
  const job_title = (formData.get("job_title") as string)?.trim();
  const eyebrow = (formData.get("eyebrow") as string)?.trim();
  const hero_headline = (formData.get("hero_headline") as string)?.trim();
  const hero_description = (formData.get("hero_description") as string)?.trim();
  const about_text = (formData.get("about_text") as string)?.trim();
  let profile_image_url = (formData.get("profile_image_url") as string)?.trim();
  let resume_url = (formData.get("resume_url") as string)?.trim();

  const profileImageFile = formData.get("profile_image_file") as File;
  if (profileImageFile && profileImageFile.size > 0) {
    const uploadedUrl = await uploadImageToStorage(profileImageFile);
    if (uploadedUrl) {
      profile_image_url = uploadedUrl;
    }
  }

  const resumeFile = formData.get("resume_file") as File;
  if (resumeFile && resumeFile.size > 0) {
    const uploadedResumeUrl = await uploadImageToStorage(resumeFile);
    if (uploadedResumeUrl) {
      resume_url = uploadedResumeUrl;
    }
  }

  const testimonial_quote = (formData.get("testimonial_quote") as string)?.trim();
  const testimonial_author = (formData.get("testimonial_author") as string)?.trim();
  const testimonial_role = (formData.get("testimonial_role") as string)?.trim();

  const testimonial = testimonial_quote
    ? {
        quote: testimonial_quote,
        author: testimonial_author || "Client Recommendation",
        role: testimonial_role || "Engineering Lead",
      }
    : null;

  const { error } = await supabase
    .from("profile_settings")
    .update({
      full_name,
      job_title,
      eyebrow,
      hero_headline,
      hero_description,
      about_text,
      profile_image_url,
      resume_url,
      testimonial,
      updated_at: new Date().toISOString(),
    })
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}
