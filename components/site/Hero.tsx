import { Photo } from "@/components/site/Photo";
import type { SiteContent } from "@/lib/content";

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  const compactTitle = hero.title.length > 16;
  return (
    <section id="top" className="overflow-x-clip bg-white">
      <div className="shell grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:pb-28 lg:pt-16">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-crimson">{hero.eyebrow}</p>
          <h1 className="mt-5">
            <span
              className={`block font-medium leading-[0.9] tracking-[-0.045em] ${compactTitle ? "text-5xl sm:text-6xl" : "text-[clamp(3.4rem,8vw,6.3rem)]"}`}
            >
              {hero.title}
            </span>
            <span className="mt-4 block max-w-[16ch] font-serif text-[clamp(1.7rem,3vw,2.25rem)] italic leading-tight text-crimson">
              {hero.highlight}
            </span>
          </h1>
          <p className="mt-7 max-w-[42ch] text-lg leading-relaxed text-muted">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={hero.primaryHref} className="rounded-full bg-crimson px-6 py-3 text-sm font-medium text-white hover:bg-crimson-deep">
              {hero.primaryCta}
            </a>
            <a
              href={hero.secondaryHref}
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium hover:border-crimson hover:text-crimson"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="grid gap-3 sm:relative sm:block sm:pb-20">
          <div className="relative aspect-[16/11] overflow-hidden bg-paper">
            <Photo src={hero.imagePrimary} alt={hero.imagePrimaryAlt} priority sizes="(min-width: 1024px) 52vw, 100vw" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border-white bg-paper sm:absolute sm:bottom-0 sm:left-[-6%] sm:aspect-[4/5] sm:w-[44%] sm:border-[7px] sm:shadow-[0_20px_50px_rgba(41,41,41,0.16)]">
            <span className="absolute left-0 top-0 z-10 h-1 w-14 bg-orange" aria-hidden="true" />
            <Photo
              src={hero.imageSecondary}
              alt={hero.imageSecondaryAlt}
              sizes="280px"
              className="object-cover object-[center_18%]"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <dl className="shell grid grid-cols-2 lg:grid-cols-4">
          {hero.facts.map((fact, index) => (
            <div key={`${fact.value}-${fact.label}`} className={`px-1 py-6 ${index > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""}`}>
              <dt className="font-serif text-[1.7rem] italic leading-none text-crimson">{fact.value}</dt>
              <dd className="mt-2 text-sm text-muted">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
