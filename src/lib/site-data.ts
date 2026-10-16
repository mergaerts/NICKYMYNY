import { mediaUrl } from "@/lib/media";
import daftImg from "@/assets/daft-nina-nicky.png.asset.json";
import swartlandImg from "@/assets/swartland-collection.png.asset.json";
import zerocreteJohanImg from "@/assets/zerocrete-johan-nicky.png.asset.json";
import hasherImg from "@/assets/hasher-painting.png.asset.json";
import eoscImg from "@/assets/eosc-portrait.png.asset.json";
import sdgTentImg from "@/assets/sdg-tent.png.asset.json";
import rocheImg from "@/assets/commissions-hero.png.asset.json";

/** Shape matches old next/image StaticImageData callers (`.src`). */
const img = (key: string) => ({ src: mediaUrl(key) });

const heroImage = img("about/nicky-hero.jpg");
const studioTableImage = img("studio/studio-table.jpg");
const collaborationLandscapeImage = img("collaborations/collaboration-landscape-1.jpg");
const artworkPortraitOne = img("works/artwork-portrait-1.jpg");
const artworkPortraitTwo = img("works/artwork-portrait-2.jpg");
const aboutStudioImage = img("studio/about-studio.jpg");
const brushDetailImage = img("studio/brush-detail.jpg");

export interface CollaborationProject {
  slug: string;
  title: string;
  partner: string;
  year: string;
  category: string;
  description: string;
  image: string;
  imageAlt?: string;
  group: "material" | "commissioned";
  details: string[];
  externalLink?: { label: string; url: string };
}

export const siteMeta = {
  name: "Nicky Myny",
  strapline: "Contemporary Painter",
  positioningLine: "Paintings and commissions that translate life transitions into form.",
  baseDescription:
    "Nicky Myny is a contemporary painter working between Belgium and South Africa.",
  contactEmail: "artist@nickymyny.com",
};

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/nickymyny" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nickymyny/" },
  { label: "Facebook", href: "https://www.facebook.com/nicky.myny" },
] as const;

export const collaborationProjects: CollaborationProject[] = [
  {
    slug: "zerocrete",
    title: "Zerocrete",
    partner: "Johan Coetsee",
    year: "2024",
    category: "Material collaboration",
    description:
      "A material-based collaboration with Johan Coetsee, where painting entered dialogue with Zerocrete as surface, texture, and structure.",
    image: zerocreteJohanImg.url,
    imageAlt: "Johan Coetsee holding a bag of ocean waste with Nicky Myny",
    group: "material",
    details: [
      "Painting entered dialogue with Zerocrete as surface, texture, and structure.",
      "Developed as a material-based collaboration rooted in shared studio inquiry.",
    ],
  },
  {
    slug: "daftbynature",
    title: "Daft by Nature",
    partner: "Nina Kay · ARTKOM",
    year: "2025",
    category: "Artist collaboration",
    description:
      "A collaborative body of work created with Nina Kay during her stay at ARTKOM in Belgium, exploring shared process, authorship, and the space between two painterly languages.",
    image: daftImg.url,
    imageAlt: "Nina Kay and Nicky Myny in the studio during Daft by Nature",
    group: "material",
    details: [
      "Two painterly languages developed side by side during a shared studio period.",
      "Explored shared process, authorship, and the space between two practices.",
    ],
  },
  {
    slug: "swartland",
    title: "Swartland",
    partner: "Swartland Revolution",
    year: "2024",
    category: "Commissioned collection",
    description:
      "A commissioned collection of five paintings created for the founders of Swartland Revolution, translating place, legacy, and shared history into painterly form.",
    image: swartlandImg.url,
    imageAlt: "Nicky Myny with the Swartland winemakers and finished canvases",
    group: "commissioned",
    details: [
      "Five paintings translating place, legacy, and shared history into painterly form.",
      "Developed in dialogue with the founders of Swartland Revolution.",
    ],
  },
  {
    slug: "hasher",
    title: "HASHER / Harvest Fest",
    partner: "FRAME Commission",
    year: "2024",
    category: "Relational commission",
    description:
      "A FRAME commission created in the context of Harvest Fest, where shared marks and family presence became the foundation for a finished painting.",
    image: hasherImg.url,
    imageAlt: "Three people painting together on a shared canvas at Harvest Fest",
    group: "commissioned",
    details: [
      "Shared marks and family presence became the foundation for a finished painting.",
      "Developed within the FRAME format during Harvest Fest.",
    ],
    externalLink: {
      label: "External: view the work on Artwork Archive →",
      url: "https://www.artworkarchive.com/pieces/harvest-as-painting",
    },
  },
  {
    slug: "eosc",
    title: "EOSC",
    partner: "European Open Science Cloud",
    year: "2025",
    category: "Institutional commission",
    description:
      "A commissioned portrait shaped through a collective painterly process, created in the context of the European Open Science Cloud.",
    image: eoscImg.url,
    imageAlt: "Nicky Myny painting a large commissioned portrait for EOSC",
    group: "commissioned",
    details: [
      "A commissioned portrait shaped through a collective painterly process.",
      "Presented in the context of the European Open Science Cloud community.",
    ],
    externalLink: {
      label: "External: read the EOSC article →",
      url: "https://eosc.eu/news/eosc-a-community-celebrates-the-legacy-of-president-karel-luyben",
    },
  },
  {
    slug: "unlocking-eve",
    title: "Unlocking Eve / SDG Tent Davos",
    partner: "SDG Tent · World Economic Forum",
    year: "2022",
    category: "Participatory commission",
    description:
      "A painter-led commission and participatory artwork later presented within the SDG Tent context at the World Economic Forum in Davos.",
    image: sdgTentImg.url,
    imageAlt: "Nicky Myny speaking at the SDG Tent, Davos 2022",
    group: "commissioned",
    details: [
      "A painter-led commission and participatory artwork.",
      "Presented within the SDG Tent context at the World Economic Forum in Davos.",
    ],
    externalLink: {
      label: "External: watch the film →",
      url: "https://youtu.be/Ir0j0fzz2R8?si=qQQ9ipbHlawNywDh",
    },
  },
  {
    slug: "roche",
    title: "Roche",
    partner: "Roche BeLux",
    year: "2024",
    category: "Corporate commission",
    description:
      "A corporate commissioned art project developed with Roche BeLux, translating participatory encounters with researchers, patients, doctors, and staff into original artworks on canvas, plexi, and mural surfaces.",
    image: rocheImg.url,
    imageAlt: "Commissioned artwork from the Roche BeLux collection by Nicky Myny",
    group: "commissioned",
    details: [
      "Participatory encounters translated into original artworks on canvas, plexi, and mural surfaces.",
      "Developed with Roche BeLux across researcher, patient, doctor, and staff contexts.",
    ],
  },
];

// Update this list seasonally — remove past dates.
export interface OpenStudioDate {
  date: string;
  hours: string;
  note: string;
}

export const openStudioDates: OpenStudioDate[] = [
  { date: "Thursday 27 August", hours: "18:30–21:00", note: "By RSVP" },
  { date: "Friday 28 August", hours: "13:00–19:00", note: "Open" },
  { date: "Saturday 29 August", hours: "13:00–17:00", note: "Open" },
];

export const navItems = [
  { to: "/works", label: "Works" },
  { to: "/commissions", label: "Commissions" },
  { to: "/studio", label: "Studio" },
  { to: "/about", label: "About" },
  { to: "/inquire", label: "Contact" },
] as const;

export const newsletterCopy =
  "Receive occasional studio news, selected works, upcoming open studio dates, and new bodies of work as they unfold.";

export {
  heroImage,
  studioTableImage,
  collaborationLandscapeImage,
  artworkPortraitOne,
  artworkPortraitTwo,
  aboutStudioImage,
  brushDetailImage,
};
