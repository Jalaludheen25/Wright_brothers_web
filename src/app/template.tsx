"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Page transition. `template.tsx` remounts on every navigation, so the enter
 * animation runs without needing to intercept the router.
 *
 * A brass hairline sweeps across the top while the incoming page settles —
 * enough to signal "something changed" without delaying the content.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          opacity: { duration: 0.4, delay: 0.6 },
        }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brass"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
