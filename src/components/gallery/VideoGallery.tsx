"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY_VIDEOS, type GalleryVideo } from "@/lib/content/gallery";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

function runtime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Poster card. Nothing plays until it is asked to. */
function VideoCard({ item, onOpen }: { item: GalleryVideo; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Play ${item.title}`}
      className="group block w-full text-left"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-graphite">
        {/* Poster only — the encoded video is never fetched until playback. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/media/${item.video}-poster.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10 transition-opacity duration-500 group-hover:opacity-90"
        />

        {/* Play control */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Solid ink disc rather than a blur: the posters run from near-black
              to near-white, and only an opaque fill reads on both. */}
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-alabaster/70 bg-ink/55 transition-all duration-500 group-hover:scale-110 group-hover:border-alabaster group-hover:bg-ink/75 sm:h-20 sm:w-20">
            <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-alabaster transition-transform duration-500 group-hover:scale-110" />
          </span>
        </span>

        <span className="label absolute right-4 bottom-4 text-alabaster/70 tabular-nums">
          {runtime(item.seconds)}
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-0 border border-alabaster/0 transition-colors duration-500 group-hover:border-alabaster/25"
        />
      </div>

      <h3 className="display mt-6 text-h3 leading-tight text-alabaster">
        {item.title}
      </h3>
      <p className="mt-3 max-w-[46ch] leading-relaxed text-alabaster/55">
        {item.blurb}
      </p>
    </button>
  );
}

export function VideoGallery() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState<GalleryVideo | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        className="grid gap-x-8 gap-y-14 lg:grid-cols-3"
        stagger={0.08}
      >
        {GALLERY_VIDEOS.map((item) => (
          <RevealItem key={item.video}>
            <VideoCard item={item} onOpen={() => setActive(item)} />
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[120] flex flex-col bg-ink/97"
            onClick={close}
          >
            <div aria-hidden="true" className="grain absolute inset-0" />

            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              tabIndex={-1}
              className="relative flex h-full flex-col outline-none"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-6 px-[max(1.25rem,var(--spacing-gutter))] pt-6">
                <p className="label text-brass-light">{active.title}</p>
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

              <div className="flex min-h-0 flex-1 items-center justify-center px-[max(1.25rem,var(--spacing-gutter))] py-6">
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: reduce ? 0.15 : 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full max-w-[min(100%,calc((100vh-14rem)*16/9))]"
                >
                  {/* Native controls here — this is a player the user chose to
                      open, not wallpaper. Muted so it starts without a gesture;
                      the control bar lets them unmute. */}
                  <video
                    ref={videoRef}
                    className="aspect-video w-full bg-ink"
                    poster={`/media/${active.video}-poster.jpg`}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src={`/media/${active.video}-1080.mp4`}
                      type="video/mp4"
                      media="(min-width: 768px)"
                    />
                    <source
                      src={`/media/${active.video}-720.mp4`}
                      type="video/mp4"
                    />
                  </video>
                </motion.div>
              </div>

              <div className="px-[max(1.25rem,var(--spacing-gutter))] pb-8">
                <p className="max-w-[70ch] leading-relaxed text-alabaster/70">
                  {active.blurb}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
