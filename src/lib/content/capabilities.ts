import type { ImageKey } from "@/lib/images";

/**
 * The four in-house disciplines shown in the Capabilities showcase.
 *
 * Deliberately not a second copy of the services menu — this is the work that
 * happens *behind* a project, ordered the way a house actually comes into
 * being: measure, draw, model, make.
 */

export type BlueprintVariant = "plan" | "elevation" | "isometric" | "detail";

export type Capability = {
  id: string;
  /** Two-digit index shown on the card and in the progress rail. */
  index: string;
  title: string;
  /** Short line under the title on the card face. */
  discipline: string;
  body: string;
  /** Right-hand metadata on the card, e.g. the stage it belongs to. */
  meta: string;
  image: ImageKey;
  /** Which authored drafting overlay the card renders. */
  blueprint: BlueprintVariant;
  /** Where "Explore" goes. Omitted for teaser cards. */
  href?: string;
  /** Renders as a locked capability with a lead-capture dialog instead. */
  enquiry?: boolean;
  /** Three short proof points revealed behind the blueprint layer. */
  points: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: "survey",
    index: "01",
    title: "Measured Survey",
    discipline: "Structural & services analysis",
    body: "Three weeks of laser measurement, CCTV drainage tracing and deliberate opening-up works — carried out before anyone is willing to quote a number.",
    meta: "Weeks 1 — 3",
    image: "craft-site",
    blueprint: "plan",
    href: "/process",
    points: [
      "Point-cloud model of the existing structure",
      "Drainage traced and camera-surveyed",
      "Costed risk register, issued in writing",
    ],
  },
  {
    id: "drawing",
    index: "02",
    title: "Architectural Drawing",
    discipline: "Interior architecture & detailing",
    body: "Every junction, socket, shadow gap and drainage fall resolved on paper — at the stage where changing your mind still costs an email rather than a wall.",
    meta: "Weeks 4 — 12",
    image: "ext-facade-detail",
    blueprint: "elevation",
    href: "/services/interior-architecture",
    points: [
      "Full technical package, authority-ready",
      "Lighting circuits designed, not assumed",
      "Physical material boards before sign-off",
    ],
  },
  {
    id: "bim",
    index: "03",
    title: "Parametric BIM",
    discipline: "Digital twin & structural modelling",
    body: "A live model of your house — structure, services and joinery — handed over with the keys, so the next alteration begins from fact rather than from guesswork.",
    meta: "Opening 2027",
    image: "abs-geometry",
    blueprint: "isometric",
    enquiry: true,
    points: [
      "Clash detection before anything is cut",
      "As-built model maintained to handover",
      "Yours to keep, in an open format",
    ],
  },
  {
    id: "joinery",
    index: "04",
    title: "Joinery & Making",
    discipline: "Al Quoz workshop",
    body: "Critical junctions drawn at full size and dry-assembled on the workshop floor before a single piece is delivered to site. It is the largest reason our finishes hold up.",
    meta: "In-house",
    image: "int-kitchen-modern",
    blueprint: "detail",
    href: "/services/interior-architecture",
    points: [
      "Drawn at 1:1, dry-assembled, then delivered",
      "Stone reserved by the block, not the name",
      "Fitted by our own teams, never sub-let",
    ],
  },
];

export const CAPABILITIES_HEADING = {
  eyebrow: "In the studio",
  title: "Every house exists twice — once in *drawing*, once in stone.",
  lead: "Four disciplines, all of them under our own roof. Move between the drawing and the built result on any card below.",
} as const;
