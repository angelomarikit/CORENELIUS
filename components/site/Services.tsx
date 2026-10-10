import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

export function Services({ services }: { services: SiteContent["services"] }) {
  return (
    <section id="services" className="bg-paper py-24 lg:py-32">
      <div className="shell">
        <SectionHeading index="04" eyebrow={services.eyebrow} title={services.title}>
          {services.intro}
        </SectionHeading>
        <div className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, index) => (
            <article key={`${item.title}-${index}`} className="border-b border-r border-line bg-paper p-7 transition hover:bg-white">
              <p className="text-xs tabular-nums tracking-[0.18em] text-crimson">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
