import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Allow everything. Pages that must stay out of search (the 404, /styleguide, every page on a
 * preview deployment) say so with a robots noindex meta tag, which crawlers can only read
 * if they're allowed to fetch the page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
