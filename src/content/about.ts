import { images, type Img } from "./images";

/**
 * Words for /about. Edit copy here; layout lives in src/app/about/page.tsx.
 * Figma "About" (1440) and "Mobile — About" (390), updated 24 Nov.
 */

/** ≥ 834px: two bio paragraphs (Instrument Sans 19, white). */
export const bio: string[] = [
  "I’m a product designer and specialise in designing clear, scalable digital experiences for complex systems with a strong focus on payment platforms and inclusive design to turn ambiguity into intuitive design. I’ve over 5 years of experience designing financial dashboards and internal tools for banking customers, most recently on NIBSS Direct Debit, the platform behind Nigeria’s recurring payments.",
  "I particularly enjoy the early stages of design research and systems thinking.",
];

/** < 834px: different copy. Label (no dot, it's added), H1 and two bio paragraphs. */
export const mobileIntro = {
  label: "about",
  headline: "Product designer for payments and complex B2B systems.",
  bio: [
    "For 5+ years I’ve designed financial dashboards and internal tools for banking customers, most recently on NIBSS Direct Debit, the platform behind Nigeria’s recurring payments. I turn ambiguity into clear, scalable systems, with accessibility built in from the start.",
    "I’m happiest in the early stages: research, systems thinking and making the case for change.",
  ],
};

/** The ".experience" list, in display order. */
export type Experience = {
  name: string;
  role: string;
  years: string;
  /** Current role: years show in accent green. */
  current?: boolean;
};

export const experience: Experience[] = [
  { name: "Sóróyà", role: "Founder and designer", years: "Now · 2026", current: true },
  { name: "LCC Accelerate", role: "Founder member", years: "2026" },
  { name: "MA Design Management", role: "University of the Arts London", years: "2024–2026" },
  { name: "NIBSS", role: "Product designer · Direct Debit, TNS", years: "2021–2024" },
];

/** ".side quests gallery", in display order. Paths and alt text live in images.ts. */
export type GalleryItem = {
  img: Img;
  /** Shown above the image as "• caption". Lowercase. */
  caption: string;
  /** Desktop display height in px (300–480). Width = height × the manifest's width/height ratio.
   *  The strip is bottom-aligned, so mixed heights share one baseline. */
  height: number;
};

export const gallery: GalleryItem[] = [
  { img: images.gallery01, caption: "richmond hike", height: 480 },
  { img: images.gallery02, caption: "exhibiting studio eko: a barter system", height: 300 },
  { img: images.gallery03, caption: "lcc accelerate 2026 founder member", height: 380 },
  { img: images.gallery04, caption: "international women’s day", height: 300 },
  { img: images.gallery05, caption: "ma grad", height: 340 },
  { img: images.gallery06, caption: "studio eko short film", height: 400 },
  { img: images.gallery07, caption: "building h2ope", height: 300 },
  { img: images.gallery08, caption: "postcards taken by me in senegal", height: 360 },
  { img: images.gallery09, caption: "first 10k", height: 320 },
  { img: images.gallery10, caption: "side quest 10001", height: 380 },
];
