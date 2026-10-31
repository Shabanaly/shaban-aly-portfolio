"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileSettings } from "@/types";
import { ArrowUpRight, Download, Terminal } from "lucide-react";

interface HeroProps {
  profile: ProfileSettings;
}

const techIcons = [
  { name: "HTML5", file: "angularjs.png" }, // fallback to icon files in assets
  { name: "JavaScript", file: "javascript.png" },
  { name: "TypeScript", file: "typescript.png" },
  { name: "React", file: "react.png" },
  { name: "Next.js", file: "nextjs.png" },
  { name: "Node.js", file: "node.png" },
  { name: "Redux", file: "redux.png" },
  { name: "Vue.js", file: "vuejs.png" },
];

const floatingIconFiles = [
  "angularjs.png",
  "javascript.png",
  "jquery.png",
  "json.png",
  "nextjs.png",
  "node.png",
  "npm.png",
  "react.png",
  "redux.png",
  "typescript.png",
  "vuejs.png",
];

export function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const container = containerRef.current;
    if (!hero || !container) return;

    let animationFrameId: number;
    let isCleanedUp = false;

    const elements: Array<{
      element: HTMLImageElement;
      x: number;
      y: number;
      dx: number;
      dy: number;
    }> = [];

    container.innerHTML = "";

    floatingIconFiles.forEach((iconName) => {
      const img = document.createElement("img");
      img.src = `/assets/IconsFrameWorkes/${iconName}`;
      img.alt = iconName.split(".")[0];
      img.classList.add("tech-icon");
      container.appendChild(img);

      elements.push({
        element: img,
        x: Math.random() * (hero.clientWidth - 70),
        y: Math.random() * (hero.clientHeight - 70),
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
      });
    });

    const animate = () => {
      if (isCleanedUp) return;

      const heroWidth = hero.clientWidth;
      const heroHeight = hero.clientHeight;

      elements.forEach((icon) => {
        const size = icon.element.offsetWidth || 48;

        icon.x += icon.dx;
        icon.y += icon.dy;

        if (icon.x <= 0 || icon.x >= heroWidth - size) icon.dx *= -1;
        if (icon.y <= 0 || icon.y >= heroHeight - size) icon.dy *= -1;

        icon.element.style.transform = `translate3d(${icon.x}px, ${icon.y}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isCleanedUp = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero section pt-28 pb-16" id="home" ref={heroRef}>
      <div className="floating-icons opacity-30" aria-hidden="true" ref={containerRef} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-140px)]">
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)] animate-pulse" />
            <span>{profile.eyebrow || "I'M A WEB DEVELOPER"}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-[var(--text-primary)]">
            Hi, I&apos;m{" "}
            <span className="text-[var(--brand-primary)] font-extrabold">
              {profile.full_name}
            </span>
            <br />
            <span className="text-[var(--text-secondary)] font-bold text-3xl sm:text-5xl">
              I build things for the web.
            </span>
          </h1>

          {/* Bio Description */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {profile.hero_description ||
              "I'm a passionate web developer specializing in building exceptional digital experiences with modern technologies."}
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--brand-primary)] text-white font-extrabold text-sm hover:opacity-90 shadow-lg hover:shadow-[var(--glow-primary)] hover:-translate-y-0.5 transition-all"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={profile.resume_url || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)] font-extrabold text-sm hover:border-[var(--brand-primary)] hover:bg-[var(--bg-card-hover)] hover:-translate-y-0.5 transition-all"
            >
              <Download className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Technologies Row Strip */}
          <div className="pt-6 border-t border-[var(--border-primary)]/40 max-w-lg mx-auto lg:mx-0">
            <p className="text-xs uppercase tracking-wider font-extrabold text-[var(--text-muted)] mb-3">
              Technologies I Work With
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {techIcons.map((tech) => (
                <div
                  key={tech.name}
                  className="w-10 h-10 rounded-lg p-2 bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm flex items-center justify-center hover:-translate-y-1 hover:border-[var(--brand-primary)]/50 transition-all"
                  title={tech.name}
                >
                  <img
                    src={`/assets/IconsFrameWorkes/${tech.file}`}
                    alt={tech.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Media Column (Photo + Circular Aura + Floating Code Snippet Card) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Subtle Circular Aura */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 blur-3xl pointer-events-none" />

          {/* Profile Image with Ring */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 border-2 border-[var(--brand-primary)]/30 bg-[var(--bg-card)] shadow-2xl overflow-hidden group">
            <Image
              src={profile.profile_image_url || "/assets/images/me/me.png"}
              alt={profile.full_name}
              fill
              priority
              className="rounded-full object-cover p-1 group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Floating Code Card Snippet */}
          <div className="hidden sm:block absolute -bottom-6 -right-2 sm:-right-6 w-64 p-3.5 rounded-xl bg-neutral-950/90 text-neutral-200 border border-neutral-800 shadow-2xl backdrop-blur-md font-mono text-[11px] leading-relaxed select-none">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                <Terminal className="w-3 h-3" />
                <span>developer.ts</span>
              </div>
            </div>

            <div>
              <span className="text-indigo-400">const</span>{" "}
              <span className="text-emerald-400">developer</span> = &#123;
            </div>
            <div className="pl-3">
              name: <span className="text-amber-300">&quot;Shaban Aly&quot;</span>,
            </div>
            <div className="pl-3">
              skills: [<span className="text-amber-300">&quot;React&quot;</span>,{" "}
              <span className="text-amber-300">&quot;Next.js&quot;</span>,{" "}
              <span className="text-amber-300">&quot;TS&quot;</span>],
            </div>
            <div className="pl-3">
              passion: <span className="text-amber-300">&quot;Building for the web&quot;</span>
            </div>
            <div>&#125;;</div>
          </div>
        </div>
      </div>
    </section>
  );
}
