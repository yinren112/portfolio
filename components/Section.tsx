import RevealOnScroll from "@/components/RevealOnScroll";

export default function Section({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RevealOnScroll className={`mt-12 sm:mt-14 ${className}`}>
      <section>
        {title && (
          <h2 className="mb-4 font-sans text-xl font-bold text-ink sm:text-2xl">
            {title}
          </h2>
        )}
        <div className="font-sans text-[15px] leading-relaxed text-ink-soft sm:text-base">
          {children}
        </div>
      </section>
    </RevealOnScroll>
  );
}
