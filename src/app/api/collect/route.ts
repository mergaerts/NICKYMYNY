import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cleanSource, collectEnv, mirrorToSheet, splitInvites, upcomingInviteEvents } from "@/lib/collect";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });

  // Honeypot: bots fill every field, people never see this one.
  if (body.website) return Response.json({ ok: true });

  const firstName = String(body.firstName ?? "").trim().slice(0, 100);
  const lastName = String(body.lastName ?? "").trim().slice(0, 100);
  const company = String(body.company ?? "").trim().slice(0, 150);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
  if (!firstName || !lastName || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Please enter your first name, last name and a valid email address." }, { status: 400 });
  }
  // Only accept invites for events that are still open.
  const asked = Array.isArray(body.invites) ? body.invites.map(String) : [];
  const invites = upcomingInviteEvents()
    .map((e) => e.name)
    .filter((name) => asked.includes(name));
  const source = cleanSource(body.source);
  const createdAt = new Date().toISOString();

  const env = collectEnv();
  // Start the Sheet backup right away so it runs even if D1 fails.
  const sheet = mirrorToSheet(env, { action: "add", firstName, lastName, company, email, invites: invites.join("; "), source, createdAt });

  try {
    // Signing up again keeps earlier invites and adds the new ones.
    const existing = await env.DB.prepare("SELECT invites FROM signups WHERE email = ?").bind(email).all<{ invites: string }>();
    const merged = [...new Set([...splitInvites(existing.results[0]?.invites ?? ""), ...invites])].join("; ");

    await env.DB.prepare(
      `INSERT INTO signups (created_at, first_name, last_name, company, email, invites, source) VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(email) DO UPDATE SET first_name = excluded.first_name, last_name = excluded.last_name,
         company = CASE WHEN excluded.company <> '' THEN excluded.company ELSE company END, invites = excluded.invites`,
    )
      .bind(createdAt, firstName, lastName, company, email, merged, source)
      .run();
  } catch (error) {
    console.error("collect: D1 insert failed", error);
    // The sign-up still counts if the backup copy made it.
    if (await sheet) return Response.json({ ok: true });
    return Response.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }

  getCloudflareContext().ctx.waitUntil(sheet);
  return Response.json({ ok: true });
}
