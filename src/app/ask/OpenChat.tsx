"use client";

declare global {
  interface Window {
    chatbase?: { open?: () => void };
  }
}

/** Opens the site-wide Chatbase bubble (loaded in the root layout). */
export function OpenChat() {
  return (
    <button
      type="button"
      onClick={() => window.chatbase?.open?.()}
      className="self-start rounded-image border border-line bg-surface px-2 py-1 font-sans text-ui text-text transition-colors hover:border-accent hover:text-accent"
    >
      Open AskMary
    </button>
  );
}
