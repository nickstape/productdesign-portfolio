import Link from "next/link";
import { cvLink, primaryNav, type NavItem } from "@/content/site";

/** AskMary shows from 834px; CV only below it. */
const items: NavItem[] = [
  ...primaryNav.map((i) => (i.href === "/ask" ? { ...i, className: "hidden tablet:block" } : i)),
  { ...cvLink, className: "tablet:hidden" },
];
import { Avatar } from "./Avatar";
import { NavLinks } from "./NavLinks";
import { gutter } from "./gutter";

/**
 * Sticky top bar below 1194px.
 * < 834: Work / About / CV ↗ · 834–1193: Work / About / AskMary.
 */
export function MobileHeader() {
  return (
    <header
      className={`sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-line bg-bg desktop:hidden ${gutter}`}
    >
      <Link href="/" className="flex items-center gap-1 font-sans text-ui font-medium text-text">
        <Avatar />
        Mary Fisher
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-2 tablet:gap-3">
          <NavLinks items={items} linkClassName="font-mono text-nav" />
        </ul>
      </nav>
    </header>
  );
}
