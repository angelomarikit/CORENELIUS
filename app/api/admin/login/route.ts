import { NextResponse } from "next/server";
import { COOKIE, passwordsMatch, sessionCookieOptions, signSession } from "@/lib/auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Set ADMIN_PASSWORD before signing in." }, { status: 500 });
  }
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  const password = body?.password ?? "";
  if (!(await passwordsMatch(password))) {
    return NextResponse.json({ error: "That password is not correct." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, await signSession(), sessionCookieOptions());
  return response;
}
