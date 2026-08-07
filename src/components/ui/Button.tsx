import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "ghostLight" | "light";
type Size = "sm" | "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden " +
  "font-sans font-medium uppercase tracking-[0.14em] leading-none " +
  "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "disabled:opacity-45 disabled:pointer-events-none rounded-xs";

const SIZES: Record<Size, string> = {
  sm: "text-[0.65rem] px-5 py-3",
  md: "text-[0.7rem] px-7 py-4",
  lg: "text-[0.75rem] px-9 py-5",
};

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink text-alabaster hover:text-ink",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:text-alabaster",
  light:
    "border border-alabaster/30 text-alabaster hover:border-alabaster hover:text-ink",
  // Ghost variants own their own colour — callers must not pass a competing
  // text-* class, since Tailwind's output order, not the class list order,
  // would decide the winner.
  ghost: "px-0 text-ink hover:text-brass-deep",
  ghostLight: "px-0 text-alabaster hover:text-brass-light",
};

/** The wipe that fills the button from the bottom on hover. */
const FILLS: Record<Variant, string> = {
  solid: "bg-brass",
  outline: "bg-ink",
  light: "bg-alabaster",
  ghost: "",
  ghostLight: "",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders a trailing arrow that slides on hover. */
  arrow?: boolean;
};

function Inner({
  children,
  variant = "solid",
  arrow,
}: Pick<CommonProps, "children" | "variant" | "arrow">) {
  return (
    <>
      {variant !== "ghost" && variant !== "ghostLight" ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[600ms]",
            "ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100",
            FILLS[variant]
          )}
        />
      ) : null}
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {arrow ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[0.9em] w-[0.9em] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  size = "md",
  className,
  arrow,
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  const external = /^https?:|^mailto:|^tel:/.test(href);

  if (external) {
    return (
      <a
        href={href}
        className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        <Inner variant={variant} arrow={arrow}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
      {...rest}
    >
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </Link>
  );
}

export function Button({
  children,
  variant = "solid",
  size = "md",
  className,
  arrow,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
      {...rest}
    >
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}
