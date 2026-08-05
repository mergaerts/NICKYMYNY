import contactStudioImage from "@/assets/contact-studio.png.asset.json";
import { InquiryForm, MinimalPageIntro, NewsletterPanel } from "@/components/artist-site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { JsonLd } from "@/lib/json-ld";
import { socialLinks } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Inquire | Nicky Myny",
  description:
    "Contact Nicky Myny about available works, private commissions, family commissions, collaborations, studio visits, or other inquiries.",
  path: "/inquire",
});

export default function InquirePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Inquire", path: "/inquire" },
        ])}
      />
      <MinimalPageIntro
        eyebrow="Contact"
        title="Contact"
        body="For artwork inquiries, commissions, studio visits, collaborations, or press requests, you are welcome to contact the studio."
      />

      <section className="mx-auto grid max-w-[1600px] gap-0 px-5 pb-14 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:pb-18">
        <div className="border border-border/70 bg-panel px-5 py-8 text-panel-foreground md:px-8 md:py-10">
          <p className="font-display text-[1.8rem] leading-tight md:text-[2.2rem]">Studios</p>
          <div className="mt-6 space-y-6 text-base leading-8 text-panel-muted">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-panel-foreground">Belgium studio</p>
              <p className="mt-2">Aarschot, Belgium</p>
              <p className="text-sm leading-7">Studio visits by appointment and during announced Open Studio Days.</p>
            </div>
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-panel-foreground">South Africa studio</p>
              <p className="mt-2">Cape Winelands, South Africa</p>
              <p className="text-sm leading-7">Seasonal studio presence by appointment.</p>
            </div>
            <div className="border-t border-panel-border pt-6">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-panel-foreground">Contact</p>
              <p className="mt-2">
                <a href="mailto:artist@nickymyny.com" className="underline underline-offset-4 hover:text-primary">artist@nickymyny.com</a>
              </p>
              <ul className="mt-3 space-y-1">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <img src={contactStudioImage.url} alt="Artist sketching in a notebook at a wooden studio table surrounded by paintings and brushes" className="mt-8 aspect-[3/4] w-full object-cover" loading="lazy" width={1122} height={1402} />
        </div>
        <div className="border border-border/70 border-t-0 px-5 py-8 md:px-8 md:py-10 lg:border-l-0 lg:border-t lg:py-12">
          <InquiryForm />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-14 md:px-8 lg:px-12 lg:pb-18">
        <NewsletterPanel />
      </section>
    </>
  );
}
