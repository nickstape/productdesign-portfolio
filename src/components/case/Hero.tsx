import { Media, SIZES_FULL, type MediaProps } from "./Media";

/** Figma "Hero image" (3074:603): content-width image or video, 48px above and below. Not lazy. */
export function Hero({ img, w = 1152, h = 576 }: MediaProps) {
  return (
    <div className="mt-3 desktop:my-6">
      <Media img={img} w={w} h={h} sizes={SIZES_FULL} priority fit="cover" fade={false} />
    </div>
  );
}
