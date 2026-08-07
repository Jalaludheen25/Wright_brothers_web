"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { IMAGES } from "@/lib/images";
import { SERVICES } from "@/lib/content/services";
import { cn, pad } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Services as an index list. On a fine pointer, hovering a row floats that
 * service's photograph alongside the cursor; on touch, each row carries its
 * own thumbnail instead so nothing is lost.
 */
export function ServicesIndex() {
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduce) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const activeService = SERVICES.find((s) => s.slug === hovered);

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      onPointerLeave={() => setHovered(null)}
      className="relative"
    >
      <ul className="border-t border-ink/12">
        {SERVICES.map((service) => (
          <li key={service.slug} className="border-b border-ink/12">
            <Link
              href={`/services/${service.slug}`}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHovered(service.slug);
              }}
              onFocus={() => setHovered(service.slug)}
              onBlur={() => setHovered(null)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 py-7 transition-colors duration-500 sm:gap-x-10 sm:py-9"
            >
              <span className="label self-start pt-2 text-brass-deep tabular-nums sm:self-center">
                {pad(service.index)}
              </span>

              <span className="min-w-0">
                <span className="flex items-baseline gap-4">
                  <span className="display block text-[clamp(1.5rem,1.1rem+2.2vw,3rem)] leading-[1.15] text-ink transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-brass">
                    {service.title}
                  </span>
                </span>
                <span className="mt-2 block max-w-[54ch] text-sm leading-relaxed text-slate transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 sm:text-[0.95rem]">
                  {service.summary}
                </span>

                {/* Touch-only thumbnail */}
                <span className="relative mt-5 block aspect-[16/9] w-full overflow-hidden md:hidden">
                  <Image
                    src={IMAGES[service.image].src}
                    alt=""
                    fill
                    sizes="100vw"
                    quality={75}
                    placeholder="blur"
                    blurDataURL={IMAGES[service.image].blurDataURL}
                    className="object-cover"
                  />
                </span>
              </span>

              <span className="flex items-center gap-6 self-start pt-1 sm:self-center sm:pt-0">
                <span className="label hidden text-ash lg:block">
                  {service.duration}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  className="h-5 w-5 shrink-0 text-slate transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-brass"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview */}
      {!reduce ? (
        <motion.div
          aria-hidden="true"
          style={{ x: springX, y: springY }}
          className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block"
        >
          <AnimatePresence>
            {activeService ? (
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative -translate-x-1/2 -translate-y-1/2",
                  "h-[16rem] w-[13rem] overflow-hidden shadow-[0_30px_70px_-25px_rgba(12,15,16,0.6)] lg:h-[20rem] lg:w-[16rem]"
                )}
              >
                <Image
                  src={IMAGES[activeService.image].src}
                  alt=""
                  fill
                  sizes="16rem"
                  quality={70}
                  placeholder="blur"
                  blurDataURL={IMAGES[activeService.image].blurDataURL}
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4">
                  <span className="label text-alabaster/85">
                    {activeService.from}
                  </span>
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
