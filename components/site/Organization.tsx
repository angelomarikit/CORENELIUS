"use client";

import { useState } from "react";
import { Modal } from "@/components/site/Modal";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

export function Organization({ organization }: { organization: SiteContent["organization"] }) {
  const [open, setOpen] = useState(false);

  return (
    <section id="team" className="bg-white py-24 lg:py-32">
      <div className="shell">
        <SectionHeading index="03" eyebrow={organization.eyebrow} title={organization.title}>
          {organization.intro}
        </SectionHeading>
        <figure className="mt-12 border border-line bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 text-xs uppercase tracking-[0.16em] text-muted">
            <span>Leadership</span>
            <button type="button" onClick={() => setOpen(true)} className="text-crimson">
              View larger
            </button>
          </div>
          <button type="button" onClick={() => setOpen(true)} className="block w-full overflow-x-auto bg-paper p-3 text-left sm:p-6">
            <img src={organization.image} alt={organization.imageAlt} className="mx-auto h-auto w-full min-w-[880px] bg-white" />
          </button>
        </figure>
      </div>
      <Modal open={open} title={organization.title} onClose={() => setOpen(false)} wide>
        <img src={organization.image} alt={organization.imageAlt} className="h-auto w-full" />
      </Modal>
    </section>
  );
}
