"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

export function WhyUs({ why }: { why: SiteContent["why"] }) {
  const slides = why.slides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7200);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (!slides.length) return null;
  const slide = slides[index] ?? slides[0];

  function step(direction: number) {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <section id="why" className="bg-white py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="05" eyebrow={why.eyebrow} title={why.title}>
            {why.intro}
          </SectionHeading>
          <p className="text-sm tabular-nums text-muted">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        </div>
        <div
          className={`mt-12 border border-line bg-paper p-7 md:p-12 ${paused ? "is-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div key={slide.title} className="slide-in grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="font-serif text-6xl italic leading-none text-crimson">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-orange">{slide.kicker}</p>
              <h3 className="mt-3 max-w-[16ch] text-3xl font-medium leading-tight tracking-tight">{slide.title}</h3>
            </div>
            <ul className="grid content-start gap-x-8 gap-y-5 sm:grid-cols-2">
              {slide.points.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-6">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-crimson" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 h-px bg-line">
            <div key={`bar-${index}-${paused ? "paused" : "play"}`} className="progress-bar h-px bg-crimson" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Reasons">
              {slides.map((item, itemIndex) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-label={item.title}
                  onClick={() => setIndex(itemIndex)}
                  className={itemIndex === index ? "h-2 w-8 bg-crimson" : "h-2 w-2 bg-ink/20"}
                />
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button type="button" onClick={() => setPaused((value) => !value)} className="text-muted hover:text-crimson">
                {paused ? "Play" : "Pause"}
              </button>
              <button type="button" onClick={() => step(-1)} className="hover:text-crimson">
                Previous
              </button>
              <button type="button" onClick={() => step(1)} className="hover:text-crimson">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
