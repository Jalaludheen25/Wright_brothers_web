"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { BlueprintLayer } from "./BlueprintLayer";
import { IMAGES } from "@/lib/images";
import type { Capability } from "@/lib/content/capabilities";
import { useFinePointer, useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";

const MAX_TILT = 8; // degrees, per IMPROVEMENT_SUGGESTIONS pillar 2

export function CapabilityCard({
  capability,
  onEnquiryOpen,
  priority = false,
}: {
  capability: Capability;
  onEnquiryOpen: (capability: Capability) => void;
  priority?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  // Layout itself is CSS-driven; this only gates the pointer tilt, which is
  // progressive enhancement and so can settle a frame after hydration.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const tiltEnabled = !reduce && finePointer && isDesktop;

  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  /** Sticky reveal from the explicit toggle — the path for touch and keyboard. */
  const [pinned, setPinned] = useState(false);

  const built = hovered || pinned;

  // Pointer position within the card, normalised to -0.5 … 0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 24, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateX = useTransform(sy, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);

  // Glare tracks the cursor across the card face.
  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(38rem circle at ${glareX} ${glareY}, rgba(201,168,122,0.22), transparent 60%)`;

  const record = IMAGES[capability.image];

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!tiltEnabled || event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
    setHovered(false);
  }

  const titleId = `capability-${capability.id}-title`;

  return (
    <motion.article
      aria-labelledby={titleId}
      className="group relative w-full lg:w-auto"
      style={{ perspective: tiltEnabled ? 1200 : undefined }}
    >
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={reset}
        onPointerCancel={reset}
        style={
          tiltEnabled
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        /* On desktop the card is sized off the viewport height so the whole
           track always fits inside the pinned frame; width follows the ratio. */
        className="relative aspect-[4/5] overflow-hidden rounded-xs bg-graphite sm:aspect-[16/10] lg:aspect-[3/4] lg:h-[clamp(21rem,54svh,32rem)] lg:w-auto"
      >
        {/* Photograph — the built result */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: built && !reduce ? 1.05 : 1 }}
          transition={{ duration: reduce ? 0.15 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={record.src}
            alt={`${capability.title} — ${capability.discipline}`}
            fill
            sizes="(max-width: 1024px) 100vw, 26rem"
            quality={80}
            priority={priority}
            placeholder="blur"
            blurDataURL={record.blurDataURL}
            className="object-cover"
          />
        </motion.div>

        {/* Ink wash — heavy while drawing, light once built */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-ink"
          initial={false}
          animate={{ opacity: built ? 0.32 : 0.78 }}
          transition={{ duration: reduce ? 0.15 : 0.55, ease: "easeOut" }}
        />

        {/* The drawing. Masked away over the lower half so the linework never
            competes with the text sitting on top of it. */}
        <BlueprintLayer
          variant={capability.blueprint}
          active={!built}
          className="absolute inset-0 h-full w-full text-brass-light [mask-image:linear-gradient(to_bottom,black_0%,black_38%,transparent_72%)]"
        />

        {/* Bottom scrim — never below 60% at the base, per the UX report */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 via-45% to-transparent"
        />

        {/* Cursor glare */}
        {tiltEnabled ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: glare }}
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        ) : null}

        {/* Hairline frame + registration marks */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xs border border-alabaster/12"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-4 left-4 h-3 w-3 border-t border-l border-brass-light/50"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 bottom-4 h-3 w-3 border-r border-b border-brass-light/50"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="label text-brass-light tabular-nums">
              {capability.index}
            </span>
            <span className="label text-alabaster/55">{capability.meta}</span>
          </div>

          <div>
            <h3
              id={titleId}
              className="display text-[clamp(1.45rem,1.2rem+0.8vw,1.95rem)] leading-[1.08] text-balance text-alabaster"
            >
              {capability.title}
            </h3>
            <p className="label mt-3 text-brass-light">
              {capability.discipline}
            </p>

            {/* Crossfade: annotations while drawing, prose once built. */}
            <div className="relative mt-4 min-h-[7.5rem] sm:min-h-[7rem]">
              <AnimatePresence initial={false} mode="wait">
                {built ? (
                  <motion.p
                    key="body"
                    initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                    transition={{ duration: reduce ? 0.15 : 0.35 }}
                    className="text-sm leading-relaxed text-alabaster/75"
                  >
                    {capability.body}
                  </motion.p>
                ) : (
                  <motion.ul
                    key="points"
                    initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                    transition={{ duration: reduce ? 0.15 : 0.35 }}
                    className="space-y-2"
                  >
                    {capability.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-snug text-alabaster/70"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-px w-3 shrink-0 bg-brass-light"
                        />
                        {point}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Action row */}
            <div className="mt-6 flex items-center justify-between gap-4">
              {capability.enquiry ? (
                <button
                  type="button"
                  onClick={() => onEnquiryOpen(capability)}
                  className="label inline-flex items-center gap-2.5 rounded-xs border border-alabaster/30 px-4 py-2.5 text-alabaster transition-colors duration-500 hover:border-brass-light hover:bg-brass-light hover:text-ink"
                >
                  Notify me
                  <span aria-hidden="true">→</span>
                  <span className="sr-only">
                    about the {capability.title} department
                  </span>
                </button>
              ) : (
                <Link
                  href={capability.href ?? "/services"}
                  className="label inline-flex items-center gap-2.5 text-alabaster transition-colors duration-500 hover:text-brass-light"
                >
                  Explore
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                  <span className="sr-only">{capability.title}</span>
                </Link>
              )}

              {/* Explicit drawing / built toggle — the touch and keyboard path */}
              <button
                type="button"
                aria-pressed={pinned}
                onClick={() => setPinned((v) => !v)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-alabaster/25 text-alabaster/80 transition-colors duration-400 hover:border-brass-light hover:text-brass-light"
              >
                <span className="sr-only">
                  {pinned
                    ? `Show the drawing for ${capability.title}`
                    : `Show the built result for ${capability.title}`}
                </span>
                <motion.svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  initial={false}
                  animate={{ rotate: built ? 180 : 0 }}
                  transition={{ duration: reduce ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <path
                    d="M3 12h13M12 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
