import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import Content from "@/content/work/ndd.mdx";

export const metadata: Metadata = { title: "NDD case study" };

export default function Page() {
  return (
    <main className="px-2 py-6 lg:pl-[var(--content-left)]">
      <SectionLabel as="h1">work / ndd</SectionLabel>
      <Content />
    </main>
  );
}
