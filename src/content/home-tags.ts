import { images, type Img } from "./images";

/**
 * Floating project tags around the home page column (≥ 834px).
 *
 * Tags are anchored to the content block (kicker to Currently reading): tops are % of the block's
 * height from its top (negative = above it), so they move with the block as spare height grows
 * and scale with it when its gaps shrink, as in Figma's 1440 × 820 and 1440 × 1024 frames.
 * desktop (≥ 1194px): the tag's top-left corner. left is % of the viewport width (Figma Home
 *   canvas 3363:751, updated 24 Nov); top is (Figma y − kicker y 151) ÷ the 355px block.
 * tablet (834–1193px): [x, top] in the 834 (3408:964) and 1194 (3407:1654) frames: x in px from
 *   the left edge of the viewport, top in % of the block (the frames' px from the column top
 *   ÷ the 834 frame's 406px column); straight line in between.
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
    desktop: { left: 16.8, top: -23.1 },
    tablet: [[56, 29.1], [155, 33.3]],
  },
  {
    label: "B2B",
    href: "/work/ndd",
    image: images.tagB2B,
    caption: "NDD · ",
    captionAccent: "23+ API integrations",
    durationMs: 280,
    desktop: { left: 18.7, top: 65.9 },
    tablet: [[150, 48.8], [368, 25.6]],
  },
  {
    label: "Branding",
    image: images.tagBranding,
    caption: "H2ope · branding & assets",
    durationMs: 280,
    desktop: { left: 70.7, top: -20.8 },
    tablet: [[640, -4.9], [950, 14]],
  },
  {
    label: "0 → 1 products",
    image: images.tag0to1,
    caption: "Sóróyà · built from zero",
    durationMs: 300,
    desktop: { left: 79.4, top: 65.9 },
    tablet: [[590, 50.2], [932, 67]],
  },
];
