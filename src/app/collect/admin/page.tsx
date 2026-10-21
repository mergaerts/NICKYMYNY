import type { Metadata } from "next";
import { cookies } from "next/headers";

import { DeleteButton } from "./delete-button";
import { btn } from "@/lib/button";
import { ADMIN_COOKIE, collectEnv, isAdmin, type Signup, splitInvites } from "@/lib/collect";

export const metadata: Metadata = {
  title: "Collector List · Admin | Nicky Myny",
  robots: { index: false, follow: false },
};

const fieldClass =
  "h-12 w-full rounded-none border border-input bg-transparent px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";

export default async function CollectAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; deleted?: string }>;
}) {
  const { error, deleted } = await searchParams;
  const env = collectEnv();
  const signedIn = await isAdmin(env, (await cookies()).get(ADMIN_COOKIE)?.value);

  if (!signedIn) {
    return (
      <section className="mx-auto max-w-[440px] px-5 py-16 md:py-24">
        <p className="eyebrow">Collector List</p>
        <h1 className="section-title mt-5">Sign in</h1>
        <form action="/api/collect/admin/login" method="post" className="mt-8 grid gap-4">
          <input name="password" type="password" aria-label="Password" placeholder="Password" autoComplete="current-password" className={fieldClass} required />
          <button type="submit" className={`${btn("hero", "lg")} w-full`}>
            Sign in
          </button>
          {error ? <p className="text-sm text-destructive">That password is not right.</p> : null}
        </form>
      </section>
    );
  }

  const { results } = await env.DB.prepare("SELECT * FROM signups ORDER BY created_at DESC").all<Signup>();
  // Invite counts per event, for every event that appears in the list.
  const inviteCounts = new Map<string, number>();
  for (const s of results) {
    for (const name of splitInvites(s.invites)) inviteCounts.set(name, (inviteCounts.get(name) ?? 0) + 1);
  }

  return (
    <section className="mx-auto max-w-[1100px] px-5 py-12 md:px-8 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Collector List</p>
          <h1 className="section-title mt-5">{results.length} {results.length === 1 ? "person" : "people"}</h1>
          {[...inviteCounts].map(([name, count]) => (
            <p key={name} className="mt-2 text-sm text-muted-foreground">
              {count} asked for an invite to {name}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href="/api/collect/admin/export" className={btn("hero", "lg")}>
            Download for Excel
          </a>
          <a href="/api/collect/admin/export?format=csv" className="text-xs uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:underline">
            Plain CSV
          </a>
          <form action="/api/collect/admin/logout" method="post">
            <button type="submit" className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
              Sign out
            </button>
          </form>
        </div>
      </div>

      {deleted ? <p className="mt-6 text-sm text-primary">Removed.</p> : null}

      <div className="mt-10 overflow-x-auto border-t border-border/70">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/70 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              <th className="py-3 pr-4 font-normal">Date</th>
              <th className="py-3 pr-4 font-normal">Name</th>
              <th className="py-3 pr-4 font-normal">Company</th>
              <th className="py-3 pr-4 font-normal">Email</th>
              <th className="py-3 pr-4 font-normal">Event invites</th>
              <th className="py-3 pr-4 font-normal">Source</th>
              <th className="py-3" />
            </tr>
          </thead>
          <tbody>
            {results.map((s) => (
              <tr key={s.id} className="border-b border-border/70">
                <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">{s.created_at.slice(0, 10)}</td>
                <td className="py-3 pr-4 text-foreground">{`${s.first_name} ${s.last_name}`.trim()}</td>
                <td className="py-3 pr-4 text-muted-foreground">{s.company}</td>
                <td className="py-3 pr-4 text-foreground">
                  <a href={`mailto:${s.email}`} className="hover:text-primary">{s.email}</a>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">{s.invites}</td>
                <td className="py-3 pr-4 text-muted-foreground">{s.source}</td>
                <td className="py-3 text-right">
                  <DeleteButton email={s.email} />
                </td>
              </tr>
            ))}
            {results.length === 0 ? (
              <tr>
                <td colSpan={7}className="py-10 text-center text-muted-foreground">No sign-ups yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
