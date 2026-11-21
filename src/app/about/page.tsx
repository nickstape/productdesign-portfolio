import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return (
    <main className="px-2 py-6 lg:pl-[var(--content-left)]">
      <SectionLabel as="h1">about</SectionLabel>
    </main>
  );
}
