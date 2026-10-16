import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { btn } from "@/lib/button";
import {
  aboutStudioImage,
  artworkPortraitOne,
  artworkPortraitTwo,
  collaborationLandscapeImage,
  heroImage,
  studioTableImage,
} from "@/lib/site-data";
import homeHero from "@/assets/home_header_now.png.asset.json";
import paintingReconnection from "@/assets/painting-reconnection-real.png.asset.json";
import privateCommissionsImg from "@/assets/private-commissions.png.asset.json";
import frameExperienceImg from "@/assets/frame-experience.png.asset.json";
import nmPortrait from "@/assets/nm-portrait.png.asset.json";
import openStudio from "@/assets/open-studio-table.jpg.asset.json";
import homeBottomImage from "@/assets/studio-header-home-bottom.png.asset.json";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nicky Myny | Contemporary Painter",
  description:
    "Contemporary paintings, commissions, studio process, collaborations, and inquiry for Nicky Myny.",
  path: "/",
  ogDescription: "Paintings and commissions that translate life transitions into form.",
});

export default function Index() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border/70 bg-background">
        <div className="grid w-full grid-cols-1 lg:min-h-[85vh] lg:grid-cols-[45fr_55fr]">
          <div className="order-2 flex items-center bg-[#f5efe6] px-6 py-14 md:px-12 md:py-20 lg:order-1 lg:px-16 lg:py-24">
            <div className="max-w-[560px]">
              <p className="eyebrow">Contemporary Painter</p>
              <h1 className="mt-6 font-serif text-[2.25rem] leading-[1.1] tracking-[-0.01em] text-foreground md:text-[2.75rem] lg:text-[3.15rem]">
                Paintings that translate life into form.
              </h1>
              <div className="mt-7 h-px w-14 bg-foreground/40" />
              <p className="mt-7 text-[1.05rem] leading-[1.75] text-foreground/85 md:text-[1.1rem]">
                Contemporary paintings and commissions shaped by memory, transition, presence, and connection.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/works" className={btn("hero", "lg")}>
                  View Works
                </Link>
                <Link href="/commissions" className={btn("outline", "lg")}>
                  Commission a Painting
                </Link>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={homeHero.url}
              alt="Nicky Myny painting in her studio"
              className="h-64 w-full object-cover sm:h-80 md:h-[28rem] lg:h-full lg:min-h-[85vh]"
              style={{ objectPosition: "65% center" }}
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </section>

      {/* EXHIBITIONS */}
      <section className="border-b border-border/70">
        <div className="mx-auto max-w-[1600px] px-5 py-12 md:px-10 md:py-16 lg:px-16">
          <p className="eyebrow">Exhibitions</p>
          <div className="mt-8 grid gap-x-8 gap-y-8 border-t border-border/70 pt-8 sm:grid-cols-2">
            {[
              { type: "Group Exhibition", venue: "Solo Studios", place: "Riebeek Valley, South Africa", date: "23–25 October 2026" },
              { type: "Solo Exhibition", venue: "Gallery88", place: "Paarl, South Africa", date: "Opening on 12 November 2026" },
            ].map((e) => (
              <div key={e.venue}>
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-primary">{e.type}</p>
                <p className="mt-2 font-display text-xl text-foreground">{e.venue}</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">{e.place}</p>
                <p className="mt-1 text-sm leading-7 text-foreground">{e.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAINTING AS A SITE OF RECONNECTION */}
      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[0.42fr_0.9fr_0.5fr]">
          <img src={paintingReconnection.url} alt="Nicky Myny painting into a large green canvas in her studio" className="h-full w-full object-cover object-[60%_center] lg:min-h-[36rem]" loading="lazy" width={1000} height={1400} />
          <div className="px-5 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <p className="eyebrow">Painting as a site of reconnection</p>
            <h2 className="section-title mt-5">
              Some paintings begin in silence.
              <br />
              Others begin in dialogue.
            </h2>
            <div className="mt-7 text-base leading-8 text-muted-foreground">
              <p>Through abstraction, portraiture, gesture, and layered material processes, Nicky Myny explores how inner states, relationships, memory, and unseen forms of connection can become visible through painting.</p>
            </div>
          </div>
          <div className="border-t border-border/70 px-5 py-10 md:px-8 md:py-14 lg:border-t-0 lg:border-l lg:px-10 lg:py-20">
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 divide-y divide-border/70">
              {[
                { label: "Original Paintings", href: "/works" },
                { label: "The FRAME Experience", href: "/frame" },
                { label: "Previous Commissions", href: "/commissions#previous" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="group flex items-center justify-between py-4 text-[0.95rem] text-foreground transition-colors hover:text-primary">
                    <span>{item.label}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border/70 pt-6">
              <Link href="/artwork-archive" className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary">
                Explore the Portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMISSIONED WORKS */}
      <section className="border-b border-border/70 bg-[#f5efe6]">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[2fr_3fr] lg:gap-14 lg:px-16 lg:py-24">
          {/* Left: text */}
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Commissioned Works</p>
            <h2 className="section-title mt-5">Paintings created in response.</h2>
            <div className="mt-6 text-base leading-8 text-muted-foreground">
              <p>Some commissions begin with a person, a family, a place, or a moment of transition. Each work develops through conversation, attention, and painterly translation.</p>
            </div>
            <div className="mt-8">
              <Link href="/commissions" className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary">
                Explore Commissions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: two curated image cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Card 1: Private Commissions */}
            <Link href="/private-commissions" className="group block">
              <div className="relative overflow-hidden">
                <img
                  src={privateCommissionsImg.url}
                  alt="Private Commissions — original paintings created for individuals, couples, and private collectors"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  width={600}
                  height={750}
                />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-5 font-display text-xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] md:text-2xl">
                  Private Commissions
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">Original paintings created for individuals, couples, and private collectors.</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-primary/80">Explore Private Commissions</p>
              </div>
            </Link>

            {/* Card 2: FRAME */}
            <Link href="/frame" className="group block">
              <div className="relative overflow-hidden">
                <img
                  src={frameExperienceImg.url}
                  alt="The FRAME Experience — a family commission shaped through shared presence, painterly process, and a finished artwork"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  width={600}
                  height={750}
                />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-5 font-display text-xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] md:text-2xl">
                  The FRAME Experience
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">A family commission shaped through shared presence, painterly process, and a finished artwork.</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-primary/80">Explore The FRAME Experience</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* INSIDE THE STUDIO */}
      <section className="border-b border-border/70 bg-[#f5efe6]">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Inside the Studio</p>
            <h2 className="section-title mt-5">Process in Motion</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              A short studio film from the making of a large-scale commissioned work.
            </p>
          </div>
          <div className="mt-12">
            <div className="aspect-video w-full overflow-hidden bg-black/5">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/15by9BHghlc"
                title="Inside the Studio — Nicky Myny"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/works" className={btn("hero", "lg")}>
              Explore Works
            </Link>
            <Link href="/studio" className={btn("outline", "lg")}>
              Visit the Studio
            </Link>
          </div>
        </div>
      </section>

      {/* OPEN STUDIO DAYS */}
      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[1fr_1.05fr]">
          <img src={openStudio.url} alt="Open studio days at Nicky Myny's studio" className="h-full w-full object-cover lg:min-h-[40rem]" loading="lazy" width={1280} height={853} />
          <div className="px-5 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <p className="eyebrow">Studio</p>
            <h2 className="section-title mt-5">Open Studio Days</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Visitors are invited into the studio to encounter new paintings, works in progress, materials, sketches and the atmosphere of an active painting practice.
            </p>
            <div className="mt-10 border-t border-border/70 pt-8">
              <p className="font-display text-lg text-foreground">May 1–2 2027</p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-primary">Open</p>
            </div>
            <div className="mt-10">
              <Link href="/studio" className={btn("hero")}>
                Visit the Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[0.8fr_1fr_0.55fr]">
          <div className="px-5 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <p className="eyebrow">About Nicky Myny</p>
            <h2 className="mt-5 font-display text-[2rem] leading-[1.15] text-foreground md:text-[2.6rem]">
              Nicky Myny is a contemporary painter working between Belgium and South Africa.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
              <p>Her practice explores the interconnected nature of human experience through painting, material, and relational process. Moving between abstraction and figuration, her work investigates themes of transformation, memory, belonging, perception, and collective presence.</p>
              <p>Her work has been presented through exhibitions, artist residencies, institutional collaborations, and public projects across Europe and South Africa.</p>
            </div>
            <div className="mt-8">
              <Link href="/about" className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary">
                Read Biography &amp; CV
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <img src={nmPortrait.url} alt="Nicky Myny in the studio" className="h-full min-h-[24rem] w-full object-cover" loading="lazy" width={1024} height={1535} />
          <img src={homeBottomImage.url} alt="Painter's palette and brushes on the studio table with a canvas in the background" className="h-full min-h-[24rem] w-full object-cover" loading="lazy" width={1920} height={1080} />
        </div>
      </section>

      {/* A WORK BEGINS WITH ATTENTION */}
      <section className="relative bg-panel text-panel-foreground">
        <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[0.9fr_1.1fr_0.6fr]">
          <div className="px-5 py-14 md:px-10 md:py-20 lg:px-14">
            <p className="font-display text-[2.4rem] leading-[1.05] md:text-[3rem] lg:text-[3.4rem]">
              A work begins
              <br />
              with attention.
            </p>
            <div className="mt-6 h-px w-16 bg-panel-foreground/40" />
          </div>
          <div className="px-5 py-10 md:px-10 md:py-20">
            <p className="max-w-lg text-base leading-8 text-panel-muted">
              To collect a work, commission a painting, discuss a collaboration, or inquire about upcoming Studio Days, please get in touch.
            </p>
            <p className="mt-5 max-w-lg text-base italic leading-8 text-panel-muted">
              Each inquiry is answered personally when there is resonance and fit.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 px-5 py-10 md:px-10 md:py-20">
            <Link href="/inquire" className={btn("panelPrimary")}>
              Commission Inquiry
            </Link>
            <Link href="/collaborations" className={btn("panelOutline")}>
              Collaboration Inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
