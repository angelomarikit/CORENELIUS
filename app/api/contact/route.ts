import { NextResponse } from "next/server";
import { z } from "zod";
import { createInquiry } from "@/lib/store";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Add your name.").max(120),
  email: z.email("Use a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  organization: z.string().trim().max(160).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(8, "Add a short message.").max(5000),
  company_website: z.string().optional().default(""),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the form and try again." }, { status: 400 });
  }
  if (parsed.data.company_website) return NextResponse.json({ ok: true });

  try {
    await createInquiry({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      organization: parsed.data.organization,
      service: parsed.data.service,
      message: parsed.data.message,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not send the message.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
