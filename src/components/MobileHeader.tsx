import Link from "next/link";
import { cvLink, primaryNav, type NavItem } from "@/content/site";

/** AskMary shows from 834px; CV only below it. */
const items: NavItem[] = [
  ...primaryNav.map((i) => (i.href === "/ask" ? { ...i, className: "hidden tablet:block" } : i)),
  { ...cvLink, className: "tablet:hidden" },
];
import { Avatar } from "./Avatar";
import { NavLinks } from "./NavLinks";

/**
 * Sticky 60px top bar below 1194px.
 * < 834: avatar only, Work / About / CV ↗ in mono 13, 1px line under it.
 * 834–1193: Figma "Home — 834" header (3408:965): the sidebar moved to the top. Avatar only,
 *   Work / About / AskMary in the sidebar's sans 16, 28px apart, 38px from each edge, no line.
 */
export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-line bg-bg px-2 tablet:border-transparent tablet:px-[38px] desktop:hidden">
      <Link
        href="/"
        aria-label="Mary Fisher — home"
        className="relative touch-target flex items-center"
      >
        <Avatar />
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-2 tablet:gap-[28px]">
          <NavLinks
            items={items}
            linkClassName="font-mono text-label tablet:font-sans tablet:text-ui"
            idleClassName="text-[#b8b8b4] hover:text-text tablet:text-muted"
          />
        </ul>
      </nav>
    </header>
  );
}
