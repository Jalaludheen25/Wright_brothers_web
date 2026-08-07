"use client";

import { motion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Horizontal-overflow discovery: an explicit "01 / 04" counter and a seekable
 * rail. The UX report flags that users on 1024–1440px displays cannot tell
 * cards 3 and 4 exist before they scroll — this is the fix.
 *
 * The fill is driven straight off the scroll MotionValue (no React re-render
 * per frame); only the discrete index is state.
 */
export function TrackProgress({
  progress,
  activeIndex,
  labels,
  onSeek,
  className,
}: {
  progress: MotionValue<number>;
  activeIndex: number;
  labels: string[];
  onSeek: (index: number) => void;
  className?: string;
}) {
  const total = labels.length;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Counter + the discipline currently in frame */}
      <div className="flex items-baseline gap-4">
        <p className="label shrink-0 tabular-nums text-alabaster/55">
          <span className="text-brass-light">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true"> / {String(total).padStart(2, "0")}</span>
          <span className="sr-only"> of {total}</span>
        </p>
        <p
          aria-live="polite"
          className="label truncate text-alabaster"
        >
          {labels[activeIndex]}
        </p>
      </div>

      {/* Rail */}
      <div className="relative h-6 w-full">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-alabaster/20" />
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-brass-light"
        />

        {/* Seek targets, one per card */}
        <div className="absolute inset-0 flex">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => onSeek(i)}
              aria-current={i === activeIndex ? "true" : undefined}
              className="group/seg relative flex-1 cursor-pointer"
            >
              <span className="sr-only">Go to {label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1/2 left-0 h-2 w-px -translate-y-1/2 transition-colors duration-300",
                  i <= activeIndex ? "bg-brass-light" : "bg-alabaster/30",
                  "group-hover/seg:bg-alabaster"
                )}
              />
              {/* Larger invisible hit area — the visible rail is 1px tall. */}
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-full" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
