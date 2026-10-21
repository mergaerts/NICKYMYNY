import { ADMIN_COOKIE } from "@/lib/collect";

export async function POST(request: Request) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/collect/admin", request.url).toString(),
      "Set-Cookie": `${ADMIN_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
}
