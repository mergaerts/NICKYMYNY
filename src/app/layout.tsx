import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { JsonLd } from "@/lib/json-ld";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nickymyny.com"),
  title: {
    default: "Nicky Myny | Contemporary Painter",
    template: "%s",
  },
  description:
    "Nicky Myny is a contemporary painter working between Belgium and South Africa, creating paintings and commissions that translate life transitions into form.",
  openGraph: {
    siteName: "Nicky Myny",
    locale: "en_BE",
    type: "website",
    title: "Nicky Myny | Contemporary Painter",
    description:
      "Contemporary paintings, commissioned works, studio process, collaborations, and inquiry for Nicky Myny.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Nicky Myny painting in her studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicky Myny | Contemporary Painter",
    description:
      "Contemporary paintings, commissioned works, studio process, collaborations, and inquiry for Nicky Myny.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nickymyny.com/#person",
      name: "Nicky Myny",
      jobTitle: "Contemporary Painter",
      url: "https://nickymyny.com",
      email: "artist@nickymyny.com",
      description:
        "Contemporary painter working between Belgium and South Africa. Original paintings, private and family commissions, and site-responsive collaborations.",
      workLocation: [
        {
          "@type": "Place",
          name: "Studio Aarschot",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Aarschot",
            addressCountry: "BE",
          },
        },
        {
          "@type": "Place",
          name: "Studio Cape Winelands",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Western Cape",
            addressCountry: "ZA",
          },
        },
      ],
      sameAs: [
        "https://www.instagram.com/nickymyny",
        "https://www.linkedin.com/in/nickymyny/",
        "https://www.facebook.com/nicky.myny",
        "https://www.artworkarchive.com/profile/nicky-myny",
        "https://artkom.be",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://artkom.be/#org",
      name: "ARTKOM Arts & Health",
      url: "https://artkom.be",
      founder: { "@id": "https://nickymyny.com/#person" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <JsonLd data={personJsonLd} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
