"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/content/testimonials";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const AUTOPLAY_MS = 7500;

function Stars({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "flex gap-1",
        tone === "light" ? "text-brass-light" : "text-brass"
      )}
      aria-label="Rated 5 out of 5"
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function TestimonialsCarousel({
  tone = "dark",
}: {
  /** "dark" places the carousel on an ink surface. */
  tone?: "dark" | "light";
}) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const regionRef = useRef<HTMLDivElement>(null);

  const count = TESTIMONIALS.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useEffect(() => {
    // count === 0 would make the modulo in go() produce NaN.
    if (paused || reduce || count === 0) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduce, next, count]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const item = TESTIMONIALS[index];
  const onInk = tone === "dark";


  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir * 48,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir * -48,
    }),
  };

  return (
    <div
      ref={regionRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative"
    >
      <div className="min-h-[24rem] sm:min-h-[22rem]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.figure
            key={item.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            /* Announce the change without stealing focus. */
            aria-live="polite"
            aria-atomic="true"
          >
            <Stars tone={onInk ? "light" : "dark"} />

            <blockquote
              className={cn(
                "display mt-8 text-[clamp(1.35rem,1.05rem+1.6vw,2.35rem)] leading-[1.35]",
                onInk ? "text-alabaster" : "text-ink"
              )}
            >
              <span aria-hidden="true" className="text-brass">
                &ldquo;
              </span>
              {item.quote}
              <span aria-hidden="true" className="text-brass">
                &rdquo;
              </span>
            </blockquote>

            <figcaption className="mt-9 flex flex-wrap items-center gap-5">
              <span
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-xs font-medium tracking-widest",
                  onInk
                    ? "border-alabaster/25 text-alabaster/80"
                    : "border-ink/20 text-slate"
                )}
                aria-hidden="true"
              >
                {item.initials}
              </span>
              <span>
                <span
                  className={cn(
                    "block text-base font-medium",
                    onInk ? "text-alabaster" : "text-ink"
                  )}
                >
                  {item.name}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block text-sm",
                    onInk ? "text-alabaster/55" : "text-ash"
                  )}
                >
                  {item.role} · {item.location}
                  {item.project ? (
                    <>
                      {" — "}
                      {item.projectSlug ? (
                        <Link
                          href={`/projects/${item.projectSlug}`}
                          className={cn(
                            "link-underline",
                            onInk ? "text-brass-light" : "text-brass-deep"
                          )}
                        >
                          {item.project}
                        </Link>
                      ) : (
                        item.project
                      )}
                    </>
                  ) : null}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div
        className={cn(
          "mt-10 flex items-center justify-between gap-6 border-t pt-7",
          onInk ? "border-alabaster/15" : "border-ink/12"
        )}
      >
        <div className="flex items-center gap-3">
          {[
            { label: "Previous testimonial", action: prev, path: "M19 12H5M11 18l-6-6 6-6" },
            { label: "Next testimonial", action: next, path: "M5 12h14M13 6l6 6-6 6" },
          ].map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-400",
                onInk
                  ? "border-alabaster/25 text-alabaster hover:border-brass hover:bg-brass hover:text-alabaster"
                  : "border-ink/20 text-ink hover:border-brass hover:bg-brass hover:text-alabaster"
              )}
            >
              <span className="sr-only">{btn.label}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="h-5 w-5"
              >
                <path d={btn.path} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}

          <span
            className={cn(
              "label ml-3 tabular-nums",
              onInk ? "text-alabaster/55" : "text-ash"
            )}
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* Dots */}
        <div className="flex flex-wrap items-center justify-end gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Show testimonial ${i + 1} of ${count}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                i === index ? "w-8 bg-brass" : "w-1.5",
                i !== index && (onInk ? "bg-alabaster/25 hover:bg-alabaster/50" : "bg-ink/20 hover:bg-ink/40")
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
