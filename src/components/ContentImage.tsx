import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Img } from "@/content/images";
import { ImagePlaceholder } from "./ImagePlaceholder";

const VIDEO = /\.(mp4|webm|mov)$/i;

type Props = {
  img: Img;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Default true: full width, 16px radius, no border. false: no frame, the caller sizes it. */
  frame?: boolean;
  /** Videos only: autoplay (muted, looping). The caller pauses it off screen (<Media>). */
  autoPlay?: boolean;
};

/**
 * Renders a manifest image with next/image (intrinsic width/height from the
 * manifest; CSS controls display size), or a <video> for .mp4/.webm/.mov entries. If the file isn't in /public yet,
 * renders <ImagePlaceholder> at the same aspect ratio instead.
 */
export function ContentImage({ img, className = "", sizes, priority, frame = true, autoPlay = false }: Props) {
  const file = path.join(process.cwd(), "public", img.src);
  const frameClass = frame ? "h-auto w-full rounded-media" : "";

  if (!existsSync(file)) {
    return (
      <ImagePlaceholder
        name={path.basename(img.src)}
        width={img.width}
        height={img.height}
        className={className}
      />
    );
  }

  // Video entries (.mp4/.webm/.mov) render as a muted, looping, inline <video>. It doesn't autoplay
  // unless asked: the parent starts it when it's shown (e.g. a preview card opening).
  if (VIDEO.test(img.src)) {
    return (
      <video
        src={img.src}
        width={img.width}
        height={img.height}
        poster={img.poster}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={img.alt || undefined}
        aria-hidden={img.alt ? undefined : true}
        className={`${frameClass} ${className}`}
      />
    );
  }

  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      sizes={sizes}
      priority={priority}
      className={`${frameClass} ${className}`}
    />
  );
}
