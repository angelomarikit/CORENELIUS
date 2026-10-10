import { InquiryList } from "@/components/admin/InquiryList";
import { listInquiries } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  let inquiries: Awaited<ReturnType<typeof listInquiries>> = [];
  let error = "";
  try {
    inquiries = await listInquiries();
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Inquiries could not be loaded.";
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-medium tracking-tight">Inquiries</h1>
      <p className="mt-2 text-sm leading-6 text-muted">Messages sent from the contact form. Mark them read once you have replied.</p>
      {error ? <p className="mt-6 text-sm text-crimson">{error}</p> : <InquiryList initial={inquiries} />}
    </div>
  );
}
