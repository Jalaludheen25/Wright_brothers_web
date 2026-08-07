"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  duration?: number;
  direction?: Direction;
  as?: ElementType;
  /** Re-run every time the element enters the viewport. */
  repeat?: boolean;
};

/**
 * The workhorse scroll-in animation. Collapses to a plain fade with no
 * translation when the user has asked for reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = "up",
  as = "div",
  repeat = false,
}: RevealProps) {
  const reduce = usePrefersReducedMotion();
  const offset = reduce ? OFFSET.none : OFFSET[direction];
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0.2 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent that staggers any <Reveal.Item> descendants. Use where a list should
 * cascade rather than arrive all at once.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

export const REVEAL_ITEM: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag className={className} variants={REVEAL_ITEM}>
      {children}
    </MotionTag>
  );
}
