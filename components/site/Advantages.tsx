import { Photo } from "@/components/site/Photo";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

export function Advantages({ advantages }: { advantages: SiteContent["advantages"] }) {
  return (
    <section id="advantages" className="bg-white py-24 lg:py-32">
      <div className="shell grid items-center gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-paper">
            <Photo src={advantages.image} alt={advantages.imageAlt} sizes="(min-width: 1024px) 36vw, 100vw" />
          </div>
          <figcaption className="mt-4 text-sm text-muted">{advantages.imageCaption}</figcaption>
        </figure>
        <div>
          <SectionHeading index="07" eyebrow={advantages.eyebrow} title={advantages.title}>
            {advantages.intro}
          </SectionHeading>
          <ol className="mt-10">
            {advantages.items.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[auto_1fr] gap-5 border-t border-line py-6">
                <span className="font-serif text-2xl italic text-crimson">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-sm leading-6 text-muted">{item.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
