import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroScrollCue } from "@/components/hero-scroll-cue";
import { MediaTextSection } from "@/components/media-text-section";
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
import soloStudiosImg from "@/assets/exhibitions/solo-studios.png";
import gallery88Img from "@/assets/exhibitions/gallery88.jpg";
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
      {/* HERO — fixed lg height so photo cannot inflate the row */}
      <section className="border-b border-border/70 bg-background">
        <div className="grid w-full grid-cols-1 lg:h-[clamp(34rem,72vh,52rem)] lg:grid-cols-[45fr_55fr]">
          <div className="relative order-2 flex items-center bg-[#f5efe6] px-5 py-14 pb-24 md:px-8 md:py-16 md:pb-28 lg:order-1 lg:overflow-hidden lg:px-12 lg:py-16 lg:pb-24">
            <div className="max-w-[640px]">
              <p className="eyebrow">Contemporary Painter</p>
              <h1 className="section-title mt-5">
                Paintings that translate life into form.
              </h1>
              <div className="mt-6 h-px w-14 bg-foreground/40" />
              <p className="mt-6 text-[1.1rem] leading-[1.75] text-foreground/85 md:text-[1.15rem]">
                Contemporary paintings and commissions shaped by memory, transition, presence, and connection.
              </p>
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/commissions" className={btn("hero", "lg")}>
                  Commission a Painting
                </Link>
                <Link href="/works" className={btn("outline", "lg")}>
                  View Works
                </Link>
              </div>
            </div>
            <HeroScrollCue targetId="upcoming" />
          </div>
          <div className="relative order-1 h-64 w-full sm:h-80 md:h-[26rem] lg:order-2 lg:h-auto lg:min-h-0">
            <img
              src={homeHero.url}
              alt="Nicky Myny painting in her studio"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "65% center" }}
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </section>

      {/* EXHIBITIONS — white (hero already beige) */}
      <section id="upcoming" className="border-b border-border/70 bg-background scroll-mt-24">
        <div className="mx-auto max-w-[1920px] px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Upcoming</p>
              <h2 className="section-title mt-5">Moments to meet the work.</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Upcoming events where the paintings can be encountered in person.
              </p>
            </div>
            <Link
              href="/exhibitions"
              className="interactive group hidden items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground hover:text-primary lg:inline-flex"
            >
              Past exhibitions
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-14 sm:grid-cols-2 sm:gap-10 lg:gap-12">
            {[
              {
                type: "Group Exhibition",
                venue: "Solo Studios",
                place: "Riebeek Valley, South Africa",
                date: "23-25 October 2026",
                image: soloStudiosImg.src,
                imageAlt: "Double portrait by Nicky Myny shown at Solo Studios",
                imageHref:
                  "https://www.solostudios.co.za/artists-galleries-2026?pgid=mrxj7obd3-90861d66-b88f-4577-a4d1-4095c6e16fdf",
                primary: {
                  label: "Tickets",
                  href: "https://www.solostudios.co.za/tickets",
                },
                secondary: {
                  label: "Artist page",
                  href: "https://www.solostudios.co.za/artists-galleries-2026?pgid=mrxj7obd3-90861d66-b88f-4577-a4d1-4095c6e16fdf",
                },
              },
              {
                type: "Solo Exhibition",
                venue: "Gallery88",
                place: "Paarl, South Africa",
                date: "Opening 12 November 2026",
                image: gallery88Img.src,
                imageAlt: "Brown and beige triptych at Gallery88 Paarl",
                imageHref: "https://www.gallery88.co.za/",
                primary: {
                  label: "Visit Gallery88",
                  href: "https://www.gallery88.co.za/",
                },
              },
            ].map((e) => (
              <div key={e.venue} className="flex flex-col">
                <a
                  href={e.imageHref}
                  target="_blank"
                  rel="noreferrer"
                  className="interactive group overflow-hidden bg-secondary/40"
                >
                  <img
                    src={e.image}
                    alt={e.imageAlt}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    width={1200}
                    height={750}
                  />
                </a>
                <p className="mt-5 text-[0.7rem] uppercase tracking-[0.22em] text-primary">{e.type}</p>
                <p className="mt-2 font-display text-2xl text-foreground md:text-[1.75rem]">{e.venue}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{e.place}</p>
                <p className="mt-1 font-medium text-foreground">{e.date}</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={e.primary.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${btn("hero", "lg")} w-full sm:w-auto`}
                  >
                    {e.primary.label}
                  </a>
                  {"secondary" in e && e.secondary ? (
                    <a
                      href={e.secondary.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`${btn("outline", "lg")} w-full sm:w-auto`}
                    >
                      {e.secondary.label}
                    </a>
                  ) : null}
                </div>
              </div>
            ))}

            {/* Open Studio — double-wide row, photo = single card width */}
            <div className="grid gap-8 border-t border-border/70 pt-14 sm:col-span-2 sm:grid-cols-2 sm:gap-10 sm:pt-16 lg:gap-12 lg:pt-20">
              <Link href="/studio" className="interactive group overflow-hidden bg-secondary/40">
                <img
                  src={openStudio.url}
                  alt="Open studio days at Nicky Myny studio"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                  width={1280}
                  height={853}
                />
              </Link>
              <div className="flex flex-col justify-center py-2 sm:py-0">
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-primary">Studio</p>
                <p className="mt-3 font-display text-2xl text-foreground md:text-[1.75rem]">Open Studio Days</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">Studio Aarschot, Belgium</p>
                <p className="mt-1 font-medium text-foreground">May 1-2 2027</p>
                <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
                  Step into the working studio. Meet new paintings, works in progress, and the atmosphere of an active practice.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/studio" className={`${btn("hero", "lg")} w-full sm:w-auto`}>
                    Visit the Studio
                  </Link>
                  <Link href="/inquire" className={`${btn("outline", "lg")} w-full sm:w-auto`}>
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/exhibitions"
            className="interactive group mt-12 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground hover:text-primary lg:hidden"
          >
            Past exhibitions
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* PAINTING AS A SITE OF RECONNECTION — beige */}
      <section className="border-b border-border/70 bg-[#f5efe6]">
        <MediaTextSection
          className="mx-auto grid max-w-[1920px] gap-10 px-5 py-16 md:gap-10 md:px-8 md:py-20 lg:grid-cols-[0.42fr_1.4fr] lg:gap-12 lg:px-12 lg:py-0"
          media={
            <img
              src={paintingReconnection.url}
              alt="Nicky Myny painting into a large green canvas in her studio"
              className="h-auto w-full"
              loading="lazy"
              width={1000}
              height={1400}
            />
          }
          textClassName="grid lg:grid-cols-[0.9fr_0.5fr]"
        >
          <div className="py-2 md:py-4 lg:px-8 lg:py-20">
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
          <div className="border-t border-border/70 py-12 md:py-14 lg:border-t-0 lg:border-l lg:px-8 lg:py-20">
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
        </MediaTextSection>
      </section>

      {/* COMMISSIONED WORKS — white */}
      <section className="border-b border-border/70 bg-background">
        <div className="mx-auto grid max-w-[1920px] gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[2fr_3fr] lg:gap-14 lg:px-12 lg:py-24">
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
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
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

      {/* INSIDE THE STUDIO — beige */}
      <section className="border-b border-border/70 bg-[#f5efe6]">
        <div className="mx-auto max-w-[1920px] px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Inside the Studio</p>
            <h2 className="section-title mt-5">Process in Motion</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              A short studio film from the making of a large-scale commissioned work.
            </p>
          </div>
          <div className="mt-10 md:mt-12">
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
          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row">
            <Link href="/works" className={`${btn("hero", "lg")} w-full sm:w-auto`}>
              Explore Works
            </Link>
            <Link href="/studio" className={`${btn("outline", "lg")} w-full sm:w-auto`}>
              Visit the Studio
            </Link>
          </div>
        </div>
      </section>

      {/* OPEN STUDIO DAYS — white; natural image size, roomier copy */}
      <section className="border-b border-border/70 bg-background">
        <MediaTextSection
          natural
          className="mx-auto grid max-w-[1920px] gap-12 px-5 py-20 md:gap-12 md:px-8 md:py-24 lg:grid-cols-[1.15fr_0.95fr] lg:items-center lg:gap-16 lg:px-12 lg:py-28"
          media={
            <img
              src={openStudio.url}
              alt="Open studio days at Nicky Myny's studio"
              className="h-auto w-full"
              loading="lazy"
              width={1280}
              height={853}
            />
          }
          textClassName="py-4 md:py-6 lg:py-4 lg:pl-4"
        >
          <p className="eyebrow">Studio</p>
          <h2 className="section-title mt-5">Open Studio Days</h2>
          <p className="mt-7 text-[1.1rem] leading-8 text-muted-foreground md:text-[1.15rem] md:leading-9">
            Visitors are invited into the studio to encounter new paintings, works in progress, materials, sketches and the atmosphere of an active painting practice.
          </p>
          <div className="mt-12 border-t border-border/70 pt-10">
            <p className="font-display text-xl text-foreground md:text-2xl">May 1-2 2027</p>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-primary">Open</p>
          </div>
          <div className="mt-12">
            <Link href="/studio" className={btn("hero", "lg")}>
              Visit the Studio
            </Link>
          </div>
        </MediaTextSection>
      </section>

      {/* ABOUT — beige */}
      <section className="border-b border-border/70 bg-[#f5efe6]">
        <MediaTextSection
          mediaFirst={false}
          className="mx-auto grid max-w-[1920px] gap-10 px-5 py-16 md:gap-10 md:px-8 md:py-20 lg:grid-cols-[0.9fr_0.85fr] lg:gap-12 lg:px-12 lg:py-0"
          media={
            <img
              src={nmPortrait.url}
              alt="Nicky Myny in the studio"
              className="h-auto w-full"
              loading="lazy"
              width={1024}
              height={1535}
            />
          }
          textClassName="py-2 md:py-4 lg:pr-8 lg:py-20"
        >
          <p className="eyebrow">About Nicky Myny</p>
          <h2 className="section-title mt-5">
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
        </MediaTextSection>
      </section>

      {/* CTA closer — white, centered */}
      <section className="border-t border-border/70 bg-background">
        <div className="mx-auto max-w-[1920px] px-5 py-20 md:px-8 md:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="eyebrow">Begin</p>
            <h2 className="section-title mt-5">
              A work begins with attention.
            </h2>
            <div className="mt-6 h-px w-14 bg-foreground/40" />
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              To collect a work, commission a painting, discuss a collaboration, or inquire about upcoming Studio Days, please get in touch.
            </p>
            <p className="mt-4 text-base italic leading-8 text-muted-foreground">
              Each inquiry is answered personally when there is resonance and fit.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link href="/inquire" className={`${btn("hero", "lg")} w-full sm:w-auto`}>
                Commission Inquiry
              </Link>
              <Link href="/collaborations" className={`${btn("outline", "lg")} w-full sm:w-auto`}>
                Collaboration Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
