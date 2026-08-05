import { CollectionIntro, CollectionFallback } from "@/components/artist-site";
import { ArtworkArchiveEmbed } from "@/components/artwork-archive-embed";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { JsonLd } from "@/lib/json-ld";
import spaceInBetweenImg from "@/assets/thespaceinbetween.png.asset.json";

const externalUrl = "https://www.artworkarchive.com/profile/nicky-myny/collection/the-space-in-between";

export const metadata = pageMetadata({
  title: "The Space in Between | Nicky Myny",
  description:
    "The Space in Between — paintings exploring threshold states, transition, and the atmosphere between two homelands.",
  path: "/works/the-space-in-between",
  image: spaceInBetweenImg.url,
});

export default function SpaceInBetweenPage() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 lg:px-12 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
          { name: "The Space In-Between", path: "/works/the-space-in-between" },
        ])}
      />
      <CollectionIntro title="The Space in Between" externalUrl={externalUrl} />
      <ArtworkArchiveEmbed
        embedId="aa_embed_the-space-in-between"
        scriptSrc="https://www.artworkarchive.com/profile/nicky-myny/collection/the-space-in-between/embed_js.js"
      />
      <CollectionFallback url={externalUrl} />
    </section>
  );
}
