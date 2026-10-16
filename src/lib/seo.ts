import type { Metadata } from "next";
import { mediaUrl } from "./media";
import { absoluteUrl, SITE_URL } from "./site-utils";

/** Default share preview = home hero on R2. */
export const DEFAULT_OG_IMAGE = mediaUrl("og/home.jpg");

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  ogTitle?: string;
  ogDescription?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  ogTitle,
  ogDescription,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogDesc = ogDescription ?? description;
  const ogT = ogTitle ?? title;
  const ogImage = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogT,
      description: ogDesc,
      url,
      siteName: "Nicky Myny",
      locale: "en_BE",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Nicky Myny painting in her studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogT,
      description: ogDesc,
      images: [ogImage],
    },
  };
}
