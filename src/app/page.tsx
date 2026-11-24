import type { Metadata } from "next";
import Image from "next/image";
import { ViewTransition } from "react";
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
 * ≥ 834px the page fills the viewport (≥ 1194: exactly one viewport tall, min 820px, no
 * scroll); the [data-home] rules in globals.css size the shell, main and footer for that.
 * 834–1193 the column is centred in the space above the wordmark, with the 834 frame's looser
 * spacing; ≥ 1194 the whole composition (column and tags) is centred in the page height
 * (--home-column-top in globals.css).
 * Clicking a tag dissolves Home into the case study (the <ViewTransition> exit, TAG_DISSOLVE).
 */
export default function Home() {
  const portrait = images.portrait;

  return (
    <ViewTransition exit={{ [TAG_DISSOLVE]: TAG_DISSOLVE, default: "none" }} default="none">
    <div data-home className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* < 834px: a separate text layout (Figma "Mobile — Home"). */}
      <MobileHome />

      {/* ≥ 834px, first visit per session: the tags fly in before the rest of Home appears. */}
      <HomeIntro>
      <div className="hidden flex-1 flex-col justify-center pt-6 pb-8 tablet:-mr-(--page-right) tablet:-ml-(--page-left) tablet:flex desktop:justify-start desktop:pt-(--home-column-top) desktop:pb-0">
      {/* Full-width stage: the column centres on the viewport and the tag field spans it. */}
      <div className="relative">
        <div data-enter className="mx-auto flex max-w-[520px] flex-col items-center text-center">
          <SectionLabel>hello, i’m a designer based in London</SectionLabel>

          <h1 className="mt-1 font-sans text-[22px] leading-[30px] font-normal text-text">
            I design products people can trust.
          </h1>

          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="96px"
            loading="eager"
            className="mt-3 h-[124px] tablet:mt-5 desktop:mt-3 w-[96px] border border-line object-cover object-[72%_50%] grayscale"
          />

          <p className="mt-3 font-sans text-[17px] leading-[1.4] tablet:mt-4.5 desktop:mt-3 whitespace-nowrap text-[#b8b8b5]">
            I turn complex, high-stakes systems into products that feel simple.
          </p>

          <ProjectTags
            tags={homeTags}
            previews={homeTags.map((tag) => (
              // Fills the card's 264 × 180 mat; media is cropped to fill it.
              <ContentImage key={tag.label} img={tag.image} frame={false} sizes="264px" className="size-full object-cover" />
            ))}
          />

          <div className="mt-6 tablet:mt-9 desktop:mt-6">
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
