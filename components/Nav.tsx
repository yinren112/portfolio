import Link from "next/link";
import { navLinks } from "@/lib/projects";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-ink"
        >
          瓦帕迪力
          <span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-ink-soft transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
