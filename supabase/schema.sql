-- ==============================================================================
-- Portfolio Database Schema & Seed Data for Shaban Aly
-- Supabase PostgreSQL
-- ==============================================================================

-- 1. Create Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null,
  description text not null,
  short_description text,
  technologies text[] default '{}'::text[],
  features text[] default '{}'::text[],
  status text not null default 'Live',
  url text,
  github_url text,
  image_url text not null,
  order_index integer default 0,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Profile / Site Settings Table
create table if not exists public.profile_settings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Shaban Aly',
  job_title text not null default 'Frontend Developer',
  eyebrow text default 'I''m a Web Developer',
  hero_headline text default 'I build fast, responsive things for the web.',
  hero_description text default 'I''m a passionate web developer specializing in building exceptional digital experiences with modern technologies.',
  about_text text default 'I am a motivated software developer with a strong passion for creating user-friendly web applications. I enjoy working with modern frontend tools, improving interfaces, and turning ideas into practical products that feel fast, simple, and reliable to use.',
  profile_image_url text default '/assets/images/me/me.png',
  resume_url text default '/resume.pdf',
  stats jsonb default '[
    {"label": "Years Experience", "value": "2+", "icon": "calendar"},
    {"label": "Projects Completed", "value": "10+", "icon": "code"},
    {"label": "Code Quality", "value": "100%", "icon": "shield"},
    {"label": "Client Satisfaction", "value": "100%", "icon": "smile"}
  ]'::jsonb,
  skills jsonb default '[
    {"name": "HTML5", "percentage": 95, "icon": "html5"},
    {"name": "CSS3 / Modern CSS", "percentage": 90, "icon": "css3"},
    {"name": "JavaScript (ES6+)", "percentage": 90, "icon": "javascript"},
    {"name": "TypeScript", "percentage": 85, "icon": "typescript"},
    {"name": "React.js", "percentage": 88, "icon": "react"},
    {"name": "Next.js (App Router)", "percentage": 85, "icon": "nextjs"},
    {"name": "Tailwind CSS", "percentage": 92, "icon": "tailwind"},
    {"name": "Git & GitHub", "percentage": 85, "icon": "git"},
    {"name": "Supabase & PostgreSQL", "percentage": 80, "icon": "supabase"}
  ]'::jsonb,
  testimonial jsonb default '{
    "quote": "Shaban is a dedicated developer who delivers high-quality work on time. His attention to detail, responsive design skills, and problem-solving mindset make him a great asset to any project.",
    "author": "Eng. Ahmed Hassan",
    "role": "Senior Engineering Lead"
  }'::jsonb,
  social_links jsonb default '[
    {"name": "GitHub", "url": "https://github.com/Shabanaly", "icon": "github"},
    {"name": "LinkedIn", "url": "https://www.linkedin.com/in/shaban-ali-03982a329/", "icon": "linkedin"},
    {"name": "Facebook", "url": "https://www.facebook.com/shabanaly2024/", "icon": "facebook"},
    {"name": "WhatsApp", "url": "https://wa.me/201019979315?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%B4%D8%B9%D8%A8%D8%A7%D9%86%D8%8C%20%D9%84%D9%82%D8%AF%20%D9%88%D8%AC%D8%AF%D8%AA%20%D9%85%D9%84%D9%81%20%D8%A3%D8%B9%D9%85%D8%A7%D9%84%D9%83%20%D9%88%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83!", "icon": "message-circle"},
    {"name": "Email", "url": "mailto:sa676185@gmail.com", "icon": "mail"},
    {"name": "Phone", "url": "tel:+201019979315", "icon": "phone"}
  ]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Row Level Security (RLS) Setup
alter table public.projects enable row level security;
alter table public.profile_settings enable row level security;

-- Projects Policies:
create policy "Allow public read access to published projects"
  on public.projects
  for select
  using (is_published = true or auth.role() = 'authenticated');

create policy "Allow authenticated admins full access to projects"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);

-- Profile Settings Policies:
create policy "Allow public read access to profile settings"
  on public.profile_settings
  for select
  using (true);

create policy "Allow authenticated admins to update profile settings"
  on public.profile_settings
  for all
  to authenticated
  using (true)
  with check (true);

-- 4. Storage Bucket Setup
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "Allow public read from portfolio bucket"
  on storage.objects for select
  using (bucket_id = 'portfolio');

create policy "Allow authenticated admin upload to portfolio bucket"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio');

create policy "Allow authenticated admin update in portfolio bucket"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio');

create policy "Allow authenticated admin delete from portfolio bucket"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio');

-- 5. Seed Initial Data
insert into public.profile_settings (id, full_name, job_title)
values ('00000000-0000-0000-0000-000000000001', 'Shaban Aly', 'Frontend Developer')
on conflict (id) do nothing;

insert into public.projects (title, slug, category, description, short_description, technologies, features, status, url, image_url, order_index, is_published)
values
(
  'Daleel Al-Suez',
  'daleel-al-suez',
  'Business Directory Platform',
  'A modern digital business directory platform for Suez Governorate that helps users discover local businesses, services, restaurants, shops, doctors, and companies through an organized and searchable interface. The platform focuses on improving local business visibility and simplifying access to trusted information for residents and visitors.',
  'A modern digital business directory platform for Suez Governorate that helps users discover local businesses.',
  array['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
  array['Business listings', 'Category filtering', 'Responsive design', 'SEO-friendly structure', 'Local business discovery'],
  'Live',
  'https://daleel-al-suez.com/',
  '/assets/images/projects/suez.png',
  1,
  true
),
(
  'Daleel Al-Suez Tools',
  'daleel-tools',
  'Web Tools Platform',
  'A collection of online productivity and utility tools designed to simplify everyday digital tasks. The platform provides fast, lightweight, and user-friendly tools accessible directly from the browser without requiring installation or registration.',
  'A collection of online productivity and utility tools designed to simplify everyday digital tasks.',
  array['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Utility-focused design'],
  array['Browser-based tools', 'Fast performance', 'Responsive UI', 'Minimal design', 'Utility-focused experience'],
  'Live',
  'https://tools.daleel-al-suez.com/',
  '/assets/images/projects/tools.webp',
  2,
  true
),
(
  'Portfolio Website',
  'portfolio',
  'Personal Portfolio',
  'A responsive personal portfolio website created to showcase projects, technical skills, and development experience with a clean user interface and smooth interactive animations.',
  'A responsive personal portfolio website created to showcase projects, technical skills, and development experience.',
  array['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'TypeScript'],
  array['Dark mode', 'Responsive layout', 'Interactive animations', 'Project showcase', 'Modern UI'],
  'Live',
  'https://shaban-aly-portfolio.vercel.app',
  '/assets/images/me/me.png',
  3,
  true
)
on conflict (slug) do nothing;
