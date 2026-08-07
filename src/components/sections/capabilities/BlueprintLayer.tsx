"use client";

import { motion } from "motion/react";
import { useId } from "react";
import type { BlueprintVariant } from "@/lib/content/capabilities";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Authored drafting overlays — a real plan, elevation, axonometric and section
 * detail, drawn as SVG rather than filtered photography.
 *
 * Each variant animates its linework in with `pathLength` when the card is in
 * its drawing state, which is the whole "drawn, then built" idea made literal.
 * Both animated properties (pathLength, opacity) are composite-only.
 */

const STROKE = 1.1;
const VIEWBOX = "0 0 400 520";

type Props = {
  variant: BlueprintVariant;
  /** True while the card is showing its drawing rather than the photograph. */
  active: boolean;
  className?: string;
};

/** Draw-in transition; index staggers the strokes like a pen working down. */
function draw(i: number, reduce: boolean) {
  return {
    pathLength: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : i * 0.045, ease: [0.16, 1, 0.3, 1] as const },
    opacity: { duration: reduce ? 0.15 : 0.35, delay: reduce ? 0 : i * 0.045 },
  };
}

function Stroke({
  d,
  i,
  active,
  reduce,
  dashed = false,
  opacity = 1,
  width = STROKE,
}: {
  d: string;
  i: number;
  active: boolean;
  reduce: boolean;
  dashed?: boolean;
  opacity?: number;
  width?: number;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="square"
      vectorEffect="non-scaling-stroke"
      strokeDasharray={dashed ? "5 5" : undefined}
      initial={false}
      animate={{ pathLength: active ? 1 : 0, opacity: active ? opacity : 0 }}
      transition={draw(i, reduce)}
    />
  );
}

function Node({
  cx,
  cy,
  i,
  active,
  reduce,
}: {
  cx: number;
  cy: number;
  i: number;
  active: boolean;
  reduce: boolean;
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2.6}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      vectorEffect="non-scaling-stroke"
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      transition={{ duration: reduce ? 0.15 : 0.4, delay: reduce ? 0 : 0.3 + i * 0.05 }}
    />
  );
}

/* -------------------------------------------------------------------------- */

function PlanDrawing({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <>
      {/* Outer wall, drawn as a double line the way a plan is */}
      <Stroke d="M56 96 H344 V424 H56 Z" i={0} active={active} reduce={reduce} width={1.6} />
      <Stroke d="M66 106 H334 V414 H66 Z" i={1} active={active} reduce={reduce} opacity={0.55} />
      {/* Internal partitions */}
      <Stroke d="M66 250 H206" i={2} active={active} reduce={reduce} />
      <Stroke d="M206 106 V414" i={3} active={active} reduce={reduce} />
      <Stroke d="M206 330 H334" i={4} active={active} reduce={reduce} />
      {/* Door swing */}
      <Stroke d="M206 292 A38 38 0 0 1 168 254" i={5} active={active} reduce={reduce} opacity={0.7} dashed />
      <Stroke d="M206 292 V254" i={6} active={active} reduce={reduce} opacity={0.7} />
      {/* Glazing run */}
      <Stroke d="M96 414 H176" i={7} active={active} reduce={reduce} width={2.4} />
      {/* Dimension line */}
      <Stroke d="M56 462 H344" i={8} active={active} reduce={reduce} opacity={0.6} />
      <Stroke d="M56 454 V470" i={9} active={active} reduce={reduce} opacity={0.6} />
      <Stroke d="M344 454 V470" i={10} active={active} reduce={reduce} opacity={0.6} />
      <Stroke d="M206 456 V468" i={11} active={active} reduce={reduce} opacity={0.4} />
      {/* Grid ticks */}
      <Node cx={56} cy={96} i={0} active={active} reduce={reduce} />
      <Node cx={344} cy={96} i={1} active={active} reduce={reduce} />
      <Node cx={56} cy={424} i={2} active={active} reduce={reduce} />
      <Node cx={344} cy={424} i={3} active={active} reduce={reduce} />
    </>
  );
}

function ElevationDrawing({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <>
      {/* Ground line */}
      <Stroke d="M36 430 H364" i={0} active={active} reduce={reduce} width={1.8} />
      {/* Massing */}
      <Stroke d="M76 430 V150 H324 V430" i={1} active={active} reduce={reduce} width={1.6} />
      <Stroke d="M76 288 H324" i={2} active={active} reduce={reduce} opacity={0.6} />
      {/* Deep-set screen fins — a common Dubai façade device */}
      {[110, 140, 170, 200, 230, 260, 290].map((x, n) => (
        <Stroke
          key={x}
          d={`M${x} 170 V270`}
          i={3 + n}
          active={active}
          reduce={reduce}
          opacity={0.5}
        />
      ))}
      {/* Openings */}
      <Stroke d="M100 306 H176 V400 H100 Z" i={11} active={active} reduce={reduce} />
      <Stroke d="M224 306 H300 V400 H224 Z" i={12} active={active} reduce={reduce} />
      {/* Vertical dimension */}
      <Stroke d="M48 150 V430" i={13} active={active} reduce={reduce} opacity={0.6} />
      <Stroke d="M40 150 H56" i={14} active={active} reduce={reduce} opacity={0.6} />
      <Stroke d="M40 430 H56" i={15} active={active} reduce={reduce} opacity={0.6} />
      <Stroke d="M40 288 H52" i={16} active={active} reduce={reduce} opacity={0.4} />
      <Node cx={76} cy={150} i={0} active={active} reduce={reduce} />
      <Node cx={324} cy={150} i={1} active={active} reduce={reduce} />
    </>
  );
}

function IsometricDrawing({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <>
      {/* Axonometric volume */}
      <Stroke d="M200 128 L318 196 V332 L200 400 L82 332 V196 Z" i={0} active={active} reduce={reduce} width={1.6} />
      <Stroke d="M200 128 L200 264" i={1} active={active} reduce={reduce} opacity={0.75} />
      <Stroke d="M200 264 L318 196" i={2} active={active} reduce={reduce} opacity={0.75} />
      <Stroke d="M200 264 L82 196" i={3} active={active} reduce={reduce} opacity={0.75} />
      <Stroke d="M200 264 L200 400" i={4} active={active} reduce={reduce} opacity={0.45} dashed />
      {/* Slab lines — the parametric layer */}
      <Stroke d="M82 264 L200 332 L318 264" i={5} active={active} reduce={reduce} opacity={0.5} dashed />
      <Stroke d="M141 162 L259 230" i={6} active={active} reduce={reduce} opacity={0.35} dashed />
      {/* Axis indicator */}
      <Stroke d="M64 452 L104 430" i={7} active={active} reduce={reduce} opacity={0.7} />
      <Stroke d="M64 452 L24 430" i={8} active={active} reduce={reduce} opacity={0.7} />
      <Stroke d="M64 452 V408" i={9} active={active} reduce={reduce} opacity={0.7} />
      {/* Parametric nodes at every vertex */}
      {[
        [200, 128],
        [318, 196],
        [318, 332],
        [200, 400],
        [82, 332],
        [82, 196],
        [200, 264],
      ].map(([cx, cy], n) => (
        <Node key={`${cx}-${cy}`} cx={cx} cy={cy} i={n} active={active} reduce={reduce} />
      ))}
    </>
  );
}

function DetailDrawing({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <>
      {/* Layered build-up, as a section through a joinery run */}
      <Stroke d="M92 132 H308 V196 H92 Z" i={0} active={active} reduce={reduce} width={1.6} />
      <Stroke d="M92 208 H308 V244 H92 Z" i={1} active={active} reduce={reduce} />
      <Stroke d="M92 256 H308 V392 H92 Z" i={2} active={active} reduce={reduce} width={1.6} />
      {/* Hatching through the carcass */}
      {[268, 282, 296, 310, 324, 338, 352, 366, 380].map((y, n) => (
        <Stroke
          key={y}
          d={`M96 ${y} L${Math.min(304, 96 + (392 - y) * 1.4)} ${Math.max(260, y - (Math.min(304, 96 + (392 - y) * 1.4) - 96))}`}
          i={3 + n}
          active={active}
          reduce={reduce}
          opacity={0.28}
        />
      ))}
      {/* Shadow gap — the thing the drawing exists to control */}
      <Stroke d="M92 200 H308" i={12} active={active} reduce={reduce} width={2.6} />
      {/* Leader lines out to notes */}
      <Stroke d="M308 168 H352 V140" i={13} active={active} reduce={reduce} opacity={0.65} />
      <Stroke d="M308 204 H364" i={14} active={active} reduce={reduce} opacity={0.65} />
      <Stroke d="M92 320 H48 V352" i={15} active={active} reduce={reduce} opacity={0.65} />
      {/* Break line */}
      <Stroke d="M92 424 H176 l10 -10 l12 20 l10 -10 H308" i={16} active={active} reduce={reduce} opacity={0.5} />
      <Node cx={308} cy={204} i={0} active={active} reduce={reduce} />
      <Node cx={92} cy={320} i={1} active={active} reduce={reduce} />
      <Node cx={308} cy={168} i={2} active={active} reduce={reduce} />
    </>
  );
}

const DRAWINGS = {
  plan: PlanDrawing,
  elevation: ElevationDrawing,
  isometric: IsometricDrawing,
  detail: DetailDrawing,
} as const;

export function BlueprintLayer({ variant, active, className }: Props) {
  const reduce = usePrefersReducedMotion();
  const gridId = useId();
  const Drawing = DRAWINGS[variant];

  return (
    <motion.svg
      viewBox={VIEWBOX}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduce ? 0.15 : 0.45, ease: "easeOut" }}
    >
      <defs>
        <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M20 0 H0 V20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.16"
          />
        </pattern>
      </defs>

      {/* Drafting grid */}
      <motion.rect
        width="400"
        height="520"
        fill={`url(#${gridId})`}
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduce ? 0.15 : 0.5 }}
      />

      <Drawing active={active} reduce={reduce} />
    </motion.svg>
  );
}
