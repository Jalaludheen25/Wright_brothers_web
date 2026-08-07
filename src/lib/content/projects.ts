import type { ImageKey } from "@/lib/images";

/**
 * DEMONSTRATION CONTENT. These case studies, figures and client quotes are
 * written to exercise the design — they are not a record of real work.
 * See README ("Going live") before publishing.
 */

export const PROJECT_CATEGORIES = [
  "Villa Transformation",
  "New Build",
  "Penthouse",
  "Townhouse",
  "Interior Architecture",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;
  title: string;
  area: string;
  category: ProjectCategory;
  year: number;
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
    slug: "ghaf-house",
    title: "Ghaf House",
    area: "Al Barari",
    category: "New Build",
    year: 2024,
    strapline: "A house built around the tree that was already there",
    cover: "hero-canopy",
    gallery: ["int-living-warm", "ext-canopy-dark", "int-dining-dark", "int-bedroom-dark"],
    brief:
      "The plot came with a mature ghaf tree almost exactly in the middle of it. The family's first architect had proposed removing it. They came to us instead, and asked whether the house could be planned around it.",
    approach:
      "We split the programme into two blackened-timber volumes and connected them with a glazed link that passes beneath the canopy. The living wing faces north-east into morning shade; the sleeping wing sits behind a deep screened façade that takes the western sun. The tree became the courtyard, and the courtyard became the reason the house works — every principal room now borrows light and view through it.",
    outcome:
      "Handed over eleven days ahead of a twenty-month programme. Measured cooling load came in 22% below the code baseline, largely on the strength of the shading strategy rather than plant capacity.",
    facts: [
      { label: "Plot", value: "1,860 m²" },
      { label: "Built area", value: "1,140 m²" },
      { label: "Programme", value: "20 months" },
      { label: "Completed", value: "2024" },
    ],
    scope: [
      "Architecture",
      "Structural & MEP engineering",
      "Interior architecture",
      "Bespoke joinery",
      "Landscape & pool",
      "Main works construction",
    ],
    quote: {
      text: "We were told the tree was a problem to be solved. Wright Brothers treated it as the brief. It is now the first thing anyone comments on.",
      attribution: "Owners, Ghaf House",
    },
    featured: true,
  },
  {
    slug: "barajeel-villa",
    title: "Barajeel Villa",
    area: "Jumeirah",
    category: "Villa Transformation",
    year: 2023,
    strapline: "A 1990s villa given the wind towers it should have had",
    cover: "ext-timber-wall",
    gallery: ["int-living-open", "int-kitchen-island", "ext-facade-detail", "int-bath-stone"],
    brief:
      "A well-located but hard-working Jumeirah villa: sound structure, exhausted services, and a plan cut into small dark rooms with a staircase in the worst possible place.",
    approach:
      "We kept the frame and removed almost everything else. Two internal walls came out to make a single living volume running the depth of the plot; the stair moved to the flank wall and became a top-lit shaft. Above the new roof terrace we built a pair of contemporary barajeel — wind towers, in the Emirati idiom — which shade the terrace and pull air through the upper floor on all but the stillest days.",
    outcome:
      "The house gained 40 m² of usable area without a single square metre of extension, and the upper floor now runs comfortably on natural ventilation for roughly five months of the year.",
    facts: [
      { label: "Plot", value: "930 m²" },
      { label: "Built area", value: "640 m²" },
      { label: "Programme", value: "13 months" },
      { label: "Completed", value: "2023" },
    ],
    scope: [
      "Structural survey",
      "Architectural re-planning",
      "MEP replacement",
      "Interior architecture",
      "Bespoke joinery",
      "Roof terrace & wind towers",
    ],
    quote: {
      text: "They found forty square metres inside a house we had lived in for nine years. We had walked past it every day.",
      attribution: "H. Al Marri, Owner",
    },
    featured: true,
  },
  {
    slug: "al-marsa-penthouse",
    title: "Al Marsa Penthouse",
    area: "Palm Jumeirah",
    category: "Penthouse",
    year: 2024,
    strapline: "Two shells joined into one quiet residence above the water",
    cover: "int-loft-dark",
    gallery: ["int-loft-glass", "int-concrete-glass", "int-living-terrace", "int-bedroom-dark"],
    brief:
      "The owners had bought two adjacent shell-and-core units on the top floor and wanted them read as a single home — not as two apartments with a door punched through.",
    approach:
      "The combination hinged on one structural opening and a great deal of patience with the building's management company. We placed the shared living volume across the join so the seam disappears, and ran a single continuous stone floor and ceiling plane through it. Acoustic separation was engineered to a measured target: floating floors throughout, resilient ceiling hangers, and full-height acoustic doors on the bedroom wing.",
    outcome:
      "Fifty-one weeks from permit to handover, working within a four-hour daily service-lift window. Measured impact sound between the sleeping and living wings came in at 46 dB — a fully specified, not incidental, result.",
    facts: [
      { label: "Area", value: "710 m²" },
      { label: "Terrace", value: "180 m²" },
      { label: "Programme", value: "11 months" },
      { label: "Completed", value: "2024" },
    ],
    scope: [
      "Building management liaison",
      "Fit-out permits & NOCs",
      "Interior architecture",
      "Acoustic engineering",
      "MEP modification",
      "Joinery, stone & AV integration",
    ],
    featured: true,
  },
  {
    slug: "nakheel-villa",
    title: "Nakheel Villa",
    area: "Palm Jumeirah",
    category: "Villa Transformation",
    year: 2022,
    strapline: "A frond villa turned back towards its own beach",
    cover: "ext-pool-palm",
    gallery: ["int-kitchen-garden", "int-living-glass", "ext-glass-pool", "int-bath-luxe"],
    brief:
      "A Garden Home on a Palm frond whose original plan put service rooms along the beach elevation and the principal living space behind them, facing the street.",
    approach:
      "We inverted the house. Kitchen and living moved to the water; utility and parking moved inland. The rear elevation was rebuilt as a full-height sliding glazed wall with a deep reveal that keeps the sun off the glass until late afternoon. The pool was re-levelled to sit flush with the internal floor, so the threshold between the living room and the water reads as a single plane.",
    outcome:
      "Completed in ten months. The owners report the house is now used almost entirely at its beach end — which had been the point.",
    facts: [
      { label: "Plot", value: "1,120 m²" },
      { label: "Built area", value: "780 m²" },
      { label: "Programme", value: "10 months" },
      { label: "Completed", value: "2022" },
    ],
    scope: [
      "Architectural re-planning",
      "Structural alterations",
      "Façade & glazing replacement",
      "Interior architecture",
      "Pool re-engineering",
      "Landscape",
    ],
    quote: {
      text: "We had a beach house that faced the road. Now we have a beach house.",
      attribution: "Owners, Nakheel Villa",
    },
  },
  {
    slug: "sarab-house",
    title: "Sarab House",
    area: "Emirates Hills",
    category: "New Build",
    year: 2025,
    strapline: "Stone, shadow and a hundred metres of water frontage",
    cover: "ext-pool-modern",
    gallery: ["ext-dusk-entry", "int-living-terrace", "int-bedroom-light", "abs-facade"],
    brief:
      "A large lake-facing plot with a difficult constraint: the view and the worst of the afternoon sun are in exactly the same direction.",
    approach:
      "The answer was depth. The western elevation is set back behind a two-storey colonnade of load-bearing stone piers, so the glass never sees direct sun after two o'clock while the view remains completely open. Everything else follows from that move — the piers set the structural grid, the grid sets the room widths, and the room widths set the joinery.",
    outcome:
      "The house holds an internal temperature within 1.5°C of setpoint through a July afternoon on roughly two-thirds of the cooling capacity a comparable villa of this size would install.",
    facts: [
      { label: "Plot", value: "2,400 m²" },
      { label: "Built area", value: "1,580 m²" },
      { label: "Programme", value: "23 months" },
      { label: "Completed", value: "2025" },
    ],
    scope: [
      "Architecture",
      "Façade engineering",
      "Structural & MEP engineering",
      "Interior architecture",
      "Landscape & pool",
      "Main works construction",
    ],
    featured: true,
  },
  {
    slug: "meridian-townhouse",
    title: "Meridian Townhouse",
    area: "Dubai Hills Estate",
    category: "Townhouse",
    year: 2024,
    strapline: "What a standard four-bedroom can become",
    cover: "ext-facade-modern",
    gallery: ["int-kitchen-modern", "int-living-glass", "int-loft-glass", "int-bath-luxe"],
    brief:
      "A developer townhouse, identical to two hundred others, bought by a couple who intended to stay for twenty years and wanted it to stop feeling temporary.",
    approach:
      "Townhouses are constrained by party walls and by what the community rules permit, so the gains have to come from within the envelope. We removed the ground-floor partitions entirely, replaced the stair balustrade with a solid plastered spine, brought a rooflight down over the landing, and rebuilt the kitchen as a single piece of joinery that runs wall to wall. The material budget went almost entirely into two rooms.",
    outcome:
      "Delivered in nineteen weeks, within a community that permits internal works only between eight and five. The house now reads as bespoke from the moment the front door opens.",
    facts: [
      { label: "Area", value: "310 m²" },
      { label: "Programme", value: "19 weeks" },
      { label: "Community", value: "Dubai Hills Estate" },
      { label: "Completed", value: "2024" },
    ],
    scope: [
      "Internal re-planning",
      "Structural opening works",
      "Kitchen & joinery",
      "Lighting design",
      "Full redecoration",
    ],
    quote: {
      text: "Our neighbours have the same house. Ours does not feel like the same house.",
      attribution: "R. & S. Nasser, Owners",
    },
  },
  {
    slug: "falaj-courtyard",
    title: "Falaj Courtyard",
    area: "Arabian Ranches",
    category: "Villa Transformation",
    year: 2023,
    strapline: "A courtyard cut into the middle of a solid plan",
    cover: "ext-white-minimal",
    gallery: ["int-minimal-white", "int-kitchen-garden", "int-living-warm", "ext-facade-detail"],
    brief:
      "A large, structurally sound villa with a deep plan — and consequently a dark middle that no amount of lighting had ever fixed.",
    approach:
      "We took out a 5 by 6 metre bay at the centre of the ground floor and made it a courtyard, open to the sky, with a shallow water channel running its length in reference to the falaj. It cost the house forty square metres of floor area and returned daylight to eleven rooms. A retractable fabric roof closes it during the worst two months.",
    outcome:
      "Artificial lighting use across the ground floor dropped by roughly 60% by the owners' own metering, and the middle of the house became the part of it the family actually uses.",
    facts: [
      { label: "Plot", value: "1,340 m²" },
      { label: "Built area", value: "700 m²" },
      { label: "Programme", value: "12 months" },
      { label: "Completed", value: "2023" },
    ],
    scope: [
      "Structural alterations",
      "Courtyard construction",
      "Water feature engineering",
      "Interior architecture",
      "MEP re-work",
      "Landscape",
    ],
  },
  {
    slug: "reem-residence",
    title: "Reem Residence",
    area: "District One",
    category: "Interior Architecture",
    year: 2024,
    strapline: "A finished house, unfinished on the inside",
    cover: "ext-pool-white",
    gallery: ["int-living-terrace", "int-kitchen-modern", "int-bedroom-dark", "int-bath-luxe"],
    brief:
      "The owners had bought a completed contemporary villa whose architecture they liked and whose interior — developer-standard throughout — they did not.",
    approach:
      "No structure moved. The entire project was interior architecture: new floors, a rebuilt lighting scheme on layered circuits, full-height joinery in nine rooms, and stone selected slab by slab from a single block so the veining runs continuously from the kitchen island onto the back wall. The staircase was re-clad in solid oak with a shadow gap at every riser.",
    outcome:
      "Seven months, occupied for the last two. The house was independently revalued at a figure comfortably ahead of the total spend.",
    facts: [
      { label: "Area", value: "890 m²" },
      { label: "Rooms", value: "9 with bespoke joinery" },
      { label: "Programme", value: "7 months" },
      { label: "Completed", value: "2024" },
    ],
    scope: [
      "Interior architecture",
      "Lighting design",
      "Bespoke joinery",
      "Stone selection & templating",
      "Specialist finishes",
      "Styling & handover",
    ],
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
  projectSlug: string;
  before: ImageKey;
  after: ImageKey;
  note: string;
};

export const BEFORE_AFTER: BeforeAfter[] = [
  {
    id: "nakheel-bath",
    label: "Principal Bathroom",
    project: "Nakheel Villa",
    projectSlug: "nakheel-villa",
    before: "ba-bath-before",
    after: "int-bath-luxe",
    note: "The original suite was tanked, re-fallen and rebuilt from the slab up — the visible change is the smaller half of the work.",
  },
  {
    id: "meridian-kitchen",
    label: "Kitchen",
    project: "Meridian Townhouse",
    projectSlug: "meridian-townhouse",
    before: "ba-kitchen-before",
    after: "int-kitchen-modern",
    note: "One wall removed, services re-routed, and a single wall-to-wall joinery run in place of eleven separate units.",
  },
  {
    id: "ghaf-living",
    label: "Living Room",
    project: "Ghaf House",
    projectSlug: "ghaf-house",
    before: "craft-strip-out",
    after: "int-living-warm",
    note: "Photographed at strip-out and again at handover, from the same position, eleven months apart.",
  },
];
