"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <Link href="/#home" className="brand flex items-center gap-2" onClick={closeMobileMenu}>
        <span className="text-(--brand-primary) font-mono font-black">&lt;/&gt;</span>
        <span>Shaban Aly</span>
      </Link>

      <nav className="site-nav" aria-label="Main navigation">
        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/#home" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/#about" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li>
            <Link href="/#skills" onClick={closeMobileMenu}>
              Skills
            </Link>
          </li>
          <li>
            <Link href="/#projects" onClick={closeMobileMenu}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/#contact" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
          <li className="sm:hidden">
            <Link
              href="/#contact"
              onClick={closeMobileMenu}
              className="text-center font-bold text-white bg-(--brand-primary) rounded-lg py-2"
            >
              Hire Me ↗
            </Link>
          </li>
        </ul>
      </nav>

      <div className="nav-actions">
        <Link
          href="/#contact"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-(--brand-primary) text-white text-xs font-bold hover:opacity-90 shadow-sm transition-all"
        >
          <span>Hire Me</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <ThemeToggle />

        <button
          className={`icon-button menu-toggle ${mobileMenuOpen ? "active" : ""}`}
          type="button"
          aria-label="Toggle navigation menu"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
}
