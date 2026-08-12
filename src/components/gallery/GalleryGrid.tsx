"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { IMAGES } from "@/lib/images";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  GALLERY_MIXED,
  type GalleryCategory,
} from "@/lib/content/gallery";
import { Lightbox } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Filter = GalleryCategory | "All";

const FILTERS: Filter[] = ["All", ...GALLERY_CATEGORIES];

export function GalleryGrid() {
  const reduce = usePrefersReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "All"
        ? GALLERY_MIXED
        : GALLERY.filter((i) => i.category === filter),
    [filter]
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", GALLERY.length]]);
    for (const category of GALLERY_CATEGORIES) {
      map.set(category, GALLERY.filter((i) => i.category === category).length);
    }
    return map;
  }, []);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2.5">
        {FILTERS.map((option) => {
          const count = counts.get(option) ?? 0;
          if (!count) return null;
          const isActive = filter === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(option)}
              className={cn(
                "rounded-xs border px-4 py-2.5 text-[0.7rem] font-medium tracking-[0.12em] uppercase transition-all duration-400",
                isActive
                  ? "border-alabaster bg-alabaster text-ink"
                  : "border-alabaster/25 text-alabaster/70 hover:border-alabaster/60 hover:text-alabaster"
              )}
            >
              {option} ({count})
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="label mt-8 text-alabaster/55">
        Showing {items.length} of {GALLERY.length} photographs
      </p>

      {/* Grid. Column spans rather than true masonry: rows stay aligned, which
          reads as an edited portfolio, and it needs no measurement pass. */}
      <motion.div
        layout={!reduce}
        className="mt-6 grid auto-rows-[minmax(0,14rem)] grid-cols-2 gap-3 sm:auto-rows-[minmax(0,16rem)] lg:grid-cols-4 lg:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const record = IMAGES[item.image];
            // A portrait source in a single square cell is cropped to its
            // middle third. Give it the two-row cell unless the item already
            // asks to be wide.
            const span =
              item.span ??
              (record.height > record.width ? ("tall" as const) : undefined);
            return (
              <motion.button
                key={item.image}
                type="button"
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{
                  duration: reduce ? 0.2 : 0.6,
                  delay: reduce ? 0 : Math.min(i, 8) * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setActive(i)}
                aria-label={`Open image: ${item.caption}`}
                className={cn(
                  "group relative overflow-hidden bg-graphite text-left",
                  span === "wide" && "col-span-2",
                  span === "tall" && "row-span-2"
                )}
              >
                <Image
                  src={record.src}
                  alt={item.caption}
                  fill
                  quality={75}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL={record.blurDataURL}
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                />

                {/* Scrim carries the caption and deepens on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="label block text-brass-light">
                    {item.category}
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-alabaster">
                    {item.caption}
                  </span>
                </span>

                {/* Hairline that draws itself on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 border border-alabaster/0 transition-colors duration-500 group-hover:border-alabaster/25"
                />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        items={items}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </>
  );
}
