"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/site/Mark";
import { adminNav } from "@/lib/admin-nav";

export function AdminNav({ unread, source }: { unread: number; source: "supabase" | "local" }) {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-5 py-5">
        <Mark className="h-8 w-8 text-crimson" />
        <div>
          <p className="text-xs font-semibold tracking-[0.16em]">CORENELIUS</p>
          <p className="text-[11px] text-muted">{source === "supabase" ? "Supabase" : "Saved on this computer"}</p>
        </div>
      </div>
      <nav className="flex gap-1 overflow-auto px-3 pb-3 lg:block lg:flex-1 lg:overflow-y-auto" aria-label="Editor">
        {adminNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 flex items-center justify-between whitespace-nowrap rounded-md px-3 py-2 text-sm ${active ? "bg-crimson text-white" : "hover:bg-paper"}`}
            >
              {item.label}
              {item.href === "/admin/inquiries" && unread > 0 ? (
                <span className={`ml-3 rounded-full px-2 text-xs ${active ? "bg-white text-crimson" : "bg-crimson text-white"}`}>
                  {unread}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="flex gap-4 px-5 py-4 text-sm">
        <a href="/" className="text-muted hover:text-crimson">
          View site
        </a>
        <button type="button" onClick={logout} className="text-muted hover:text-crimson">
          Sign out
        </button>
      </div>
    </aside>
  );
}
