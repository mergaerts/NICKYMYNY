import { CollectForm } from "./collect-form";
import { cleanSource, upcomingInviteEvents } from "@/lib/collect";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Collector List | Nicky Myny",
  description: "Join the collector list for private previews, new work releases and selected exhibition invitations.",
  path: "/collect",
});

// Printed on business cards as /collect?source=card — keep this route forever.
export default async function CollectPage({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  const { source } = await searchParams;

  return (
    <section className="mx-auto max-w-[640px] px-5 py-16 md:px-8 md:py-24">
      <p className="eyebrow">Collector List</p>
      <h1 className="section-title mt-5">Stay close to the work.</h1>
      <p className="mt-6 text-base leading-8 text-muted-foreground">
        Join the collector list for private previews, new work releases and selected exhibition invitations.
      </p>
      <CollectForm
        source={cleanSource(source)}
        events={upcomingInviteEvents().map(({ name, label }) => ({ name, label }))}
      />
    </section>
  );
}
