import { highlights2026, selectedWork } from "@/content/home-mobile";
import { ContentImage } from "./ContentImage";
import { CurrentlyReading } from "./CurrentlyReading";
import { Label } from "./Label";
import { SectionLabel } from "./SectionLabel";
import { WorkRow } from "./WorkRow";

/**
 * Home below 834px — Figma "Mobile — Home" (3294:633, updated 24 Nov). A plain text page: no
 * tags, no cards, no dividers. Order: hero, currently reading, 2026 highlights, selected work. main's 16px gutter + 4px here = the 20px side padding in Figma.
 */
export function MobileHome() {
  return (
    <div data-enter className="px-0.5 pt-4 tablet:hidden">
      {/* Hero */}
      <SectionLabel className="text-meta!">hello, i’m a designer based in London</SectionLabel>
      <h1 className="mt-2 font-display text-[32px] leading-[1.15] font-normal text-text">
        I design products people can trust.
      </h1>
      <p className="mt-2 font-sans text-[17px] leading-[1.4] text-[#b8b8b4]">
        I turn complex, high-stakes systems into products that feel simple.
      </p>

      <section className="mt-5">
        <Label as="h2">currently reading</Label>
        <div className="mt-2">
          <CurrentlyReading />
        </div>
      </section>

      <section className="mt-5">
        <Label as="h2">2026 highlights</Label>
        <ul className="mt-2 flex flex-col gap-[20px]">
          {highlights2026.map((item) => (
            <li key={item} className="flex items-baseline gap-1.5 font-sans text-ui text-text">
              <span aria-hidden="true" className="shrink-0 font-mono text-label text-accent">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5">
        <Label as="h2">selected work</Label>
        <ol className="mt-1.5">
          {selectedWork.map((work, i) => (
            <WorkRow
              key={work.link.label}
              work={work}
              n={i + 1}
              peek={<ContentImage img={work.peek} frame={false} sizes="84px" className="size-full object-cover" />}
            />
          ))}
        </ol>
      </section>
    </div>
  );
}
