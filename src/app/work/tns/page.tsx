import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import Content from "@/content/work/tns.mdx";

export const metadata: Metadata = { title: "TNS case study" };

export default function Page() {
  return (
    <div className="py-6">
      <SectionLabel as="h1">work / tns</SectionLabel>
      <Content />
    </div>
  );
}
