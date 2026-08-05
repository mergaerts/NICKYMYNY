import { CollectionIntro, CollectionFallback } from "@/components/artist-site";
import { ArtworkArchiveEmbed } from "@/components/artwork-archive-embed";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { JsonLd } from "@/lib/json-ld";
import rootingImg from "@/assets/rooting-in-remembrance-new.jpg.asset.json";

const externalUrl = "https://www.artworkarchive.com/profile/nicky-myny/collection/rooting-in-remembrance";

export const metadata = pageMetadata({
  title: "Rooting in Remembrance | Nicky Myny",
  description:
    "Rooting in Remembrance — a collection of paintings holding memory, lineage, and the quiet weight of what came before.",
  path: "/works/Rootinginremembrance",
  image: rootingImg.url,
});

export default function RootingInRemembrancePage() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 lg:px-12 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
          { name: "Rooting in Remembrance", path: "/works/Rootinginremembrance" },
        ])}
      />
      <CollectionIntro title="Rooting in Remembrance" externalUrl={externalUrl} />
      <ArtworkArchiveEmbed
        embedId="aa_embed_rooting-in-remembrance"
        scriptSrc="https://www.artworkarchive.com/profile/nicky-myny/collection/rooting-in-remembrance/embed_js.js"
      />
      <CollectionFallback url={externalUrl} />
    </section>
  );
}
