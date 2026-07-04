export function Tag({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={
        accent
          ? "rounded border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-xs font-medium text-accent"
          : "rounded border border-border px-2.5 py-1 font-mono text-xs text-ink-soft"
      }
    >
      {children}
    </span>
  );
}

export function StatBar({ stats }: { stats: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stats.map((stat, i) => (
        <Tag key={stat} accent={i === 0}>
          {stat}
        </Tag>
      ))}
    </div>
  );
}
