import { CaseMedia, SIZES_FULL, type MediaProps } from "./CaseMedia";
import { PopupDialog } from "./PopupDialog";

type Props = MediaProps & {
  /** Link text, e.g. "see full IA". */
  label: string;
  /** Lowercase dialog label, shown as ".full ia". */
  title: string;
};

/** A link that opens an image (e.g. the full IA) in a popup. The image renders on the server. */
export function Popup({ label, title, img, w = 1152, h = 720 }: Props) {
  return (
    <PopupDialog label={label} title={title}>
      <CaseMedia img={img} w={w} h={h} sizes={SIZES_FULL} />
    </PopupDialog>
  );
}
