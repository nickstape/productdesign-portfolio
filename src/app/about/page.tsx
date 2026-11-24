import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ContentImage } from "@/components/ContentImage";
import { Label } from "@/components/Label";
import { SideQuestsGallery } from "@/components/SideQuestsGallery";
import { bio, experience, gallery, mobileIntro } from "@/content/about";

import { pageMetadata } from "@/lib/seo";

/** Description: the bio's first sentence, verbatim. */
export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "I’m a product designer specialising in clear, scalable digital experiences for complex systems, with a strong focus on payment platforms and inclusive design.",
  path: "/about",
});

/**
 * About — Figma "About v2" (1440, 3375:819), "About — 1194" (3407:1752), "About — 834"
 * (3408:1062) and "Mobile — About" (3296:631, < 834).
 * ≥ 1194: bio and experience side by side. Column widths and the gap run linearly from the
 * 1194 frame (501 · 60 · 421) to the 1440 frame (659 · 34 · 529) and hold above it.
 * Below 1194 they stack: at 834 the bio fills the 738 column and experience is 698.
 * < 834: the mobile intro, then the gallery, then experience.
 * Words in content/about.ts.
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
    <div className="px-0.5 pt-4 tablet:px-0 tablet:pt-9 desktop:pt-18">
      {/* < 834 the visible H1 is the mobile headline. */}
      <h1 className="sr-only max-tablet:hidden">About</h1>

      {/* DOM order is the desktop order (bio, experience, gallery). < 834 the gallery moves up
          between the intro and experience (Figma "Mobile — About"). */}
      <div
        data-enter
        style={columns}
        className="flex flex-col gap-5 desktop:grid desktop:grid-cols-[minmax(0,var(--bio-w))_minmax(0,var(--exp-w))] desktop:items-start desktop:gap-x-(--about-gap) desktop:gap-y-6"
      >
        <div className="max-tablet:order-1">
          {/* ≥ 834: the bio (Instrument Sans 19). */}
          <div className="hidden max-w-[660px] flex-col gap-3 font-sans text-[calc(19px*var(--text-scale))] leading-[1.45] text-white tablet:flex tablet:max-w-none">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* < 834: label, headline and shorter bio. */}
          <div className="tablet:hidden">
            <Label className="text-meta!">{mobileIntro.label}</Label>
            <h1 className="mt-1 font-display text-[calc(28px*var(--text-scale))] leading-[1.2] font-normal text-white">
              {mobileIntro.headline}
            </h1>
            <div className="mt-3 flex flex-col gap-2 font-sans text-ui leading-[1.45] text-white">
              {mobileIntro.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <section className="max-tablet:order-3 tablet:max-w-[698px] desktop:max-w-none">
          <Label as="h2" className="mb-2">experience</Label>
          <ul>
            {experience.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-2 border-t border-line py-2"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="font-sans text-ui font-semibold text-text">{item.name}</p>
                  <p className="font-sans text-nav text-muted">{item.role}</p>
                </div>
                <p
                  className={`shrink-0 font-mono text-meta whitespace-nowrap ${
                    item.current ? "text-accent" : "text-muted"
                  }`}
                >
                  {item.years}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Side quests" className="max-tablet:order-2 tablet:mt-1 desktop:col-span-2 desktop:mt-0">
          <div className="mb-2 flex items-baseline justify-between">
            <Label as="h2">side quests gallery</Label>
            <p aria-hidden="true" className="font-mono text-meta text-accent tablet:hidden">
              Swipe →
            </p>
          </div>
          <SideQuestsGallery
            captions={gallery.map((g) => g.caption)}
            heights={gallery.map((g) => g.height)}
            ratios={gallery.map((g) => g.img.width / g.img.height)}
            slides={gallery.map((g) => (
              <ContentImage
                key={g.caption}
                img={g.img}
                frame={false}
                sizes={`(min-width: 834px) ${Math.round((g.height * g.img.width) / g.img.height)}px, 295px`}
                className="rounded-media"
              />
            ))}
          />
        </section>
      </div>
    </div>
  );
}
