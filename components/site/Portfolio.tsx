import { Photo } from "@/components/site/Photo";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

export function Portfolio({ portfolio }: { portfolio: SiteContent["portfolio"] }) {
  return (
    <section id="portfolio" className="bg-paper py-24 lg:py-32">
      <div className="shell">
        <SectionHeading index="08" eyebrow={portfolio.eyebrow} title={portfolio.title}>
          {portfolio.intro}
        </SectionHeading>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {portfolio.items.map((item) => (
            <article key={item.title} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Photo
                  src={item.image}
                  alt={item.title}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-orange">{item.category}</p>
              <h3 className="mt-2 text-2xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
