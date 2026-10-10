"use client";

import { useState } from "react";
import { Mark } from "@/components/site/Mark";

const links = [
  { href: "#company", label: "Company" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <a
        href="#content"
        className="absolute left-4 top-0 z-50 -translate-y-full bg-crimson px-4 py-2 text-sm text-white focus:translate-y-3"
      >
        Skip to content
      </a>
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3">
          <Mark />
          <span className="leading-tight text-ink">
            <span className="block text-[13px] font-semibold tracking-[0.16em]">CORENELIUS</span>
            <span className="block text-[11px] text-muted">Technologies & Construction</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-ink/80 transition hover:text-crimson">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-crimson px-4 py-2 text-sm font-medium text-white hover:bg-crimson-deep">
            Request a proposal
          </a>
        </nav>
        <button
          type="button"
          className="text-sm font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav id="site-menu" className="border-t border-line bg-white lg:hidden" aria-label="Mobile">
          <div className="shell flex flex-col py-3">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="py-3 text-lg" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
