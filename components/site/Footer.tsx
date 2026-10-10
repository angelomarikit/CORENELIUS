import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import type { SiteContent } from "@/lib/content";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M8 3.5h3l1.2 3.2-1.8 1.1a12 12 0 0 0 5.8 5.8l1.1-1.8 3.2 1.2v3A1.5 1.5 0 0 1 19 17.5 16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5h3Z" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.2 2.4 3.3 5.1 3.3 8S14.2 17.6 12 20c-2.2-2.4-3.3-5.1-3.3-8S9.8 6.4 12 4Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="1.8" />
    </svg>
  );
}

export function Footer({ contact }: { contact: SiteContent["contact"] }) {
  const phoneHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
  return (
    <footer className="relative overflow-hidden bg-crimson text-white">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-crimson-deep md:block"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div className="shell relative grid gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <div className="inline-block bg-white px-4 py-3">
            <Logo className="h-32 w-auto" />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/80">{contact.footerNote}</p>
          <div className="mt-10 space-y-5">
            <a href={phoneHref} className="flex items-center gap-4 text-lg">
              <PhoneIcon />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-4 break-all">
              <MailIcon />
              {contact.email}
            </a>
          </div>
        </div>
        <div className="space-y-5 md:pt-16">
          <p className="flex items-center gap-4">
            <GlobeIcon />
            {contact.website}
          </p>
          <p className="flex items-start gap-4 whitespace-pre-line leading-7">
            <PinIcon />
            <span>{contact.address}</span>
          </p>
        </div>
      </div>
      <div className="relative border-t border-white/15">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/70">
          <p>© {new Date().getFullYear()} Corenelius Technologies & Construction Inc.</p>
          <Link href="/admin" className="hover:text-white">
            Manage site
          </Link>
        </div>
      </div>
    </footer>
  );
}
