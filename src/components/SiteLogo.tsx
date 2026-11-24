import Link from "next/link";
import { Avatar } from "./Avatar";

/** Desktop (≥ 1194px) logo (24 × 34), fixed top-left at x=40 y=32. Links home. */
export function SiteLogo() {
  return (
    <Link
      href="/"
      aria-label="Mary Fisher — home"
      className="fixed top-[32px] left-[40px] z-20 hidden touch-target desktop:block"
    >
      <Avatar />
    </Link>
  );
}
