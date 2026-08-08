"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IMAGES } from "@/lib/images";
import { FEATURED_PROJECTS } from "@/lib/content/projects";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, pad } from "@/lib/utils";

export function ProjectShowcase() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const project = FEATURED_PROJECTS[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      {/* Stage */}
      <div className="relative aspect-[4/5] overflow-hidden bg-graphite sm:aspect-[16/11] lg:aspect-[4/5]">
        <AnimatePresence mode="sync">
          <motion.div
            key={project.slug}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: reduce ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute inset-0"
          >
            <Image
              src={IMAGES[project.cover].src}
              alt={`${project.title} — ${project.strapline}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
              placeholder="blur"
              blurDataURL={IMAGES[project.cover].blurDataURL}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
        />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="label text-brass-light">
                {project.area}
                {project.year ? ` · ${project.year}` : ""}
              </p>
              <p className="display mt-3 text-h3 text-alabaster">
                {project.title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Index */}
      <div className="flex flex-col justify-center">
        <ul className="border-t border-ink/12">
          {FEATURED_PROJECTS.map((item, i) => {
            const isActive = i === active;
            return (
              <li key={item.slug} className="border-b border-ink/12">
                <Link
                  href={`/projects/${item.slug}`}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setActive(i);
                  }}
                  onFocus={() => setActive(i)}
                  aria-describedby={`showcase-meta-${item.slug}`}
                  className="group relative block py-6 sm:py-7"
                >
                  {/* Active indicator */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0 left-0 h-px bg-brass transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "w-full origin-left",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />

                  <div className="flex items-start gap-5 sm:gap-7">
                    <span
                      className={cn(
                        "label pt-2 tabular-nums transition-colors duration-500",
                        isActive ? "text-brass-deep" : "text-ash"
                      )}
                    >
                      {pad(i + 1)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={cn(
                          "display text-[clamp(1.4rem,1.1rem+1.5vw,2.25rem)] leading-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive
                            ? "translate-x-2 text-brass-deep"
                            : "translate-x-0 text-ink"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        id={`showcase-meta-${item.slug}`}
                        className="mt-1.5 text-sm text-slate"
                      >
                        {item.strapline}
                      </p>
                      <p className="label mt-3 text-ash">
                        {item.category} · {item.area}
                      </p>
                    </div>

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      className={cn(
                        "mt-2 h-5 w-5 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isActive
                          ? "translate-x-1 text-brass opacity-100"
                          : "text-slate opacity-40"
                      )}
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
