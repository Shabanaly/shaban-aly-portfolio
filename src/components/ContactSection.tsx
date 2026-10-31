import { ProfileSettings, SocialLink } from "@/types";
import { MessageCircle, Mail, Phone, Globe } from "lucide-react";
import {
  GitHubIcon,
  LinkedInIcon,
  FacebookIcon,
} from "@/components/icons/BrandIcons";

interface ContactSectionProps {
  profile: ProfileSettings;
}

function getSocialIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("github")) {
    return <GitHubIcon className="w-5 h-5 text-indigo-500" />;
  }
  if (lower.includes("linkedin")) {
    return <LinkedInIcon className="w-5 h-5 text-blue-500" />;
  }
  if (lower.includes("facebook") || lower.includes("facbook")) {
    return <FacebookIcon className="w-5 h-5 text-sky-600" />;
  }
  if (lower.includes("whatsapp")) {
    return <MessageCircle className="w-5 h-5 text-emerald-500" />;
  }
  if (lower.includes("email") || lower.includes("mail")) {
    return <Mail className="w-5 h-5 text-rose-500" />;
  }
  if (lower.includes("phone") || lower.includes("tel")) {
    return <Phone className="w-5 h-5 text-amber-500" />;
  }
  return <Globe className="w-5 h-5 text-teal-500" />;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section className="contact section" id="contact">
      <div className="section-header">
        <p className="eyebrow">Contact</p>
        <h2>Get In Touch</h2>
      </div>
      <div className="contact-list">
        {profile.social_links.map((link: SocialLink) => (
          <a
            key={link.name}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {getSocialIcon(link.name)}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
