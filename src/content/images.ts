/**
 * Image manifest — the ONLY place image paths live.
 * One entry per row of each screen's "Images for this screen" table,
 * copied exactly (key, src, alt, width, height).
 */
export type Img = { src: string; alt: string; width: number; height: number };

export const images = {
  /** Round avatar mark. Decorative: it always sits inside a link labelled "Mary Fisher — home". */
  siteLogo: { src: "/assets/shared/Vector.png", alt: "", width: 584, height: 836 },
} satisfies Record<string, Img>;
