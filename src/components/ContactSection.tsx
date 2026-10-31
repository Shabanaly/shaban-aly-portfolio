import { ProfileSettings, SocialLink } from "@/types";
import {
  MessageCircle,
  Mail,
  Phone,
  ArrowUpRight,
  Quote,
  Sparkles,
} from "lucide-react";
import {
  GitHubIcon,
  LinkedInIcon,
  FacebookIcon,
} from "@/components/icons/BrandIcons";

interface ContactSectionProps {
  profile: ProfileSettings;
}

function getBrandIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("github")) {
    return <GitHubIcon className="w-4 h-4" />;
  }
  if (lower.includes("linkedin")) {
    return <LinkedInIcon className="w-4 h-4" />;
  }
  if (lower.includes("facebook") || lower.includes("facbook")) {
    return <FacebookIcon className="w-4 h-4" />;
  }
  if (lower.includes("whatsapp")) {
    return <MessageCircle className="w-4 h-4" />;
  }
  return <Mail className="w-4 h-4" />;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const testimonial = profile.testimonial || {
    quote:
      "Dedicated to building clean, scalable, and responsive web applications with high performance and seamless user experiences.",
    author: "Work Philosophy",
    role: "Engineering Standards",
  };

  // Only take social profiles (exclude email/phone since they are listed as contact rows below)
  const socialIcons = profile.social_links.filter((l) => {
    const n = l.name.toLowerCase();
    return !n.includes("email") && !n.includes("mail") && !n.includes("phone") && !n.includes("tel");
  });

  return (
    <section className="contact section py-12 sm:py-20" id="contact">
      <div className="section-header text-center sm:text-left mb-8 sm:mb-12">
        <p className="eyebrow flex items-center justify-center sm:justify-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </p>
        <h2>Let&apos;s Connect &amp; Collaborate</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Have a Project in Mind CTA */}
        <div className="p-6 sm:p-7 rounded-2xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm) flex flex-col justify-between space-y-6 min-w-0 overflow-hidden">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-(--accent-secondary)">
              Let&apos;s Work Together
            </span>
            <h3 className="text-2xl font-black text-(--text-primary)">
              Have a project in mind?
            </h3>
            <p className="text-sm text-(--text-secondary) leading-relaxed">
              I&apos;m always open to discussing new projects, frontend development
              opportunities, and technical challenges.
            </p>
          </div>

          <a
            href="mailto:sa676185@gmail.com"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-(--brand-primary) text-white font-extrabold text-sm hover:opacity-90 shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Column 2: Testimonial Quote Card */}
        <div className="p-6 sm:p-7 rounded-2xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm) flex flex-col justify-between space-y-6 min-w-0 overflow-hidden">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-(--brand-primary)/10 text-(--brand-primary) flex items-center justify-center">
              <Quote className="w-5 h-5" />
            </div>
            <p className="text-sm text-(--text-secondary) italic leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </div>

          <div className="pt-4 border-t border-(--border-primary)/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-(--brand-primary) text-white font-black flex items-center justify-center text-sm">
              {testimonial.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-extrabold text-sm text-(--text-primary)">
                {testimonial.author}
              </p>
              <p className="text-xs text-(--text-muted)">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>

        {/* Column 3: Follow Me & Direct Contact Info */}
        <div className="p-6 sm:p-7 rounded-2xl border border-(--border-primary) bg-(--bg-card) shadow-(--shadow-sm) flex flex-col justify-between space-y-6 min-w-0 overflow-hidden">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-(--accent-secondary) block mb-3">
              Follow &amp; Contact Me
            </span>

            {/* Social Icons row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              {socialIcons.map((link: SocialLink) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-(--bg-surface) border border-(--border-primary) flex items-center justify-center text-(--text-secondary) hover:text-white hover:bg-(--brand-primary) hover:border-transparent transition-all"
                  title={link.name}
                >
                  {getBrandIcon(link.name)}
                </a>
              ))}
            </div>

            {/* Direct Links */}
            <div className="space-y-3 pt-2 text-sm">
              <a
                href="mailto:sa676185@gmail.com"
                className="flex items-center gap-2.5 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              >
                <Mail className="w-4 h-4 text-(--brand-primary)" />
                <span>sa676185@gmail.com</span>
              </a>

              <a
                href="tel:+201019979315"
                className="flex items-center gap-2.5 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              >
                <Phone className="w-4 h-4 text-(--brand-primary)" />
                <span>+20 101 997 9315</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-(--border-primary)/40 text-xs text-(--text-muted)">
            Open for remote and freelance work worldwide.
          </div>
        </div>
      </div>
    </section>
  );
}
