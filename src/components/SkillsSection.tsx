import { ProfileSettings, SkillItem } from "@/types";
import { Cpu } from "lucide-react";

interface SkillsSectionProps {
  profile: ProfileSettings;
}

const defaultSkills: SkillItem[] = [
  { name: "HTML5", percentage: 95 },
  { name: "CSS3 / Responsive Design", percentage: 90 },
  { name: "JavaScript (ES6+)", percentage: 90 },
  { name: "TypeScript", percentage: 85 },
  { name: "React.js", percentage: 88 },
  { name: "Next.js (App Router)", percentage: 85 },
  { name: "Tailwind CSS", percentage: 92 },
  { name: "Git & Version Control", percentage: 85 },
  { name: "Supabase & Backend APIs", percentage: 80 },
];

export function SkillsSection({ profile }: SkillsSectionProps) {
  const skills = profile.skills && profile.skills.length > 0 ? profile.skills : defaultSkills;

  return (
    <section className="skills section py-16" id="skills">
      <div className="section-header text-center sm:text-left mb-12">
        <p className="eyebrow flex items-center justify-center sm:justify-start gap-1.5">
          <Cpu className="w-3.5 h-3.5" />
          <span>My Skills</span>
        </p>
        <h2>Technologies I Master</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-[var(--shadow-sm)] hover:border-[var(--brand-primary)]/40 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-[var(--text-primary)]">
                {skill.name}
              </span>
              <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                {skill.percentage}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-primary)]/40 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] transition-all duration-1000 ease-out"
                style={{ width: `${skill.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
