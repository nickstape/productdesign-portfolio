"use client";

import { useActionState, useId } from "react";
import { unlockCaseStudy, type UnlockState } from "@/app/work/actions";

/**
 * Password form shown over a protected image. On success the server sets the access cookie and
 * re-renders, and the image shows at full opacity.
 */
export function UnlockForm() {
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlockCaseStudy, { error: null });
  const id = useId();

  return (
    <form action={action} className="flex w-full max-w-[360px] flex-col gap-1.5">
      <p className="font-mono text-label text-muted">.password protected</p>
      <label htmlFor={`${id}-pw`} className="font-sans text-ui text-text">
        Enter the password to see this screen.
      </label>
      <div className="flex gap-1">
        <input
          id={`${id}-pw`}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? `${id}-err` : undefined}
          className="min-w-0 flex-1 rounded-image border border-line bg-bg px-1.5 py-1 font-sans text-ui text-text focus-visible:outline-accent"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-image border border-line bg-bg px-2 py-1 font-sans text-ui text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {pending ? "Checking…" : "Unlock"}
        </button>
      </div>
      <p id={`${id}-err`} role="alert" className="min-h-[1.4em] font-mono text-meta text-annotate">
        {state.error}
      </p>
    </form>
  );
}
