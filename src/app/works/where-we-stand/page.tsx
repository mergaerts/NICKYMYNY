import { CollectionIntro, CollectionFallback } from "@/components/artist-site";
import { ArtworkArchiveEmbed } from "@/components/artwork-archive-embed";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { JsonLd } from "@/lib/json-ld";
import whereWeStandImg from "@/assets/wherewestand.png.asset.json";

const externalUrl = "https://www.artworkarchive.com/profile/nicky-myny/collection/where-we-stand";

export const metadata = pageMetadata({
  title: "Where We Stand | Nicky Myny",
  description:
    "Where We Stand — paintings reflecting on rootedness and passage between two homelands, Belgium and South Africa.",
  path: "/works/where-we-stand",
  image: whereWeStandImg.url,
});

export default function WhereWeStandPage() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 lg:px-12 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
          { name: "Where We Stand", path: "/works/where-we-stand" },
        ])}
      />
      <CollectionIntro title="Where We Stand" externalUrl={externalUrl} />
      <ArtworkArchiveEmbed
        embedId="aa_embed_where-we-stand"
        scriptSrc="https://www.artworkarchive.com/profile/nicky-myny/collection/where-we-stand/embed_js.js"
      />
      <CollectionFallback url={externalUrl} />
    </section>
  );
}
