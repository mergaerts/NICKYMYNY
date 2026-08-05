import Link from "next/link";
import { CollectionIntro, CollectionFallback } from "@/components/artist-site";
import { ArtworkArchiveEmbed } from "@/components/artwork-archive-embed";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { JsonLd } from "@/lib/json-ld";
import { btn } from "@/lib/button";
import zerocreteImg from "@/assets/zerocrete.png.asset.json";

const externalUrl = "https://www.artworkarchive.com/profile/nicky-myny/collection/zerocrete";

export const metadata = pageMetadata({
  title: "Zerocrete | Nicky Myny",
  description:
    "Zerocrete — a material collaboration with Johan Coetsee, where painting entered dialogue with Zerocrete as surface, texture, and structure.",
  path: "/works/zerocrete",
  image: zerocreteImg.url,
});

export default function ZerocretePage() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 lg:px-12 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
          { name: "Zerocrete", path: "/works/zerocrete" },
        ])}
      />
      <CollectionIntro title="Zerocrete" externalUrl={externalUrl} />
      <ArtworkArchiveEmbed
        embedId="aa_embed_zerocrete"
        scriptSrc="https://www.artworkarchive.com/profile/nicky-myny/collection/zerocrete/embed_js.js"
      />
      <CollectionFallback url={externalUrl} />
      <div className="mt-10">
        <Link href="/collaborations/zerocrete" className={btn("outline")}>
          View the full collaboration story
        </Link>
      </div>
    </section>
  );
}
