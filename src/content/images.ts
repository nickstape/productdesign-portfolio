/**
 * Image manifest — the ONLY place image paths live.
 * One entry per row of each screen's "Images for this screen" table,
 * copied exactly (key, src, alt, width, height).
 */
export type Img = { src: string; alt: string; width: number; height: number };

export const images = {} satisfies Record<string, Img>;
