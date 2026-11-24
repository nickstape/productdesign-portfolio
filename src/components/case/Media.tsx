import type { ReactNode } from "react";
import { images, type Img } from "@/content/images";
import { ContentImage } from "../ContentImage";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { AutoplayVideo } from "./AutoplayVideo";
import { FadeIn } from "./FadeIn";

export type MediaProps = {
  /** Key in src/content/images.ts, e.g. "nddHero" (or "images.nddHero"). src, poster and alt come from there. */
  img: string;
  /** Placeholder size while the key isn't in images.ts. With `cover`, also the fixed frame ratio. */
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
  /** Default true: fade in on first scroll into view. Off for the hero (above the fold, the LCP image). */
  fade?: boolean;
  /**
   * EXCEPTION, only for <BeforeAfter cover> (exploration 03): hold a fixed w × h frame and fill
   * it with object-fit: cover, centred. Every other media frame takes the file's own ratio.
   */
  cover?: boolean;
  /** Replaces the caption's type classes (default: mono 12 below 834, Instrument Sans 14 above). */
  captionClassName?: string;
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
  fade = true,
  cover = false,
  captionClassName = "font-mono text-meta tablet:font-sans tablet:text-nav",
  children,
}: Props) {
  const key = img.replace(/^images\./, "");
  const entry = manifest[key];
  const radius = mediaRadius(hero);

  let frame: ReactNode;
  if (!entry) {
    frame = <ImagePlaceholder name={`${key} · not in images.ts`} width={w} height={h} />;
  } else {
    // Never cropped: the frame is the file's own ratio (manifest width × height), full width of
    // its column, so the whole image or video always shows. object-contain only guards against
    // a manifest size a pixel off the file. `cover` is the one exception (see the prop).
    const ratio = cover ? `${w} / ${h}` : `${entry.width} / ${entry.height}`;
    const fill = `absolute inset-0 size-full ${cover ? "object-cover object-center" : "object-contain"}`;
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
      <figcaption className={`text-muted ${captionClassName}`}>{caption}</figcaption>
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
