import { images, type Img } from "@/content/images";
import { hasFile } from "../ContentImage";
import { Media, SIZES_FULL, type MediaProps } from "./Media";
import { PopupDialog } from "./PopupDialog";

type Props = MediaProps & {
  /** Link text, e.g. "see full IA". */
  label: string;
  /** Lowercase dialog label, shown as ".full ia". */
  title: string;
};

const manifest: Record<string, Img> = images;

/**
 * A link that opens an image (e.g. the full IA) in a lightbox: a modal <dialog>, so focus is
 * trapped in it and Esc closes it. The image renders on the server.
 * Renders nothing (no link, no placeholder) until the key is in images.ts AND its file is in
 * /public, so there's never a dead link.
 */
export function Popup({ label, title, img, w = 1152, h = 720 }: Props) {
  const entry = manifest[img.replace(/^images\./, "")];
  if (!entry || !hasFile(entry)) return null;
  return (
    <PopupDialog label={label} title={title}>
      <Media img={img} w={w} h={h} sizes={SIZES_FULL} />
    </PopupDialog>
  );
}
