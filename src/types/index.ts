export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  short_description?: string | null;
  technologies: string[];
  features: string[];
  status: string;
  url?: string | null;
  github_url?: string | null;
  image_url: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: "calendar" | "code" | "shield" | "trophy" | "smile" | string;
}

export interface SkillItem {
  name: string;
  percentage: number;
  icon?: string;
  category?: "frontend" | "styling" | "tools" | "backend" | string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface ProfileSettings {
  id: string;
  full_name: string;
  job_title: string;
  eyebrow: string;
  hero_headline: string;
  hero_description: string;
  about_text: string;
  profile_image_url: string;
  resume_url?: string | null;
  social_links: SocialLink[];
  stats?: StatItem[];
  skills?: SkillItem[];
  testimonial?: Testimonial | null;
  updated_at: string;
}
