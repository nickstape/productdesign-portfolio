import type { ReactNode } from "react";
import { images, type Img } from "@/content/images";
import { ContentImage } from "../ContentImage";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { AutoplayVideo } from "./AutoplayVideo";
import { FadeIn } from "./FadeIn";

export type MediaProps = {
  /** Key in src/content/images.ts, e.g. "nddHero" (or "images.nddHero"). src, poster and alt come from there. */
  img: string;
  /** Frame aspect ratio (Figma frame size). Also sizes the placeholder while the key isn't in images.ts. */
  w?: number;
  h?: number;
};

type Props = MediaProps & {
  caption?: ReactNode;
  /** Cap the frame's display width (px) for tall images, e.g. 471 for the IA sidebar. */
  maxWidth?: number;
  sizes?: string;
  priority?: boolean;
  /** The case study hero: 20px corners from 834 (other media 16). Below 834 all media are 12. */
  hero?: boolean;
  /**
   * Hold the w × h frame and fill it like Figma does: "cover" (hero, problem image) or
   * "contain" (figures, before/after). Without it the frame takes the file's own ratio.
   */
  fit?: "cover" | "contain";
  /** Default true: fade in on first scroll into view. Off for the hero (above the fold, the LCP image). */
  fade?: boolean;
  /** Overlays positioned over the frame in % (e.g. <BeforeAfter> annotations). They fade in with it. */
  children?: ReactNode;
};

const manifest: Record<string, Img> = images;
const VIDEO = /\.(mp4|webm|mov)$/i;

/**
 * One case study media frame: an image (next/image) or a video in the same rounded, borderless frame,
 * with an optional caption under it. <Hero>, <Figure>, <BeforeAfter>, <QuoteBlock> and <Popup>
 * all render through it.
 *
 * Videos autoplay muted and looped, and pause while off screen (<AutoplayVideo>). With reduced
 * motion, CSS swaps the video for its poster before any script runs, and the video is paused.
 * Files not yet in /public show <ImagePlaceholder> (via <ContentImage>).
 */
export function Media({
  img,
  w = 16,
  h = 9,
  caption,
  maxWidth,
  sizes,
  priority,
  hero = false,
  fit,
  fade = true,
  children,
}: Props) {
  const key = img.replace(/^images\./, "");
  const entry = manifest[key];
  const radius = mediaRadius(hero);

  let frame: ReactNode;
  if (!entry) {
    frame = <ImagePlaceholder name={`${key} · not in images.ts`} width={w} height={h} />;
  } else {
    const ratio = fit ? `${w} / ${h}` : `${entry.width} / ${entry.height}`;
    const fill = `absolute inset-0 size-full ${fit === "contain" ? "object-contain" : "object-cover"}`;
    const isVideo = VIDEO.test(entry.src);
    const poster = isVideo && entry.poster ? { ...entry, src: entry.poster } : null;

    const box = (
      <div style={{ aspectRatio: ratio }} className={`relative w-full overflow-hidden ${radius}`}>
        {isVideo ? (
          <>
            <ContentImage
              img={entry}
              frame={false}
              autoPlay
              className={`${fill} ${poster ? "motion-reduce:hidden" : ""}`}
            />
            {poster && (
              <ContentImage
                img={poster}
                frame={false}
                sizes={sizes}
                className={`${fill} hidden motion-reduce:block`}
              />
            )}
          </>
        ) : (
          <ContentImage img={entry} frame={false} sizes={sizes} priority={priority} className={fill} />
        )}
      </div>
    );
    frame = isVideo ? <AutoplayVideo>{box}</AutoplayVideo> : box;
  }

  // Overlays sit on the frame, so they share its box (and its fade).
  const framed = (
    <div style={maxWidth ? { maxWidth } : undefined} className="relative w-full">
      {frame}
      {children}
    </div>
  );
  const body = fade ? <FadeIn>{framed}</FadeIn> : framed;

  if (!caption) return body;
  return (
    <figure className="flex flex-col gap-[10px]">
      {body}
      <figcaption className="font-mono text-meta text-muted tablet:font-sans tablet:text-nav">{caption}</figcaption>
    </figure>
  );
}

/** Case study media corners (no border on any media): 12px below 834, then 16px (hero 20px). */
export function mediaRadius(hero = false) {
  return hero ? "rounded-media-sm tablet:rounded-media-hero" : "rounded-media-sm tablet:rounded-media";
}

/** Display widths of the case study column, for next/image `sizes`. */
export const SIZES_FULL = "(min-width: 1194px) 1152px, 100vw";
export const SIZES_HALF = "(min-width: 1194px) 556px, (min-width: 834px) 50vw, 100vw";
