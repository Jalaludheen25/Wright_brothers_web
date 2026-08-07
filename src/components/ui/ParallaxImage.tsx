"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IMAGES, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

type CommonProps = {
  image: ImageKey;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  /**
   * Stretch to the nearest positioned ancestor instead of sitting in flow.
   *
   * This is a prop rather than an `absolute inset-0` className because the
   * component owns a position utility either way — passing a second one leaves
   * Tailwind's stylesheet order, not the class list, to pick the winner.
   */
  fill?: boolean;
};

function positionClass(fill: boolean | undefined) {
  return fill ? "absolute inset-0" : "relative";
}

export function ParallaxImage({
  image,
  alt,
  className,
  imageClassName,
  /** Total travel, as a percentage of the element's height. */
  amount = 12,
  priority = false,
  sizes = "100vw",
  quality = 80,
  overlay,
  fill,
}: CommonProps & { amount?: number; overlay?: number }) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`-${amount / 2}%`, `${amount / 2}%`]
  );

  const record = IMAGES[image];

  return (
    <div
      ref={ref}
      className={cn(positionClass(fill), "overflow-hidden", className)}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Overscanned so the parallax travel never exposes an edge. */}
        <div
          className="absolute right-0 left-0"
          style={{ top: `-${amount}%`, bottom: `-${amount}%` }}
        >
          <Image
            src={record.src}
            alt={alt}
            fill
            sizes={sizes}
            quality={quality}
            priority={priority}
            placeholder="blur"
            blurDataURL={record.blurDataURL}
            className={cn("object-cover", imageClassName)}
          />
        </div>
      </motion.div>

      {overlay ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink"
          style={{ opacity: overlay / 100 }}
        />
      ) : null}
    </div>
  );
}

/**
 * Non-parallax counterpart with the same blur/sizing contract — used inside
 * grids and carousels where a second scroll listener would be wasteful.
 */
export function StaticImage({
  image,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
  quality = 80,
  fill,
}: CommonProps) {
  const record = IMAGES[image];
  return (
    <div className={cn(positionClass(fill), "overflow-hidden", className)}>
      <Image
        src={record.src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder="blur"
        blurDataURL={record.blurDataURL}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
