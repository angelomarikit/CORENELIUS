import { AdminNav } from "@/components/admin/AdminNav";
import { listInquiries, loadContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { meta } = await loadContent();
  let unread = 0;
  try {
    const inquiries = await listInquiries();
    unread = inquiries.filter((item) => !item.is_read).length;
  } catch {
    unread = 0;
  }

  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
      <AdminNav unread={unread} source={meta.source} />
      <div className="min-w-0">
        {meta.warning ? <p className="border-b border-line bg-white px-6 py-3 text-sm text-crimson">{meta.warning}</p> : null}
        {meta.source === "local" ? (
          <p className="border-b border-line bg-white px-6 py-3 text-sm leading-6 text-muted">
            Edits are saved on this computer. To use Supabase, add the project URL and service role key in .env.local, then run supabase/schema.sql.
          </p>
        ) : null}
        <div className="px-5 py-8 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
