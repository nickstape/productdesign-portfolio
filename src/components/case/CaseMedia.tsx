import { images, type Img } from "@/content/images";
import { ContentImage } from "../ContentImage";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { AutoplayVideo } from "./AutoplayVideo";

export type MediaProps = {
  /** Key in src/content/images.ts, e.g. "nddHero" (or "images.nddHero"). */
  img: string;
  /** Aspect ratio for the placeholder while the key isn't in images.ts yet (Figma frame size). */
  w?: number;
  h?: number;
};

type Props = MediaProps & {
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Default true: 1px line border. false: 8px radius only (e.g. the Before image). */
  outline?: boolean;
};

const manifest: Record<string, Img> = images;
const VIDEO = /\.(mp4|webm|mov)$/i;

/**
 * Case study image by manifest key. next/image via <ContentImage> (lazy unless `priority`),
 * which shows a placeholder until the file is in /public. Until the key is added to images.ts,
 * a placeholder named after the key holds the slot at the Figma aspect ratio.
 */
export function CaseMedia({ img, w = 16, h = 9, className = "", sizes, priority, outline = true }: Props) {
  const key = img.replace(/^images\./, "");
  const entry = manifest[key];
  if (!entry) {
    return <ImagePlaceholder name={`${key} · not in images.ts`} width={w} height={h} className={className} />;
  }
  const media = outline ? (
    <ContentImage img={entry} sizes={sizes} priority={priority} className={className} />
  ) : (
    // Unframed, then the 8px radius re-applied without the border.
    <ContentImage
      img={entry}
      sizes={sizes}
      priority={priority}
      frame={false}
      className={`h-auto w-full rounded-image ${className}`}
    />
  );
  // Videos play muted on loop while on screen.
  return VIDEO.test(entry.src) ? <AutoplayVideo>{media}</AutoplayVideo> : media;
}

/** Display widths of the case study column, for next/image `sizes`. */
export const SIZES_FULL = "(min-width: 1194px) 1152px, 100vw";
export const SIZES_HALF = "(min-width: 1194px) 556px, (min-width: 834px) 50vw, 100vw";
