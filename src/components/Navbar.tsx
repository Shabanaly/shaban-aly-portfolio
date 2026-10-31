"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ShieldCheck } from "lucide-react";

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
      <Link href="/#home" className="brand" onClick={closeMobileMenu}>
        Shaban Aly
      </Link>

      <nav className="site-nav" aria-label="Main navigation">
        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/#home" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/#projects" onClick={closeMobileMenu}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/#about" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li>
            <Link href="/#contact" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard"
              onClick={closeMobileMenu}
              className="text-xs opacity-70 hover:opacity-100 flex items-center gap-1.5"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 inline" />
              <span>Admin</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="nav-actions">
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
