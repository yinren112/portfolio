import RevealOnScroll from "@/components/RevealOnScroll";

export type Decision = {
  question: string;
  answer: string;
};

export default function DecisionList({ items }: { items: Decision[] }) {
  return (
    <div className="space-y-5">
      {items.map((item, i) => (
        <RevealOnScroll key={item.question} delay={i * 50}>
          <div className="border-l-2 border-border-dark/40 pl-5">
            <h3 className="mb-1.5 font-sans text-[15px] font-semibold text-ink">
              {i + 1}. {item.question}
            </h3>
            <p className="font-serif text-sm leading-relaxed text-ink-soft sm:text-[15px]">
              {item.answer}
            </p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
