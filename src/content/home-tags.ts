import { images, type Img } from "./images";

/**
 * Floating project tags around the home page column (desktop, ≥ 1194px).
 *
 * position: top-left corner of the tag, in % of the tag field. The field spans the full
 * viewport width and is TAG_FIELD_HEIGHT tall, starting at the top of the centre column.
 * Values come from the 1194 × 834 Figma frame: x = left ÷ 1194, y = (top − 151) ÷ 347.
 */
export const TAG_FIELD_HEIGHT = 347;

export type HomeTag = {
  label: string;
  /** Case study route. Leave out for a project that isn't live yet: it renders as a disabled button. */
  href?: string;
  image: Img;
  /** One line under the preview image */
  caption: string;
  position: { x: number; y: number };
  /** Which edge of the tag the preview card lines up with. Right-hand tags use "end" so the card stays on screen. */
  previewAlign: "start" | "end";
};

const COMING_SOON = "Sóróyà case study coming soon";

/** DOM order = keyboard order: left column top to bottom, then right column top to bottom. */
export const homeTags: HomeTag[] = [
  {
    label: "Payments",
    href: "/work/tns",
    image: images.tagPayments,
    caption: "Transfer Notification Service",
    position: { x: 12.98, y: 38.9 },
    previewAlign: "start",
  },
  {
    label: "B2B",
    href: "/work/ndd",
    image: images.tagB2B,
    caption: "NIBSS Direct Debit · 50+ components",
    position: { x: 22.11, y: 55.9 },
    previewAlign: "start",
  },
  {
    label: "Branding",
    image: images.tagBranding,
    caption: "H20pe case study coming soon",
    position: { x: 76.55, y: 27.4 },
    previewAlign: "end",
  },
  {
    label: "Design Systems",
    href: "/work/ndd",
    image: images.tagDesignSystems,
    caption: "NIBSS Direct Debit · WCAG AA audited",
    position: { x: 63.82, y: 48.1 },
    previewAlign: "end",
  },
  {
    label: "0 → 1 products",
    image: images.tag0to1,
    caption: COMING_SOON,
    position: { x: 72.03, y: 71.8 },
    previewAlign: "end",
  },
];
