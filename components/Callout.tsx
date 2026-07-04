export default function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-accent/30 bg-accent/5 p-5 sm:p-6">
      <h3 className="mb-2 font-sans text-base font-semibold text-ink">
        {title}
      </h3>
      <div className="font-serif text-sm leading-relaxed text-ink-soft sm:text-[15px]">
        {children}
      </div>
    </div>
  );
}
