import Image from "next/image";
import { ContentImage } from "@/components/ContentImage";
import { CurrentlyReading } from "@/components/CurrentlyReading";
import { MobileHome } from "@/components/MobileHome";
import { ProjectTags } from "@/components/ProjectTags";
import { SectionLabel } from "@/components/SectionLabel";
import { homeTags } from "@/content/home-tags";
import { images } from "@/content/images";

/**
 * Home — the poster: Figma "Home — 834" (3408:964), "Home — 1194" (3407:1654), "Home " (1440,
 * 3363:751) and "Home — 1920" (3407:824); below 834px, <MobileHome> (3294:633) instead.
 * ≥ 834px the page fills the viewport (≥ 1194: exactly one viewport tall, min 820px, no
 * scroll); the [data-home] rules in globals.css size the shell, main and footer for that.
 * 834–1193 the column is centred in the space above the wordmark, with the 834 frame's looser
 * spacing; ≥ 1194 its top follows the page height (--home-column-top in globals.css).
 */
export default function Home() {
  const portrait = images.portrait;

  return (
    <div data-home className="flex flex-1 flex-col">
      {/* < 834px: a separate text layout (Figma "Mobile — Home"). */}
      <MobileHome />

      <div className="hidden flex-1 flex-col justify-center pt-6 pb-8 tablet:-mr-(--page-right) tablet:-ml-(--page-left) tablet:flex desktop:justify-start desktop:pt-(--home-column-top) desktop:pb-0">
      {/* Full-width stage: the column centres on the viewport and the tag field spans it. */}
      <div className="relative">
        <div data-enter className="mx-auto flex max-w-[520px] flex-col items-center text-center">
          <SectionLabel>hello — i’m a designer & i’m based in London</SectionLabel>

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

          <p className="mt-3 text-body tablet:mt-4.5 desktop:mt-3 whitespace-nowrap text-muted">
            I turn complex, high-stakes systems into products that feel simple.
          </p>

          <ProjectTags
            tags={homeTags}
            previews={homeTags.map((tag) => (
              // 264 × 180 slot from Figma; media is cropped to fill it.
              <ContentImage key={tag.label} img={tag.image} sizes="264px" className="aspect-[264/180] object-cover" />
            ))}
          />

          <div className="mt-6 tablet:mt-9 desktop:mt-6">
            <CurrentlyReading />
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}
