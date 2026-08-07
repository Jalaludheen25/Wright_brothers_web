"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * A trailing ring that follows the pointer and swells over interactive
 * elements. The native cursor is deliberately left visible — hiding it looks
 * clever for about four seconds and then costs people their bearings.
 *
 * Renders nothing at all on coarse pointers or under reduced motion.
 */
export function Cursor() {
  const finePointer = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = finePointer && !reduce;

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      setActive(
        Boolean(
          target?.closest(
            'a, button, [role="button"], input, textarea, select, label, [data-cursor="grow"]'
          )
        )
      );
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-root pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="block rounded-full border border-white"
        animate={{
          width: active ? 46 : 26,
          height: active ? 46 : 26,
          opacity: visible ? (active ? 0.9 : 0.5) : 0,
          x: active ? -23 : -13,
          y: active ? -23 : -13,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
