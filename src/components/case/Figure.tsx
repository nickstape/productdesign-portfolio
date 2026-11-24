import type { ReactNode } from "react";
import { Media, SIZES_FULL, type MediaProps } from "./Media";

type Props = MediaProps & {
  caption?: ReactNode;
  /** Cap the display width (px) for tall images, e.g. 471 for the IA sidebar. */
  maxWidth?: number;
};

/** Image or video + caption under it. */
export function Figure({ img, w, h, caption, maxWidth }: Props) {
  return (
    <Media
      img={img}
      w={w}
      h={h}
      caption={caption}
      maxWidth={maxWidth}
      sizes={maxWidth ? `${maxWidth}px` : SIZES_FULL}
      fit={w && h ? "contain" : undefined}
    />
  );
}
