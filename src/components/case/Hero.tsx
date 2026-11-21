import { CaseMedia, SIZES_FULL, type MediaProps } from "./CaseMedia";

/** Full content-width screenshot on a light mat, 8px radius. Above the fold, so not lazy. */
export function Hero({ img, w = 1152, h = 576 }: MediaProps) {
  return (
    <div className="mt-3 overflow-hidden rounded-image bg-text p-2 tablet:p-4 desktop:mt-6 desktop:p-6">
      <CaseMedia img={img} w={w} h={h} sizes={SIZES_FULL} priority />
    </div>
  );
}
