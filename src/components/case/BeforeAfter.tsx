import type { ReactNode } from "react";
import { Media, SIZES_HALF } from "./Media";

type Annotation = {
  /** Position over the image, in % of its width / height. */
  x: number;
  y: number;
  text: string;
  /** Which image it sits on (default "before"). */
  on?: "before" | "after";
};

type Props = {
  /** Manifest keys. */
  before: string;
  after: string;
  /** Placeholder aspect ratio while keys aren't in images.ts (Figma 545 × 417); with `cover`, the frame ratio. */
  w?: number;
  h?: number;
  annotations?: Annotation[];
  /** Caption overrides (default "Before" / "After"). Use <Desktop as="span"> / <Mobile as="span"> for per-size text. */
  beforeCaption?: ReactNode;
  afterCaption?: ReactNode;
  /**
   * Figma exploration 03 layout, the one exception to "never crop": two EQUAL w × h frames
   * (471 × 564 at 1440), images filling them (object-fit: cover, centred). ≥ 834 side by side,
   * 125px apart at 1440: the row is 1067 of the 1152 column and both scale with it. Below 834
   * stacked, full width, same ratio. Captions Instrument Sans 14 at every size.
   */
  cover?: boolean;
};

/**
 * Two images side by side ≥ 834 with Before / After captions; stacked (Before first) below.
 * Figma "Frame 3" (3184:2328): two columns 51px apart (row 1141 wide). Each image shows whole at its own ratio (never cropped), top-aligned.
 */
export function BeforeAfter({
  before,
  after,
  w = 545,
  h = 417,
  annotations = [],
  beforeCaption = "Before",
  afterCaption = "After",
  cover = false,
}: Props) {
  const panes = [
    { key: "before", img: before, caption: beforeCaption },
    { key: "after", img: after, caption: afterCaption },
  ] as const;

  return (
    <div
      className={
        cover
          ? // 1067 / 1152 = 92.62% of the column; gap 125 / 1067 = 11.715% of the row.
            "grid grid-cols-1 items-start gap-3 tablet:w-[92.62%] tablet:grid-cols-2 tablet:gap-x-[11.715%]"
          : "grid grid-cols-1 items-start gap-3 tablet:grid-cols-2 desktop:max-w-[1141px] desktop:gap-[51px]"
      }
    >
      {panes.map((p) => (
        <Media
          key={p.key}
          img={p.img}
          w={w}
          h={h}
          caption={p.caption}
          sizes={SIZES_HALF}
          cover={cover}
          captionClassName={cover ? "font-sans text-nav" : undefined}
        >
          {/* Annotations sit on the image and fade in with it. */}
          {annotations
            .filter((a) => (a.on ?? "before") === p.key)
            .map((a) => (
              <span
                key={a.text}
                className="absolute max-w-[45%] -rotate-2 rounded-[4px] bg-bg/85 px-0.5 font-sans text-ui leading-[1.25] font-medium text-annotate"
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
              >
                {a.text}
              </span>
            ))}
        </Media>
      ))}
    </div>
  );
}
