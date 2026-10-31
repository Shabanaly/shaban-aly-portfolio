export function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t border-[var(--border-primary)] bg-[var(--bg-header)] backdrop-blur text-xs text-[var(--text-secondary)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>&copy; {new Date().getFullYear()} Shaban Aly. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <span>Made with</span>
          <span className="text-rose-500 animate-pulse">❤️</span>
          <span>by Shaban Aly</span>
        </p>
      </div>
    </footer>
  );
}
