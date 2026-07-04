import Link from "next/link";
import type { ProjectSummary } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={project.href}
      className="hover-lift pressable group block rounded-lg border border-border bg-paper p-6 hover:border-border-dark hover:shadow-[0_12px_30px_-8px_rgba(20,20,19,0.12)]"
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="font-sans text-lg font-semibold text-ink">
          {project.name}
        </h3>
        {project.external && (
          <span className="font-mono text-[11px] text-accent-green">
            在线体验 →
          </span>
        )}
      </div>
      <p className="mb-1 font-sans text-sm font-medium text-accent">
        {project.tagline}
      </p>
      <p className="mb-4 text-sm leading-relaxed text-ink-soft">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-ink-soft"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
