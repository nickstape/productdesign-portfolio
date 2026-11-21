import type { ReactNode } from "react";
import { CaseMedia, SIZES_FULL, type MediaProps } from "./CaseMedia";

type Props = MediaProps & {
  caption?: ReactNode;
  /** Cap the display width (px) for tall images, e.g. 471 for the IA sidebar. */
  maxWidth?: number;
};

/** Image + mono caption under it. */
export function Figure({ img, w, h, caption, maxWidth }: Props) {
  return (
    <figure className="flex flex-col gap-[10px]">
      <div style={maxWidth ? { maxWidth } : undefined} className="w-full">
        <CaseMedia
          img={img}
          w={w}
          h={h}
          sizes={maxWidth ? `${maxWidth}px` : SIZES_FULL}
          fit={w && h ? "contain" : undefined}
        />
      </div>
      {caption && (
        <figcaption className="font-mono text-meta text-muted tablet:font-sans tablet:text-nav">{caption}</figcaption>
      )}
    </figure>
  );
}
