"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type ChangeEvent } from "react";

const SIZE_KEY = "mf-text-size";
const CONTRAST_KEY = "mf-contrast";

const SIZES = ["100", "112", "125"] as const;
type Size = (typeof SIZES)[number];
type Contrast = "standard" | "high";

/*
 * The store is the pair of data-* attributes on <html>: the inline script in layout.tsx sets them
 * before paint, apply() changes them. The server can't know them, so it renders the defaults.
 */
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const snapshot = () => {
  const root = document.documentElement;
  return `${root.getAttribute("data-text-size") ?? "100"}|${root.getAttribute("data-contrast") ?? "standard"}`;
};
const serverSnapshot = () => "100|standard";

function read(snap: string): [Size, Contrast] {
  const [s, c] = snap.split("|");
  return [s === "112" || s === "125" ? s : "100", c === "high" ? "high" : "standard"];
}

/** Same keys and values as PREFERENCES_LOADER in src/app/layout.tsx. */
function apply(size: Size, contrast: Contrast) {
  const root = document.documentElement;
  if (size === "100") root.removeAttribute("data-text-size");
  else root.setAttribute("data-text-size", size);
  if (contrast === "high") root.setAttribute("data-contrast", "high");
  else root.removeAttribute("data-contrast");
  try {
    localStorage.setItem(SIZE_KEY, size);
    localStorage.setItem(CONTRAST_KEY, contrast);
  } catch {
    // Storage blocked (private mode): the choice still applies to this page view.
  }
  listeners.forEach((fn) => fn());
}

/**
 * "Reading preferences" under the footer row (JetBrains Mono 12 in #9A9A96 (Figma has no token for it): a quiet secondary control.): a disclosure button that opens a small panel above
 * it with text size (100 / 112 / 125%) and contrast (high: muted text takes the text colour).
 * Both are radio groups, so arrow keys move between options. Esc, a click outside or tabbing
 * away closes it. Choices persist in localStorage; the inline script in layout.tsx applies them
 * before paint on the next visit.
 */
export function ReadingPreferences({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [size, contrast] = read(useSyncExternalStore(subscribe, snapshot, serverSnapshot));
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const onSize = (e: ChangeEvent<HTMLInputElement>) => apply(e.target.value as Size, contrast);
  const onContrast = (e: ChangeEvent<HTMLInputElement>) => apply(size, e.target.value as Contrast);

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((o) => !o)}
        className={`relative touch-target font-mono text-meta transition-colors hover:text-accent ${
          open ? "text-accent" : "text-[#9a9a96]"
        }`}
      >
        Reading preferences
      </button>

      <div
        id={`${id}-panel`}
        hidden={!open}
        className="absolute bottom-full left-0 z-40 mb-2 w-[264px] rounded-card border border-line bg-surface p-2 shadow-[0_20px_20px_rgb(0_0_0/0.6)] tablet:right-0 tablet:left-auto"
      >
        <Group legend="text size" name={`${id}-size`} value={size} onChange={onSize} options={SIZES.map((s) => [s, `${s}%`])} />
        <Group
          legend="contrast"
          name={`${id}-contrast`}
          value={contrast}
          onChange={onContrast}
          options={[
            ["standard", "Standard"],
            ["high", "High"],
          ]}
          className="mt-2"
        />
      </div>
    </div>
  );
}

type GroupProps = {
  legend: string;
  name: string;
  value: string;
  options: [value: string, label: string][];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

/** Native radios, visually hidden; each label is a segment. The selected one is outlined in accent. */
function Group({ legend, name, value, options, onChange, className = "" }: GroupProps) {
  return (
    <fieldset className={className}>
      <legend className="font-mono text-label text-muted">.{legend}</legend>
      <div className="mt-1 flex gap-1">
        {options.map(([v, label]) => (
          <label
            key={v}
            className="relative touch-target flex-1 cursor-pointer rounded-image border border-line px-1 py-1 text-center font-mono text-meta text-muted transition-colors hover:text-text has-checked:border-accent has-checked:text-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
          >
            <input type="radio" name={name} value={v} checked={value === v} onChange={onChange} className="sr-only" />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
