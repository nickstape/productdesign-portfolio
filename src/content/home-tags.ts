import { images, type Img } from "./images";

/**
 * Floating project tags around the home page column (≥ 834px).
 *
 * Tops are % of the Home content area (the space between the top of the page or the tablet top
 * bar and the wordmark, where the column is centred), so a tag never lands on the wordmark or
 * the footer row at any viewport height.
 * desktop (≥ 1194px): the tag's top-left corner. left is % of the viewport width (Figma Home
 *   canvas 3363:751, updated 24 Nov); top is % of the content area (Figma y ÷ 546, the top of
 *   the wordmark letters on the 1440 × 820 frame).
 * tablet (834–1193px): [x, top] in the 834 (3408:964) and 1194 (3407:1654) frames: x in px from
 *   the left edge of the viewport, top in % of the content area; straight line in between.
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
  /** One [x px, top %] point per TABLET_FRAMES entry, same order. */
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
    desktop: { left: 16.8, top: 12.6 },
    tablet: [[56, 39.9], [155, 41.7]],
  },
  {
    label: "B2B",
    href: "/work/ndd",
    image: images.tagB2B,
    caption: "NDD · ",
    captionAccent: "23+ API integrations",
    durationMs: 280,
    desktop: { left: 18.7, top: 70.6 },
    tablet: [[150, 49], [368, 34.8]],
  },
  {
    label: "Branding",
    image: images.tagBranding,
    caption: "H2ope · branding & assets",
    durationMs: 280,
    desktop: { left: 70.7, top: 14.1 },
    tablet: [[640, 21], [950, 24.4]],
  },
  {
    label: "0 → 1 products",
    image: images.tag0to1,
    caption: "Sóróyà · built from zero",
    durationMs: 300,
    desktop: { left: 79.4, top: 70.6 },
    tablet: [[590, 49.7], [932, 72]],
  },
];
