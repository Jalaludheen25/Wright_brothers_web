import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. The track holds two identical halves and
 * translates by -50%, so the loop is seamless. CSS-only — no JS, no rAF, and
 * it stops entirely under prefers-reduced-motion (see globals.css).
 */
export function Marquee({
  children,
  className,
  duration = 40,
  pauseOnHover = true,
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds for one full pass. */
  duration?: number;
  pauseOnHover?: boolean;
  fade?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        fade && "edge-fade",
        pauseOnHover && "hover:marquee-paused",
        className
      )}
      /* Decorative repetition — announced once via the source content below. */
      aria-hidden="true"
    >
      <div
        className="marquee-track flex w-max shrink-0 items-center"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
