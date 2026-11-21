import Link from "next/link";
import { Avatar } from "./Avatar";

/** Desktop (≥ 1194px) avatar mark, fixed top-left at x=40 y=32. Links home. */
export function SiteLogo() {
  return (
    <Link
      href="/"
      aria-label="Mary Fisher — home"
      className="fixed top-[32px] left-[40px] z-20 hidden rounded-full touch-target desktop:block"
    >
      <Avatar />
    </Link>
  );
}
