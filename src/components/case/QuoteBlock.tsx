import type { ReactNode } from "react";
import { CaseMedia, SIZES_FULL, type MediaProps } from "./CaseMedia";

type Props = MediaProps & { quote: ReactNode; label: string };

/**
 * Figma "Hero image" (3167:712, shown at 50% opacity) + "Callout" (3074:826): a 720px block,
 * centred, with a mono accent label and the quote.
 */
export function QuoteBlock({ img, w = 1152, h = 576, quote, label }: Props) {
  return (
    <figure className="flex flex-col">
      <div className="mt-2 opacity-50 tablet:my-6">
        <CaseMedia img={img} w={w} h={h} sizes={SIZES_FULL} />
      </div>
      <div className="mt-2 flex max-w-[720px] flex-col gap-[12px] rounded-card bg-surface p-2 tablet:mx-auto tablet:mt-0 tablet:w-full tablet:bg-transparent tablet:px-4 tablet:py-[28px]">
        <figcaption className="font-mono text-label tracking-[0.1em] text-accent uppercase">{label}</figcaption>
        <blockquote className="font-display text-quote text-text">{quote}</blockquote>
      </div>
    </figure>
  );
}
