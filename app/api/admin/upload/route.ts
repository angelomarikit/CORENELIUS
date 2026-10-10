import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  if (!allowed.has(file.type)) {
    return NextResponse.json({ error: "Use a JPG, PNG, WEBP, or GIF." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Images need to be under 8 MB." }, { status: 400 });
  }

  const extension = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const uploaded = await supabase.storage.from("media").upload(filename, bytes, {
      contentType: file.type,
      upsert: false,
    });
    if (uploaded.error) {
      return NextResponse.json(
        { error: `Upload failed. Confirm the public "media" bucket exists. ${uploaded.error.message}` },
        { status: 500 },
      );
    }
    const { data } = supabase.storage.from("media").getPublicUrl(filename);
    return NextResponse.json({ url: data.publicUrl });
  }

  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), bytes);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
