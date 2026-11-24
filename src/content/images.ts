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
  /** Logo mark, shown at 24 × 34 (never cropped round). Decorative: it always sits inside a link labelled "Mary Fisher — home". */
  siteLogo: { src: "/assets/shared/Vector.png", alt: "", width: 584, height: 836 },

  /* ---- Home ---- */
  portrait: { src: "/assets/home/portrait.jpg", alt: "Mary Fisher, smiling, arms folded, in a black top", width: 192, height: 248 },
  bookTheList: { src: "/assets/home/book-the-list.jpg", alt: "Cover of The List by Yomi Adegoke", width: 80, height: 112 },
  tagPayments: { src: "/assets/home/tags/payments.jpg", alt: "TNS transfer status screens", width: 560, height: 350 },
  tagB2B: { src: "/assets/home/tags/b2b.mp4", alt: "NIBSS Direct Debit All Mandates console", width: 560, height: 350 },
  tag0to1: { src: "/assets/home/tags/0-to-1.mp4", alt: "Sóróyà platform home page", width: 560, height: 350 },
  tagBranding: { src: "/assets/home/tags/branding.gif", alt: "H20pe wordmark and brand", width: 560, height: 350 },

  /* ---- About: side quests gallery (captions and display heights in gallery.ts) ---- */
  gallery01: { src: "/assets/about/gallery/01-richmond-hike.jpg", alt: "Mary leaning on a \"Thank you for visiting\" sign in Richmond Park", width: 536, height: 952 },
  gallery02: { src: "/assets/about/gallery/02-studio-eko.jpg", alt: "Mary talking with visitors at the Studio Eko exhibition", width: 642, height: 600 },
  gallery03: { src: "/assets/about/gallery/03-lcc-accelerate.jpg", alt: "LCC Accelerate 2026 founders slide on screen at the cohort launch", width: 764, height: 760 },
  gallery04: { src: "/assets/about/gallery/04-international-womens-day.jpg", alt: "Mary and a friend with an International Women's Day frame", width: 476, height: 520 },
  gallery05: { src: "/assets/about/gallery/05-ma-grad.jpg", alt: "A graduate in a black gown and mortarboard on a city street on graduation day", width: 3213, height: 5712 },
  gallery06: { src: "/assets/about/gallery/06-studio-eko.JPG", alt: "A visitor in headphones watches the Studio Eko short film next to a screen on a stand", width: 6240, height: 4160 },
  gallery07: { src: "/assets/about/gallery/07-h2ope.jpeg", alt: "A team presents a research framework slide to a seated audience in a studio", width: 4032, height: 3024 },
  gallery08: { src: "/assets/about/gallery/08-postcards.JPG", alt: "Two postcards from Senegal: a horse and cart by the beach, and a painted yellow and blue bus on a street", width: 3072, height: 3840 },
  gallery09: { src: "/assets/about/gallery/09-10k.jpg", alt: "A runner bites her finisher’s medal in front of the Access Bank Lagos City Marathon backdrop", width: 3024, height: 4032 },
  gallery10: { src: "/assets/about/gallery/10-quest.jpg", alt: "A woman sits under a painting of two schoolgirls while someone photographs her", width: 3213, height: 5712 },

  /* ---- Work: NDD case study ----
     Files: public/assets/work/ndd/. width × height are each file's real pixel size (the earlier
     table sizes no longer matched the files). Video posters: the frame at 1s, same pixel size,
     shown before playback and instead of the video under reduced motion. */
  nddHeroVideo: { src: "/assets/work/ndd/hero-all-mandates.mp4", alt: "NDD All Mandates screen: a filterable table of direct debit mandates with status tags", width: 1728, height: 1118, poster: "/assets/work/ndd/hero-all-mandates-poster.jpg" },
  nddProblem: { src: "/assets/work/ndd/problem-old-login.png", alt: "The original NDD login screen before the redesign", width: 3114, height: 1754 },
  nddExp01DesignSystem: { src: "/assets/work/ndd/exp01-design-system.png", alt: "NDD design system: shared components and tokens used across all seven role workspaces", width: 1064, height: 532 },
  nddExp02Before: { src: "/assets/work/ndd/exp02-login-before.png", alt: "Old sign-in form, annotated: no visual hierarchy, flat structure, no clear instructions", width: 525, height: 490 },
  nddExp02AfterVideo: { src: "/assets/work/ndd/exp02-sso-after.mp4", alt: "Redesigned login with a \"Continue with Microsoft\" single sign-on button", width: 918, height: 848, poster: "/assets/work/ndd/exp02-sso-after-poster.jpg" },
  nddExp03Before: { src: "/assets/work/ndd/exp03-ia-before.png", alt: "NDD navigation before the redesign: a separate menu structure for each role", width: 3353, height: 2878 },
  nddExp03After: { src: "/assets/work/ndd/exp03-ia-after.png", alt: "Collapsible sidebar shown expanded and collapsed, with a role-specific menu", width: 933, height: 1117 },
  nddExp04FilteringVideo: { src: "/assets/work/ndd/exp04-filtering.mp4", alt: "All Mandates table with dynamic filters applied", width: 2762, height: 1540, poster: "/assets/work/ndd/exp04-filtering-poster.jpg" },
  nddExp05A11y: { src: "/assets/work/ndd/exp05-accessibility-sheet.png", alt: "Component sheet showing input and dropdown states with contrast checks", width: 1708, height: 1815 },
  /* Full IA (the "see full IA" lightbox in the IA section). No file yet, so the link is hidden.
     To turn it on: add public/assets/work/ndd/full-ia.png, uncomment this line and set width and
     height to the file's pixel size. <Popup> also stays hidden while the file is missing. */
  // nddFullIa: { src: "/assets/work/ndd/full-ia.png", alt: "NDD information architecture: every role's screens and how they connect", width: 0, height: 0 },
} satisfies Record<string, Img>;
