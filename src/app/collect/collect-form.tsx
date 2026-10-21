"use client";

import Link from "next/link";
import { useState } from "react";

import { btn } from "@/lib/button";

const fieldClass =
  "h-12 w-full rounded-none border border-input bg-transparent px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function CollectForm({ source, events }: { source: string; events: { name: string; label: string }[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          company: fd.get("company"),
          email: fd.get("email"),
          invites: fd.getAll("invite"),
          website: fd.get("website"),
          source,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!data?.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mt-10 border-t border-border/70 pt-10">
        <h2 className="section-title">Thank you.</h2>
        <p className="mt-5 text-base leading-8 text-muted-foreground">You are on the collector list.</p>
        <div className="mt-8">
          <Link href="/works" className={btn("hero", "lg")}>
            View the works →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-10 grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="firstName" aria-label="First name" placeholder="First name" autoComplete="given-name" className={fieldClass} required />
        <input name="lastName" aria-label="Last name" placeholder="Last name" autoComplete="family-name" className={fieldClass} required />
      </div>
      <input name="company" aria-label="Company (optional)" placeholder="Company (optional)" autoComplete="organization" className={fieldClass} />
      <input name="email" type="email" aria-label="Email" placeholder="Email" autoComplete="email" className={fieldClass} required />
      {/* Honeypot, hidden from people */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {events.map((e) => (
        <label key={e.name} className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-7 text-foreground">
          <input name="invite" value={e.name} type="checkbox" className="mt-1.5 h-4 w-4 accent-primary" />
          <span>{e.label}</span>
        </label>
      ))}
      <button type="submit" disabled={status === "sending"} className={`${btn("hero", "lg")} mt-2 w-full sm:w-auto sm:justify-self-start`}>
        {status === "sending" ? "Joining…" : "Join the collector list"}
      </button>
      {status === "error" ? <p className="text-sm text-destructive">{error}</p> : null}
      <p className="text-xs leading-6 text-muted-foreground">
        Your details are only used by the studio and never shared. You can ask to be removed at any time.{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy</Link>
      </p>
    </form>
  );
}
