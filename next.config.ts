import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Apex canonical — avoid www duplicate in Google
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nickymyny.com" }],
        destination: "https://nickymyny.com/:path*",
        permanent: true,
      },
      // Old Squarespace / prior CMS paths (fallback; not in sitemap)
      { source: "/mystory", destination: "/about", permanent: true },
      { source: "/my-story", destination: "/about", permanent: true },
      { source: "/about-1", destination: "/about", permanent: true },
      { source: "/artist-profile", destination: "/about", permanent: true },
      { source: "/artist", destination: "/about", permanent: true },
      { source: "/artist-and-creative-guide", destination: "/about", permanent: true },
      { source: "/creative-guide", destination: "/about", permanent: true },
      { source: "/overview", destination: "https://artkom.be/for-individuals", permanent: true },
      { source: "/services", destination: "https://artkom.be/for-individuals", permanent: true },
      { source: "/services-1", destination: "https://artkom.be/for-individuals", permanent: true },
      { source: "/contact", destination: "/inquire", permanent: true },
    ];
  },
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep typechecking on; only ignore if we need to unblock temporarily
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
