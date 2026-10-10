"use client";

import { useMemo, useState } from "react";
import { Modal } from "@/components/site/Modal";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { ProjectItem, SiteContent } from "@/lib/content";

const pageSize = 6;

function label(status: string) {
  if (status === "completed") return "Completed";
  if (status === "ongoing") return "On-going";
  return status;
}

export function Projects({ projects }: { projects: SiteContent["projects"] }) {
  const [status, setStatus] = useState("all");
  const [group, setGroup] = useState("all");
  const [visible, setVisible] = useState(pageSize);
  const [active, setActive] = useState<ProjectItem | null>(null);

  const statuses = useMemo(() => Array.from(new Set(projects.items.map((item) => item.status))), [projects.items]);
  const groups = useMemo(() => Array.from(new Set(projects.items.map((item) => item.group))), [projects.items]);
  const filtered = projects.items.filter((item) => (status === "all" || item.status === status) && (group === "all" || item.group === group));
  const shown = filtered.slice(0, visible);

  function chooseStatus(next: string) {
    setStatus(next);
    setVisible(pageSize);
  }

  function chooseGroup(next: string) {
    setGroup(next);
    setVisible(pageSize);
  }

  return (
    <section id="projects" className="bg-white py-24 lg:py-32">
      <div className="shell">
        <SectionHeading index="09" eyebrow={projects.eyebrow} title={projects.title}>
          {projects.intro}
        </SectionHeading>
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project status">
            {["all", ...statuses].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => chooseStatus(item)}
                className={`rounded-full px-4 py-2 text-sm ${status === item ? "bg-crimson text-white" : "bg-paper text-ink"}`}
              >
                {item === "all" ? "All" : label(item)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Project type">
            {["all", ...groups].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => chooseGroup(item)}
                className={group === item ? "text-crimson" : "text-muted hover:text-ink"}
              >
                {item === "all" ? "Every type" : item}
              </button>
            ))}
          </div>
        </div>
        {shown.length ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {shown.map((item) => (
              <button
                key={`${item.title}-${item.owner}`}
                type="button"
                onClick={() => setActive(item)}
                className="border border-line p-6 text-left transition hover:border-crimson"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-crimson">{label(item.status)}</p>
                <h3 className="mt-4 text-xl font-medium leading-snug tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.owner}</p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-ink/45">{item.group}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-muted">Nothing in this combination. Try another filter.</p>
        )}
        {visible < filtered.length ? (
          <button
            type="button"
            onClick={() => setVisible((count) => count + pageSize)}
            className="mt-8 text-sm font-medium text-crimson"
          >
            Show more · {filtered.length - visible} remaining
          </button>
        ) : null}
      </div>
      <Modal open={Boolean(active)} title={active?.title ?? "Project"} onClose={() => setActive(null)}>
        {active ? (
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted">Status</dt>
              <dd className="mt-1 text-base">{label(active.status)}</dd>
            </div>
            <div>
              <dt className="text-muted">Owner</dt>
              <dd className="mt-1 text-base">{active.owner}</dd>
            </div>
            <div>
              <dt className="text-muted">Type</dt>
              <dd className="mt-1 text-base">{active.group}</dd>
            </div>
          </dl>
        ) : null}
      </Modal>
    </section>
  );
}
