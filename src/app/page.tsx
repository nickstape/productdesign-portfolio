import type { Metadata } from "next";
import Image from "next/image";
import { ViewTransition, type CSSProperties } from "react";
import { ContentImage } from "@/components/ContentImage";
import { CurrentlyReading } from "@/components/CurrentlyReading";
import { HomeIntro } from "@/components/HomeIntro";
import { MobileHome } from "@/components/MobileHome";
import { ProjectTags } from "@/components/ProjectTags";
import { SectionLabel } from "@/components/SectionLabel";
import { TAG_DISSOLVE, homeTags } from "@/content/home-tags";
import { images } from "@/content/images";
import { contact } from "@/content/site";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ description: DEFAULT_DESCRIPTION, path: "/" });

/**
 * Short screens (thresholds in globals.css, "One screen"). 100cqh is the space left for the
 * block (the content area is a size container; its padding holds the 114px top and 40px bottom
 * minimums).
 * tan(atan2(a, b)) = a / b: CSS can't divide a length by a length directly.
 * --gs: gap scale, 1 from --os-a-max up, down to 0.6 at --os-a1.
 * --pf: portrait, 1 (124 tall) from --os-a1 up, 0 (93 tall) at --os-a2.
 */
const GAP_SCALE =
  "calc(0.6 + 0.4 * clamp(0, tan(atan2(100cqh - var(--os-a1), var(--os-a-max) - var(--os-a1))), 1))";
const PORTRAIT_FIT = "clamp(0, tan(atan2(100cqh - var(--os-a2), var(--os-a1) - var(--os-a2))), 1)";

/** schema.org Person, rendered as JSON-LD on Home only. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Product Designer",
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  url: `${SITE_URL}/`,
  sameAs: [contact.linkedin],
  image: `${SITE_URL}${images.portrait.src}`,
};

/**
 * Home — the poster: Figma "Home — 834" (3408:964), "Home — 1194" (3407:1654), "Home " (1440,
 * 3363:751) and "Home — 1920" (3407:824); below 834px, <MobileHome> (3294:633) instead.
 * ≥ 834px the page is exactly one viewport tall, no scroll ([data-one-screen] rules in
 * globals.css): the content area runs from the top of the page to the top of the wordmark's
 * letters. The content block (kicker to Currently reading, Figma gaps 10 / 24 / 24 / 46,
 * ≈ 355 tall) sits at least 114px from the top of the page and 40px above the letters; spare
 * height goes 2/3 above it and 1/3 below (Figma 1440 × 820 and 1440 × 1024), so it reads as
 * centred. The tags are anchored to the block (% of its height), as in Figma.
 * Short screens: all gaps scale down together (to 0.6×), then the portrait shrinks
 * (to 72 × 93), then under 680px tall the intro line hides.
 * Clicking a tag dissolves Home into the case study (the <ViewTransition> exit, TAG_DISSOLVE).
 */
export default function Home() {
  const portrait = images.portrait;

  return (
    <ViewTransition exit={{ [TAG_DISSOLVE]: TAG_DISSOLVE, default: "none" }} default="none">
    <div data-home data-one-screen className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* < 834px: a separate text layout (Figma "Mobile — Home"). */}
      <MobileHome />

      {/* ≥ 834px, first visit per session: the tags fly in before the rest of Home appears. */}
      <HomeIntro>
      {/* Content area: full width, the column centred both ways, the tag field spans it. */}
      <div
        className="relative hidden min-h-0 flex-1 flex-col pt-(--os-pt) pb-[40px] [container-type:size] before:flex-[2] before:content-[''] after:flex-1 after:content-[''] tablet:-mr-(--page-right) tablet:-ml-(--page-left) tablet:flex"
        style={{ "--gs": GAP_SCALE, "--pf": PORTRAIT_FIT } as CSSProperties}
      >
      {/* The block: full width, its height the column's. The tag field is placed on it, so the
          tags move and scale with the block. */}
      <div className="relative">
        <div data-enter className="mx-auto flex max-w-[520px] flex-col items-center text-center">
          <SectionLabel>hello, i’m a designer based in London</SectionLabel>

          <h1 className="mt-[calc(10px*var(--gs))] font-sans text-[22px] leading-[30px] font-normal text-text">
            I design products people can trust.
          </h1>

          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="96px"
            loading="eager"
            className="mt-[calc(24px*var(--gs))] aspect-[96/124] h-[calc(93px+31px*var(--pf))] w-auto border border-line object-cover object-[72%_50%] grayscale"
          />

          <p className="mt-[calc(24px*var(--gs))] font-sans text-[17px] leading-[1.4] whitespace-nowrap text-[#b8b8b5] [@media(height<680px)]:hidden">
            I turn complex, high-stakes systems into products that feel simple.
          </p>

          <ProjectTags
            tags={homeTags}
            previews={homeTags.map((tag) => (
              // Fills the card's 264 × 180 mat; media is cropped to fill it.
              <ContentImage key={tag.label} img={tag.image} frame={false} sizes="264px" className="size-full object-cover" />
            ))}
          />

          <div className="mt-[calc(46px*var(--gs))]">
            <CurrentlyReading />
          </div>

        </div>
      </div>
      </div>
      </HomeIntro>
    </div>
    </ViewTransition>
  );
}
