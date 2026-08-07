"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { StaticImage } from "@/components/ui/ParallaxImage";
import {
  PROJECTS,
  PROJECT_AREAS,
  PROJECT_CATEGORIES,
  type Project,
} from "@/lib/content/projects";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, pad } from "@/lib/utils";

type Filter =
  | { type: "all" }
  | { type: "category"; value: string }
  | { type: "area"; value: string };

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden">
          <StaticImage
            image={project.cover}
            alt=""
            className="aspect-[4/3] w-full"
            imageClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/15"
          />
          <span className="label absolute top-4 left-4 bg-alabaster/90 px-3 py-2 text-ink backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="mt-6 flex items-start gap-4">
          <span className="label pt-1.5 text-brass-deep tabular-nums">
            {pad(index + 1)}
          </span>
          <div className="min-w-0">
            <h3 className="display text-[clamp(1.4rem,1.1rem+1vw,1.9rem)] leading-tight text-ink transition-colors duration-500 group-hover:text-brass-deep">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              {project.strapline}
            </p>
            <p className="label mt-4 text-ash">
              {project.area} · {project.year}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

/**
 * Reads `?area=` on the client so /projects can still be prerendered as static
 * HTML. Must be rendered inside a Suspense boundary (see the page).
 */
export function ProjectGrid() {
  const reduce = usePrefersReducedMotion();
  const searchParams = useSearchParams();
  const initialArea = searchParams.get("area") ?? undefined;

  const [filter, setFilter] = useState<Filter>(
    initialArea && PROJECT_AREAS.includes(initialArea)
      ? { type: "area", value: initialArea }
      : { type: "all" }
  );

  const filtered = useMemo(() => {
    if (filter.type === "all") return PROJECTS;
    if (filter.type === "category")
      return PROJECTS.filter((p) => p.category === filter.value);
    return PROJECTS.filter((p) => p.area === filter.value);
  }, [filter]);

  const isActive = (candidate: Filter) =>
    filter.type === candidate.type &&
    (filter.type === "all" ||
      ("value" in filter &&
        "value" in candidate &&
        filter.value === candidate.value));

  const chip = (label: string, candidate: Filter, key: string) => (
    <button
      key={key}
      type="button"
      onClick={() => setFilter(candidate)}
      aria-pressed={isActive(candidate)}
      className={cn(
        "rounded-xs border px-4 py-2.5 text-[0.7rem] font-medium tracking-[0.12em] uppercase transition-all duration-400",
        isActive(candidate)
          ? "border-ink bg-ink text-alabaster"
          : "border-ink/20 text-slate hover:border-ink/50 hover:text-ink"
      )}
    >
      {label}
    </button>
  );

  return (
    <div>
      {/* Filters */}
      <div className="space-y-5">
        <div>
          <h2 className="label text-ash">By type</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {chip(`All (${PROJECTS.length})`, { type: "all" }, "all")}
            {PROJECT_CATEGORIES.map((category) => {
              const count = PROJECTS.filter((p) => p.category === category).length;
              if (!count) return null;
              return chip(
                `${category} (${count})`,
                { type: "category", value: category },
                category
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="label text-ash">By community</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {PROJECT_AREAS.map((area) =>
              chip(area, { type: "area", value: area }, area)
            )}
          </div>
        </div>
      </div>

      {/* Result count, announced for screen readers */}
      <p aria-live="polite" className="label mt-10 text-ash">
        Showing {filtered.length} of {PROJECTS.length} projects
      </p>

      {/* Grid */}
      <motion.div
        layout={!reduce}
        className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                duration: reduce ? 0.15 : 0.55,
                delay: reduce ? 0 : Math.min(i * 0.05, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-lead text-slate">
          Nothing in that combination yet — try another filter, or{" "}
          <Link href="/contact" className="link-underline text-ink">
            ask us directly
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
