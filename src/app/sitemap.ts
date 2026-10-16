import type { MetadataRoute } from "next";
import { publicRouteEntries, SITE_URL } from "@/lib/site-utils";

// Force static XML for Cloudflare/OpenNext (avoids intermittent 500s on /sitemap.xml)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly" as const },
    ...publicRouteEntries.map((p) => ({
      url: `${SITE_URL}${p}`,
      changeFrequency: "weekly" as const,
    })),
  ];
}
