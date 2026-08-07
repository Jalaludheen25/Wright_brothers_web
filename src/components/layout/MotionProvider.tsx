"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes motion drop transform and layout animations for
 * anyone with the OS preference set, while keeping opacity fades.
 *
 * This works at the library level from the very first frame, which is what
 * covers the single render before `usePrefersReducedMotion` (deliberately
 * hydration-safe, so it reports false on the server) reports the real value.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
