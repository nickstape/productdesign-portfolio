import type { CSSProperties } from "react";
import { ContentImage } from "@/components/ContentImage";
import type { Img } from "@/content/images";
import { PressGroup } from "./PressGroup";

/* Physical-object colours from Figma "404" (3451:1109); no site token covers them. */
const PAPER = "bg-[#f2f0e8]";
const PAPER_INK = "text-[#1a1a1a]";
const TAPE = "bg-[rgba(237,229,204,0.55)]";

type Props = {
  photo: Img;
  caption: string;
  /** Card rotation in degrees, e.g. 8 or -6. */
  tilt: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Taped instant photo. A 150 × 196 box with a 138 × 182 card centred in it.
 * Hover (pointer devices) or press (touch): 260ms ease-out, the card straightens, lifts 12px and
 * its shadow grows; the tape eases to 3deg. Reduced motion: only the shadow changes.
 * Decorative picture, not a link: no tab stop.
 */
export function Polaroid({ photo, caption, tilt, className = "", style }: Props) {
  const lift =
    "motion-safe:group-hover:rotate-0 motion-safe:group-hover:-translate-y-[12px] motion-safe:group-data-[pressed]:rotate-0 motion-safe:group-data-[pressed]:-translate-y-[12px]";

  return (
    <PressGroup
      className={`h-[196px] w-[150px] ${className}`}
      style={{ ...style, "--tilt": `${tilt}deg` } as CSSProperties}
    >
      <figure
        className={`absolute top-[7px] left-[6px] h-[182px] w-[138px] rotate-(--tilt) rounded-[2px] p-1 ${PAPER} shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-[rotate,translate,box-shadow] duration-[260ms] ease-out group-hover:shadow-[0_24px_40px_rgba(0,0,0,0.7)] group-data-[pressed]:shadow-[0_24px_40px_rgba(0,0,0,0.7)] ${lift}`}
      >
        <div className="h-[128px] w-[122px] overflow-hidden">
          <ContentImage img={photo} frame={false} sizes="122px" className="size-full object-cover" />
        </div>
        <figcaption className={`mt-[6px] line-clamp-2 font-sans text-[12px] leading-[15px] ${PAPER_INK}`}>
          {caption}
        </figcaption>
      </figure>

      {/* Tape: centred on the card's top edge, overlapping it by 8px. */}
      <span
        aria-hidden="true"
        className={`absolute top-[-3px] left-[47px] h-[18px] w-[56px] rotate-8 ${TAPE} transition-[rotate] duration-[260ms] ease-out motion-safe:group-hover:rotate-3 motion-safe:group-data-[pressed]:rotate-3`}
      />
    </PressGroup>
  );
}
