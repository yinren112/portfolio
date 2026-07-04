import RevealOnScroll from "@/components/RevealOnScroll";

export type TimelineNode = {
  time: string;
  title: string;
  body: string;
};

export default function Timeline({ nodes }: { nodes: TimelineNode[] }) {
  return (
    <div className="relative border-l border-border pl-6 sm:pl-8">
      {nodes.map((node, i) => (
        <RevealOnScroll key={node.time + node.title} delay={i * 60}>
          <div className="relative mb-10 last:mb-0">
            <span className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[calc(2rem+5px)]" />
            <div className="mb-1 font-mono text-xs font-medium tracking-wide text-accent">
              {node.time}
            </div>
            <h3 className="mb-1.5 font-sans text-base font-semibold text-ink">
              {node.title}
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
              {node.body}
            </p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
