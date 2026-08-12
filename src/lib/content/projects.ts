import type { ImageKey } from "@/lib/images";
import type { VideoKey } from "@/components/ui/BackgroundVideo";

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

export type ProjectClip = {
  /** Path under /public. */
  src: string;
  poster: string;
  caption: string;
  /** 9:16 phone footage, which the grid frames differently. */
  portrait?: boolean;
};

/**
 * Site clips of the electrical works, shot on a phone. Already web-sized as
 * supplied (1.4–3.7 MB each), so they are served as delivered; only the poster
 * frames were generated. See scripts/encode-video.sh for the longer films.
 */
const MEP_CLIPS: ProjectClip[] = [
  {
    src: "/media/mep/mep-01.mp4",
    poster: "/media/mep/mep-01-poster.jpg",
    caption: "Contactor bank and control wiring across the rail",
  },
  {
    src: "/media/mep/mep-02.mp4",
    poster: "/media/mep/mep-02-poster.jpg",
    caption: "Breakers and terminal rail inside the board",
    portrait: true,
  },
  {
    src: "/media/mep/mep-03.mp4",
    poster: "/media/mep/mep-03-poster.jpg",
    caption: "Controller mounted in the enclosure",
    portrait: true,
  },
  {
    src: "/media/mep/mep-04.mp4",
    poster: "/media/mep/mep-04-poster.jpg",
    caption: "Incoming cabling landed at the isolator",
    portrait: true,
  },
  {
    src: "/media/mep/mep-05.mp4",
    poster: "/media/mep/mep-05-poster.jpg",
    caption: "Incomer to busbar and fuse carrier",
    portrait: true,
  },
  {
    src: "/media/mep/mep-06.mp4",
    poster: "/media/mep/mep-06-poster.jpg",
    caption: "The full board: breaker rows and terminal rails",
    portrait: true,
  },
  {
    src: "/media/mep/mep-07.mp4",
    poster: "/media/mep/mep-07-poster.jpg",
    caption: "Distribution board with isolator and breaker banks",
    portrait: true,
  },
];

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
  /** Optional walkthrough loop, shown as a band above the gallery. */
  video?: VideoKey;
  videoCaption?: string;
  /** Short site clips, shown as a poster grid that opens a player. */
  clips?: ProjectClip[];
  /** Marks demonstration content so it can be found and removed. */
  sample?: boolean;
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

const AUTHORED: Project[] = [
  {
    slug: "contemporary-open-plan-workspace",
    title: "Contemporary Open-Plan Workspace",
    area: "Dubai",
    category: "Workspace Fit-Out",
    strapline:
      "Suspended linear lighting, high-level skylights and planting worked into an open floor plate",
    cover: "wb-workspace-open-plan",
    gallery: [
      "wb-workspace-wide",
      "wb-workspace-cafe",
      "wb-workspace-seating",
      "wb-workspace-planting",
      "wb-workspace-skylights",
      "wb-workspace-bar",
      "wb-workspace-lounge-end",
      "wb-workspace-partitions",
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
    gallery: [
      "wb-dip-meeting-pod",
      "wb-dip-corridor-wide",
      "wb-dip-banded-glass",
      "wb-dip-slat-screen",
      "wb-dip-partition-run",
      "wb-dip-open-office",
      "wb-dip-partitions",
      "wb-dip-glazing",
    ],
    video: "sterling-dip",
    videoCaption: "A walk through the completed floor",
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
    // Every frame from the job. Electrical is a core trade, so this one is
    // shown in full rather than edited down to a representative handful.
    gallery: [
      "wb-mep-platform",
      "wb-mep-ductwork",
      "wb-mep-board-wide",
      "wb-mep-contactors",
      "wb-mep-board-orange",
      "wb-mep-board-contactor",
      "wb-mep-incomer-fuse",
      "wb-mep-incomer-busbar",
      "wb-mep-incomer-isolator",
      "wb-mep-isolators",
      "wb-mep-control-meters",
      "wb-mep-control-fascia",
      "wb-mep-board-rails",
      "wb-mep-terminals",
      "wb-mep-loom",
      "wb-mep-containment",
      "wb-mep-board-dense",
      "wb-mep-board-control",
      "wb-mep-board-large",
      "wb-mep-distribution",
      "wb-mep-enclosure-open",
      "wb-mep-fascia-rows",
      "wb-mep-fascia-groups",
      "wb-mep-fascia-labelled",
      "wb-mep-fascia-schedule",
      "wb-mep-panel",
      "wb-mep-fascia-blank",
      "wb-mep-panel-door",
    ],
    clips: MEP_CLIPS,
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

  /* ===================================================================== */
  /*  SAMPLE PROJECTS — DEMONSTRATION CONTENT, NOT REAL WORK.              */
  /*                                                                        */
  /*  Every entry below carries `sample: true`. The titles, locations and   */
  /*  copy are invented; the photographs are real Wright Brothers work      */
  /*  reused to fill the cards. Delete the four entries — or filter on      */
  /*  `sample` — when real case studies replace them. Nothing else in the   */
  /*  codebase needs changing.                                              */
  /* ===================================================================== */
  {
    slug: "sample-corporate-hq-fit-out",
    title: "Corporate HQ Fit-Out",
    area: "Dubai",
    category: "Workspace Fit-Out",
    sample: true,
    strapline: "Reception, boardroom and open floor delivered as one package",
    cover: "wb-office-reception",
    gallery: [
      "wb-office-boardroom",
      "wb-office-artwork-run",
      "wb-office-counter",
      "wb-office-open-desks",
    ],
    brief:
      "A head-office floor to be fitted out end to end: reception, meeting rooms, open desking and staff break-out, handed over as a single package.",
    approach:
      "Ceilings, partitions, power and lighting were set out together so the services grid and the partition grid agree. Reception joinery and the boardroom were built as feature elements; everything else was kept quiet so they read.",
    outcome:
      "One contract, one programme and one point of contact from strip-out to handover.",
    facts: [
      { label: "Type", value: "Head office" },
      { label: "Scope", value: "Full fit-out" },
      { label: "Trades", value: "Six, in-house" },
      { label: "Status", value: "Sample project" },
    ],
    scope: [
      "Gypsum ceilings & partitions",
      "Electrical & lighting",
      "Joinery & reception counter",
      "Tile & flooring works",
      "Painting & finishes",
      "Furniture coordination",
    ],
  },
  {
    slug: "sample-retail-store-fit-out",
    title: "Retail Store Fit-Out",
    area: "Dubai",
    category: "Workspace Fit-Out",
    sample: true,
    strapline: "Display joinery, lighting and finishes for a shop floor",
    cover: "wb-retail-shelving",
    gallery: [
      "wb-retail-display",
      "wb-retail-pergola",
      "wb-retail-seating",
      "wb-cosmo-store",
    ],
    brief:
      "A retail unit to be taken from shell to trading condition, with the display system carrying both the merchandising and the lighting.",
    approach:
      "Shelving runs were set out to the product module first, then the lighting was hung to suit rather than the other way round. Feature joinery was prototyped on site before the full run was fabricated.",
    outcome:
      "A floor that merchandises deep without feeling crowded, and a lighting layout that follows the fixtures.",
    facts: [
      { label: "Type", value: "Retail unit" },
      { label: "Scope", value: "Shell to trading" },
      { label: "Feature", value: "Display joinery" },
      { label: "Status", value: "Sample project" },
    ],
    scope: [
      "Display joinery",
      "Track & feature lighting",
      "Flooring",
      "Painting & finishes",
      "Signage coordination",
      "Snagging & handover",
    ],
  },
  {
    slug: "sample-office-partition-upgrade",
    title: "Office Partition Upgrade",
    area: "Dubai Investment Park",
    category: "Glass & Aluminium",
    sample: true,
    strapline: "Solid walls replaced with glazed screens, floor kept in use",
    cover: "wb-office-glass-corridor",
    gallery: [
      "wb-office-glass-desks",
      "wb-office-grid-partition",
      "wb-office-timber-glazing",
      "wb-dip-banded-glass",
    ],
    brief:
      "An occupied floor of small closed offices to be opened up into glazed rooms without moving the tenant out.",
    approach:
      "Worked in phases behind temporary screens, one bay at a time, with demolition and framing out of hours so the floor traded through. Manifestation was set at eye level to keep the rooms legible.",
    outcome:
      "Daylight reaches the centre of the plan, and the floor was never closed.",
    facts: [
      { label: "Type", value: "Occupied refit" },
      { label: "Scope", value: "Glass & aluminium" },
      { label: "Method", value: "Phased, out of hours" },
      { label: "Status", value: "Sample project" },
    ],
    scope: [
      "Temporary protection",
      "Strip-out of solid partitions",
      "Aluminium framing",
      "Clear & frosted glazing",
      "Manifestation",
      "Making good",
    ],
  },
  {
    slug: "sample-staff-cafeteria",
    title: "Staff Cafeteria & Break-Out",
    area: "Dubai",
    category: "Workspace Fit-Out",
    sample: true,
    strapline: "A pantry, servery and seating built into an existing floor",
    cover: "wb-pantry-bar",
    gallery: [
      "wb-pantry-dining",
      "wb-pantry-mezzanine",
      "wb-lounge-seating",
      "wb-lounge-shelving",
    ],
    brief:
      "An underused corner of a floor plate to become a staff cafeteria with a servery, dining seating and a quieter break-out area.",
    approach:
      "Drainage and extract dictated where the servery could go, so those were surveyed before anything was drawn. Dark joinery anchors the servery; the seating beyond is deliberately lighter so the space reads as two rooms.",
    outcome:
      "A servery, dining and break-out in a footprint that previously held storage.",
    facts: [
      { label: "Type", value: "Staff amenity" },
      { label: "Scope", value: "Pantry & seating" },
      { label: "Services", value: "Drainage & extract" },
      { label: "Status", value: "Sample project" },
    ],
    scope: [
      "Servery joinery",
      "Drainage & extract",
      "Electrical & lighting",
      "Tile & flooring works",
      "Painting & finishes",
      "Seating coordination",
    ],
  },
];

/**
 * Display order. Electrical is one of the core trades, so the MEP job leads
 * the index, the home showcase and the "related work" rails rather than
 * sitting third. Kept separate from `AUTHORED` so the source above stays
 * grouped by type and easy to edit.
 */
const LEAD_SLUG = "mep-works-sterling-perfumes-armaf";

export const PROJECTS: Project[] = [
  ...AUTHORED.filter((p) => p.slug === LEAD_SLUG),
  ...AUTHORED.filter((p) => p.slug !== LEAD_SLUG),
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
