import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The brand lockup — monogram plus wordmark — supplied as two PNGs that differ
 * only in ink colour.
 *
 * Both variants are rendered and crossfaded rather than swapped, so the header
 * can move between its transparent and solid states without the logo popping.
 * The pair is 2892×652 (4.44:1); height drives the size and width follows.
 */

const LOGO = {
  src: { dark: "/logo/Black_logo.png", light: "/logo/white_logo.png" },
  width: 2892,
  height: 652,
} as const;

export type LogoTone = "dark" | "light" | "auto";

export function Logo({
  tone = "dark",
  className,
  priority = false,
  sizes = "(max-width: 640px) 150px, 210px",
}: {
  /** "dark" = dark ink for light surfaces. "auto" crossfades on `data-tone`. */
  tone?: LogoTone;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const common = {
    width: LOGO.width,
    height: LOGO.height,
    priority,
    sizes,
    quality: 90,
    className: "h-full w-auto object-contain object-left",
  };

  if (tone !== "auto") {
    return (
      <span className={cn("block h-7 sm:h-8", className)}>
        <Image
          src={tone === "light" ? LOGO.src.light : LOGO.src.dark}
          alt="Wright Brothers"
          {...common}
        />
      </span>
    );
  }

  // Both stacked; the parent sets --logo-dark / --logo-light opacity.
  return (
    <span className={cn("relative block h-7 sm:h-8", className)}>
      {/* Reserves the intrinsic width so the stack has a size to fill. */}
      <Image
        src={LOGO.src.dark}
        alt="Wright Brothers"
        {...common}
        className={cn(common.className, "opacity-[var(--logo-dark,1)] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]")}
      />
      <Image
        src={LOGO.src.light}
        alt=""
        aria-hidden="true"
        {...common}
        className={cn(
          common.className,
          "absolute inset-0 opacity-[var(--logo-light,0)] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        )}
      />
    </span>
  );
}
