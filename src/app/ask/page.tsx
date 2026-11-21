import type { Metadata } from "next";
import { Label } from "@/components/Label";

export const metadata: Metadata = { title: "AskMary" };

export default function Page() {
  return (
    <div className="flex flex-col gap-2 py-6">
      <Label as="h1">askmary</Label>
      <p className="text-intro text-muted">AskMary is coming soon.</p>
    </div>
  );
}
