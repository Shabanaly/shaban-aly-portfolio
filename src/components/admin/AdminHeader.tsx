"use client";

import Link from "next/link";
import { signOutAdmin } from "@/app/admin/actions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Globe, LogOut, LayoutDashboard } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="border-b border-[var(--border-primary)] bg-[var(--bg-header)] backdrop-blur px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-extrabold leading-none">
              Portfolio Admin
            </h1>
            <span className="text-xs text-[var(--text-muted)]">
              Shaban Aly Control Center
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-[var(--border-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Site</span>
          </Link>

          <ThemeToggle />

          <button
            onClick={() => signOutAdmin()}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
