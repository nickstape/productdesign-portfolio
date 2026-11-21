import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Img } from "@/content/images";
import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  img: Img;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a manifest image with next/image (intrinsic width/height from the
 * manifest; CSS controls display size). If the file isn't in /public yet,
 * renders <ImagePlaceholder> at the same aspect ratio instead.
 */
export function ContentImage({ img, className = "", sizes, priority }: Props) {
  const file = path.join(process.cwd(), "public", img.src);

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

  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full rounded-image border border-line ${className}`}
    />
  );
}
