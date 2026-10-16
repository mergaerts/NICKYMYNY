"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

import { BackToTop } from "@/components/back-to-top";
import { siteMeta, socialLinks } from "@/lib/site-data";

const footerNav = [
  { to: "/works", label: "Works" },
  { to: "/artwork-archive", label: "Artwork Archive" },
  { to: "/works#collections", label: "Collections" },
  { to: "/commissions", label: "Commissions" },
  { to: "/private-commissions", label: "Private Commission" },
  { to: "/frame", label: "The FRAME Experience" },
  { to: "/exhibitions", label: "Exhibitions" },
  { to: "/collaborations", label: "Collaborations" },
  { to: "/studio", label: "Studio" },
  { to: "/about", label: "About" },
  { to: "/inquire", label: "Contact" },
  { to: "/testimonials", label: "Testimonials" },
] as const;

const primaryNav = [
  { to: "/works", label: "Works" },
  { to: "/commissions", label: "Commissions" },
  { to: "/collaborations", label: "Collaborations" },
  { to: "/studio", label: "Studio" },
  { to: "/about", label: "About" },
  { to: "/inquire", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/92 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-4 px-5 py-2.5 md:gap-6 md:px-8 md:py-4 lg:px-12">
          <Link href="/" className="min-w-0">
            <div className="font-display text-[1.2rem] uppercase tracking-[0.22em] text-foreground sm:text-[1.55rem] md:text-[1.75rem]">
              {siteMeta.name}
            </div>
            <div className="mt-0.5 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground sm:mt-1 sm:text-[0.7rem] sm:tracking-[0.28em]">
              {siteMeta.strapline}
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {primaryNav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.label}
                  href={item.to}
                  className={`text-[0.77rem] uppercase tracking-[0.22em] transition-colors hover:text-foreground ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/inquire"
              className="interactive hidden h-8 items-center justify-center rounded-sm border border-input bg-background px-3 text-xs shadow-sm hover:border-foreground/25 hover:bg-accent hover:text-accent-foreground lg:inline-flex"
            >
              Inquire
            </Link>
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="interactive inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-background text-foreground hover:bg-accent md:h-10 md:w-10 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-border/70 bg-background lg:hidden">
            <nav className="mx-auto grid max-w-[1920px] gap-1 px-5 py-4 md:px-8" aria-label="Mobile navigation">
              {primaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-sm px-3 py-3 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${
                    pathname === item.to ? "bg-secondary text-foreground" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main-content" className="page-transition">
        {children}
      </main>

      <BackToTop />

      <footer className="border-t border-border/70 bg-panel text-panel-foreground">
        <div className="mx-auto grid max-w-[1920px] gap-12 px-5 py-12 md:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-12 lg:py-16">
          <div>
            <p className="font-display text-3xl text-panel-foreground">{siteMeta.name}</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-panel-muted">
              Contemporary painter working between Belgium and South Africa.
              <br />
              Painter first. Process with purpose. Transformation through form.
            </p>
          </div>
          <div>
            <p className="text-[0.78rem] uppercase tracking-[0.26em] text-panel-muted">Navigation</p>
            <ul className="mt-4 space-y-3 text-sm">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.to} className="text-panel-foreground transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.78rem] uppercase tracking-[0.26em] text-panel-muted">Contact</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-panel-muted">
              <p>Belgium / South Africa</p>
              <p>
                <a href={`mailto:${siteMeta.contactEmail}`} className="inline-flex items-center gap-2 text-panel-foreground transition-colors hover:text-primary">
                  <Mail className="h-4 w-4" />
                  {siteMeta.contactEmail}
                </a>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-panel-foreground">
                <Link href="/inquire">Contact</Link>
                <Link href="/inquire#newsletter">Newsletter</Link>
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <Link href="/privacy" className="transition-colors hover:text-primary">
                  Privacy / Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
