"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { IMAGES } from "@/lib/images";
import { CREDENTIALS } from "@/lib/content/stats";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The image drifts up slower than the page; the copy leaves a little faster.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, reduce ? 1 : 0]);

  const hero = IMAGES["hero-dusk"];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* Backdrop */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <Image
          src={hero.src}
          alt="A contemporary Dubai villa at dusk, its interiors lit behind deep-set glazing"
          fill
          priority
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={hero.blurDataURL}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Legibility scrims — vertical for the copy, edge vignette for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_15%,transparent_35%,rgba(12,15,16,0.6)_100%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0" />

      {/* Copy */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 container-wide pb-[clamp(3rem,2rem+6vw,7rem)]"
      >
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="label flex items-center gap-3 text-brass-light"
        >
          <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
          Design &amp; Build · Dubai, UAE
        </motion.p>

        <h1 className="mt-8">
          <AnimatedText
            text="Houses are built."
            immediate
            delay={0.35}
            className="display block text-hero text-alabaster"
          />
          <AnimatedText
            text="Homes are *wrought*."
            immediate
            delay={0.72}
            className="display block text-hero text-alabaster"
            accentClassName="italic text-brass-light"
          />
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[46ch] text-lead leading-[1.65] text-alabaster/70"
          >
            <span className="text-alabaster">wright</span>{" "}
            <span className="text-alabaster/55">
              — Old English <em>wyrhta</em>, one who makes by hand.
            </span>{" "}
            We draw your villa completely, then build it ourselves. One team,
            one contract, from first sketch to the day you get the keys.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/contact" variant="light" size="lg" arrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="/projects" variant="ghostLight" size="lg">
              View our work
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Credentials rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative z-10 border-t border-alabaster/12 py-4"
      >
        <Marquee duration={55}>
          {CREDENTIALS.map((item) => (
            <span
              key={item}
              className="label flex items-center gap-10 px-5 text-alabaster/55"
            >
              {item}
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass/60" />
            </span>
          ))}
        </Marquee>
        {/* Announced once for assistive tech, since the marquee is aria-hidden */}
        <p className="sr-only">
          Credentials: {CREDENTIALS.join(". ")}.
        </p>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#manifesto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        className="absolute top-1/2 right-[max(1.25rem,var(--spacing-gutter))] z-10 hidden -translate-y-1/2 rotate-90 items-center gap-4 lg:flex"
      >
        <span className="label text-alabaster/50">Scroll</span>
        <span aria-hidden="true" className="relative block h-px w-14 bg-alabaster/25">
          <motion.span
            className="absolute inset-y-0 left-0 block w-5 bg-brass-light"
            animate={reduce ? {} : { x: [0, 36, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
