import { ProfileSettings } from "@/types";

interface AboutSectionProps {
  profile: ProfileSettings;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="about section" id="about">
      <div className="section-header">
        <p className="eyebrow">About</p>
        <h2>About Me</h2>
      </div>
      <div className="text-panel">
        <p>{profile.about_text}</p>
      </div>
    </section>
  );
}
