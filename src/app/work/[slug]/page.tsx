import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseHeader, Hero, NextCase } from "@/components/case";
import { CasePageStyles } from "@/components/case/CasePageStyles";
import { CaseToc } from "@/components/case/CaseToc";
import { JumpTo } from "@/components/case/JumpTo";
import { getCase, getToc, listSlugs } from "@/lib/case-studies";

/**
 * Case study template — Figma "Case study - NDD" (3074:583, 1440) and "Mobile — Case study (NDD)"
 * (3297:647, 390). Content and frontmatter come from src/content/work/<slug>.mdx.
 * ≥ 1194px: the table of contents replaces the site sidebar (<CasePageStyles>)
 * and the content column starts at x 216 (--case-left), max 1152px.
 */
export function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!listSlugs().includes(slug)) return {};
  const { frontmatter } = await getCase(slug);
  return { title: frontmatter.title, description: frontmatter.intro };
}

/**
 * The shell (the [data-case] wrapper and <CasePageStyles>, which swaps the site nav for the
 * TOC) is static. Everything
 * that reads `params` renders inside <Suspense>, as Cache Components requires; the slugs from
 * generateStaticParams are still prerendered in full at build time.
 */
export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <div
      data-case
      className="pb-4 desktop:ml-[calc(var(--case-left)-var(--content-left))] desktop:max-w-[1152px]"
    >
      <CasePageStyles />
      <Suspense>
        <CaseStudy params={params} />
      </Suspense>
    </div>
  );
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Unknown slugs 404 (dynamicParams isn't available with cacheComponents).
  if (!listSlugs().includes(slug)) notFound();
  const { Content, frontmatter: fm } = await getCase(slug);
  const toc = getToc(slug);
  const next = await getCase(fm.next);

  return (
    <>
      <CaseToc items={toc} />
      <CaseHeader
        kicker={fm.kicker}
        title={fm.title}
        intro={fm.intro}
        role={fm.role}
        platform={fm.platform}
        outcome={fm.outcome}
      />
      <Hero img={fm.hero} />
      <JumpTo items={toc} />
      <Content />
      <NextCase
        href={`/work/${next.frontmatter.slug}`}
        title={next.frontmatter.title}
        cta={`Read case study ${String(next.frontmatter.order).padStart(2, "0")}`}
      />
    </>
  );
}
