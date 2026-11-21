import type { ReactNode } from "react";
import { CaseMedia, SIZES_FULL, type MediaProps } from "./CaseMedia";

type Props = MediaProps & { quote: ReactNode; label: string };

/**
 * Figma 3167:712 + "Callout" 3074:826: screenshot on a brand-green band (bg-mat), then a
 * 720px block with a mono accent label and the quote.
 */
export function QuoteBlock({ img, w = 1152, h = 576, quote, label }: Props) {
  return (
    <figure className="flex flex-col">
      <div className="overflow-hidden rounded-image bg-mat px-2 py-3 tablet:px-6 tablet:py-6">
        <CaseMedia img={img} w={w} h={h} sizes={SIZES_FULL} />
      </div>
      <div className="mt-3 flex max-w-[720px] flex-col gap-[12px] py-1 tablet:mx-auto tablet:w-full tablet:mt-4 tablet:px-4 tablet:py-[28px]">
        <figcaption className="font-mono text-label tracking-[0.1em] text-accent uppercase">{label}</figcaption>
        <blockquote className="font-display text-quote text-text">{quote}</blockquote>
      </div>
    </figure>
  );
}
