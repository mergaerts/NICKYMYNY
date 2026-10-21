import { getCloudflareContext } from "@opennextjs/cloudflare";

// Collector list (/collect): D1 is the main store, a Google Sheet in Nicky's own
// Google account is the backup copy that keeps working if the site is down.

/**
 * Events people can ask an invite for. Each one shows as a checkbox on /collect
 * until its `until` date has passed. For a new expo, just add an entry here.
 * `name` is what gets stored and exported, so keep it unique and free of ";".
 */
export const INVITE_EVENTS: { name: string; label: string; until: string }[] = [
  {
    name: "Gallery88 · Paarl · Nov 2026",
    label: "Invite me to the Gallery88 exhibition, Paarl · 12 November",
    until: "2026-11-12",
  },
];

export const ADMIN_COOKIE = "collect_admin";

export type Signup = {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  /** "" if not given. */
  company: string;
  email: string;
  /** "Event A; Event B", or "" if none. */
  invites: string;
  source: string;
};

export function collectEnv() {
  return getCloudflareContext().env as CloudflareEnv;
}

export function upcomingInviteEvents(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return INVITE_EVENTS.filter((e) => today <= e.until);
}

export function splitInvites(invites: string) {
  return invites ? invites.split("; ") : [];
}

/** `?source=card` → "card". Anything odd collapses to "direct". */
export function cleanSource(value: unknown) {
  const s = String(value ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
  return s || "direct";
}

/** Sends a sign-up (or a deletion) to the Google Sheet. Never throws. */
export async function mirrorToSheet(
  env: CloudflareEnv,
  payload:
    | {
        action: "add";
        firstName: string;
        lastName: string;
        company: string;
        email: string;
        invites: string;
        source: string;
        createdAt: string;
      }
    | { action: "delete"; email: string },
) {
  if (!env.SHEET_WEBHOOK_URL || !env.SHEET_WEBHOOK_SECRET) {
    console.error("collect: Sheet backup skipped, SHEET_WEBHOOK_URL or SHEET_WEBHOOK_SECRET not set");
    return false;
  }
  try {
    const res = await fetch(env.SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret: env.SHEET_WEBHOOK_SECRET }),
    });
    const text = await res.text();
    let data: { ok?: boolean } | null = null;
    try {
      data = JSON.parse(text);
    } catch {}
    // Logged (not shown to visitors) so `wrangler tail` / Workers logs explain failures.
    if (!data?.ok) console.error(`collect: Sheet backup failed (HTTP ${res.status}): ${text.slice(0, 300)}`);
    return Boolean(data?.ok);
  } catch (error) {
    console.error("collect: Sheet backup request failed", error);
    return false;
  }
}

// --- Admin session -------------------------------------------------------
// The cookie holds an HMAC derived from the password, so changing
// ADMIN_PASSWORD logs everyone out and nothing has to be stored server-side.

async function hmac(key: string, message: string) {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function adminToken(env: CloudflareEnv) {
  return env.ADMIN_PASSWORD ? hmac(env.ADMIN_PASSWORD, "collect-admin-v1") : null;
}

export async function isAdmin(env: CloudflareEnv, cookieValue: string | undefined) {
  const token = await adminToken(env);
  return Boolean(token && cookieValue && cookieValue === token);
}

// --- Export --------------------------------------------------------------

const HEADER = ["Date", "First name", "Last name", "Company", "Email", "Event invites", "Source"];

function rows(signups: Signup[]) {
  return signups.map((s) => [
    s.created_at.replace("T", " ").slice(0, 16),
    s.first_name,
    s.last_name,
    s.company,
    s.email,
    s.invites,
    s.source,
  ]);
}

/** Standard UTF-8 CSV (Google Sheets, mailing tools, anything else). */
export function toCsv(signups: Signup[]) {
  const esc = (v: string) => (/[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return [HEADER, ...rows(signups)].map((r) => r.map(esc).join(",")).join("\r\n") + "\r\n";
}

/**
 * Excel-friendly export: tab-separated UTF-16LE with BOM. Excel splits this into
 * columns whatever the computer's language (Belgian Excel expects ";" in normal
 * CSV) and keeps accents like "é" intact.
 */
export function toExcelCsv(signups: Signup[]) {
  const clean = (v: string) => v.replace(/[\t\r\n]/g, " ");
  const text = [HEADER, ...rows(signups)].map((r) => r.map(clean).join("\t")).join("\r\n") + "\r\n";
  const bytes = new Uint8Array(2 + text.length * 2);
  bytes[0] = 0xff;
  bytes[1] = 0xfe;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    bytes[2 + i * 2] = c & 0xff;
    bytes[3 + i * 2] = c >> 8;
  }
  return bytes;
}
