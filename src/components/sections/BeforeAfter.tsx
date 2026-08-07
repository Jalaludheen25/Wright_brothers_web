"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";
import { IMAGES } from "@/lib/images";
import { BEFORE_AFTER } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Draggable before/after comparison.
 *
 * The handle is a real ARIA slider: focusable, arrow-key operable, and it
 * reports its position — so the comparison is usable without a pointer.
 */
function Compare({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: keyof typeof IMAGES;
  after: keyof typeof IMAGES;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(event.clientX);
  };

  const stop = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    const map: Record<string, number> = {
      ArrowLeft: -step,
      ArrowRight: step,
      ArrowDown: -step,
      ArrowUp: step,
    };
    if (event.key in map) {
      event.preventDefault();
      setPosition((p) => clamp(p + map[event.key]));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      className={cn(
        "relative aspect-[4/3] w-full touch-none overflow-hidden select-none sm:aspect-[16/10]",
        dragging ? "cursor-grabbing" : "cursor-grab"
      )}
    >
      {/* After (base layer) */}
      <Image
        src={IMAGES[after].src}
        alt={afterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        quality={80}
        placeholder="blur"
        blurDataURL={IMAGES[after].blurDataURL}
        className="object-cover"
        draggable={false}
      />

      {/* Before (clipped to the left of the handle) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={IMAGES[before].src}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          quality={80}
          placeholder="blur"
          blurDataURL={IMAGES[before].blurDataURL}
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Corner labels */}
      <span
        className={cn(
          "label absolute top-4 left-4 bg-ink/70 px-3 py-2 text-alabaster backdrop-blur-sm transition-opacity duration-300",
          position < 12 ? "opacity-0" : "opacity-100"
        )}
      >
        Before
      </span>
      <span
        className={cn(
          "label absolute top-4 right-4 bg-brass/90 px-3 py-2 text-alabaster backdrop-blur-sm transition-opacity duration-300",
          position > 88 ? "opacity-0" : "opacity-100"
        )}
      >
        After
      </span>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-alabaster/90"
        style={{ left: `${position}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal the before and after states"
          aria-labelledby={labelId}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-alabaster text-ink shadow-[0_8px_30px_-8px_rgba(12,15,16,0.6)] transition-transform duration-300 hover:scale-105 focus-visible:scale-105"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-5 w-5"
          >
            <path d="M9 6 4 12l5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <span id={labelId} className="sr-only">
        Comparison slider. Left of the handle shows the property before the
        works; right of the handle shows it after completion.
      </span>
    </div>
  );
}

export function BeforeAfterSection() {
  const [index, setIndex] = useState(0);
  const item = BEFORE_AFTER[index];


  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
      <Compare
        key={item.id}
        before={item.before}
        after={item.after}
        beforeAlt={`${item.project}: the ${item.label.toLowerCase()} before the works`}
        afterAlt={`${item.project}: the ${item.label.toLowerCase()} on completion`}
      />

      <div className="flex flex-col justify-center">
        <p className="label text-brass-deep">
          {String(index + 1).padStart(2, "0")} / {String(BEFORE_AFTER.length).padStart(2, "0")}
        </p>

        <h3 className="display mt-5 text-h3 text-ink">
          {item.project}
          <span className="block text-slate">{item.label}</span>
        </h3>

        <p className="mt-6 max-w-[46ch] leading-relaxed text-slate">
          {item.note}
        </p>

        <Link
          href={`/projects/${item.projectSlug}`}
          className="link-underline label mt-8 self-start text-ink"
        >
          View the full case study
        </Link>

        {/* Selector */}
        <div
          role="tablist"
          aria-label="Choose a before and after comparison"
          className="mt-12 flex flex-col gap-px border-t border-ink/12"
        >
          {BEFORE_AFTER.map((entry, i) => (
            <button
              key={entry.id}
              role="tab"
              type="button"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "group flex items-center justify-between gap-4 border-b border-ink/12 py-4 text-left transition-colors duration-400",
                i === index ? "text-brass-deep" : "text-slate hover:text-ink"
              )}
            >
              <span className="text-sm font-medium">
                {entry.project} — {entry.label}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "h-px w-8 shrink-0 origin-right bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  i === index ? "scale-x-100" : "scale-x-40 group-hover:scale-x-100"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
