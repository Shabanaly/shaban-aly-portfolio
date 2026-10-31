import Link from "next/link";
import { ProfileSettings, StatItem } from "@/types";
import {
  Calendar,
  Code2,
  ShieldCheck,
  Smile,
  Trophy,
  User,
  ArrowRight,
} from "lucide-react";

interface AboutSectionProps {
  profile: ProfileSettings;
}

function getStatIcon(iconName: string) {
  switch (iconName) {
    case "calendar":
      return <Calendar className="w-5 h-5 text-indigo-500" />;
    case "code":
      return <Code2 className="w-5 h-5 text-emerald-500" />;
    case "shield":
      return <ShieldCheck className="w-5 h-5 text-blue-500" />;
    case "trophy":
      return <Trophy className="w-5 h-5 text-amber-500" />;
    case "smile":
    default:
      return <Smile className="w-5 h-5 text-purple-500" />;
  }
}

export function AboutSection({ profile }: AboutSectionProps) {
  const stats: StatItem[] = profile.stats || [
    { label: "Years Experience", value: "2+", icon: "calendar" },
    { label: "Projects Completed", value: "10+", icon: "code" },
    { label: "Code Quality", value: "100%", icon: "shield" },
    { label: "Client Satisfaction", value: "100%", icon: "smile" },
  ];

  return (
    <section className="about section py-12 sm:py-20" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Bio Column */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--brand-primary)/10 border border-(--brand-primary)/20 text-(--brand-primary) text-xs font-bold uppercase tracking-wider">
            <span>ABOUT ME</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-(--text-primary) leading-tight">
            I&apos;m passionate about creating{" "}
            <span className="text-(--brand-primary)">
              digital solutions
            </span>
          </h2>

          <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
            {profile.about_text ||
              "I am a motivated software developer with a strong passion for creating user-friendly web applications. I enjoy working with modern frontend tools, improving interfaces, and turning ideas into practical products that feel simple to use."}
          </p>

          <div className="pt-2">
            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-(--border-primary) bg-(--bg-card) text-(--text-primary) font-bold text-sm hover:border-(--brand-primary) hover:bg-(--bg-card-hover) transition-all"
            >
              <User className="w-4 h-4 text-(--brand-primary)" />
              <span>Get In Touch With Me</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right 2x2 Stats Grid Column (2 columns even on mobile!) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-2xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm) hover:border-(--brand-primary)/40 hover:-translate-y-1 transition-all flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-(--bg-surface) border border-(--border-primary) flex items-center justify-center flex-shrink-0">
                {getStatIcon(stat.icon)}
              </div>

              <div>
                <p className="text-xl sm:text-3xl font-black text-(--text-primary) font-mono">
                  {stat.value}
                </p>
                <p className="text-[11px] sm:text-sm text-(--text-secondary) font-medium mt-1 leading-snug">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
