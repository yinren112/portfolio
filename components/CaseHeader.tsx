import { StatBar } from "@/components/Tag";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function CaseHeader({
  name,
  tagline,
  stats,
  link,
}: {
  name: string;
  tagline: string;
  stats: string[];
  link?: { label: string; href: string };
}) {
  return (
    <RevealOnScroll>
      <div className="mb-4">
        <h1 className="mb-3 font-sans text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {name}
        </h1>
        <p className="mb-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
          {tagline}
        </p>
        <StatBar stats={stats} />
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="pressable mt-5 inline-block font-mono text-sm text-accent-blue underline decoration-accent-blue/30 underline-offset-4 transition-colors hover:text-accent"
          >
            → {link.label}
          </a>
        )}
      </div>
    </RevealOnScroll>
  );
}
