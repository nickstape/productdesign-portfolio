import type { Metadata } from "next";
import { Label } from "@/components/Label";
import { contact } from "@/content/site";
import { OpenChat } from "./OpenChat";

export const metadata: Metadata = { title: "AskMary" };

/** AskMary lives in the site-wide Chatbase bubble; this page points to it. */
export default function Page() {
  return (
    <div className="flex flex-col gap-3 py-6">
      <header className="flex flex-col gap-1">
        <Label as="h1">askmary</Label>
        <p className="font-sans text-body text-muted">
          Ask my AI agent about my work, process or experience.
        </p>
      </header>

      <OpenChat />

      <p className="font-mono text-meta text-muted">
        AskMary is an AI agent and can make mistakes. For anything important,{" "}
        <a href={`mailto:${contact.email}`} className="text-accent underline-offset-2 hover:underline">
          email
        </a>{" "}
        me.
      </p>
    </div>
  );
}
