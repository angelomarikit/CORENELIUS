"use client";

import { useMemo, useState } from "react";
import {
  AreaInput,
  EditorIntro,
  ImageField,
  ItemActions,
  SaveBar,
  TextInput,
  controlClass,
  lines,
  moveItem,
  useSectionSave,
} from "@/components/admin/Fields";
import type { PortfolioItem, ProjectItem, ServiceItem, SiteContent } from "@/lib/content";

const projectGroups = ["Water systems", "Buildings", "Treatment plants", "Infrastructure"];

export function HeroEditor({ initial }: { initial: SiteContent }) {
  const [data, setData] = useState(initial.hero);
  const saver = useSectionSave("hero");
  const set = (key: keyof typeof data, value: string) => setData((current) => ({ ...current, [key]: value }));

  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Hero" lede="The first screen. Keep the name large and the sentence short." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={data.eyebrow} onChange={(value) => set("eyebrow", value)} />
        <TextInput label="Name" value={data.title} onChange={(value) => set("title", value)} />
        <TextInput label="Italic line" value={data.highlight} onChange={(value) => set("highlight", value)} />
        <AreaInput label="Introduction" value={data.subtitle} onChange={(value) => set("subtitle", value)} rows={4} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Primary button" value={data.primaryCta} onChange={(value) => set("primaryCta", value)} />
          <TextInput label="Primary link" value={data.primaryHref} onChange={(value) => set("primaryHref", value)} hint="Use #why or #contact." />
          <TextInput label="Secondary button" value={data.secondaryCta} onChange={(value) => set("secondaryCta", value)} />
          <TextInput label="Secondary link" value={data.secondaryHref} onChange={(value) => set("secondaryHref", value)} />
        </div>
        <ImageField label="Large photograph" value={data.imagePrimary} onChange={(value) => set("imagePrimary", value)} />
        <TextInput label="Large photograph description" value={data.imagePrimaryAlt} onChange={(value) => set("imagePrimaryAlt", value)} />
        <ImageField label="Inset photograph" value={data.imageSecondary} onChange={(value) => set("imageSecondary", value)} />
        <TextInput label="Inset photograph description" value={data.imageSecondaryAlt} onChange={(value) => set("imageSecondaryAlt", value)} />
        <div className="grid gap-4">
          {data.facts.map((fact, index) => (
            <div key={index} className="grid gap-3 border border-line bg-white p-4 sm:grid-cols-2">
              <TextInput
                label="Figure"
                value={fact.value}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    facts: current.facts.map((item, itemIndex) => (itemIndex === index ? { ...item, value } : item)),
                  }))
                }
              />
              <TextInput
                label="Label"
                value={fact.label}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    facts: current.facts.map((item, itemIndex) => (itemIndex === index ? { ...item, label: value } : item)),
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save(data)} onRestore={saver.restore} />
    </div>
  );
}

export function AboutEditor({ initial }: { initial: SiteContent }) {
  const [data, setData] = useState(initial.about);
  const saver = useSectionSave("about");
  const set = (key: keyof typeof data, value: string) => setData((current) => ({ ...current, [key]: value }));

  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Company" lede="Three short paragraphs read better than one block. The quote sits beside the photograph." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={data.eyebrow} onChange={(value) => set("eyebrow", value)} />
        <TextInput label="Heading" value={data.title} onChange={(value) => set("title", value)} />
        {data.paragraphs.map((paragraph, index) => (
          <AreaInput
            key={index}
            label={`Paragraph ${index + 1}`}
            value={paragraph}
            rows={5}
            onChange={(value) =>
              setData((current) => ({
                ...current,
                paragraphs: current.paragraphs.map((item, itemIndex) => (itemIndex === index ? value : item)),
              }))
            }
          />
        ))}
        <button
          type="button"
          className="justify-self-start text-sm text-crimson"
          onClick={() => setData((current) => ({ ...current, paragraphs: [...current.paragraphs, ""] }))}
        >
          Add paragraph
        </button>
        <AreaInput label="Quote" value={data.quote} onChange={(value) => set("quote", value)} />
        <ImageField label="Photograph" value={data.image} onChange={(value) => set("image", value)} />
        <TextInput label="Photograph description" value={data.imageAlt} onChange={(value) => set("imageAlt", value)} />
        <TextInput label="Caption" value={data.imageCaption} onChange={(value) => set("imageCaption", value)} />
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save(data)} onRestore={saver.restore} />
    </div>
  );
}

export function VisionEditor({ initial }: { initial: SiteContent }) {
  const [data, setData] = useState(initial.vision);
  const saver = useSectionSave("vision");
  const set = (key: keyof typeof data, value: string) => setData((current) => ({ ...current, [key]: value }));
  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Vision and mission" lede="Each statement has its own card. Keep them as written unless the company changes them." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={data.eyebrow} onChange={(value) => set("eyebrow", value)} />
        <TextInput label="Heading" value={data.title} onChange={(value) => set("title", value)} />
        <AreaInput label="Vision" value={data.vision} onChange={(value) => set("vision", value)} rows={7} />
        <AreaInput label="Mission" value={data.mission} onChange={(value) => set("mission", value)} rows={8} />
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save(data)} onRestore={saver.restore} />
    </div>
  );
}

export function OrganizationEditor({ initial }: { initial: SiteContent }) {
  const [data, setData] = useState(initial.organization);
  const saver = useSectionSave("organization");
  const set = (key: "eyebrow" | "title" | "intro" | "image" | "imageAlt", value: string) =>
    setData((current) => ({ ...current, [key]: value }));

  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Organization" lede="This section shows the organizational chart image. Replace the file if the chart changes." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={data.eyebrow} onChange={(value) => set("eyebrow", value)} />
        <TextInput label="Heading" value={data.title} onChange={(value) => set("title", value)} />
        <AreaInput label="Introduction" value={data.intro} onChange={(value) => set("intro", value)} />
        <ImageField label="Organizational chart" value={data.image} onChange={(value) => set("image", value)} />
        <TextInput label="Chart description" value={data.imageAlt} onChange={(value) => set("imageAlt", value)} />
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save(data)} onRestore={saver.restore} />
    </div>
  );
}

function ServiceListEditor({
  title,
  lede,
  section,
  initialItems,
  eyebrow,
  heading,
  intro,
  onMeta,
}: {
  title: string;
  lede: string;
  section: "services" | "advantages";
  initialItems: ServiceItem[];
  eyebrow: string;
  heading: string;
  intro: string;
  onMeta: (items: ServiceItem[], meta: { eyebrow: string; title: string; intro: string }) => unknown;
}) {
  const [meta, setMeta] = useState({ eyebrow, title: heading, intro });
  const [items, setItems] = useState(initialItems);
  const saver = useSectionSave(section);

  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title={title} lede={lede} />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={meta.eyebrow} onChange={(value) => setMeta((current) => ({ ...current, eyebrow: value }))} />
        <TextInput label="Heading" value={meta.title} onChange={(value) => setMeta((current) => ({ ...current, title: value }))} />
        <AreaInput label="Introduction" value={meta.intro} onChange={(value) => setMeta((current) => ({ ...current, intro: value }))} />
        {items.map((item, index) => (
          <div key={index} className="grid gap-3 border border-line bg-white p-4">
            <TextInput
              label="Title"
              value={item.title}
              onChange={(value) => setItems((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, title: value } : entry)))}
            />
            <AreaInput
              label="Summary"
              rows={3}
              value={item.summary}
              onChange={(value) => setItems((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, summary: value } : entry)))}
            />
            <ItemActions
              index={index}
              total={items.length}
              onMove={(itemIndex, direction) => setItems((current) => moveItem(current, itemIndex, direction))}
              onRemove={(itemIndex) => setItems((current) => current.filter((_, candidate) => candidate !== itemIndex))}
            />
          </div>
        ))}
        <button type="button" className="justify-self-start text-sm text-crimson" onClick={() => setItems((current) => [...current, { title: "New item", summary: "" }])}>
          Add item
        </button>
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save(onMeta(items, meta))} onRestore={saver.restore} />
    </div>
  );
}

export function ServicesEditor({ initial }: { initial: SiteContent }) {
  return (
    <ServiceListEditor
      title="Services"
      lede="Nine services is enough. One sentence each keeps the grid from feeling crowded."
      section="services"
      initialItems={initial.services.items}
      eyebrow={initial.services.eyebrow}
      heading={initial.services.title}
      intro={initial.services.intro}
      onMeta={(items, meta) => ({ ...initial.services, ...meta, items })}
    />
  );
}

export function AdvantagesEditor({ initial }: { initial: SiteContent }) {
  const [data, setData] = useState(initial.advantages);
  const saver = useSectionSave("advantages");
  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Core advantages" lede="The photograph stays on the left. Four short commitments sit on the right." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={data.eyebrow} onChange={(value) => setData((current) => ({ ...current, eyebrow: value }))} />
        <TextInput label="Heading" value={data.title} onChange={(value) => setData((current) => ({ ...current, title: value }))} />
        <AreaInput label="Introduction" value={data.intro} onChange={(value) => setData((current) => ({ ...current, intro: value }))} />
        <ImageField label="Photograph" value={data.image} onChange={(value) => setData((current) => ({ ...current, image: value }))} />
        <TextInput label="Photograph description" value={data.imageAlt} onChange={(value) => setData((current) => ({ ...current, imageAlt: value }))} />
        <TextInput label="Caption" value={data.imageCaption} onChange={(value) => setData((current) => ({ ...current, imageCaption: value }))} />
        {data.items.map((item, index) => (
          <div key={index} className="grid gap-3 border border-line bg-white p-4">
            <TextInput
              label="Title"
              value={item.title}
              onChange={(value) =>
                setData((current) => ({
                  ...current,
                  items: current.items.map((entry, entryIndex) => (entryIndex === index ? { ...entry, title: value } : entry)),
                }))
              }
            />
            <AreaInput
              label="Summary"
              rows={3}
              value={item.summary}
              onChange={(value) =>
                setData((current) => ({
                  ...current,
                  items: current.items.map((entry, entryIndex) => (entryIndex === index ? { ...entry, summary: value } : entry)),
                }))
              }
            />
          </div>
        ))}
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save(data)} onRestore={saver.restore} />
    </div>
  );
}

export function WhyEditor({ initial }: { initial: SiteContent }) {
  const [meta, setMeta] = useState({ eyebrow: initial.why.eyebrow, title: initial.why.title, intro: initial.why.intro });
  const [slides, setSlides] = useState(
    initial.why.slides.map((slide) => ({ ...slide, pointsText: slide.points.join("\n") })),
  );
  const saver = useSectionSave("why");

  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Why choose us" lede="Each slide is one theme. Put one point on each line. The public page shows a single slide at a time." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={meta.eyebrow} onChange={(value) => setMeta((current) => ({ ...current, eyebrow: value }))} />
        <TextInput label="Heading" value={meta.title} onChange={(value) => setMeta((current) => ({ ...current, title: value }))} />
        <AreaInput label="Introduction" value={meta.intro} onChange={(value) => setMeta((current) => ({ ...current, intro: value }))} />
        {slides.map((slide, index) => (
          <div key={index} className="grid gap-3 border border-line bg-white p-4">
            <TextInput
              label="Small label"
              value={slide.kicker}
              onChange={(value) => setSlides((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, kicker: value } : entry)))}
            />
            <TextInput
              label="Slide title"
              value={slide.title}
              onChange={(value) => setSlides((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, title: value } : entry)))}
            />
            <AreaInput
              label="Points"
              hint="One point per line."
              rows={6}
              value={slide.pointsText}
              onChange={(value) => setSlides((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, pointsText: value } : entry)))}
            />
            <ItemActions
              index={index}
              total={slides.length}
              onMove={(itemIndex, direction) => setSlides((current) => moveItem(current, itemIndex, direction))}
              onRemove={(itemIndex) => setSlides((current) => current.filter((_, candidate) => candidate !== itemIndex))}
            />
          </div>
        ))}
        <button
          type="button"
          className="justify-self-start text-sm text-crimson"
          onClick={() => setSlides((current) => [...current, { kicker: "Label", title: "New slide", points: [], pointsText: "" }])}
        >
          Add slide
        </button>
      </div>
      <SaveBar
        status={saver.status}
        message={saver.message}
        onRestore={saver.restore}
        onSave={() =>
          saver.save({
            ...meta,
            slides: slides.map((slide) => ({ kicker: slide.kicker, title: slide.title, points: lines(slide.pointsText) })),
          })
        }
      />
    </div>
  );
}

export function SchematicEditor({ initial }: { initial: SiteContent }) {
  const [data, setData] = useState(initial.schematic);
  const saver = useSectionSave("schematic");
  const set = (key: keyof typeof data, value: string) => setData((current) => ({ ...current, [key]: value }));
  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Schematic" lede="The drawing is shown whole, inside a sheet frame, and can be opened larger." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={data.eyebrow} onChange={(value) => set("eyebrow", value)} />
        <TextInput label="Heading" value={data.title} onChange={(value) => set("title", value)} />
        <AreaInput label="Introduction" value={data.intro} onChange={(value) => set("intro", value)} />
        <ImageField label="Diagram" value={data.image} onChange={(value) => set("image", value)} />
        <TextInput label="Diagram description" value={data.imageAlt} onChange={(value) => set("imageAlt", value)} />
        <TextInput label="Caption" value={data.caption} onChange={(value) => set("caption", value)} />
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save(data)} onRestore={saver.restore} />
    </div>
  );
}

export function PortfolioEditor({ initial }: { initial: SiteContent }) {
  const [meta, setMeta] = useState({ eyebrow: initial.portfolio.eyebrow, title: initial.portfolio.title, intro: initial.portfolio.intro });
  const [items, setItems] = useState<PortfolioItem[]>(initial.portfolio.items);
  const saver = useSectionSave("portfolio");

  function update(index: number, patch: Partial<PortfolioItem>) {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Portfolio" lede="Three photographs. A category, a title, and one sentence under each." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={meta.eyebrow} onChange={(value) => setMeta((current) => ({ ...current, eyebrow: value }))} />
        <TextInput label="Heading" value={meta.title} onChange={(value) => setMeta((current) => ({ ...current, title: value }))} />
        <AreaInput label="Introduction" value={meta.intro} onChange={(value) => setMeta((current) => ({ ...current, intro: value }))} />
        {items.map((item, index) => (
          <div key={index} className="grid gap-3 border border-line bg-white p-4">
            <TextInput label="Title" value={item.title} onChange={(value) => update(index, { title: value })} />
            <TextInput label="Category" value={item.category} onChange={(value) => update(index, { category: value })} />
            <AreaInput label="Summary" rows={3} value={item.summary} onChange={(value) => update(index, { summary: value })} />
            <ImageField label="Photograph" value={item.image} onChange={(value) => update(index, { image: value })} />
            <ItemActions
              index={index}
              total={items.length}
              onMove={(itemIndex, direction) => setItems((current) => moveItem(current, itemIndex, direction))}
              onRemove={(itemIndex) => setItems((current) => current.filter((_, candidate) => candidate !== itemIndex))}
            />
          </div>
        ))}
        <button
          type="button"
          className="justify-self-start text-sm text-crimson"
          onClick={() => setItems((current) => [...current, { title: "New project", category: "Category", image: "", summary: "" }])}
        >
          Add portfolio item
        </button>
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save({ ...meta, items })} onRestore={saver.restore} />
    </div>
  );
}

export function ProjectsEditor({ initial }: { initial: SiteContent }) {
  const [meta, setMeta] = useState({ eyebrow: initial.projects.eyebrow, title: initial.projects.title, intro: initial.projects.intro });
  const [items, setItems] = useState<ProjectItem[]>(initial.projects.items);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const saver = useSectionSave("projects");
  const visible = useMemo(
    () =>
      items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => `${item.title} ${item.owner} ${item.group}`.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  function update(index: number, patch: Partial<ProjectItem>) {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Project highlights" lede="The public page shows six cards at a time. Search here when the list is long, then open a row to edit it." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={meta.eyebrow} onChange={(value) => setMeta((current) => ({ ...current, eyebrow: value }))} />
        <TextInput label="Heading" value={meta.title} onChange={(value) => setMeta((current) => ({ ...current, title: value }))} />
        <AreaInput label="Introduction" value={meta.intro} onChange={(value) => setMeta((current) => ({ ...current, intro: value }))} />
        <input className={controlClass} placeholder="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} />
        <p className="text-xs text-muted">{items.length} projects</p>
        {visible.map(({ item, index }) => (
          <div key={`${item.title}-${item.owner}-${index}`} className="border border-line bg-white">
            <button type="button" className="flex w-full items-start justify-between gap-4 px-4 py-3 text-left" onClick={() => setOpen(open === index ? null : index)}>
              <span>
                <span className="block text-sm font-medium">{item.title}</span>
                <span className="mt-1 block text-xs text-muted">{item.owner}</span>
              </span>
              <span className="text-xs uppercase tracking-[0.14em] text-crimson">{item.status}</span>
            </button>
            {open === index ? (
              <div className="grid gap-3 border-t border-line p-4">
                <TextInput label="Title" value={item.title} onChange={(value) => update(index, { title: value })} />
                <TextInput label="Owner" value={item.owner} onChange={(value) => update(index, { owner: value })} />
                <label className="block text-sm font-medium">
                  Status
                  <select className={`${controlClass} mt-2`} value={item.status} onChange={(event) => update(index, { status: event.target.value })}>
                    <option value="completed">Completed</option>
                    <option value="ongoing">On-going</option>
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Type
                  <select className={`${controlClass} mt-2`} value={item.group} onChange={(event) => update(index, { group: event.target.value })}>
                    {projectGroups.map((group) => (
                      <option key={group}>{group}</option>
                    ))}
                  </select>
                </label>
                <ItemActions
                  index={index}
                  total={items.length}
                  onMove={(itemIndex, direction) => setItems((current) => moveItem(current, itemIndex, direction))}
                  onRemove={(itemIndex) => setItems((current) => current.filter((_, candidate) => candidate !== itemIndex))}
                />
              </div>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          className="justify-self-start text-sm text-crimson"
          onClick={() => {
            setItems((current) => [{ title: "New project", owner: "Owner", status: "completed", group: "Treatment plants" }, ...current]);
            setOpen(0);
            setQuery("");
          }}
        >
          Add project
        </button>
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save({ ...meta, items })} onRestore={saver.restore} />
    </div>
  );
}

export function PartnersEditor({ initial }: { initial: SiteContent }) {
  const [meta, setMeta] = useState({ eyebrow: initial.partners.eyebrow, title: initial.partners.title, intro: initial.partners.intro });
  const [groups, setGroups] = useState(initial.partners.groups.map((group) => ({ title: group.title, clientsText: group.clients.join("\n") })));
  const saver = useSectionSave("partners");

  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Partners and clients" lede="Each group is a card in the vertical slider. Put one organization on each line. Clicking the card opens this list." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={meta.eyebrow} onChange={(value) => setMeta((current) => ({ ...current, eyebrow: value }))} />
        <TextInput label="Heading" value={meta.title} onChange={(value) => setMeta((current) => ({ ...current, title: value }))} />
        <AreaInput label="Introduction" value={meta.intro} onChange={(value) => setMeta((current) => ({ ...current, intro: value }))} />
        {groups.map((group, index) => (
          <div key={index} className="grid gap-3 border border-line bg-white p-4">
            <TextInput
              label="Group title"
              value={group.title}
              onChange={(value) => setGroups((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, title: value } : entry)))}
            />
            <AreaInput
              label="Organizations"
              hint="One name per line."
              rows={8}
              value={group.clientsText}
              onChange={(value) => setGroups((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, clientsText: value } : entry)))}
            />
            <ItemActions
              index={index}
              total={groups.length}
              onMove={(itemIndex, direction) => setGroups((current) => moveItem(current, itemIndex, direction))}
              onRemove={(itemIndex) => setGroups((current) => current.filter((_, candidate) => candidate !== itemIndex))}
            />
          </div>
        ))}
        <button type="button" className="justify-self-start text-sm text-crimson" onClick={() => setGroups((current) => [...current, { title: "New group", clientsText: "" }])}>
          Add group
        </button>
      </div>
      <SaveBar
        status={saver.status}
        message={saver.message}
        onRestore={saver.restore}
        onSave={() => saver.save({ ...meta, groups: groups.map((group) => ({ title: group.title, clients: lines(group.clientsText) })) })}
      />
    </div>
  );
}

export function ContactEditor({ initial }: { initial: SiteContent }) {
  const [data, setData] = useState(initial.contact);
  const saver = useSectionSave("contact");
  const set = (key: keyof typeof data, value: string) => setData((current) => ({ ...current, [key]: value }));
  return (
    <div className="mx-auto max-w-3xl">
      <EditorIntro title="Contact and footer" lede="The form, the office details, and the crimson footer all read from this page." />
      <div className="mt-8 grid gap-5">
        <TextInput label="Eyebrow" value={data.eyebrow} onChange={(value) => set("eyebrow", value)} />
        <TextInput label="Heading" value={data.title} onChange={(value) => set("title", value)} />
        <AreaInput label="Introduction" value={data.intro} onChange={(value) => set("intro", value)} />
        <TextInput label="Phone" value={data.phone} onChange={(value) => set("phone", value)} />
        <TextInput label="Email" value={data.email} onChange={(value) => set("email", value)} />
        <TextInput label="Website" value={data.website} onChange={(value) => set("website", value)} />
        <AreaInput label="Address" hint="Line breaks are kept." value={data.address} onChange={(value) => set("address", value)} />
        <AreaInput label="Footer note" value={data.footerNote} onChange={(value) => set("footerNote", value)} />
      </div>
      <SaveBar status={saver.status} message={saver.message} onSave={() => saver.save(data)} onRestore={saver.restore} />
    </div>
  );
}
