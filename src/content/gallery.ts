import { images, type Img } from "./images";

/**
 * ".side quests gallery" on /about, in display order. Paths and alt text live in images.ts.
 * Figma "About — 1194" (3407:1788) and "Mobile — About" (3305:663).
 */
export type GalleryItem = {
  img: Img;
  /** Shown above the image as "• caption". Lowercase. */
  caption: string;
  /** Desktop display height in px (300–480). Width = height × the manifest's width/height ratio. */
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
