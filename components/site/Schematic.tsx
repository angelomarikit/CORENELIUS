"use client";

import { useState } from "react";
import { Modal } from "@/components/site/Modal";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

export function Schematic({ schematic }: { schematic: SiteContent["schematic"] }) {
  const [open, setOpen] = useState(false);

  return (
    <section id="process" className="bg-paper py-24 lg:py-32">
      <div className="shell">
        <SectionHeading index="06" eyebrow={schematic.eyebrow} title={schematic.title}>
          {schematic.intro}
        </SectionHeading>
        <figure className="mt-12 border border-line bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 text-xs uppercase tracking-[0.16em] text-muted">
            <span>P-03 · Flow diagram</span>
            <button type="button" onClick={() => setOpen(true)} className="text-crimson">
              View larger
            </button>
          </div>
          <button type="button" onClick={() => setOpen(true)} className="block w-full bg-paper p-3 text-left sm:p-6">
            <img src={schematic.image} alt={schematic.imageAlt} className="h-auto w-full bg-white" />
          </button>
          <figcaption className="border-t border-line px-5 py-4 text-sm text-muted">{schematic.caption}</figcaption>
        </figure>
      </div>
      <Modal open={open} title={schematic.caption} onClose={() => setOpen(false)} wide>
        <img src={schematic.image} alt={schematic.imageAlt} className="h-auto w-full" />
      </Modal>
    </section>
  );
}
