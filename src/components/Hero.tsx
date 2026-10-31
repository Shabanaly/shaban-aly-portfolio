"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileSettings } from "@/types";

interface HeroProps {
  profile: ProfileSettings;
}

const icons = [
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

    // Create the icon elements
    const elements: Array<{
      element: HTMLImageElement;
      x: number;
      y: number;
      dx: number;
      dy: number;
    }> = [];

    container.innerHTML = "";

    icons.forEach((iconName) => {
      const img = document.createElement("img");
      img.src = `/assets/IconsFrameWorkes/${iconName}`;
      img.alt = iconName.split(".")[0];
      img.classList.add("tech-icon");
      container.appendChild(img);

      elements.push({
        element: img,
        x: Math.random() * (hero.clientWidth - 70),
        y: Math.random() * (hero.clientHeight - 70),
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      });
    });

    const animate = () => {
      if (isCleanedUp) return;

      const heroWidth = hero.clientWidth;
      const heroHeight = hero.clientHeight;

      elements.forEach((icon) => {
        const size = icon.element.offsetWidth || 50;

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
    <section className="hero section" id="home" ref={heroRef}>
      <div className="floating-icons" aria-hidden="true" ref={containerRef} />

      <div className="hero-inner">
        <div className="hero-content">
          <p className="eyebrow">{profile.eyebrow || "Frontend Developer"}</p>
          <h1>{profile.hero_headline || "Welcome to My Portfolio"}</h1>
          <p>
            Hi, I&apos;m <span>{profile.full_name}</span>, a web developer focused
            on building responsive, clean, and practical web experiences.
          </p>
          <Link className="primary-link" href="#projects">
            View Projects
          </Link>
        </div>

        <div className="hero-image">
          <Image
            src={profile.profile_image_url || "/assets/images/me/me.png"}
            alt={profile.full_name}
            width={340}
            height={340}
            priority
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
