import Link from "next/link";
import { adminNav } from "@/lib/admin-nav";
import { listInquiries, loadContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { content, meta } = await loadContent();
  let inquiries: Awaited<ReturnType<typeof listInquiries>> = [];
  let inquiryError = "";
  try {
    inquiries = await listInquiries();
  } catch (error) {
    inquiryError = error instanceof Error ? error.message : "Inquiries could not be loaded.";
  }
  const unread = inquiries.filter((item) => !item.is_read).length;
  const partnerCount = content.partners.groups.reduce((sum, group) => sum + group.clients.length, 0);

  const stats = [
    { label: "Services", value: content.services.items.length },
    { label: "Projects", value: content.projects.items.length },
    { label: "Partners", value: partnerCount },
    { label: "Unread messages", value: unread },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-medium tracking-tight">Overview</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Change one section at a time. The public page reads {meta.source === "supabase" ? "Supabase" : "the saved file, or the original copy if nothing has been saved yet"}.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-line bg-white px-4 py-5">
            <p className="font-serif text-3xl italic text-crimson">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      {inquiryError ? <p className="mt-4 text-sm text-crimson">{inquiryError}</p> : null}
      <div className="mt-10 grid gap-2">
        {adminNav
          .filter((item) => item.href !== "/admin")
          .map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center justify-between border border-line bg-white px-4 py-3 text-sm hover:border-crimson">
              {item.label}
              <span className="text-crimson">Edit</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
