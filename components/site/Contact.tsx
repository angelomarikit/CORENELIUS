"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import type { SiteContent } from "@/lib/content";

const fieldClass = "mt-2 w-full border border-line bg-white px-4 py-3 text-sm outline-none focus:border-crimson";

export function Contact({ contact, services }: { contact: SiteContent["contact"]; services: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await response.json()) as { error?: string };
    if (!response.ok) {
      setStatus("error");
      setError(json.error || "The message could not be sent.");
      return;
    }
    setStatus("sent");
  }

  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <SectionHeading index="11" eyebrow={contact.eyebrow} title={contact.title}>
            {contact.intro}
          </SectionHeading>
          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="mt-1">
                <a className="text-base hover:text-crimson" href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="mt-1">
                <a className="text-base hover:text-crimson" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Office</dt>
              <dd className="mt-1 whitespace-pre-line text-base leading-7">{contact.address}</dd>
            </div>
          </dl>
        </div>
        <div className="border border-line bg-paper p-6 sm:p-8">
          {status === "sent" ? (
            <div className="py-10">
              <p className="font-serif text-3xl italic text-crimson">Received.</p>
              <p className="mt-4 max-w-sm text-muted">Thank you. We have the message and will reply from the office.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  Company website
                  <input name="company_website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  Name
                  <input name="name" required autoComplete="name" className={fieldClass} />
                </label>
                <label className="block text-sm">
                  Email
                  <input name="email" type="email" required autoComplete="email" className={fieldClass} />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  Phone
                  <input name="phone" autoComplete="tel" className={fieldClass} />
                </label>
                <label className="block text-sm">
                  Organization
                  <input name="organization" className={fieldClass} />
                </label>
              </div>
              <label className="block text-sm">
                Interest
                <select name="service" className={fieldClass} defaultValue="">
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Message
                <textarea name="message" required rows={5} className={fieldClass} />
              </label>
              {error ? <p className="text-sm text-crimson">{error}</p> : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className="justify-self-start rounded-full bg-crimson px-6 py-3 text-sm font-medium text-white hover:bg-crimson-deep disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
