import { notFound } from "next/navigation";
import {
  AboutEditor,
  AdvantagesEditor,
  ContactEditor,
  HeroEditor,
  OrganizationEditor,
  PartnersEditor,
  PortfolioEditor,
  ProjectsEditor,
  SchematicEditor,
  ServicesEditor,
  VisionEditor,
  WhyEditor,
} from "@/components/admin/Editors";
import { isSectionKey, type SectionKey } from "@/lib/content";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

const editors = {
  hero: HeroEditor,
  about: AboutEditor,
  vision: VisionEditor,
  organization: OrganizationEditor,
  services: ServicesEditor,
  why: WhyEditor,
  schematic: SchematicEditor,
  advantages: AdvantagesEditor,
  portfolio: PortfolioEditor,
  projects: ProjectsEditor,
  partners: PartnersEditor,
  contact: ContactEditor,
} satisfies Record<SectionKey, React.ComponentType<{ initial: Awaited<ReturnType<typeof getContent>> }>>;

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSectionKey(section)) notFound();
  const content = await getContent();
  const Editor = editors[section];
  return <Editor initial={content} />;
}
