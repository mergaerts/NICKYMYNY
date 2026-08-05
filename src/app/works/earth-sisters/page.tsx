import { CollectionIntro, CollectionFallback } from "@/components/artist-site";
import { ArtworkArchiveEmbed } from "@/components/artwork-archive-embed";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { JsonLd } from "@/lib/json-ld";
import earthSistersImg from "@/assets/earthsisters.png.asset.json";

const externalUrl = "https://www.artworkarchive.com/profile/nicky-myny/collection/earth-sisters-2024";

export const metadata = pageMetadata({
  title: "Earth Sisters | Nicky Myny",
  description:
    "Earth Sisters — a collection exploring feminine lineage, embodiment, and quiet inheritance through painting.",
  path: "/works/earth-sisters",
  image: earthSistersImg.url,
});

export default function EarthSistersPage() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 lg:px-12 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
          { name: "Earth Sisters", path: "/works/earth-sisters" },
        ])}
      />
      <CollectionIntro title="Earth Sisters" externalUrl={externalUrl} />
      <ArtworkArchiveEmbed
        embedId="aa_embed_earth-sisters-2024"
        scriptSrc="https://www.artworkarchive.com/profile/nicky-myny/collection/earth-sisters-2024/embed_js.js"
      />
      <CollectionFallback url={externalUrl} />
    </section>
  );
}
