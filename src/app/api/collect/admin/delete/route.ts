import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, collectEnv, isAdmin, mirrorToSheet } from "@/lib/collect";

export async function POST(request: Request) {
  const env = collectEnv();
  if (!(await isAdmin(env, (await cookies()).get(ADMIN_COOKIE)?.value))) {
    return new Response("Not signed in.", { status: 401 });
  }

  const email = String((await request.formData()).get("email") ?? "").trim().toLowerCase();
  if (email) {
    await env.DB.prepare("DELETE FROM signups WHERE email = ?").bind(email).run();
    // Remove it from the backup Sheet too, so a removal request is honoured everywhere.
    getCloudflareContext().ctx.waitUntil(mirrorToSheet(env, { action: "delete", email }));
  }

  return Response.redirect(new URL("/collect/admin?deleted=1", request.url), 303);
}
