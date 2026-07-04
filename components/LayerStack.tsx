export type StackLayer = {
  title: string;
  detail?: string;
  variant?: "default" | "accent";
};

export default function LayerStack({ layers }: { layers: StackLayer[] }) {
  return (
    <div className="flex flex-col items-center gap-0">
      {layers.map((layer, i) => (
        <div key={layer.title} className="flex w-full flex-col items-center">
          <div
            className={`w-full max-w-xl rounded-lg border p-4 text-center ${
              layer.variant === "accent"
                ? "border-accent/40 bg-accent/10"
                : "border-border bg-paper"
            }`}
          >
            <div
              className={`font-sans text-sm font-semibold ${
                layer.variant === "accent" ? "text-accent" : "text-ink"
              }`}
            >
              {layer.title}
            </div>
            {layer.detail && (
              <div className="mt-1 font-mono text-xs text-ink-soft">
                {layer.detail}
              </div>
            )}
          </div>
          {i < layers.length - 1 && (
            <div aria-hidden className="py-1.5 font-mono text-lg text-border-dark">
              ↓
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
