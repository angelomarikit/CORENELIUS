import { Photo } from "@/components/site/Photo";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

export function About({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="company" className="bg-white py-24 lg:py-32">
      <div className="shell grid items-start gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <div>
          <SectionHeading index="01" eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-8 max-w-[62ch] space-y-5 text-[17px] leading-8 text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden bg-paper">
            <Photo src={about.image} alt={about.imageAlt} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-sm text-muted">
            <span>{about.imageCaption}</span>
            <span className="font-serif text-lg italic text-orange">AOP</span>
          </figcaption>
          <blockquote className="mt-8 border-l-2 border-crimson pl-5 font-serif text-[1.45rem] italic leading-snug">
            {about.quote}
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
