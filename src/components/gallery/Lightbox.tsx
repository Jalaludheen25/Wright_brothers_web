"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { IMAGES } from "@/lib/images";
import type { GalleryItem } from "@/lib/content/gallery";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

/** Points right by default; the previous control rotates it. */
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Fullscreen image viewer.
 *
 * Modal semantics are done by hand rather than with <dialog> so the entry and
 * exit can be animated with the rest of the site's motion language: role
 * dialog + aria-modal, focus moved in on open and restored on close, Tab
 * cycled inside the panel, Escape and the backdrop both dismiss.
 */
export function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const reduce = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  // Remember what was focused before opening, and give focus to the panel.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => restoreFocusRef.current?.focus?.();
  }, [open]);

  // The page behind must not scroll while the viewer is up.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Tab") {
        // Keep Tab inside the panel for as long as it is open.
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])"
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  const record = item ? IMAGES[item.image] : null;

  return (
    <AnimatePresence>
      {open && item && record ? (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          // Fully opaque: at 97% the nav behind still ghosts through, which
          // near-black makes more obvious than the number suggests.
          className="fixed inset-0 z-[120] bg-ink"
          onClick={onClose}
        >
          <div aria-hidden="true" className="grain absolute inset-0" />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${index + 1} of ${items.length}: ${item.caption}`}
            tabIndex={-1}
            className="relative flex h-full flex-col outline-none"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              const start = touchStartX.current;
              if (start === null) return;
              const delta = event.changedTouches[0].clientX - start;
              if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
              touchStartX.current = null;
            }}
          >
            {/* Bar */}
            <div className="flex items-center justify-between gap-6 px-[max(1.25rem,var(--spacing-gutter))] pt-6">
              <p className="label text-alabaster/55 tabular-nums">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="label flex items-center gap-3 text-alabaster/70 transition-colors duration-300 hover:text-alabaster"
              >
                Close
                <span
                  aria-hidden="true"
                  className="relative block h-4 w-4 before:absolute before:top-1/2 before:left-0 before:h-px before:w-4 before:-translate-y-1/2 before:rotate-45 before:bg-current after:absolute after:top-1/2 after:left-0 after:h-px after:w-4 after:-translate-y-1/2 after:-rotate-45 after:bg-current"
                />
              </button>
            </div>

            {/* Frame */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-[max(1.25rem,var(--spacing-gutter))] py-6">
              <motion.div
                key={item.image}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reduce ? 0.15 : 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative h-full w-full"
              >
                <Image
                  src={record.src}
                  alt={item.caption}
                  fill
                  quality={85}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={record.blurDataURL}
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Prev / next. Hit areas sit clear of the image on small screens. */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="group absolute top-1/2 left-2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-alabaster/20 bg-ink/60 text-alabaster/70 transition-all duration-400 hover:border-alabaster/50 hover:text-alabaster sm:left-6"
              >
                <Chevron className="rotate-180 transition-transform duration-400 group-hover:-translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="group absolute top-1/2 right-2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-alabaster/20 bg-ink/60 text-alabaster/70 transition-all duration-400 hover:border-alabaster/50 hover:text-alabaster sm:right-6"
              >
                <Chevron className="transition-transform duration-400 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Caption */}
            <div className="px-[max(1.25rem,var(--spacing-gutter))] pb-8">
              <p className="label text-brass-light">{item.category}</p>
              <p className="mt-2 max-w-[70ch] leading-relaxed text-alabaster/70">
                {item.caption}
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
