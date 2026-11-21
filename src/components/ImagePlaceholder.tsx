type Props = {
  /** File name shown in the box, e.g. "ndd-cover.png" */
  name: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * Stand-in for an image whose file isn't in /public yet.
 * Keeps the real aspect ratio; display size comes from the parent's CSS.
 */
export function ImagePlaceholder({ name, width, height, className = "" }: Props) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${name}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`flex w-full items-center justify-center overflow-hidden rounded-image border border-line bg-surface p-1 ${className}`}
    >
      <span className="truncate font-mono text-meta text-muted">{name}</span>
    </div>
  );
}
