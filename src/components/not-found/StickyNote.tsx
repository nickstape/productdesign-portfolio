import Link from "next/link";
import type { CSSProperties } from "react";

/** Near-black on the accent green (≈ 14:1). */
const INK = "text-[#0f0f0f]";

type NoteLink = {
  label: string;
  /** Leave out for a page that isn't live: the line keeps its look but isn't a link (aria-disabled). */
  href?: string;
  /** Hidden below 834px (the mobile note has two rows). */
  tabletUp?: boolean;
};

type Props = {
  links: NoteLink[];
  className?: string;
  style?: CSSProperties;
};

/**
 * Green "if found, return to" note. Rotation comes from the caller via --note-tilt.
 * < 834px (Figma "404 — 390 v2"): 217 wide, links in 48px rows with a 20% ink rule between them.
 * ≥ 834px (Figma "404"): 230 wide, 17px links 34px apart.
 */
export function StickyNote({ links, className = "", style }: Props) {
  return (
    <div className={className} style={style}>
      <div
        className={`w-[217px] rotate-(--note-tilt) rounded-[2px] bg-accent px-[18px] pt-2 pb-[10px] shadow-[0_14px_24px_rgba(0,0,0,0.45)] tablet:w-[230px] tablet:pb-[20px] ${INK}`}
      >
        <p className="font-mono text-[11px] leading-[16px]">if found, return to</p>
        <ul className="tablet:mt-[10px] tablet:flex tablet:flex-col tablet:gap-[10px]">
          {links.map((link, i) => (
            <li
              key={link.label}
              className={`${link.tabletUp ? "hidden tablet:block" : ""} ${
                i > 0 ? "border-t border-[#0f0f0f]/20 tablet:border-t-0" : ""
              }`}
            >
              {link.href ? (
                <Link
                  href={link.href}
                  className="relative touch-target flex h-6 items-center font-sans tablet:[--hit:34px] text-[14px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f0f0f] tablet:inline-flex tablet:h-auto tablet:text-[17px] tablet:leading-[24px]"
                >
                  <span className="underline decoration-1 [text-underline-position:from-font] hover:decoration-2">
                    {link.label}
                  </span>
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex h-6 cursor-default items-center font-sans text-[14px] whitespace-nowrap tablet:inline-flex tablet:h-auto tablet:text-[17px] tablet:leading-[24px]"
                >
                  <span className="underline decoration-1 [text-underline-position:from-font]">{link.label}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
