/** Site-wide links used by the shell (nav, header, footer). */

export type NavItem = {
  label: string;
  href: string;
  /** Extra path prefixes that also mark this item as current. */
  match?: string[];
  external?: boolean;
  /** Extra classes on the <li>, e.g. breakpoint visibility. */
  className?: string;
};

/** Desktop sidebar and tablet top bar. */
export const primaryNav: NavItem[] = [
  { label: "Work", href: "/", match: ["/work"] },
  { label: "About", href: "/about" },
  { label: "AskMary", href: "/ask" },
];

/** Replaces AskMary in the mobile top bar (< 834px). File goes in public/cv.pdf. */
export const cvLink: NavItem = { label: "CV", href: "/cv.pdf", external: true };

export const contact = {
  linkedin: "https://www.linkedin.com/in/fisheranike/",
  email: "anike.fisher@gmail.com",
};

export function isCurrent(item: NavItem, pathname: string | null): boolean {
  if (!pathname || item.external) return false;
  const prefixes = [item.href, ...(item.match ?? [])];
  return prefixes.some((p) =>
    p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(`${p}/`),
  );
}
