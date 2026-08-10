"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGES, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

export type VideoKey = "hero-office" | "sterling-dip" | "perfume-wall";

type Props = {
  video: VideoKey;
  /**
   * Described for assistive tech. The video is decorative wallpaper, so this is
   * only used when a still fallback is shown in its place.
   */
  alt: string;
  /** Still shown instead of the encoded poster, e.g. to reuse a registry image. */
  fallbackImage?: ImageKey;
  className?: string;
  /** Object-position for the frame, e.g. "center" or "50% 30%". */
  position?: string;
  priority?: boolean;
};

/**
 * Decorative full-bleed video wallpaper.
 *
 * Three things it has to survive, in order of likelihood:
 *
 *  1. Autoplay refusal. Every browser blocks it in some state (Low Power Mode,
 *     data saver, a hostile extension). A poster still sits underneath at all
 *     times and is only crossfaded away once the video is actually playing, so
 *     a refusal degrades to a static image rather than a black box.
 *  2. Reduced motion. A silent 20-second loop is exactly the "moving content"
 *     WCAG 2.2.2 is about, so when the user has asked for less of it we never
 *     attach a source — no download, no motion, just the still.
 *  3. Cost. `preload="none"` plus a lazy src means the bytes are only fetched
 *     when the element is close to the viewport, and never on a data-saver
 *     connection where the browser would refuse to play it anyway.
 */
export function BackgroundVideo({
  video,
  alt,
  fallbackImage,
  className,
  position = "center",
  priority = false,
}: Props) {
  const reduce = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Above-the-fold video skips the observer entirely and loads on first paint.
  const [allowed, setAllowed] = useState(priority);

  const poster = `/media/${video}-poster.jpg`;
  const still = fallbackImage ? IMAGES[fallbackImage] : null;

  // Hold the sources back until the element is near the viewport. Below the
  // fold this saves the whole download; in the hero it resolves immediately.
  useEffect(() => {
    if (reduce || priority) return;
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAllowed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, reduce]);

  // load() is required after swapping <source> children in, then play() is
  // attempted explicitly: the `autoplay` attribute alone is unreliable when the
  // sources arrive after first paint.
  useEffect(() => {
    if (!allowed) return;
    const el = videoRef.current;
    if (!el) return;
    el.load();
    const attempt = el.play();
    if (attempt) attempt.catch(() => setPlaying(false));
  }, [allowed]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-ink", className)}>
      {/* Always-present still. Also the poster if the video never plays. */}
      {still ? (
        <Image
          src={still.src}
          alt={alt}
          fill
          priority={priority}
          quality={80}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={still.blurDataURL}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={alt}
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      )}

      {!reduce ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            playing ? "opacity-100" : "opacity-0"
          )}
          style={{ objectPosition: position }}
        >
          {allowed ? (
            <>
              <source
                src={`/media/${video}-1080.mp4`}
                type="video/mp4"
                media="(min-width: 768px)"
              />
              <source src={`/media/${video}-720.mp4`} type="video/mp4" />
            </>
          ) : null}
        </video>
      ) : null}
    </div>
  );
}
