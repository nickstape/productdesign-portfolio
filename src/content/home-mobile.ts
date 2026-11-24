import { images, type Img } from "./images";

/** Copy for the mobile home page (< 834px), Figma "Mobile — Home" (3294:633). */

export const highlights2026: string[] = [
  "Graduated MA, Design Management",
  "Founder member, LCC Accelerate 2026",
  "Grew Sóróyà to 10,000 monthly visits.",
];

export type SelectedWork = {
  /** Sentence = before + link + after. */
  before: string;
  link: {
    label: string;
    /** Internal route or full URL. Leave empty until known: the name then renders as plain text and the row isn't tappable. */
    href: string;
    external?: boolean;
  };
  after: string;
  meta: string;
  /** Peek thumbnail shown on hover/focus/press (84 × 57, cropped to fill). */
  peek: Img;
};

/** Sóróyà live platform. */
const SOROYA_URL = "https://www.instagram.com/wearesoroya";

/** Numbered 01, 02, 03 in this order. */
export const selectedWork: SelectedWork[] = [
  {
    before: "Led the redesign of ",
    link: { label: "NIBSS Direct Debit", href: "/work/ndd" },
    after: ", the console behind Nigeria’s national direct debit scheme.",
    meta: "Case study · Fintech · B2B · 2023",
    peek: images.tagB2B,
  },
  {
    before: "Designed ",
    link: { label: "TNS", href: "/work/tns" },
    after: ", real-time status for payments that are pending, delayed or failed.",
    meta: "Case study · Fintech · Mobile · 2024",
    peek: images.tagPayments,
  },
  {
    before: "Founded ",
    link: { label: "Sóróyà", href: SOROYA_URL, external: true },
    after: ", a research-led cultural platform for African women creatives.",
    meta: "Live platform ↗ · 0 → 1 · 2026",
    peek: images.tag0to1,
  },
];
