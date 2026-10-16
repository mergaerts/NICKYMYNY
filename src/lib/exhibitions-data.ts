import heroImageRaw from "@/assets/exhibitions/hero.jpg";
import gallery88ImageRaw from "@/assets/exhibitions/gallery88.jpg";
import spiceRouteImageRaw from "@/assets/exhibitions/spice-route.jpg";
import earthSistersImageRaw from "@/assets/exhibitions/earth-sisters.jpg";
import theBlessingImageRaw from "@/assets/exhibitions/the-blessing.jpg";
import daringDeitiesImageRaw from "@/assets/exhibitions/daring-deities.jpg";
import haraFluxImageRaw from "@/assets/exhibitions/hara-flux.jpg";
import closingImageRaw from "@/assets/exhibitions/closing.jpg";

const heroImage = heroImageRaw.src;
const gallery88Image = gallery88ImageRaw.src;
const spiceRouteImage = spiceRouteImageRaw.src;
const earthSistersImage = earthSistersImageRaw.src;
const theBlessingImage = theBlessingImageRaw.src;
const daringDeitiesImage = daringDeitiesImageRaw.src;
const haraFluxImage = haraFluxImageRaw.src;
const closingImage = closingImageRaw.src;
import zerocreteImg from "@/assets/zerocrete.png.asset.json";
import earthSistersCollectionImg from "@/assets/earthsisters.png.asset.json";
import spaceInBetweenImg from "@/assets/thespaceinbetween.png.asset.json";
import whereWeStandImg from "@/assets/wherewestand.png.asset.json";
import worksTop1 from "@/assets/works-top-1.png.asset.json";
import worksTop2 from "@/assets/works-top-2.png.asset.json";
import worksTop3 from "@/assets/works-top-3.png.asset.json";
import worksArchive from "@/assets/works-archive.png.asset.json";
import reconnection from "@/assets/painting-reconnection-v2.png.asset.json";

const workA = worksTop1.url;
const workB = worksTop2.url;
const workC = worksTop3.url;
const workD = zerocreteImg.url;
const workE = earthSistersCollectionImg.url;
const workF = spaceInBetweenImg.url;
const workG = whereWeStandImg.url;
const workH = worksArchive.url;
const workI = reconnection.url;

export type ExhibitionType = "Solo Exhibition" | "Group Exhibition" | "Studio Presentation";

export interface SelectedWork {
  image: string;
  title?: string;
  dimensions?: string;
  medium?: string;
}

export interface ExhibitionCard {
  slug: string;
  title: string;
  type: ExhibitionType;
  venue: string;
  location: string;
  date: string;
  year: number;
  image: string;
  imageAlt: string;
  intro: string;
  about: string;
  atmosphere: string[];
  filmCaption?: string;
  youtubeId?: string;
  posterImage?: string;
  posterCaption?: string;
  selectedWorks: SelectedWork[];
  selectedWorksLink?: { label: string; to: string };
  primaryCta?: { label: string; to: string };
  externalUrl?: string;
}

const defaultMedium = "Mixed media on canvas";
const commonWorks: SelectedWork[] = [
  { image: workA, dimensions: "150 × 120 cm", medium: defaultMedium },
  { image: workB, dimensions: "120 × 100 cm", medium: defaultMedium },
  { image: workC, dimensions: "100 × 100 cm", medium: defaultMedium },
  { image: workH, dimensions: "150 × 120 cm", medium: defaultMedium },
  { image: workI, dimensions: "120 × 120 cm", medium: defaultMedium },
  { image: workE, dimensions: "100 × 80 cm", medium: defaultMedium },
];

export const heroExhibitionImage = heroImage;

export const exhibitionsList: ExhibitionCard[] = [
  {
    slug: "gallery88-paarl",
    title: "Gallery88 Paarl",
    type: "Solo Exhibition",
    venue: "Gallery88",
    location: "Paarl, South Africa",
    date: "5 – 28 April 2024",
    year: 2024,
    image: gallery88Image,
    imageAlt: "Abstract painting in a light interior at Gallery88 Paarl",
    intro:
      "A solo presentation of recent paintings developed between the Belgian studio and the South African landscape.",
    about:
      "Presented at Gallery88 in Paarl, this exhibition brought together a body of work shaped by two studios and two landscapes. The paintings sit between memory and encounter, holding traces of the South African terrain within a European painterly language. Rooted in slow layering, pigment shifts and painterly restraint, the works invite quiet looking. The presentation was conceived as an unfolding sequence — a room to be crossed rather than consumed — allowing each painting to hold its own atmosphere before entering into dialogue with the next.",
    atmosphere: [gallery88Image, spiceRouteImage, earthSistersImage, heroImage],
    posterImage: gallery88Image,
    posterCaption: "Gallery88 — Nicky Myny, New Works, 5 – 28 April 2024",
    filmCaption: "Gallery88 Paarl · Nicky Myny Exhibition 2024",
    selectedWorks: commonWorks,
    selectedWorksLink: { label: "View Full Collection", to: "/works" },
    primaryCta: { label: "Enquire via Gallery88", to: "/inquire" },
    externalUrl: "https://www.nickymyny.com/exhibitions/gallery88-paarl",
  },
  {
    slug: "spice-route",
    title: "Spice Route",
    type: "Solo Exhibition",
    venue: "Spice Route Destination",
    location: "Franschhoek / Paarl, South Africa",
    date: "March 2024",
    year: 2024,
    image: spiceRouteImage,
    imageAlt: "Installation view at Spice Route Destination",
    intro:
      "A site-responsive presentation set within the stone architecture of the Spice Route Destination.",
    about:
      "Held within the stone-walled halls of the Spice Route Destination, this exhibition placed painting in direct conversation with landscape, architecture and the material history of the site. The works — dense, warm, elemental — echoed the ochre, ash and shadow of the surrounding terrain. The exhibition unfolded as a slow walk through space, with each painting inviting a moment of stillness inside an active hospitality context. Presented under the banner of Where We Stand, the presentation reflected on rootedness and passage between two homelands.",
    atmosphere: [spiceRouteImage, gallery88Image, heroImage, earthSistersImage],
    posterImage: spiceRouteImage,
    posterCaption: "Spice Route Destination · Where We Stand, March 2024",
    filmCaption: "Where We Stand · Spice Route, Paarl",
    selectedWorks: [
      { image: workG, dimensions: "160 × 130 cm", medium: defaultMedium },
      { image: workA, dimensions: "150 × 120 cm", medium: defaultMedium },
      { image: workH, dimensions: "150 × 120 cm", medium: defaultMedium },
      { image: workB, dimensions: "120 × 100 cm", medium: defaultMedium },
      { image: workC, dimensions: "100 × 100 cm", medium: defaultMedium },
      { image: workI, dimensions: "120 × 120 cm", medium: defaultMedium },
    ],
    selectedWorksLink: { label: "View Full Collection", to: "/works/where-we-stand" },
    primaryCta: { label: "View Available Works", to: "/works" },
    externalUrl: "https://www.nickymyny.com/exhibitions/spice-route",
  },
  {
    slug: "earth-sisters",
    title: "Earth Sisters",
    type: "Solo Exhibition",
    venue: "Aarschot",
    location: "Aarschot, Belgium",
    date: "November 2023",
    year: 2023,
    image: earthSistersImage,
    imageAlt: "Installation view of Earth Sisters",
    intro:
      "A solo presentation exploring feminine lineage, embodiment and quiet inheritance.",
    about:
      "Earth Sisters gathered a body of work devoted to feminine presence — figures held in warm pigment, standing between portrait and atmosphere. The exhibition proposed painting as a slow language for memory, inheritance and relation, with each figure carrying a quiet weight of listening. The presentation kept an intentionally spacious rhythm, allowing the works to speak in a whisper rather than a statement. Its atmosphere was set by natural light, warm earth tones and a small ceramic vocabulary placed among the paintings.",
    atmosphere: [earthSistersImage, heroImage, haraFluxImage, spiceRouteImage],
    posterImage: earthSistersImage,
    posterCaption: "Earth Sisters · Aarschot, November 2023",
    selectedWorks: [
      { image: workE, dimensions: "140 × 110 cm", medium: defaultMedium },
      { image: workA, dimensions: "150 × 120 cm", medium: defaultMedium },
      { image: workC, dimensions: "100 × 100 cm", medium: defaultMedium },
      { image: workI, dimensions: "120 × 120 cm", medium: defaultMedium },
      { image: workB, dimensions: "120 × 100 cm", medium: defaultMedium },
      { image: workH, dimensions: "150 × 120 cm", medium: defaultMedium },
    ],
    selectedWorksLink: { label: "View Full Collection", to: "/works/earth-sisters" },
    primaryCta: { label: "Contact the Studio", to: "/inquire" },
    externalUrl: "https://www.nickymyny.com/exhibitions/earthsisters",
  },
  {
    slug: "the-blessing",
    title: "The Blessing",
    type: "Studio Presentation",
    venue: "Studio Exhibition",
    location: "Cape Town, South Africa",
    date: "September 2023",
    year: 2023,
    image: theBlessingImage,
    imageAlt: "Installation view of The Blessing studio exhibition",
    intro:
      "An intimate studio exhibition held within a working painter's environment in Cape Town.",
    about:
      "The Blessing was conceived as a studio exhibition — a moment where the painter's working space briefly opened as a public setting. The paintings, deep in tone and quietly luminous, remained close to the surfaces on which they were made. Rather than translating the works into a neutral white cube, the presentation kept them within concrete walls and warm light, preserving the texture of the studio itself. The result was a viewing situation that felt more like an encounter than an exhibition.",
    atmosphere: [theBlessingImage, gallery88Image, heroImage, haraFluxImage],
    posterImage: theBlessingImage,
    posterCaption: "The Blessing · Studio Exhibition, Cape Town, September 2023",
    selectedWorks: commonWorks,
    primaryCta: { label: "Contact the Studio", to: "/inquire" },
    externalUrl: "https://www.nickymyny.com/exhibitions/the-blessing",
  },
  {
    slug: "daring-deities",
    title: "Daring Deities",
    type: "Group Exhibition",
    venue: "Brussels",
    location: "Brussels, Belgium",
    date: "June – July 2023",
    year: 2023,
    image: daringDeitiesImage,
    imageAlt: "Installation view of Daring Deities",
    intro:
      "A group exhibition assembling contemporary painters around figure, myth and material.",
    about:
      "Daring Deities gathered a group of contemporary painters engaged with figure, symbol and the residue of myth in present life. Within the exhibition, the contributed works pursued a painterly threshold — bodies suggested through gesture, forms held in suspension between recognisable and abstract. The presentation invited a slow reading, allowing each work to enter the shared conversation on its own terms while contributing to a wider chorus around presence, feminine authorship and inherited image.",
    atmosphere: [daringDeitiesImage, heroImage, earthSistersImage, spiceRouteImage],
    posterImage: daringDeitiesImage,
    posterCaption: "Daring Deities · Brussels, June – July 2023",
    selectedWorks: commonWorks,
    primaryCta: { label: "Contact the Studio", to: "/inquire" },
    externalUrl: "https://www.nickymyny.com/exhibitions/daringdeities",
  },
  {
    slug: "hara-flux",
    title: "Hara Flux",
    type: "Solo Exhibition",
    venue: "Brussels",
    location: "Brussels, Belgium",
    date: "March 2023",
    year: 2023,
    image: haraFluxImage,
    imageAlt: "Installation view of Hara Flux",
    intro:
      "A solo presentation gathered around breath, centre and the quiet architecture of the body.",
    about:
      "Hara Flux gathered a suite of paintings held together by a single inquiry: how the body carries centre, breath and quiet duration. The works remained close to a warm, near-monochrome register, with subtle shifts in pigment marking presence rather than event. Presented in a spare Brussels gallery corner, the exhibition read as a considered pause — a small, precisely tuned proposition about painting as containment and release.",
    atmosphere: [haraFluxImage, heroImage, earthSistersImage, theBlessingImage],
    posterImage: haraFluxImage,
    posterCaption: "Hara Flux · Brussels, March 2023",
    selectedWorks: commonWorks,
    primaryCta: { label: "Contact the Studio", to: "/inquire" },
    externalUrl: "https://www.nickymyny.com/exhibitions/vernissageharaflux",
  },
];

export const closingImageUrl = closingImage;

export function getExhibitionBySlug(slug: string) {
  return exhibitionsList.find((e) => e.slug === slug);
}
