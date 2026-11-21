import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return (
    <div className="py-6">
      <SectionLabel as="h1">about</SectionLabel>
    </div>
  );
}
