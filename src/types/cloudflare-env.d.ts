// Bindings and secrets used by the collector list (/collect).
// Minimal D1 typing so we don't need @cloudflare/workers-types for one table.

interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface CloudflareEnv {
  DB: D1Database;
  /** Password for /collect/admin. */
  ADMIN_PASSWORD?: string;
  /** Google Apps Script web app URL that mirrors sign-ups into a Google Sheet. */
  SHEET_WEBHOOK_URL?: string;
  /** Shared secret checked by the Apps Script. */
  SHEET_WEBHOOK_SECRET?: string;
}
