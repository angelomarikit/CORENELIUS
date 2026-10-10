import { cache } from "react";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { defaultContent, mergeContent, type SectionKey, type SiteContent } from "@/lib/content";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export type StoreMeta = {
  source: "supabase" | "local";
  warning?: string;
};

const contentFile = path.join(process.cwd(), "data", "content.json");
const inquiriesFile = path.join(process.cwd(), "data", "inquiries.json");

function supabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function readLocalContent() {
  try {
    const raw = await readFile(contentFile, "utf8");
    return mergeContent(defaultContent, JSON.parse(raw));
  } catch {
    return defaultContent;
  }
}

async function writeLocalContent(content: SiteContent) {
  await mkdir(path.dirname(contentFile), { recursive: true });
  await writeFile(contentFile, JSON.stringify(content, null, 2));
}

export const loadContent = cache(async (): Promise<{ content: SiteContent; meta: StoreMeta }> => {
  const supabase = supabaseAdmin();
  if (!supabase) {
    return { content: await readLocalContent(), meta: { source: "local" } };
  }

  const { data, error } = await supabase.from("site_content").select("data").eq("id", "main").maybeSingle();
  if (error) {
    return {
      content: defaultContent,
      meta: {
        source: "supabase",
        warning: `Supabase is configured, but the content table could not be read. Run supabase/schema.sql. ${error.message}`,
      },
    };
  }

  if (!data?.data) {
    const seed = await supabase.from("site_content").upsert({
      id: "main",
      data: defaultContent,
      updated_at: new Date().toISOString(),
    });
    if (seed.error) {
      return {
        content: defaultContent,
        meta: { source: "supabase", warning: seed.error.message },
      };
    }
    return { content: defaultContent, meta: { source: "supabase" } };
  }

  return { content: mergeContent(defaultContent, data.data), meta: { source: "supabase" } };
});

export async function getContent() {
  const { content } = await loadContent();
  return content;
}

async function persist(content: SiteContent) {
  const supabase = supabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("site_content").upsert({
      id: "main",
      data: content,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return;
  }
  await writeLocalContent(content);
}

export async function saveSection(section: SectionKey, data: unknown) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("This section could not be saved.");
  }
  const { content } = await loadContent();
  const next = { ...content } as SiteContent;
  const record = next as unknown as Record<SectionKey, object>;
  record[section] = { ...(defaultContent[section] as object), ...(data as object) };
  await persist(next);
  return next;
}

export async function restoreSection(section: SectionKey) {
  const { content } = await loadContent();
  const next: SiteContent = { ...content, [section]: defaultContent[section] };
  await persist(next);
  return next;
}

async function readLocalInquiries(): Promise<Inquiry[]> {
  try {
    const parsed = JSON.parse(await readFile(inquiriesFile, "utf8"));
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
}

async function writeLocalInquiries(inquiries: Inquiry[]) {
  await mkdir(path.dirname(inquiriesFile), { recursive: true });
  await writeFile(inquiriesFile, JSON.stringify(inquiries, null, 2));
}

export async function listInquiries(): Promise<Inquiry[]> {
  const supabase = supabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("inquiries")
      .select("id, name, email, phone, organization, service, message, created_at, is_read")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Inquiry[];
  }
  const inquiries = await readLocalInquiries();
  return inquiries.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export async function createInquiry(input: Omit<Inquiry, "id" | "created_at" | "is_read">) {
  const supabase = supabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("inquiries").insert(input);
    if (error) throw new Error(error.message);
    return;
  }
  const inquiries = await readLocalInquiries();
  inquiries.unshift({
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    is_read: false,
  });
  await writeLocalInquiries(inquiries);
}

export async function setInquiryRead(id: string, isRead: boolean) {
  const supabase = supabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("inquiries").update({ is_read: isRead }).eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const inquiries = await readLocalInquiries();
  await writeLocalInquiries(inquiries.map((item) => (item.id === id ? { ...item, is_read: isRead } : item)));
}

export async function deleteInquiry(id: string) {
  const supabase = supabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const inquiries = await readLocalInquiries();
  await writeLocalInquiries(inquiries.filter((item) => item.id !== id));
}

export function storageMode() {
  return supabaseAdmin() ? "supabase" : "local";
}
