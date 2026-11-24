import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { isCaseLive } from "@/content/case-status";
import { listSlugs } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/seo";

/**
 * Every public page. Not listed: /styleguide (noindex), the 404 and case studies that aren't live
 * yet (src/content/case-status.ts).
 * lastModified: the last git commit touching the page's own source files. Falls back to the
 * build time when git history isn't available (e.g. a shallow clone).
 */
function lastModified(files: string[]): Date {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) return new Date(iso);
  } catch {
    // No git: fall through.
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; files: string[] }[] = [
    { path: "/", files: ["src/app/page.tsx", "src/components/MobileHome.tsx", "src/content"] },
    { path: "/about", files: ["src/app/about", "src/content/about.ts"] },
    ...listSlugs().filter(isCaseLive).map((slug) => ({
      path: `/work/${slug}`,
      files: [`src/content/work/${slug}.mdx`, "src/app/work/[slug]/page.tsx"],
    })),
  ];

  return pages.map(({ path, files }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified(files),
  }));
}
