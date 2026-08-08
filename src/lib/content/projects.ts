import type { ImageKey } from "@/lib/images";

/**
 * PROJECTS is real, client-supplied work: three completed jobs, photographed by
 * Wright Brothers. Titles, clients, locations and the 10-ton figure came from
 * the client. The narrative copy is written from those facts and from what is
 * visible in the photographs — it contains no dates, areas, values or outcome
 * figures, and no client quotes, because none were supplied. `scope` lists are
 * inferred from the photographs and should be confirmed before publishing.
 *
 * BEFORE_AFTER at the foot of this file is still DEMONSTRATION CONTENT.
 * See README ("This is demonstration content").
 */

export const PROJECT_CATEGORIES = [
  "Workspace Fit-Out",
  "Glass & Aluminium",
  "MEP Installation",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;
  title: string;
  area: string;
  category: ProjectCategory;
  /**
   * Completion year. Optional: the supplied photographs carry no capture date,
   * so the three current projects omit it rather than claim one. Where it is
   * absent the separator that follows it collapses.
   */
  year?: number;
  /** Short line used on cards and in the index list. */
  strapline: string;
  cover: ImageKey;
  gallery: ImageKey[];
  /** Long-form case study copy. */
  brief: string;
  approach: string;
  outcome: string;
  facts: { label: string; value: string }[];
  scope: string[];
  /** Optional pull quote from the owners. */
  quote?: { text: string; attribution: string };
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "contemporary-open-plan-workspace",
    title: "Contemporary Open-Plan Workspace",
    area: "Dubai",
    category: "Workspace Fit-Out",
    strapline:
      "Suspended linear lighting, high-level skylights and planting worked into an open floor plate",
    cover: "wb-workspace-open-plan",
    gallery: [
      "wb-workspace-planting",
      "wb-workspace-partitions",
      "wb-workspace-skylights",
      "wb-workspace-lounge",
    ],
    brief:
      "An open floor plate to be fitted out as a single working environment rather than a run of closed offices — one volume holding desking, meeting rooms and break-out seating, with daylight carried to the middle of the plan rather than stopping at the perimeter.",
    approach:
      "The ceiling was planned around two services at once: a grid of suspended linear luminaires set out on the working axis, and high-level skylights bringing daylight down between them. Where rooms were needed they were formed in glazed partitions rather than solid walls, so the sightlines across the floor survive the enclosure. Planting was built into the layout instead of added at handover — the beds sit within the circulation and screen one working zone from the next, which is what allows the desking to stay open. Workstations and soft seating are loose-furnished, so the floor can be reconfigured without touching the fit-out.",
    outcome:
      "A single continuous workspace, daylit through the roof along its full length, in which collaborative and quiet settings are distinguished by planting and glazing rather than by partition walls.",
    facts: [
      { label: "Type", value: "Open-plan workspace" },
      { label: "Lighting", value: "Suspended linear" },
      { label: "Daylight", value: "High-level skylights" },
      { label: "Planting", value: "Integrated indoor" },
    ],
    scope: [
      "Gypsum ceilings & partitions",
      "Glazed partitions",
      "Electrical & lighting installation",
      "Tile & flooring works",
      "Painting & finishes",
      "Indoor landscaping",
    ],
    featured: true,
  },
  {
    slug: "sterling-perfumes-head-office-dip",
    title: "Sterling Perfumes Head Office — DIP",
    area: "Dubai Investment Park",
    category: "Glass & Aluminium",
    strapline:
      "Glasswork and aluminium partitions to a head office in Dubai Investment Park",
    cover: "wb-dip-corridor",
    gallery: ["wb-dip-partitions", "wb-dip-glazing"],
    brief:
      "Glasswork and aluminium partition works at the Sterling Perfumes head office in Dubai Investment Park — enclosing meeting and office space along the circulation spine without darkening the floor behind it.",
    approach:
      "Aluminium framing was set out to the office grid and glazed in a mix of clear and frosted panels, with banded manifestation at eye level so each run reads as enclosure while still passing light. The curved screen to the meeting room was set out to its radius on site and glazed to follow it. Glazed doors, ironmongery and floor springs were installed as part of the same package, so the framing, the leaves and the closing gear were set by one team rather than three.",
    outcome:
      "Meeting and office space enclosed along the spine of the floor, with daylight from the perimeter still reaching the centre of the plan.",
    facts: [
      { label: "Client", value: "Sterling Perfumes" },
      { label: "Location", value: "Dubai Investment Park" },
      { label: "Type", value: "Head office" },
      { label: "Scope", value: "Glass & aluminium" },
    ],
    scope: [
      "Aluminium partition framing",
      "Clear & frosted glazing",
      "Curved glazed screen",
      "Glazed doors & ironmongery",
      "Manifestation",
      "Making good & handover",
    ],
    featured: true,
  },
  {
    slug: "mep-works-sterling-perfumes-armaf",
    title: "MEP Works — Sterling Perfumes, Armaf",
    area: "Dubai",
    category: "MEP Installation",
    strapline:
      "MEP works including the installation of a 10-ton air-conditioning outdoor unit",
    cover: "wb-mep-condensers",
    gallery: ["wb-mep-platform", "wb-mep-ductwork", "wb-mep-distribution", "wb-mep-panel"],
    brief:
      "MEP works for Sterling Perfumes — Armaf, including the installation of a 10-ton air-conditioning outdoor unit and the electrical distribution serving it.",
    approach:
      "The condensers sit on a fabricated steel platform lifted clear of the yard, which keeps plant off a working surface and leaves airflow around each unit. The platform was set out and erected first; the 10-ton unit was then lifted and positioned onto it, and refrigerant and condensate lines run back to the building in insulated pipework. Distribution boards were built out and terminated alongside, with circuits labelled at the board and isolators fitted local to the plant they serve.",
    outcome:
      "Cooling plant grouped on one accessible platform with clear working space around it, and distribution boards laid out so any circuit can be identified and isolated without tracing it back by hand.",
    facts: [
      { label: "Client", value: "Sterling Perfumes — Armaf" },
      { label: "Cooling", value: "10-ton outdoor unit" },
      { label: "Plant", value: "Steel support platform" },
      { label: "Scope", value: "MEP installation" },
    ],
    scope: [
      "AC outdoor unit installation",
      "Steel support platform",
      "Refrigerant & condensate pipework",
      "Electrical distribution boards",
      "Containment & cabling",
      "Circuit labelling & local isolation",
    ],
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function adjacentProjects(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  };
}

export const PROJECT_AREAS = Array.from(new Set(PROJECTS.map((p) => p.area))).sort();

/** Before / after pairs shown on the home page and the projects index. */
export type BeforeAfter = {
  id: string;
  label: string;
  project: string;
  /**
   * Slug of the case study this pair belongs to. Optional: the pairs below are
   * demonstration content with no project page behind them, so the link falls
   * back to the projects index rather than a dead URL.
   */
  projectSlug?: string;
  before: ImageKey;
  after: ImageKey;
  note: string;
};

/**
 * DEMONSTRATION CONTENT — stock photography and invented project names, kept in
 * place deliberately while real before/after pairs are gathered. Nothing here
 * describes work Wright Brothers carried out.
 */
export const BEFORE_AFTER: BeforeAfter[] = [
  {
    id: "nakheel-bath",
    label: "Principal Bathroom",
    project: "Nakheel Villa",
    before: "ba-bath-before",
    after: "int-bath-luxe",
    note: "The original suite was tanked, re-fallen and rebuilt from the slab up — the visible change is the smaller half of the work.",
  },
  {
    id: "meridian-kitchen",
    label: "Kitchen",
    project: "Meridian Townhouse",
    before: "ba-kitchen-before",
    after: "int-kitchen-modern",
    note: "One wall removed, services re-routed, and a single wall-to-wall joinery run in place of eleven separate units.",
  },
  {
    id: "ghaf-living",
    label: "Living Room",
    project: "Ghaf House",
    before: "craft-strip-out",
    after: "int-living-warm",
    note: "Photographed at strip-out and again at handover, from the same position, eleven months apart.",
  },
];
