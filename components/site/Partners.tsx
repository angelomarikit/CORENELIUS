"use client";

import { useState } from "react";
import { Modal } from "@/components/site/Modal";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { PartnerGroup, SiteContent } from "@/lib/content";

function GroupButton({
  group,
  index,
  onOpen,
  tabIndex,
}: {
  group: PartnerGroup;
  index: number;
  onOpen: (group: PartnerGroup) => void;
  tabIndex?: number;
}) {
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      onClick={() => onOpen(group)}
      className="flex w-[min(78vw,340px)] shrink-0 cursor-pointer flex-col justify-between border border-line bg-white px-6 py-7 text-left hover:border-crimson"
    >
      <span className="text-[11px] tabular-nums tracking-[0.18em] text-crimson">{String(index + 1).padStart(2, "0")}</span>
      <span className="mt-8 block text-xl font-medium leading-snug tracking-tight">{group.title}</span>
      <span className="mt-6 flex items-center justify-between gap-4 text-sm text-muted">
        <span>{group.clients.length} organizations</span>
        <span className="text-crimson">View names</span>
      </span>
    </button>
  );
}

export function Partners({ partners }: { partners: SiteContent["partners"] }) {
  const [active, setActive] = useState<PartnerGroup | null>(null);
  const groups = partners.groups;

  return (
    <section id="partners" className="overflow-hidden bg-paper py-24 lg:py-32">
      <div className="shell">
        <SectionHeading index="10" eyebrow={partners.eyebrow} title={partners.title}>
          {partners.intro}
        </SectionHeading>
      </div>
      <div className="marquee relative mt-12">
        <div className="marquee-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent" />
        <div className="marquee-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent" />
        <div className="marquee-track">
          <div className="flex gap-4 pr-4">
            {groups.map((group, index) => (
              <GroupButton key={group.title} group={group} index={index} onOpen={setActive} />
            ))}
          </div>
          <div className="marquee-clone flex gap-4 pr-4" aria-hidden="true">
            {groups.map((group, index) => (
              <GroupButton key={`${group.title}-clone`} group={group} index={index} tabIndex={-1} onOpen={setActive} />
            ))}
          </div>
        </div>
      </div>
      <Modal open={Boolean(active)} title={active?.title ?? "Partners"} onClose={() => setActive(null)}>
        {active ? (
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {active.clients.map((client) => (
              <li key={client} className="border-b border-line pb-3 text-sm leading-6">
                {client}
              </li>
            ))}
          </ul>
        ) : null}
      </Modal>
    </section>
  );
}
