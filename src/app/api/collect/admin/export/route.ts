import { cookies } from "next/headers";
import { ADMIN_COOKIE, collectEnv, isAdmin, type Signup, toCsv, toExcelCsv } from "@/lib/collect";

export async function GET(request: Request) {
  const env = collectEnv();
  if (!(await isAdmin(env, (await cookies()).get(ADMIN_COOKIE)?.value))) {
    return new Response("Not signed in.", { status: 401 });
  }

  const { results } = await env.DB.prepare("SELECT * FROM signups ORDER BY created_at DESC").all<Signup>();
  const plain = new URL(request.url).searchParams.get("format") === "csv";
  const date = new Date().toISOString().slice(0, 10);

  return new Response(plain ? toCsv(results) : toExcelCsv(results), {
    headers: {
      "Content-Type": plain ? "text/csv; charset=utf-8" : "text/csv; charset=utf-16le",
      "Content-Disposition": `attachment; filename="collector-list-${date}${plain ? "" : "-excel"}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
