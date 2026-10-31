"use client";

import { useState } from "react";
import Link from "next/link";
import { signInAdmin } from "../actions";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signInAdmin(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-page)] text-[var(--text-primary)]">
      <div className="w-full max-w-md p-8 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-[var(--shadow-lg)]">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to site</span>
          </Link>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-[var(--brand-primary)]">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <h1 className="text-2xl font-black mb-2">Admin Dashboard</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Sign in to manage projects, content, and portfolio settings.
        </p>

        {error && (
          <div className="p-3 mb-6 rounded-lg text-sm bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In to Admin</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
