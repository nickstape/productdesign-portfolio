import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ContentImage } from "@/components/ContentImage";
import { Label } from "@/components/Label";
import { SideQuestsGallery } from "@/components/SideQuestsGallery";
import { experience } from "@/content/experience";
import { gallery } from "@/content/gallery";

export const metadata: Metadata = { title: "About" };

/**
 * About — Figma "About v2" (1440, 3375:819), "About — 1194" (3407:1752), "About — 834"
 * (3408:1062) and "Mobile — About" (3296:631, < 834).
 * ≥ 1194: bio and experience side by side. Column widths and the gap run linearly from the
 * 1194 frame (501 · 60 · 421) to the 1440 frame (659 · 34 · 529) and hold above it.
 * Below 1194 they stack: at 834 the bio fills the 738 column and experience is 698.
 * Data in content/experience.ts and content/gallery.ts.
 */
const fluid = (a: number, b: number) =>
  `clamp(${Math.min(a, b)}px, calc(${a}px + ${((b - a) / 246).toFixed(5)} * (100vw - 1194px)), ${Math.max(a, b)}px)`;

const columns = {
  "--bio-w": fluid(501, 659),
  "--about-gap": fluid(60, 34),
  "--exp-w": fluid(421, 529),
} as CSSProperties;

export default function Page() {
  return (
    // < 834: main's 16px gutter + 4px here = Figma's 20px side padding.
    <div data-enter className="px-0.5 pt-4 tablet:px-0 tablet:pt-9 desktop:pt-18">
      <h1 className="sr-only">About</h1>

      <div
        style={columns}
        className="flex flex-col gap-5 desktop:grid desktop:grid-cols-[minmax(0,var(--bio-w))_minmax(0,var(--exp-w))] desktop:items-start desktop:gap-x-(--about-gap)"
      >
        <div className="flex max-w-[660px] flex-col gap-3 text-body leading-[1.45] text-text tablet:max-w-none tablet:text-intro">
          <p>
            I’m a product designer specialising in clear, scalable digital experiences for complex
            systems, with a strong focus on payment platforms and inclusive design. I turn ambiguity
            into intuitive design, and I have over 5 years of experience designing financial
            dashboards for enterprise customers.
          </p>
          <p>I particularly enjoy the early stages of design research and systems thinking.</p>
        </div>

        <section className="max-w-[660px] tablet:max-w-[698px] desktop:max-w-none">
          <Label as="h2" className="mb-2">experience</Label>
          <ul>
            {experience.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-2 border-t border-line py-2"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="font-sans text-[17px] leading-[1.3] font-semibold text-text">{item.name}</p>
                  <p className="font-sans text-ui text-muted">{item.role}</p>
                </div>
                <p
                  className={`shrink-0 font-mono text-label whitespace-nowrap ${
                    item.current ? "text-accent" : "text-muted"
                  }`}
                >
                  {item.years}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-label="Side quests" className="mt-6">
        <Label as="h2" className="mb-2">side quests gallery</Label>
        <SideQuestsGallery
          captions={gallery.map((g) => g.caption)}
          heights={gallery.map((g) => g.height)}
          ratios={gallery.map((g) => g.img.width / g.img.height)}
          slides={gallery.map((g) => (
            <ContentImage
              key={g.caption}
              img={g.img}
              frame={false}
              sizes={`(min-width: 834px) ${Math.round((g.height * g.img.width) / g.img.height)}px, 310px`}
              className="rounded-image border border-line"
            />
          ))}
        />
      </section>
    </div>
  );
}
