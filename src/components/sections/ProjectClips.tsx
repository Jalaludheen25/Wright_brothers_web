"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectClip } from "@/lib/content/projects";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Site clips as a poster grid that opens a player.
 *
 * Nothing is fetched until a card is chosen: the cards are `<img>` posters, and
 * the single <video> is mounted only while the modal is open. Most of this
 * footage is 9:16 phone video, so portrait cards get a portrait frame rather
 * than a letterboxed 16:9 one.
 */
export function ProjectClips({ clips }: { clips: ProjectClip[] }) {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState<ProjectClip | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      restoreFocusRef.current?.focus?.();
    };
  }, [active, close]);

  return (
    <>
      <RevealGroup
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        stagger={0.06}
      >
        {clips.map((clip) => (
          <RevealItem key={clip.src}>
            <button
              type="button"
              onClick={() => setActive(clip)}
              aria-label={`Play clip: ${clip.caption}`}
              className="group block w-full text-left"
            >
              {/* One aspect for every card so rows stay level; the landscape
                  clip is cropped here and plays at its true ratio in the modal. */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-graphite">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={clip.poster}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-alabaster/70 bg-ink/55 transition-all duration-500 group-hover:scale-110 group-hover:border-alabaster group-hover:bg-ink/75">
                    <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-alabaster" />
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 border border-alabaster/0 transition-colors duration-500 group-hover:border-alabaster/25"
                />
              </div>
              <p className="mt-3 text-sm leading-snug text-alabaster/55">
                {clip.caption}
              </p>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="clip-player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[120] bg-ink"
            onClick={close}
          >
            <div aria-hidden="true" className="grain absolute inset-0" />
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={active.caption}
              tabIndex={-1}
              className="relative flex h-full flex-col outline-none"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-end px-[max(1.25rem,var(--spacing-gutter))] pt-6">
                <button
                  type="button"
                  onClick={close}
                  className="label flex items-center gap-3 text-alabaster/70 transition-colors duration-300 hover:text-alabaster"
                >
                  Close
                  <span
                    aria-hidden="true"
                    className="relative block h-4 w-4 before:absolute before:top-1/2 before:left-0 before:h-px before:w-4 before:-translate-y-1/2 before:rotate-45 before:bg-current after:absolute after:top-1/2 after:left-0 after:h-px after:w-4 after:-translate-y-1/2 after:-rotate-45 after:bg-current"
                  />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 items-center justify-center px-[max(1.25rem,var(--spacing-gutter))] py-4">
                <video
                  key={active.src}
                  src={active.src}
                  poster={active.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="max-h-full max-w-full bg-ink"
                />
              </div>

              <div className="px-[max(1.25rem,var(--spacing-gutter))] pb-8">
                <p className="max-w-[70ch] leading-relaxed text-alabaster/70">
                  {active.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
