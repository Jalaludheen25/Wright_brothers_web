"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CapabilityCard } from "./CapabilityCard";
import { TrackProgress } from "./TrackProgress";
import { EnquiryModal } from "./EnquiryModal";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import {
  CAPABILITIES,
  CAPABILITIES_HEADING,
  type Capability,
} from "@/lib/content/capabilities";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Per-card horizontal spread at full scroll — the composite-safe reading of
 *  "dynamic card gap", since animating `gap` would trigger layout every frame. */
const SPREAD_PX = 8;

/* -------------------------------------------------------------------------- */
/* Heading — words brighten as the section arrives                             */
/* -------------------------------------------------------------------------- */

function ScrollLitHeading({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) {
  const reduce = usePrefersReducedMotion();
  // *emphasis* markers, matching the convention used elsewhere on the site.
  const tokens = text.split(" ").map((raw) => {
    const match = /^\*(.+?)\*([^\w\s]*)$/.exec(raw);
    return match
      ? { word: match[1], accent: true, tail: match[2] }
      : { word: raw, accent: false, tail: "" };
  });

  return (
    <h2 className="display max-w-[26ch] text-[clamp(1.9rem,1.15rem+2.1vw,3rem)] leading-[1.08] text-alabaster">
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden="true">
        {tokens.map((token, i) => (
          <Word
            key={i}
            token={token}
            index={i}
            total={tokens.length}
            progress={progress}
            reduce={reduce}
          />
        ))}
      </span>
    </h2>
  );
}

function Word({
  token,
  index,
  total,
  progress,
  reduce,
}: {
  token: { word: string; accent: boolean; tail: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Each word lights within its own slice of the entry progress. Opacity only —
  // animating font-weight would reflow the line on every frame.
  const start = (index / total) * 0.75;
  const opacity = useTransform(progress, [start, start + 0.3], [0.22, 1]);

  return (
    <motion.span
      style={reduce ? undefined : { opacity }}
      className={cn("inline", token.accent && "italic text-brass-light")}
    >
      {token.word}
      {token.tail}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */

export function CapabilitiesShowcase() {
  const reduce = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /** Horizontal distance the track must travel. 0 disables the scrub entirely
   *  (mobile, tablet, reduced motion, or a display wide enough to fit all four). */
  const [overflow, setOverflow] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enquiry, setEnquiry] = useState<Capability | null>(null);

  const scrubbing = overflow > 0;

  /* --- Measure ---------------------------------------------------------- */
  useEffect(() => {
    const track = trackRef.current;
    const shell = shellRef.current;
    if (!track || !shell) return;

    const measure = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!desktop || prefersReduced) {
        setOverflow(0);
        return;
      }

      const distance =
        track.scrollWidth -
        shell.clientWidth +
        (CAPABILITIES.length - 1) * SPREAD_PX;

      setOverflow(Math.max(0, Math.round(distance)));
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(shell);

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", measure);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* --- Scroll ----------------------------------------------------------- */

  // Drives the horizontal scrub while the section is pinned.
  const { scrollYProgress: scrubProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Separate range for the arrival animation of the heading.
  const { scrollYProgress: entryProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 35%"],
  });

  const x = useTransform(scrubProgress, [0, 1], [0, -overflow]);
  const smoothX = useSpring(x, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.5,
  });

  const railFill = useSpring(scrubProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrubProgress, "change", (value) => {
    const next = Math.min(
      CAPABILITIES.length - 1,
      Math.max(0, Math.round(value * (CAPABILITIES.length - 1)))
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  /* --- Seek ------------------------------------------------------------- */
  const seek = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const scrubDistance = section.offsetHeight - window.innerHeight;
      if (scrubDistance <= 0) return;

      const ratio = index / Math.max(1, CAPABILITIES.length - 1);
      window.scrollTo({
        top: top + ratio * scrubDistance,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [reduce]
  );

  return (
    <>
      <section
        ref={sectionRef}
        aria-labelledby="capabilities-heading"
        className="relative bg-ink text-alabaster"
        /* The pinned scrub needs one viewport of dwell plus the travel
           distance. Left unset, the section is simply its natural height. */
        style={scrubbing ? { height: `calc(100svh + ${overflow}px)` } : undefined}
      >
        {/* Drafting canvas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:80px_80px]"
        />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        <div
          className={cn(
            "flex flex-col justify-center",
            scrubbing
              ? // pt clears the fixed site header; everything below is sized to
                // fit the remaining viewport so nothing is cropped while pinned.
                "sticky top-0 h-svh overflow-hidden pt-[5.5rem] pb-8"
              : "py-[clamp(4.5rem,3rem+8vw,10rem)]"
          )}
        >
          {/* Header — two columns while pinned, so the whole frame fits 100svh */}
          <div className="container-wide relative z-10 shrink-0">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-14">
              <div>
                <Reveal>
                  <Eyebrow number="04" tone="light">
                    {CAPABILITIES_HEADING.eyebrow}
                  </Eyebrow>
                </Reveal>

                <div className="mt-6" id="capabilities-heading">
                  <ScrollLitHeading
                    text={CAPABILITIES_HEADING.title}
                    progress={entryProgress}
                  />
                </div>
              </div>

              <div>
                <Reveal delay={0.1}>
                  <p className="max-w-[46ch] leading-[1.6] text-alabaster/65">
                    {CAPABILITIES_HEADING.lead}
                  </p>
                </Reveal>

                {scrubbing ? (
                  <Reveal delay={0.15}>
                    <TrackProgress
                      progress={railFill}
                      activeIndex={activeIndex}
                      labels={CAPABILITIES.map((c) => c.title)}
                      onSeek={seek}
                      className="mt-7"
                    />
                  </Reveal>
                ) : null}
              </div>
            </div>
          </div>

          {/* Track */}
          <div
            ref={shellRef}
            className={cn(
              "relative mt-10 w-full lg:mt-8",
              // Without the scrub — reduced motion, or a display wide enough
              // that pinning is pointless — the row becomes a native scroller
              // so the last card is still reachable without any animation.
              !scrubbing && "lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:pb-5"
            )}
          >
            <motion.div
              ref={trackRef}
              style={scrubbing ? { x: smoothX } : undefined}
              className={cn(
                "flex flex-col gap-8 px-[var(--spacing-gutter)]",
                "lg:w-max lg:flex-row lg:gap-7 xl:gap-8",
                // Composite-only layer promotion for the scrubbed track.
                scrubbing && "will-change-transform [backface-visibility:hidden]"
              )}
            >
              {CAPABILITIES.map((capability, i) => (
                <CardWithSpread
                  key={capability.id}
                  capability={capability}
                  index={i}
                  progress={scrubProgress}
                  scrubbing={scrubbing}
                  onEnquiryOpen={setEnquiry}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <EnquiryModal capability={enquiry} onClose={() => setEnquiry(null)} />
    </>
  );
}

/** Wraps a card with the progressive spread offset. */
function CardWithSpread({
  capability,
  index,
  progress,
  scrubbing,
  onEnquiryOpen,
}: {
  capability: Capability;
  index: number;
  progress: MotionValue<number>;
  scrubbing: boolean;
  onEnquiryOpen: (c: Capability) => void;
}) {
  const offset = useTransform(progress, [0, 1], [0, index * SPREAD_PX]);

  return (
    <motion.div
      style={scrubbing ? { x: offset } : undefined}
      className="lg:shrink-0 lg:snap-start"
    >
      <CapabilityCard
        capability={capability}
        onEnquiryOpen={onEnquiryOpen}
        priority={index === 0}
      />
    </motion.div>
  );
}
