import { cn } from "@/lib/utils";

/**
 * The mark: a drafting square containing a W drawn as a roofline, sitting on
 * a ground line. Built from strokes so it stays crisp at any size and inherits
 * whatever colour it is placed on.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      <path
        d="M8 11.5 L14.4 26 L20 15.2 L25.6 26 L32 11.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path d="M8 30.5 H32" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    </svg>
  );
}

export function Wordmark({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="display text-[1.35rem] tracking-[0.01em] whitespace-nowrap sm:text-[1.5rem]">
        Wright Brothers
      </span>
      {showTagline ? (
        <span className="label mt-1.5 opacity-55">Design &amp; Build · Dubai</span>
      ) : null}
    </span>
  );
}

export function Logo({
  className,
  showTagline = false,
  markClassName,
}: {
  className?: string;
  showTagline?: boolean;
  markClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3.5", className)}>
      <LogoMark className={markClassName} />
      <Wordmark showTagline={showTagline} />
    </span>
  );
}
