import { reading } from "@/content/reading";
import { ContentImage } from "./ContentImage";

/** Home page strip: tilted cover, green label, title line and a 120px progress bar. Data in src/content/reading.ts. */
export function CurrentlyReading() {
  const { title, author, page, pages, cover } = reading;
  const progress = Math.min(100, Math.max(0, (page / pages) * 100));

  return (
    <div className="flex items-center gap-2 text-left">
      <div className="w-[40px] shrink-0 -rotate-6 rounded-[2px] shadow-[0_4px_8px_rgb(0_0_0/0.5)]">
        <ContentImage img={cover} sizes="40px" className="rounded-[2px]!" />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="font-mono text-meta text-accent">Currently reading</p>
        <p className="font-sans text-[15px] leading-[1.4] text-text">
          {title} — {author}
        </p>
        <div className="flex items-center gap-1">
          <div aria-hidden="true" className="h-[2px] w-[120px] bg-line">
            <div className="h-full bg-text" style={{ width: `${progress}%` }} />
          </div>
          <p className="font-mono text-meta text-muted">
            p. {page} / {pages}
          </p>
        </div>
      </div>
    </div>
  );
}
