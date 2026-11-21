/**
 * Image manifest — the ONLY place image paths live.
 * One entry per row of each screen's "Images for this screen" table,
 * copied exactly (key, src, alt, width, height).
 */
export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Videos only: still shown before playback and with reduced motion. */
  poster?: string;
};

export const images = {
  /** Round avatar mark. Decorative: it always sits inside a link labelled "Mary Fisher — home". */
  siteLogo: { src: "/assets/shared/Vector.png", alt: "", width: 584, height: 836 },

  /* ---- Home ---- */
  portrait: { src: "/assets/home/portrait.jpg", alt: "Mary Fisher, smiling, arms folded, in a black top", width: 192, height: 248 },
  bookTheList: { src: "/assets/home/book-the-list.jpg", alt: "Cover of The List by Yomi Adegoke", width: 80, height: 112 },
  tagPayments: { src: "/assets/home/tags/payments.jpg", alt: "TNS transfer status screens", width: 560, height: 350 },
  tagB2B: { src: "/assets/home/tags/b2b.mp4", alt: "NIBSS Direct Debit All Mandates console", width: 560, height: 350 },
  tagDesignSystems: { src: "/assets/home/tags/design-systems.jpg", alt: "NDD component and accessibility sheet", width: 560, height: 350 },
  tag0to1: { src: "/assets/home/tags/0-to-1.mp4", alt: "Sóróyà platform home page", width: 560, height: 350 },
  tagBranding: { src: "/assets/home/tags/branding.gif", alt: "H20pe wordmark and brand", width: 560, height: 350 },
} satisfies Record<string, Img>;
