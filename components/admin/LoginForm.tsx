"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/site/Logo";

export function LoginForm() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const json = (await response.json()) as { error?: string };
    if (!response.ok) {
      setPending(false);
      setError(json.error || "Could not sign in.");
      return;
    }
    window.location.href = params.get("next") || "/admin";
  }

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-8">
        <Logo className="h-28 w-auto" />
        <h1 className="mt-6 text-2xl font-medium tracking-tight">Site editor</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Sign in to change the landing page.</p>
        <label className="mt-8 block text-sm">
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border border-line px-3 py-3 outline-none focus:border-crimson"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-crimson">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-crimson py-3 text-sm font-medium text-white hover:bg-crimson-deep disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
