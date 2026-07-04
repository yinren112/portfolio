export type PipelineStage = {
  title: string;
  mode: "自动" | "半自动" | "人工";
  detail: string;
};

const MODE_STYLE: Record<PipelineStage["mode"], string> = {
  自动: "border-accent-green/40 bg-accent-green/10 text-accent-green",
  半自动: "border-accent/40 bg-accent/10 text-accent",
  人工: "border-accent-blue/40 bg-accent-blue/10 text-accent-blue",
};

export default function Pipeline({ stages }: { stages: PipelineStage[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0">
      {stages.map((stage, i) => (
        <div key={stage.title} className="flex flex-1 items-center gap-2 sm:gap-0">
          <div className="flex-1 rounded-lg border border-border bg-paper p-4">
            <span
              className={`mb-2 inline-block rounded border px-2 py-0.5 font-mono text-[10px] font-medium ${MODE_STYLE[stage.mode]}`}
            >
              {stage.mode}
            </span>
            <h4 className="mb-1 font-sans text-sm font-semibold text-ink">
              {stage.title}
            </h4>
            <p className="text-xs leading-relaxed text-ink-soft">
              {stage.detail}
            </p>
          </div>
          {i < stages.length - 1 && (
            <div
              aria-hidden
              className="flex shrink-0 items-center justify-center px-1 font-mono text-lg text-border-dark sm:px-2"
            >
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
