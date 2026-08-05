"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

import { btn } from "@/lib/button";
import { newsletterCopy, siteMeta, type CollaborationProject } from "@/lib/site-data";

export function SectionHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div className="max-w-3xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="section-title mt-3">{title}</h2>
        {description ? <p className="mt-4 text-base leading-8 text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function CollaborationDetail({ project }: { project: CollaborationProject }) {
  return (
    <div className="bg-panel text-panel-foreground">
      <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-8 md:py-14 lg:px-12 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div>
              <p className="eyebrow text-panel-muted">{project.category}</p>
              <h1 className="section-title mt-3 text-panel-foreground">{project.title}</h1>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-panel-muted">{project.partner} · {project.year}</p>
            </div>
            <p className="text-base leading-8 text-panel-muted">{project.description}</p>
            {project.externalLink ? (
              <a
                href={project.externalLink.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-panel-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                {project.externalLink.label}
              </a>
            ) : null}
            <Link href="/inquire" className={btn("hero")}>
              Contact the Studio
            </Link>
          </div>
          <div className="space-y-6">
            <img src={project.image} alt={project.imageAlt ?? project.title} className="w-full border border-panel-border object-cover" width={1600} height={1200} />
            <div className="grid gap-4 border border-panel-border bg-panel-subtle p-6 md:p-8">
              {project.details.map((detail) => (
                <div key={detail} className="flex gap-3 text-base leading-8 text-panel-muted">
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-primary" />
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewsletterPanel() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const subject = encodeURIComponent("Newsletter sign-up");
    const body = encodeURIComponent(`Please add this email to the studio newsletter list:\n\n${email}`);
    window.location.href = `mailto:${siteMeta.contactEmail}?subject=${subject}&body=${body}`;
    form.reset();
    setStatus("sent");
  }

  return (
    <section id="newsletter" className="border border-border/70 bg-surface px-5 py-8 md:px-8 md:py-10">
      <p className="eyebrow">Newsletter / Stay Connected</p>
      <h3 className="section-title mt-3">Occasional studio news. Nothing more.</h3>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{newsletterCopy}</p>
      <form className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleSubmit}>
        <input
          name="email"
          aria-label="Email address"
          type="email"
          placeholder="Email address"
          className="h-12 rounded-none border border-input bg-transparent px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          required
        />
        <button type="submit" className={`${btn("hero")} h-12`}>
          Join the list
        </button>
      </form>
      {status === "sent" ? (
        <p className="mt-4 text-sm leading-7 text-foreground">
          Thank you — your email app should open with a note addressed to the studio. Send it from there.
        </p>
      ) : null}
    </section>
  );
}

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const location = String(fd.get("location") || "").trim();
    const inquiryType = String(fd.get("inquiryType") || "").trim();
    const budget = String(fd.get("budget") || "").trim();
    const timeline = String(fd.get("timeline") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subject = encodeURIComponent(`Studio inquiry — ${name || "New inquiry"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Location: ${location || "—"}`,
        `Inquiry type: ${inquiryType || "—"}`,
        `Budget: ${budget || "—"}`,
        `Timeline: ${timeline || "—"}`,
        "",
        message,
      ].join("\n"),
    );
    window.location.href = `mailto:${siteMeta.contactEmail}?subject=${subject}&body=${body}`;
    form.reset();
    setStatus("sent");
  }

  const fieldClass =
    "h-12 rounded-none border border-input bg-transparent px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";

  return (
    <form className={`grid gap-5 ${compact ? "" : "mt-8"}`} onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <input name="name" placeholder="Name" className={fieldClass} required />
        <input name="email" type="email" placeholder="Email" className={fieldClass} required />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <input name="location" placeholder="Location" className={fieldClass} />
        <select name="inquiryType" className="h-12 rounded-none border border-input bg-transparent px-3 text-sm text-foreground outline-none">
          <option value="">Inquiry type</option>
          <option>I am interested in an available painting</option>
          <option>I would like to inquire about a private commission</option>
          <option>I would like to inquire about a family or relational commission</option>
          <option>I would like to discuss a collaboration</option>
          <option>I would like to visit the studio</option>
          <option>Other inquiry</option>
        </select>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <input name="budget" placeholder="Optional budget range" className={fieldClass} />
        <input name="timeline" placeholder="Optional timeline" className={fieldClass} />
      </div>
      <textarea
        name="message"
        placeholder="Message"
        rows={7}
        className="min-h-[170px] rounded-none border border-input bg-transparent px-3 py-4 text-sm text-foreground shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
        required
      />
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className={btn("hero", "lg")}>
          Submit inquiry
        </button>
        <p className="text-sm text-muted-foreground">The studio will respond personally.</p>
      </div>
      {status === "sent" ? (
        <div className="border border-border/70 bg-secondary/40 px-5 py-4 text-sm leading-7 text-foreground">
          Thank you — your email app should open with a note addressed to the studio. Send it from there.
        </div>
      ) : null}
    </form>
  );
}

export function MinimalPageIntro({ eyebrow, title, body }: { eyebrow?: string; title: string; body: string }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-10 md:px-8 md:py-14 lg:px-12 lg:py-18">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div className="mt-4 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
        <h1 className="section-title">{title}</h1>
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">{body}</p>
      </div>
    </section>
  );
}

export function TestimonialQuote({
  quote,
  credit,
  role,
}: {
  quote: string;
  credit: string;
  role?: string;
}) {
  return (
    <figure className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">Featured reflection</p>
      <blockquote className="mt-6 font-display text-[1.35rem] italic leading-[1.4] text-foreground md:text-[1.6rem]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-[0.78rem] uppercase tracking-[0.22em] text-foreground">
        {credit}
        {role ? (
          <span className="mt-1 block text-[0.72rem] tracking-[0.2em] text-muted-foreground">
            {role}
          </span>
        ) : null}
      </figcaption>
      <div className="mt-6">
        <Link
          href="/testimonials"
          className="text-[0.72rem] uppercase tracking-[0.22em] text-primary hover:underline"
        >
          More reflections →
        </Link>
      </div>
    </figure>
  );
}

export function CollectionIntro({
  title,
  externalUrl,
}: {
  title: string;
  externalUrl?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="eyebrow">Collection</p>
      <h1 className="mt-3 font-display text-[2.25rem] leading-[1.05] text-foreground md:text-[2.75rem]">
        {title}
      </h1>
      {externalUrl ? (
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Prefer to browse elsewhere?{" "}
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            View this collection on Artwork Archive →
          </a>
        </p>
      ) : null}
    </div>
  );
}

export function CollectionFallback({ url }: { url: string }) {
  return (
    <p className="mt-8 text-sm leading-7 text-muted-foreground">
      If the collection does not load,{" "}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 hover:text-primary"
      >
        view it on Artwork Archive →
      </a>
    </p>
  );
}
