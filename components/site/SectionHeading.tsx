export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-crimson">
        <span className="mr-3 tabular-nums">{index}</span>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[clamp(2rem,4vw,3.15rem)] font-medium leading-[1.08] tracking-[-0.03em]">{title}</h2>
      {children ? <div className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">{children}</div> : null}
    </div>
  );
}
