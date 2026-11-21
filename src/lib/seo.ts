import type { Metadata } from "next";

/**
 * SEO constants and the per-page metadata helper.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` or `twitter` replaces the
 * layout's whole object, image included. So the share image lives here and every page
 * spreads it back in through `pageMetadata()`.
 */

/**
 * Production origin, no trailing slash. Order: SITE_URL if set (e.g. in Vercel's project
 * env), else Vercel's production domain (set automatically on every Vercel build, previews
 * included), else localhost for local builds.
 */
export const SITE_URL = new URL(
  process.env.SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
).origin;

/** Vercel preview (and development) deployments: never indexed. */
export const IS_PREVIEW = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";

export const SITE_NAME = "Mary Fisher";
export const DEFAULT_TITLE = "Mary Fisher — Product Designer, London";
export const DEFAULT_DESCRIPTION =
  "Product designer in London. I design products people can trust: complex, high-stakes systems in payments and B2B, made to feel simple.";

/** The one share image for every page: public/og.png, 1200 × 630. */
const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Hi, I'm Mary — Mary Fisher, Product Designer",
};

/** Spread into every `openGraph`. */
export const sharedOpenGraph = {
  siteName: SITE_NAME,
  locale: "en_GB",
  type: "website",
  images: [OG_IMAGE],
} satisfies Metadata["openGraph"];

/** Spread into every `twitter`. */
export const sharedTwitter = {
  card: "summary_large_image",
  images: [OG_IMAGE],
} satisfies Metadata["twitter"];

type PageSeo = {
  /** Page title without the " — Mary Fisher" suffix (the layout's template adds it). */
  title?: string;
  description: string;
  /** Route path, e.g. "/about". Used for the canonical and og:url. */
  path: string;
};

/**
 * Title, description, canonical, Open Graph and Twitter card for one page. Leave `title` out
 * for the default title (Home).
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  return {
    title: title ?? { absolute: DEFAULT_TITLE },
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, title: fullTitle, description, url: path },
    twitter: { ...sharedTwitter, title: fullTitle, description },
  };
}
