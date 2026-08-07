import type { ImageKey } from "@/lib/images";

export type Service = {
  slug: string;
  index: number;
  title: string;
  /** One line for cards and nav. */
  summary: string;
  /** Two or three sentences for the service page hero. */
  intro: string;
  image: ImageKey;
  secondaryImage: ImageKey;
  /** What the client actually receives. */
  deliverables: string[];
  /** Distinguishing points — rendered as a numbered list. */
  highlights: { title: string; body: string }[];
  duration: string;
  from: string;
  bestFor: string;
};

export const SERVICES: Service[] = [
  {
    slug: "villa-transformation",
    index: 1,
    title: "Full Villa Transformation",
    summary:
      "A complete re-imagining of an existing villa — structure, services, interiors and grounds.",
    intro:
      "Most Dubai villas were built to a developer's schedule, not to a family's life. We strip back to what is worth keeping, re-plan the way the house is actually used, and rebuild it to a standard the original never had.",
    image: "ext-timber-wall",
    secondaryImage: "int-living-warm",
    deliverables: [
      "Condition and structural survey of the existing building",
      "Full architectural re-planning and 3D visualisation",
      "MEP redesign — power, cooling, plumbing, smart systems",
      "Authority submissions and permit management",
      "Complete construction, joinery and finishing",
      "Landscape, pool and external works",
      "Snagging, commissioning and a 10-year structural warranty",
    ],
    highlights: [
      {
        title: "We survey before we promise",
        body: "Every transformation opens with a paid technical survey. It is the only honest way to price a building you cannot see inside of — and it means the number we give you in week three is the number you pay.",
      },
      {
        title: "The layout is the real luxury",
        body: "Finishes are easy to buy. Light, circulation and proportion are not. We spend the first month on plan before anyone discusses a stone sample.",
      },
      {
        title: "One contract, one accountability",
        body: "Design and construction sit under the same roof and the same agreement. There is no gap for a problem to fall into.",
      },
    ],
    duration: "9 — 14 months",
    from: "From AED 2.4M",
    bestFor: "Owners of a villa in a settled community who intend to stay",
  },
  {
    slug: "custom-homes",
    index: 2,
    title: "Ground-Up Custom Homes",
    summary:
      "A private residence designed and constructed from an empty plot to a finished, furnished home.",
    intro:
      "A plot is a rare thing in Dubai and it deserves better than a catalogue house. We design to the site — its orientation, its prevailing wind, its view lines — and then we build what we drew.",
    image: "ext-pool-modern",
    secondaryImage: "ext-dusk-entry",
    deliverables: [
      "Site analysis, massing studies and orientation strategy",
      "Full architectural design and authority-ready drawings",
      "Structural, MEP and façade engineering",
      "Interior architecture and bespoke joinery design",
      "Main works construction and site management",
      "Landscape, pool, hardscape and irrigation",
      "Handover pack, O&M manuals and a 10-year structural warranty",
    ],
    highlights: [
      {
        title: "Designed for 45°C, not for a mood board",
        body: "Shading, thermal mass, glazing specification and plant sizing are decided against real Gulf climate data. A beautiful house that is expensive to cool is a failed house.",
      },
      {
        title: "Drawn in full before ground is broken",
        body: "We do not start on site with an incomplete package. Every socket, every joinery run, every drainage fall is resolved on paper first — which is why our sites are quiet.",
      },
      {
        title: "One team from sketch to keys",
        body: "The architect who drew your stair detail is still on the project the day it is installed.",
      },
    ],
    duration: "16 — 24 months",
    from: "From AED 6M",
    bestFor: "Owners of a plot in Emirates Hills, Al Barari, District One or similar",
  },
  {
    slug: "kitchens-bathrooms",
    index: 3,
    title: "Kitchens & Bathrooms",
    summary:
      "The two rooms that carry a house — rebuilt properly, with the services redone behind them.",
    intro:
      "A kitchen or bathroom is the densest piece of construction in a home: water, waste, power, ventilation and joinery all meeting in a few square metres. We rebuild them from the substrate out, not from the surface in.",
    image: "int-kitchen-modern",
    secondaryImage: "int-bath-luxe",
    deliverables: [
      "Measured survey and existing services investigation",
      "Layout design, elevations and full joinery drawings",
      "Waterproofing, falls and drainage re-engineering",
      "Bespoke joinery manufactured to the millimetre",
      "Stone, tile and metalwork supply and installation",
      "Appliance integration, testing and commissioning",
      "Five-year workmanship warranty on all wet areas",
    ],
    highlights: [
      {
        title: "Waterproofing is not a finish",
        body: "Every wet area is tanked, flood-tested and photographed before a single tile is laid. We hand you the test records at completion.",
      },
      {
        title: "Joinery drawn at 1:1",
        body: "Critical junctions — the mitre on a stone waterfall, the shadow gap under a vanity — are drawn full size and dry-assembled in the workshop before delivery.",
      },
      {
        title: "You keep living in the house",
        body: "Phased programmes, dust screens and negative-pressure extraction mean the rest of the home stays usable.",
      },
    ],
    duration: "10 — 18 weeks",
    from: "From AED 320K",
    bestFor: "Owners upgrading a single high-value room without a full renovation",
  },
  {
    slug: "penthouse-fit-out",
    index: 4,
    title: "Penthouse & Apartment Fit-Out",
    summary:
      "Shell-and-core or hand-over apartments taken to a finished, fully serviced private residence.",
    intro:
      "Tower work is a different discipline: building management approvals, restricted access hours, service lifts and acoustic separation. We have the systems for it, and the relationships with the management companies who gate it.",
    image: "int-loft-dark",
    secondaryImage: "int-concrete-glass",
    deliverables: [
      "Building management liaison and fit-out permit handling",
      "Space planning and interior architecture",
      "Acoustic and thermal detailing to tower standards",
      "MEP modifications within landlord constraints",
      "Bespoke joinery, stone and metalwork",
      "AV, lighting control and smart-home integration",
      "Furnishing, styling and full handover",
    ],
    highlights: [
      {
        title: "We handle the building, not just the unit",
        body: "Fit-out permits, NOCs, insurance certificates, lift bookings and out-of-hours works are managed by us. You never speak to the facilities team.",
      },
      {
        title: "Acoustics designed, not assumed",
        body: "Floating floors, resilient ceiling hangers and door seals are specified to measured targets. A quiet apartment is an engineered apartment.",
      },
      {
        title: "Deliverable in a single programme",
        body: "Tower access is the constraint that governs everything. We build the programme backwards from it.",
      },
    ],
    duration: "6 — 11 months",
    from: "From AED 1.6M",
    bestFor: "Owners of penthouses and large apartments on the Palm, Downtown or Marina",
  },
  {
    slug: "landscape-outdoor",
    index: 5,
    title: "Landscape & Outdoor Living",
    summary:
      "Pools, shade structures, majlis terraces and planting designed for a climate that punishes shortcuts.",
    intro:
      "In Dubai the garden is only usable if it is designed to be. Shade, air movement, water and the right palette of plants turn eight unusable months into eight comfortable ones.",
    image: "ext-pool-terrace",
    secondaryImage: "ext-glass-pool",
    deliverables: [
      "Site survey, levels and drainage strategy",
      "Landscape masterplan and planting schedule",
      "Pool design, engineering and plant room",
      "Shade structures, pergolas and outdoor kitchens",
      "Hardscape, lighting and irrigation",
      "Twelve months of establishment maintenance",
    ],
    highlights: [
      {
        title: "Shade before furniture",
        body: "We model the sun path across the day and the year, then place structures where they earn their cost. Comfort comes from geometry, not from a parasol.",
      },
      {
        title: "Planting that survives August",
        body: "A palette weighted to native and adapted species, on a properly zoned irrigation system, with a maintenance plan handed over on day one.",
      },
      {
        title: "The pool is a building",
        body: "Structure, waterproofing, balance tank, plant room and circulation are engineered to the same standard as the house.",
      },
    ],
    duration: "4 — 9 months",
    from: "From AED 750K",
    bestFor: "Villa owners whose interiors are done and whose grounds are not",
  },
  {
    slug: "interior-architecture",
    index: 6,
    title: "Interior Architecture & Joinery",
    summary:
      "The permanent interior — walls, light, stone and cabinetry — designed and made in our own workshop.",
    intro:
      "This is the work that sits between architecture and decoration: the built-in that hides a structural column, the reveal that makes a ceiling float, the stone junction nobody notices because it is right.",
    image: "int-living-terrace",
    secondaryImage: "int-dining-dark",
    deliverables: [
      "Interior architectural drawings and detail packages",
      "Lighting design and control layouts",
      "Bespoke joinery design and in-house manufacture",
      "Stone selection, slab reservation and templating",
      "Specialist finishes, metalwork and glazing",
      "Installation by our own fixing teams",
    ],
    highlights: [
      {
        title: "Our own workshop",
        body: "Joinery is made by our team in Al Quoz, not sub-let to the lowest bidder. It is the single largest reason our finishes hold up.",
      },
      {
        title: "Slabs reserved, not ordered",
        body: "You choose the actual block your stone will be cut from. We photograph it, tag it and template around the veining.",
      },
      {
        title: "Light designed as material",
        body: "Layered circuits, warm dimming and concealed sources — specified at design stage, when it is still free to change.",
      },
    ],
    duration: "5 — 10 months",
    from: "From AED 900K",
    bestFor: "Owners whose structure is sound but whose interior is not theirs",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
