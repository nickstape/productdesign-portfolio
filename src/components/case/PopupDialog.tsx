"use client";

import { useRef, type ReactNode } from "react";

/** Inline accent link that opens a modal <dialog> (Esc, the close button or a backdrop click closes it). */
export function PopupDialog({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="self-start font-sans text-body text-accent underline underline-offset-4 hover:no-underline"
      >
        {label}
      </button>
      <dialog
        ref={ref}
        aria-label={title}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="m-auto w-[min(1152px,calc(100vw-32px))] max-w-none rounded-card border border-line bg-bg p-0 text-text backdrop:bg-bg/80"
      >
        <div className="flex flex-col gap-2 p-2 tablet:p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-label text-muted">.{title}</p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="font-mono text-label text-muted hover:text-text"
            >
              close <span aria-hidden="true">×</span>
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
