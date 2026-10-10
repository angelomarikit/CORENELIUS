import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isSectionKey } from "@/lib/content";
import { restoreSection, saveSection } from "@/lib/store";

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as { section?: string; data?: unknown } | null;
  if (!body?.section || !isSectionKey(body.section)) {
    return NextResponse.json({ error: "Unknown section." }, { status: 400 });
  }
  try {
    await saveSection(body.section, body.data);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { section?: string } | null;
  if (!body?.section || !isSectionKey(body.section)) {
    return NextResponse.json({ error: "Unknown section." }, { status: 400 });
  }
  try {
    await restoreSection(body.section);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not restore.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
