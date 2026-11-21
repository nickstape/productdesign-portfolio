import Image from "next/image";
import { images } from "@/content/images";

/** 24px round crop of the site logo. Decorative; the parent link carries the name. */
export function Avatar({ className = "" }: { className?: string }) {
  const img = images.siteLogo;
  return (
    <span
      className={`relative block size-3 shrink-0 overflow-hidden rounded-full border border-line bg-surface ${className}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes="24px"
        loading="eager"
        className="size-full object-cover object-[50%_28%]"
      />
    </span>
  );
}
