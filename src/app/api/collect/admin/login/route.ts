import { ADMIN_COOKIE, adminToken, collectEnv } from "@/lib/collect";

export async function POST(request: Request) {
  const env = collectEnv();
  const password = String((await request.formData()).get("password") ?? "");
  const token = await adminToken(env);
  const url = new URL("/collect/admin", request.url);

  if (!token || password !== env.ADMIN_PASSWORD) {
    url.searchParams.set("error", "1");
    return Response.redirect(url, 303);
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: url.toString(),
      "Set-Cookie": `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`,
    },
  });
}
