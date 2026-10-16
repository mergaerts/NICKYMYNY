const BODY = `User-Agent: *
Content-Signal: ai-train=yes, search=yes, ai-input=yes
Allow: /

User-Agent: GPTBot
Allow: /

User-Agent: ClaudeBot
Allow: /

User-Agent: Claude-Web
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: Google-Extended
Allow: /

User-Agent: CCBot
Allow: /

Sitemap: https://nickymyny.com/sitemap.xml
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}