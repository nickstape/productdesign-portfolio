import { images, type Img } from "./images";

/**
 * Floating project tags around the home page column (≥ 834px).
 *
 * position: the tag's top-left corner in each Figma Home frame, in px: x from the left edge of
 * the viewport, y from the top of the centre column (the ".hello" label). Frames: 834 (3408:964,
 * column at y 270), 1194 (3407:1654, y 151), 1440 (3363:751, y 151), 1920 (3407:824, y 211).
 * Between frames the tag moves in a straight line; above 1920, x keeps its share of the width
 * so the tags spread with the extra room, and y holds.
 */
export const TAG_FRAMES = [834, 1194, 1440, 1920] as const;

type Point = [x: number, y: number];

export type HomeTag = {
  label: string;
  /** Case study route. Leave out for a project that isn't live yet: it renders as a disabled button. */
  href?: string;
  image: Img;
  /** One line under the preview image */
  caption: string;
  /** One point per TAG_FRAMES entry, same order. */
  position: [Point, Point, Point, Point];
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
    position: [[56, 118], [155, 135], [200, 42], [302, 105]],
    previewAlign: "start",
  },
  {
    label: "B2B",
    href: "/work/ndd",
    image: images.tagB2B,
    caption: "NIBSS Direct Debit · 50+ components",
    position: [[150, 198], [368, 104], [316, 226], [579, 147]],
    previewAlign: "start",
  },
  {
    label: "Branding",
    image: images.tagBranding,
    caption: "H20pe case study coming soon",
    position: [[640, -20], [950, 57], [1143, -14], [1521, 13]],
    previewAlign: "end",
  },
  {
    label: "Design Systems",
    href: "/work/ndd",
    image: images.tagDesignSystems,
    caption: "NIBSS Direct Debit · WCAG AA audited",
    position: [[540, 130], [757, 114], [930, 167], [1281, 163]],
    previewAlign: "end",
  },
  {
    label: "0 → 1 products",
    image: images.tag0to1,
    caption: COMING_SOON,
    position: [[590, 204], [932, 272], [1143, 234], [1456, 315]],
    previewAlign: "end",
  },
];
