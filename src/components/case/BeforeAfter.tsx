import { CaseMedia, SIZES_HALF } from "./CaseMedia";

type Annotation = {
  /** Position over the image, in % of its width / height. */
  x: number;
  y: number;
  text: string;
  /** Which image it sits on (default "before"). */
  on?: "before" | "after";
};

type Props = {
  /** Manifest keys. */
  before: string;
  after: string;
  /** Placeholder aspect ratio while keys aren't in images.ts (Figma 545 × 417). */
  w?: number;
  h?: number;
  annotations?: Annotation[];
};

/**
 * Two images side by side ≥ 834 with Before / After captions; stacked (Before first) below.
 * Figma "Frame 3" (3184:2328): two 545 × 417 frames, 51px apart (row 1141 wide), images contained.
 * The Before image has no stroke outline; After keeps the 1px line border.
 */
export function BeforeAfter({ before, after, w = 545, h = 417, annotations = [] }: Props) {
  const panes = [
    { key: "before", img: before, caption: "Before" },
    { key: "after", img: after, caption: "After" },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 desktop:max-w-[1141px] desktop:gap-[51px]">
      {panes.map((p) => (
        <figure key={p.key} className="flex flex-col gap-[10px]">
          <div className="relative">
            <CaseMedia img={p.img} w={w} h={h} sizes={SIZES_HALF} outline={p.key !== "before"} fit="contain" />
            {annotations
              .filter((a) => (a.on ?? "before") === p.key)
              .map((a) => (
                <span
                  key={a.text}
                  className="absolute max-w-[45%] -rotate-2 rounded-[4px] bg-bg/85 px-0.5 font-sans text-ui leading-[1.25] font-medium text-annotate"
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                >
                  {a.text}
                </span>
              ))}
          </div>
          <figcaption className="font-mono text-meta text-muted tablet:font-sans tablet:text-nav">{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
