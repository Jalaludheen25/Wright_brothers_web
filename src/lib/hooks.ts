"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * useSyncExternalStore rather than useState + useEffect: the match state lives
 * outside React, so reading it this way avoids a setState-in-effect cascade and
 * gives a correct value on the very first client render.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    // Server snapshot: assume the query does not match, so nothing
    // motion-dependent renders into the HTML before hydration.
    () => false
  );
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number): boolean {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false
  );
}

/**
 * Hydration-safe replacement for motion's `useReducedMotion`.
 *
 * motion's version reads matchMedia during the first client render, so any
 * component that branches on it renders a different tree than the server did
 * and React throws a hydration mismatch. Because this is built on
 * useSyncExternalStore, React uses the server snapshot (false) for hydration
 * too — the trees match, then it re-renders with the real preference.
 *
 * `<MotionConfig reducedMotion="user">` in the root layout covers the single
 * frame in between, so reduced-motion users never see a transform animation.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
