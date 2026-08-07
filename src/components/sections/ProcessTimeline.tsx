"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { StaticImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS } from "@/lib/content/process";
import { pad } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Full seven-stage timeline. A spine runs down the left and fills as the
 * section scrolls, so progress through the process is legible at a glance.
 */
export function ProcessTimeline() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 85%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative">
      {/* Spine */}
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-ink/12 sm:left-[0.5625rem]"
      >
        <motion.div
          style={{ scaleY: reduce ? 1 : scaleY }}
          className="h-full w-full origin-top bg-brass"
        />
      </div>

      <ol className="space-y-[clamp(3rem,2rem+4vw,6rem)]">
        {PROCESS.map((stage) => (
          <li key={stage.number} className="relative pl-10 sm:pl-16">
            {/* Node */}
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 flex h-[0.9375rem] w-[0.9375rem] items-center justify-center rounded-full border border-ink/20 bg-stone sm:h-[1.1875rem] sm:w-[1.1875rem]"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-brass" />
            </span>

            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-14">
                <div className="max-w-[62ch]">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <span className="label text-brass-deep tabular-nums">
                      Stage {pad(stage.number)}
                    </span>
                    <span className="label text-ash">{stage.duration}</span>
                  </div>

                  <h3 className="display mt-4 text-[clamp(1.75rem,1.3rem+2vw,3rem)] leading-tight text-ink">
                    {stage.title}
                  </h3>

                  <p className="mt-5 text-lead leading-[1.65] text-ink/75">
                    {stage.summary}
                  </p>

                  <p className="mt-5 leading-[1.75] text-slate">{stage.detail}</p>

                  <div className="mt-8">
                    <p className="label text-ash">You receive</p>
                    <ul className="mt-4 space-y-2.5">
                      {stage.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3.5 text-[0.95rem] leading-relaxed text-slate"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.6em] h-px w-3.5 shrink-0 bg-brass"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <StaticImage
                  image={stage.image}
                  alt=""
                  className="aspect-[4/3] w-full lg:aspect-[3/4] lg:w-[16rem] xl:w-[20rem]"
                  sizes="(max-width: 1024px) 100vw, 20rem"
                  quality={75}
                />
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Condensed seven-across version used on the home page. */
export function ProcessPreview() {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {PROCESS.map((stage, i) => (
        <li key={stage.number}>
          <Reveal delay={i * 0.05}>
            <div className="border-t border-alabaster/15 pt-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="label text-brass-light tabular-nums">
                  {pad(stage.number)}
                </span>
                <span className="label text-alabaster/55">{stage.duration}</span>
              </div>
              <h3 className="display mt-5 text-[1.6rem] leading-tight text-alabaster">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-alabaster/50">
                {stage.summary}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
