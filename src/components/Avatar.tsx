import Image from "next/image";
import { images } from "@/content/images";

/**
 * The site logo at 24 × 34, its own aspect ratio: never cropped, masked or rounded, no border or
 * background. Decorative; the parent link carries the name.
 */
export function Avatar({ className = "" }: { className?: string }) {
  const img = images.siteLogo;
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      sizes="24px"
      loading="eager"
      className={`block h-[34px] w-[24px] shrink-0 rounded-none object-contain ${className}`}
    />
  );
}
