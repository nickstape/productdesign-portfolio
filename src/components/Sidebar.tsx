import { primaryNav } from "@/content/site";
import { NavLinks } from "./NavLinks";

/** Desktop (≥ 1194px) nav: fixed at x=38, vertically centred, 24px gaps. */
export function Sidebar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed top-1/2 left-[38px] z-20 hidden -translate-y-1/2 desktop:block"
    >
      <ul className="flex flex-col gap-3">
        <NavLinks items={primaryNav} linkClassName="font-sans text-ui" />
      </ul>
    </nav>
  );
}
