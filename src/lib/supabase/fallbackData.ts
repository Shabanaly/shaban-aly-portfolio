import { Project, ProfileSettings } from "@/types";

export const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Daleel Al-Suez",
    slug: "daleel-al-suez",
    category: "Business Directory Platform",
    description:
      "A modern digital business directory platform for Suez Governorate that helps users discover local businesses, services, restaurants, shops, doctors, and companies through an organized and searchable interface. The platform focuses on improving local business visibility and simplifying access to trusted information for residents and visitors.",
    short_description:
      "A modern digital business directory platform for Suez Governorate that helps users discover local businesses.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Responsive Design",
    ],
    features: [
      "Business listings",
      "Category filtering",
      "Responsive design",
      "SEO-friendly structure",
      "Local business discovery",
    ],
    status: "Live",
    url: "https://daleel-al-suez.com/",
    github_url: null,
    image_url: "/assets/images/projects/suez.png",
    order_index: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Daleel Al-Suez Tools",
    slug: "daleel-tools",
    category: "Web Tools Platform",
    description:
      "A collection of online productivity and utility tools designed to simplify everyday digital tasks. The platform provides fast, lightweight, and user-friendly tools accessible directly from the browser without requiring installation or registration.",
    short_description:
      "A collection of online productivity and utility tools designed to simplify everyday digital tasks.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Utility-focused design",
    ],
    features: [
      "Browser-based tools",
      "Fast performance",
      "Responsive UI",
      "Minimal design",
      "Utility-focused experience",
    ],
    status: "Live",
    url: "https://tools.daleel-al-suez.com/",
    github_url: null,
    image_url: "/assets/images/projects/tools.webp",
    order_index: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Portfolio Website",
    slug: "portfolio",
    category: "Personal Portfolio",
    description:
      "A responsive personal portfolio website created to showcase projects, technical skills, and development experience with a clean user interface and smooth interactive animations.",
    short_description:
      "A responsive personal portfolio website created to showcase projects, technical skills, and development experience.",
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS", "TypeScript"],
    features: [
      "Dark mode",
      "Responsive layout",
      "Interactive animations",
      "Project showcase",
      "Modern UI",
      "Admin Dashboard",
      "Supabase Integration",
    ],
    status: "Live",
    url: "https://shaban-aly-portfolio.vercel.app",
    github_url: "https://github.com/Shabanaly/shaban-aly-portfolio",
    image_url: "/assets/images/me/me.png",
    order_index: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const fallbackProfile: ProfileSettings = {
  id: "00000000-0000-0000-0000-000000000001",
  full_name: "Shaban Aly",
  job_title: "Frontend Developer",
  eyebrow: "I'm a Web Developer",
  hero_headline: "I build fast, responsive things for the web.",
  hero_description:
    "I'm a passionate web developer specializing in building exceptional digital experiences with modern technologies.",
  about_text:
    "I am a motivated software developer with a strong passion for creating user-friendly web applications. I enjoy working with modern frontend tools, improving interfaces, and turning ideas into practical products that feel fast, simple, and reliable to use.",
  profile_image_url: "/assets/images/me/me.png",
  resume_url: "/resume.pdf",
  stats: [
    {
      label: "Years Experience",
      value: "2+",
      icon: "calendar",
    },
    {
      label: "Projects Completed",
      value: "10+",
      icon: "code",
    },
    {
      label: "Code Quality",
      value: "100%",
      icon: "shield",
    },
    {
      label: "Client Satisfaction",
      value: "100%",
      icon: "smile",
    },
  ],
  skills: [
    { name: "HTML5", percentage: 95, icon: "html5" },
    { name: "CSS3 / Modern CSS", percentage: 90, icon: "css3" },
    { name: "JavaScript (ES6+)", percentage: 90, icon: "javascript" },
    { name: "TypeScript", percentage: 85, icon: "typescript" },
    { name: "React.js", percentage: 88, icon: "react" },
    { name: "Next.js (App Router)", percentage: 85, icon: "nextjs" },
    { name: "Tailwind CSS", percentage: 92, icon: "tailwind" },
    { name: "Git & GitHub", percentage: 85, icon: "git" },
    { name: "Supabase & PostgreSQL", percentage: 80, icon: "supabase" },
  ],
  testimonial: {
    quote:
      "Shaban is a dedicated developer who delivers high-quality work on time. His attention to detail, responsive design skills, and problem-solving mindset make him a great asset to any project.",
    author: "Eng. Ahmed Hassan",
    role: "Senior Engineering Lead",
  },
  social_links: [
    {
      name: "GitHub",
      url: "https://github.com/Shabanaly",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shaban-ali-03982a329/",
      icon: "linkedin",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/shabanaly2024/",
      icon: "facebook",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/201019979315?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%B4%D8%B9%D8%A8%D8%A7%D9%86%D8%8C%20%D9%84%D9%82%D8%AF%20%D9%88%D8%AC%D8%AF%D8%AA%20%D9%85%D9%84%D9%81%20%D8%A3%D8%B9%D9%85%D8%A7%D9%84%D9%83%20%D9%88%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83!",
      icon: "message-circle",
    },
    {
      name: "Email",
      url: "mailto:sa676185@gmail.com",
      icon: "mail",
    },
    {
      name: "Phone",
      url: "tel:+201019979315",
      icon: "phone",
    },
  ],
  updated_at: new Date().toISOString(),
};
