import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

export function Vision({ vision }: { vision: SiteContent["vision"] }) {
  return (
    <section id="vision" className="bg-paper py-24 lg:py-32">
      <div className="shell">
        <SectionHeading index="02" eyebrow={vision.eyebrow} title={vision.title} />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article className="bg-white p-8 md:p-10">
            <h3 className="font-serif text-3xl italic text-crimson">Vision</h3>
            <p className="mt-6 text-[17px] leading-8 text-ink/90">{vision.vision}</p>
          </article>
          <article className="bg-white p-8 md:p-10">
            <h3 className="font-serif text-3xl italic text-crimson">Mission</h3>
            <p className="mt-6 text-[17px] leading-8 text-ink/90">{vision.mission}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
