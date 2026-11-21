"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { TAG_FIELD_HEIGHT, type HomeTag } from "@/content/home-tags";

type Props = {
  tags: HomeTag[];
  /** One rendered <ContentImage> per tag, same order. Built on the server (ContentImage reads the file system). */
  previews: ReactNode[];
};

/**
 * Home page project tags. ≥ 1194px: positioned around the centre column with a hover/focus
 * preview card, one open at a time. Below that: a plain row of tags in the column, no previews.
 */
export function ProjectTags({ tags, previews }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul
      aria-label="Projects"
      className="mt-3 flex flex-wrap justify-center gap-2 desktop:pointer-events-none desktop:absolute desktop:inset-x-0 desktop:top-0 desktop:mt-0 desktop:block"
      style={{ ["--tag-field-h" as string]: `${TAG_FIELD_HEIGHT}px` }}
    >
      {tags.map((tag, i) => (
        <Tag
          key={tag.label}
          tag={tag}
          preview={previews[i]}
          open={open === i}
          onOpen={() => setOpen(i)}
          onClose={() => setOpen((cur) => (cur === i ? null : cur))}
        />
      ))}
    </ul>
  );
}

type TagProps = {
  tag: HomeTag;
  preview: ReactNode;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function Tag({ tag, preview, open, onOpen, onClose }: TagProps) {
  const captionId = useId();

  const controlProps = {
    onFocus: onOpen,
    onBlur: onClose,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    "aria-describedby": captionId,
    className: "block",
  };

  const chip = (
    <span
      className={`relative block border border-text px-1.5 py-1 font-sans text-[15px] leading-[1.4] whitespace-nowrap text-text transition-colors duration-[280ms] ease-out ${
        open ? "bg-surface" : "bg-bg"
      }`}
    >
      <span aria-hidden="true" className="absolute -top-0.5 -left-0.5 size-1 bg-accent" />
      {tag.label}
    </span>
  );

  const card = (
    <Preview
      preview={preview}
      caption={tag.caption}
      captionId={captionId}
      arrow={Boolean(tag.href)}
      align={tag.previewAlign}
      open={open}
    />
  );

  return (
    <li
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      // Static below desktop, so the offsets only take effect once it's absolutely positioned.
      className={`desktop:pointer-events-auto desktop:absolute ${open ? "z-20" : "z-10"}`}
      style={{
        left: `${tag.position.x}%`,
        top: `calc(var(--tag-field-h) * ${tag.position.y / 100})`,
      }}
    >
      {tag.href ? (
        <Link href={tag.href} {...controlProps}>
          {chip}
          {card}
        </Link>
      ) : (
        <>
          <button
            type="button"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
            {...controlProps}
            className="block cursor-default"
          >
            {chip}
          </button>
          {card}
        </>
      )}
    </li>
  );
}

type PreviewProps = {
  preview: ReactNode;
  caption: string;
  captionId: string;
  arrow: boolean;
  align: HomeTag["previewAlign"];
  open: boolean;
};

/**
 * 280px card under the tag. The 40px top padding is a hover bridge so the card stays open
 * while the pointer moves onto it. Hidden from assistive tech: the caption reaches screen
 * readers through the control's aria-describedby instead.
 */
function Preview({ preview, caption, captionId, arrow, align, open }: PreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  // A video preview plays only while its card is open, and not at all with reduced motion.
  useEffect(() => {
    const video = ref.current?.querySelector("video");
    if (!video) return;
    if (open && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [open]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute top-full z-30 hidden w-[280px] pt-5 desktop:block ${
        align === "end" ? "right-0" : "left-0"
      } ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`rotate-3 rounded-[10px] border border-line bg-surface p-[7px] shadow-[0_20px_20px_rgb(0_0_0/0.6)] transition-[opacity,translate,visibility] duration-[280ms] ease-out motion-reduce:transition-none ${
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"
        }`}
      >
        {preview}
        {/* One line: a caption longer than the card truncates (the full text still reaches
            screen readers via aria-describedby). */}
        <div className="mt-1.5 mb-1 flex items-baseline justify-between gap-1 px-0.5 font-mono text-meta whitespace-nowrap text-muted">
          <span id={captionId} className="min-w-0 truncate">
            {caption}
          </span>
          {arrow && <span className="shrink-0 text-text">→</span>}
        </div>
      </div>
    </div>
  );
}
