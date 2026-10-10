"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Inquiry } from "@/lib/store";

function when(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function InquiryList({ initial }: { initial: Inquiry[] }) {
  const router = useRouter();
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");

  async function update(id: string, method: "PATCH" | "DELETE", body?: unknown) {
    setPending(id);
    setError("");
    const response = await fetch("/api/admin/inquiries", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? { id }),
    });
    setPending("");
    if (!response.ok) {
      const json = (await response.json()) as { error?: string };
      setError(json.error || "Could not update that message.");
      return;
    }
    router.refresh();
  }

  if (!initial.length) {
    return <p className="mt-8 border border-line bg-white px-5 py-8 text-sm text-muted">No messages yet. Submissions from the contact form will appear here.</p>;
  }

  return (
    <div className="mt-8 grid gap-4">
      {error ? <p className="text-sm text-crimson">{error}</p> : null}
      {initial.map((inquiry) => (
        <article key={inquiry.id} className="border border-line bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-medium">{inquiry.name}</h2>
              <p className="mt-1 text-sm text-muted">
                <a className="hover:text-crimson" href={`mailto:${inquiry.email}`}>
                  {inquiry.email}
                </a>
                {inquiry.phone ? ` · ${inquiry.phone}` : ""}
              </p>
            </div>
            <p className="text-xs text-muted">{when(inquiry.created_at)}</p>
          </div>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">Organization</dt>
              <dd>{inquiry.organization || "—"}</dd>
            </div>
            <div>
              <dt className="text-muted">Interest</dt>
              <dd>{inquiry.service || "—"}</dd>
            </div>
          </dl>
          <p className="mt-4 whitespace-pre-line text-sm leading-6">{inquiry.message}</p>
          <div className="mt-4 flex gap-4 text-sm">
            <button
              type="button"
              disabled={pending === inquiry.id}
              onClick={() => update(inquiry.id, "PATCH", { id: inquiry.id, is_read: !inquiry.is_read })}
              className="text-crimson"
            >
              {inquiry.is_read ? "Mark unread" : "Mark read"}
            </button>
            <button type="button" disabled={pending === inquiry.id} onClick={() => update(inquiry.id, "DELETE", { id: inquiry.id })} className="text-muted">
              Delete
            </button>
            {!inquiry.is_read ? <span className="text-xs uppercase tracking-[0.14em] text-orange">New</span> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
