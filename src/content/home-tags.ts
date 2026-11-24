import { images, type Img } from "./images";

/**
 * Floating project tags around the home page column (≥ 834px).
 *
 * desktop (≥ 1194px): the tag's top-left corner as % of the 1440 × 820 Figma Home canvas
 *   (3363:751, updated 24 Nov). left is % of the viewport width; top is % of 820px from the top
 *   of the composition, which moves down with the column on taller screens (globals.css,
 *   --home-column-top).
 * tablet (834–1193px): px in the 834 (3408:964) and 1194 (3407:1654) frames: x from the left
 *   edge of the viewport, y from the top of the centre column; straight line in between.
 */
export const TABLET_FRAMES = [834, 1194] as const;

/**
 * View transition type for a tag → case study navigation: Home dissolves into the case study in
 * 300ms (globals.css, "Tag → case study"). Here, not in ProjectTags, so the server page can read it.
 */
export const TAG_DISSOLVE = "tag-dissolve";

type Point = [x: number, y: number];

export type HomeTag = {
  label: string;
  /** Case study route. Leave out for a project that isn't live yet: it renders as a disabled button. */
  href?: string;
  image: Img;
  /** One line under the preview image (muted). */
  caption: string;
  /** Optional rest of the caption, in accent green. */
  captionAccent?: string;
  /** Hover/focus transition of the tag and its card. */
  durationMs: 280 | 300;
  desktop: { left: number; top: number };
  /** One point per TABLET_FRAMES entry, same order. */
  tablet: [Point, Point];
};

/** DOM order = keyboard order: left column top to bottom, then right column top to bottom. */
export const homeTags: HomeTag[] = [
  {
    label: "Payments",
    href: "/work/tns",
    image: images.tagPayments,
    caption: "Transfer Notification Service",
    durationMs: 280,
    desktop: { left: 16.8, top: 8.4 },
    tablet: [[56, 118], [155, 135]],
  },
  {
    label: "B2B",
    href: "/work/ndd",
    image: images.tagB2B,
    caption: "NDD · ",
    captionAccent: "23+ API integrations",
    durationMs: 280,
    desktop: { left: 18.7, top: 47 },
    tablet: [[150, 198], [368, 104]],
  },
  {
    label: "Branding",
    image: images.tagBranding,
    caption: "H2ope · branding & assets",
    durationMs: 280,
    desktop: { left: 70.7, top: 9.4 },
    tablet: [[640, -20], [950, 57]],
  },
  {
    label: "0 → 1 products",
    image: images.tag0to1,
    caption: "Sóróyà · built from zero",
    durationMs: 300,
    desktop: { left: 79.4, top: 47 },
    tablet: [[590, 204], [932, 272]],
  },
];
