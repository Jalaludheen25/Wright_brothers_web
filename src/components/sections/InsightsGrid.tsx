"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import { POSTS, POST_CATEGORIES } from "@/lib/content/insights";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function InsightsGrid() {
  const reduce = usePrefersReducedMotion();
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(
    () => (category === "All" ? POSTS : POSTS.filter((p) => p.category === category)),
    [category]
  );

  const chips = ["All", ...POST_CATEGORIES];

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {chips.map((chip) => {
          const count =
            chip === "All"
              ? POSTS.length
              : POSTS.filter((p) => p.category === chip).length;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setCategory(chip)}
              aria-pressed={category === chip}
              className={cn(
                "rounded-xs border px-4 py-2.5 text-[0.7rem] font-medium tracking-[0.12em] uppercase transition-all duration-400",
                category === chip
                  ? "border-ink bg-ink text-alabaster"
                  : "border-ink/20 text-slate hover:border-ink/50 hover:text-ink"
              )}
            >
              {chip} ({count})
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="label mt-9 text-ash">
        Showing {filtered.length} of {POSTS.length} pieces
      </p>

      <motion.div
        layout={!reduce}
        className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                duration: reduce ? 0.15 : 0.55,
                delay: reduce ? 0 : Math.min(i * 0.05, 0.25),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
