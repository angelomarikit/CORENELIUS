import { NextResponse } from "next/server";
import { deleteInquiry, setInquiryRead } from "@/lib/store";

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => null)) as { id?: string; is_read?: boolean } | null;
  if (!body?.id || typeof body.is_read !== "boolean") {
    return NextResponse.json({ error: "Missing message." }, { status: 400 });
  }
  try {
    await setInquiryRead(body.id, body.is_read);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "Missing message." }, { status: 400 });
  try {
    await deleteInquiry(body.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
