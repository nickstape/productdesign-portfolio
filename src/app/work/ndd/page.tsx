import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import Content from "@/content/work/ndd.mdx";

export const metadata: Metadata = { title: "NDD case study" };

export default function Page() {
  return (
    <div className="py-6">
      <SectionLabel as="h1">work / ndd</SectionLabel>
      <Content />
    </div>
  );
}
