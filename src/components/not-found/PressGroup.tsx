"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * A `group` box that also sets [data-pressed] while a finger or pen is down on it,
 * so touch screens get the same lift as mouse hover (group-hover only fires with a real hover).
 */
export function PressGroup({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const [pressed, setPressed] = useState(false);
  const release = () => setPressed(false);

  return (
    <div
      data-pressed={pressed || undefined}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") setPressed(true);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      className={`group ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
