"use client";

import { useState } from "react";
import type { SectionKey } from "@/lib/content";

export const controlClass =
  "w-full border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-crimson";

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-muted">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input className={controlClass} value={value} onChange={(event) => onChange(event.target.value)} />
    </Field>
  );
}

export function AreaInput({
  label,
  value,
  onChange,
  hint,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      <textarea className={controlClass} rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
    </Field>
  );
}

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const json = (await response.json()) as { url?: string; error?: string };
    setUploading(false);
    if (!response.ok || !json.url) {
      setError(json.error || "Upload failed.");
      return;
    }
    onChange(json.url);
  }

  return (
    <Field label={label} hint="Use an existing path such as /media/photo.jpg, or upload a replacement.">
      {value ? (
        <span className="mb-3 block aspect-[16/8] overflow-hidden bg-paper">
          <img src={value} alt="" className="h-full w-full object-cover" />
        </span>
      ) : null}
      <input className={controlClass} value={value} onChange={(event) => onChange(event.target.value)} />
      <input className="mt-3 block text-sm" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => onFile(event.target.files?.[0])} />
      {uploading ? <span className="mt-2 block text-xs text-muted">Uploading…</span> : null}
      {error ? <span className="mt-2 block text-xs text-crimson">{error}</span> : null}
    </Field>
  );
}

export function ItemActions({
  index,
  total,
  onMove,
  onRemove,
}: {
  index: number;
  total: number;
  onMove: (index: number, direction: -1 | 1) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      <button type="button" disabled={index === 0} onClick={() => onMove(index, -1)} className="text-muted disabled:opacity-30">
        Move up
      </button>
      <button type="button" disabled={index === total - 1} onClick={() => onMove(index, 1)} className="text-muted disabled:opacity-30">
        Move down
      </button>
      <button type="button" onClick={() => onRemove(index)} className="text-crimson">
        Remove
      </button>
    </div>
  );
}

export function moveItem<T>(list: T[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= list.length) return list;
  const copy = list.slice();
  const [item] = copy.splice(index, 1);
  copy.splice(nextIndex, 0, item);
  return copy;
}

export function lines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

export function useSectionSave(section: SectionKey) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("Changes appear on the public site after you save.");

  async function save(data: unknown) {
    setStatus("saving");
    setMessage("Saving…");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, data }),
    });
    const json = (await response.json()) as { error?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(json.error || "Could not save this section.");
      return;
    }
    setStatus("saved");
    setMessage("Saved. Refresh the public site to see it.");
  }

  async function restore() {
    if (!window.confirm("Restore the original copy of this section?")) return;
    setStatus("saving");
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section }),
    });
    if (!response.ok) {
      const json = (await response.json()) as { error?: string };
      setStatus("error");
      setMessage(json.error || "Could not restore this section.");
      return;
    }
    window.location.reload();
  }

  return { status, message, save, restore };
}

export function SaveBar({
  status,
  message,
  onSave,
  onRestore,
}: {
  status: "idle" | "saving" | "saved" | "error";
  message: string;
  onSave: () => void;
  onRestore: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-20 mt-8 flex flex-wrap items-center justify-between gap-3 border border-line bg-white px-4 py-3 shadow-[0_12px_40px_rgba(41,41,41,0.08)]">
      <p className={`text-sm ${status === "error" ? "text-crimson" : "text-muted"}`}>{message}</p>
      <div className="flex items-center gap-4">
        <button type="button" onClick={onRestore} className="text-sm text-muted hover:text-crimson">
          Restore original
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={status === "saving"}
          className="rounded-full bg-crimson px-5 py-2 text-sm font-medium text-white hover:bg-crimson-deep disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save section"}
        </button>
      </div>
    </div>
  );
}

export function EditorIntro({ title, lede }: { title: string; lede: string }) {
  return (
    <header>
      <h1 className="text-3xl font-medium tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{lede}</p>
    </header>
  );
}
