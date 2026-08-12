import type { ImageKey } from "@/lib/images";
import type { VideoKey } from "@/components/ui/BackgroundVideo";

/**
 * Every frame here is the client's own photography of completed work. No stock.
 *
 * Captions describe what is visible and nothing more — we have no dates, values
 * or client names for most of these beyond the three written-up projects, so
 * the gallery shows the work rather than making claims about it.
 */

export const GALLERY_CATEGORIES = [
  "Workspace",
  "Glass & Partitions",
  "Reception & Lounge",
  "Retail",
  "MEP & Technical",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  image: ImageKey;
  /** Doubles as the lightbox caption and the image alt text. */
  caption: string;
  category: GalleryCategory;
  /**
   * Grid weight. "tall" and "wide" break the rhythm so the grid reads as an
   * edited portfolio rather than a contact sheet.
   */
  span?: "tall" | "wide";
};

export const GALLERY: GalleryItem[] = [
  /* --- Workspace ------------------------------------------------------- */
  {
    image: "wb-workspace-open-plan",
    caption: "Open floor plate under high-level skylights, planting worked into the layout",
    category: "Workspace",
    span: "wide",
  },
  {
    image: "wb-workspace-wide",
    caption: "Suspended linear lighting run along the working axis",
    category: "Workspace",
  },
  {
    image: "wb-workspace-cafe",
    caption: "Café seating set between planting beds on the open floor",
    category: "Workspace",
  },
  {
    image: "wb-workspace-seating",
    caption: "Collaborative seating beneath the skylight run",
    category: "Workspace",
  },
  {
    image: "wb-workspace-skylights",
    caption: "High-level skylights and linear luminaires, seen from the floor",
    category: "Workspace",
    span: "tall",
  },
  {
    image: "wb-workspace-planting",
    caption: "Mature planting screening one working zone from the next",
    category: "Workspace",
    span: "tall",
  },
  {
    image: "wb-workspace-bar",
    caption: "High tables and stools along the glazed perimeter",
    category: "Workspace",
  },
  {
    image: "wb-workspace-bar-wide",
    caption: "Bar seating and soft seating sharing the open plate",
    category: "Workspace",
  },
  {
    image: "wb-workspace-lounge-end",
    caption: "Lounge seating at the end of the floor",
    category: "Workspace",
  },
  {
    image: "wb-workspace-lounge",
    caption: "Break-out lounge against the glazed façade",
    category: "Workspace",
  },
  {
    image: "wb-office-open-desks",
    caption: "Open desking on a timber floor beneath a coffered ceiling",
    category: "Workspace",
  },
  {
    image: "wb-office-small",
    caption: "A small meeting room with wall-mounted cooling",
    category: "Workspace",
  },

  /* --- Glass & Partitions ---------------------------------------------- */
  {
    image: "wb-dip-meeting-pod",
    caption: "Curved glazed meeting room set into the open floor",
    category: "Glass & Partitions",
    span: "wide",
  },
  {
    image: "wb-dip-corridor",
    caption: "Glazed partitions running the circulation spine, Sterling Perfumes DIP",
    category: "Glass & Partitions",
  },
  {
    image: "wb-dip-corridor-wide",
    caption: "Frosted banding at eye level, holding light through the run",
    category: "Glass & Partitions",
  },
  {
    image: "wb-dip-banded-glass",
    caption: "Banded manifestation across a full-height glazed screen",
    category: "Glass & Partitions",
  },
  {
    image: "wb-dip-slat-screen",
    caption: "A black slatted screen closing the end of a glazed corridor",
    category: "Glass & Partitions",
    span: "tall",
  },
  {
    image: "wb-dip-partition-run",
    caption: "Aluminium framing set out to the office grid",
    category: "Glass & Partitions",
  },
  {
    image: "wb-dip-open-office",
    caption: "Desking read through the glazed partition line",
    category: "Glass & Partitions",
  },
  {
    image: "wb-dip-partitions",
    caption: "Clear and frosted glazing meeting at a framed junction",
    category: "Glass & Partitions",
  },
  {
    image: "wb-dip-glazing",
    caption: "A glazed door set into a partition run",
    category: "Glass & Partitions",
  },
  {
    image: "wb-office-glass-desks",
    caption: "Black-framed glazing enclosing a desking bay",
    category: "Glass & Partitions",
  },
  {
    image: "wb-office-glass-corridor",
    caption: "A glazed corridor with planting at the threshold",
    category: "Glass & Partitions",
    span: "tall",
  },
  {
    image: "wb-office-grid-partition",
    caption: "A steel grid screen dividing office from circulation",
    category: "Glass & Partitions",
    span: "tall",
  },
  {
    image: "wb-office-timber-glazing",
    caption: "Timber-framed glazing turning a corner",
    category: "Glass & Partitions",
  },

  /* --- Reception & Lounge ---------------------------------------------- */
  {
    image: "wb-lounge-wide",
    caption: "Leather seating and planting under exposed services",
    category: "Reception & Lounge",
    span: "wide",
  },
  {
    image: "wb-lounge-leather",
    caption: "A lounge set against a glazed partition line",
    category: "Reception & Lounge",
  },
  {
    image: "wb-lounge-pendants",
    caption: "Clustered glass pendants over the lounge",
    category: "Reception & Lounge",
    span: "tall",
  },
  {
    image: "wb-lounge-shelving",
    caption: "Open display shelving dividing lounge from walkway",
    category: "Reception & Lounge",
  },
  {
    image: "wb-lounge-seating",
    caption: "Soft seating and a low table on a poured floor",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-reception",
    caption: "A reception counter with concealed cove lighting",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-counter",
    caption: "A lit reception desk against a backlit panel",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-boardroom",
    caption: "A boardroom glazed to the office floor beyond",
    category: "Reception & Lounge",
    span: "wide",
  },
  {
    image: "wb-office-meeting-screen",
    caption: "A meeting room with wall-mounted display and cooling",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-artwork-bar",
    caption: "A breakout bar beneath a run of framed artwork",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-artwork-run",
    caption: "Framed artwork lining a glazed breakout space",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-bar-artwork",
    caption: "High stools and planting against a printed wall",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-breakout",
    caption: "Break-out seating under cove-lit ceilings",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-quote-wall",
    caption: "A printed feature wall beside a high table",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-sofa-lounge",
    caption: "Seating and planting on a polished floor",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-timber-frame",
    caption: "Timber-framed glazing enclosing a breakout area",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-timber-lounge",
    caption: "Tan seating within a timber-framed enclosure",
    category: "Reception & Lounge",
  },
  {
    image: "wb-armaf-lobby",
    caption: "A double-height entrance lobby with a coffered ceiling",
    category: "Reception & Lounge",
    span: "tall",
  },
  {
    image: "wb-armaf-atrium",
    caption: "The atrium above the entrance, looking back to the glazed façade",
    category: "Reception & Lounge",
    span: "tall",
  },
  {
    image: "wb-pantry-bar",
    caption: "A staff pantry with dark joinery and pendant lighting",
    category: "Reception & Lounge",
  },
  {
    image: "wb-pantry-dining",
    caption: "Dining seating beneath a timber-lined ceiling",
    category: "Reception & Lounge",
  },
  {
    image: "wb-pantry-mezzanine",
    caption: "A mezzanine edge in painted steel above the dining floor",
    category: "Reception & Lounge",
  },
  {
    image: "wb-office-exterior",
    caption: "The exterior of a completed commercial unit at street level",
    category: "Reception & Lounge",
    span: "wide",
  },

  /* --- Retail ----------------------------------------------------------- */
  {
    image: "wb-retail-wall",
    caption: "A full-height perfume display wall running the length of the floor",
    category: "Retail",
    span: "wide",
  },
  {
    image: "wb-retail-wall-wide",
    caption: "The display wall seen across the shop floor",
    category: "Retail",
  },
  {
    image: "wb-retail-wall-elite",
    caption: "Bottle-by-bottle display fixing across the full wall height",
    category: "Retail",
  },
  {
    image: "wb-retail-wall-shelves",
    caption: "Display wall meeting the shelving line",
    category: "Retail",
  },
  {
    image: "wb-retail-chandelier",
    caption: "A cut-glass chandelier hung against black display shelving",
    category: "Retail",
    span: "tall",
  },
  {
    image: "wb-retail-shelving",
    caption: "Backlit retail shelving and display joinery",
    category: "Retail",
  },
  {
    image: "wb-retail-lounge",
    caption: "Seating set against floor-to-ceiling display shelving",
    category: "Retail",
  },
  {
    image: "wb-retail-display",
    caption: "Freestanding display plinths on a polished floor",
    category: "Retail",
  },
  {
    image: "wb-retail-pergola",
    caption: "A timber pergola over the retail display floor",
    category: "Retail",
  },
  {
    image: "wb-retail-pergola-wide",
    caption: "Coloured panels set between the pergola beams",
    category: "Retail",
    span: "wide",
  },
  {
    image: "wb-retail-store-wide",
    caption: "The shop floor beneath the pergola structure",
    category: "Retail",
  },
  {
    image: "wb-retail-seating",
    caption: "Seating and display at the end of the retail run",
    category: "Retail",
  },
  {
    image: "wb-retail-steps",
    caption: "A stepped display stand in timber and blue panelling",
    category: "Retail",
    span: "tall",
  },
  {
    image: "wb-retail-blue-corridor",
    caption: "A blue-panelled display corridor",
    category: "Retail",
  },
  {
    image: "wb-retail-curtain",
    caption: "Retail shelving beside a red drape and display steps",
    category: "Retail",
  },
  {
    image: "wb-cosmo-store",
    caption: "Cosmetics retail shelving under exposed services",
    category: "Retail",
  },
  {
    image: "wb-cosmo-store-2",
    caption: "Ductwork and track lighting over the retail floor",
    category: "Retail",
  },

  /* --- MEP & Technical -------------------------------------------------- */
  {
    image: "wb-mep-condensers",
    caption: "Condenser units grouped on a fabricated steel platform",
    category: "MEP & Technical",
    span: "wide",
  },
  {
    image: "wb-mep-platform",
    caption: "The 10-ton outdoor unit positioned on its platform",
    category: "MEP & Technical",
    span: "tall",
  },
  {
    image: "wb-mep-ductwork",
    caption: "Ductwork and containment run at high level",
    category: "MEP & Technical",
  },
  // No span on the board shots: they are documentation rather than
  // photography, and an emphasis cell only makes them read as a blank grey
  // panel next to the interiors.
  {
    image: "wb-mep-distribution",
    caption: "A distribution board built out and terminated",
    category: "MEP & Technical",
  },
  {
    image: "wb-mep-panel",
    caption: "Circuits labelled at the board for isolation",
    category: "MEP & Technical",
  },
  { image: "wb-mep-board-orange", caption: "Breaker rows and terminal rails on an orange backplate", category: "MEP & Technical" },
  { image: "wb-mep-board-contactor", caption: "Contactors and breaker banks inside the board", category: "MEP & Technical" },
  { image: "wb-mep-panel-door", caption: "Panel door closed and labelled for restricted access", category: "MEP & Technical" },
  { image: "wb-mep-board-rails", caption: "Breakers landed onto numbered terminal rails", category: "MEP & Technical" },
  { image: "wb-mep-enclosure-open", caption: "Enclosure opened to metering and control gear", category: "MEP & Technical" },
  { image: "wb-mep-fascia-blank", caption: "Blank fascia fitted over the board", category: "MEP & Technical" },
  { image: "wb-mep-fascia-labelled", caption: "Breaker groups labelled at the fascia", category: "MEP & Technical" },
  { image: "wb-mep-control-meters", caption: "Control panel with ammeter, indicator lamps and selectors", category: "MEP & Technical" },
  { image: "wb-mep-incomer-busbar", caption: "Incoming cable landed onto the busbar", category: "MEP & Technical" },
  { image: "wb-mep-control-fascia", caption: "Control fascia with metering and rotary isolator", category: "MEP & Technical" },
  { image: "wb-mep-board-wide", caption: "Full board: breakers, contactors and terminal rails", category: "MEP & Technical" },
  { image: "wb-mep-incomer-fuse", caption: "Incomer through a fused switch, warning labels applied", category: "MEP & Technical" },
  { image: "wb-mep-isolators", caption: "Isolators and breaker rows within the enclosure", category: "MEP & Technical" },
  { image: "wb-mep-terminals", caption: "Colour-coded terminal rails beneath the breaker rows", category: "MEP & Technical" },
  { image: "wb-mep-containment", caption: "Containment entering the board at high level", category: "MEP & Technical" },
  { image: "wb-mep-fascia-rows", caption: "Breaker rows set out behind the fascia", category: "MEP & Technical" },
  { image: "wb-mep-fascia-groups", caption: "Circuit groups identified at the fascia", category: "MEP & Technical" },
  { image: "wb-mep-loom", caption: "Cabling loomed and dressed to the breaker rows", category: "MEP & Technical" },
  { image: "wb-mep-contactors", caption: "Contactor bank and control wiring across the rail", category: "MEP & Technical" },
  { image: "wb-mep-incomer-isolator", caption: "Incoming isolator ahead of the distribution breakers", category: "MEP & Technical" },
  { image: "wb-mep-fascia-schedule", caption: "Circuit schedule fixed beside the breakers", category: "MEP & Technical" },
  { image: "wb-mep-board-dense", caption: "A fully loaded board, every way terminated", category: "MEP & Technical" },
  { image: "wb-mep-board-control", caption: "Contactors, breakers and control gear in one enclosure", category: "MEP & Technical" },
  { image: "wb-mep-board-large", caption: "A large board with multiple breaker banks and terminal rails", category: "MEP & Technical" },
];

/**
 * The unfiltered view, round-robined across categories.
 *
 * GALLERY is grouped by trade because that is how it is maintained, but shown
 * in that order the page opens with a dozen near-identical workspace frames.
 * Interleaving keeps every filtered view in its authored order while making
 * "All" read as an edited set. Deterministic, so server and client agree.
 */
export const GALLERY_MIXED: GalleryItem[] = (() => {
  const buckets = GALLERY_CATEGORIES.map((category, i) => {
    const bucket = GALLERY.filter((item) => item.category === category);
    // Each category leads with its "wide" frame, so a straight round-robin
    // would open with five full-bleed rows in a row — and on a two-column
    // phone that collapses the whole top of the grid to one column. Rotating
    // each bucket by its own index spreads them back out.
    const offset = i % bucket.length;
    return [...bucket.slice(offset), ...bucket.slice(0, offset)];
  });

  const out: GalleryItem[] = [];
  for (let i = 0; out.length < GALLERY.length; i += 1) {
    for (const bucket of buckets) {
      if (bucket[i]) out.push(bucket[i]);
    }
  }
  return out;
})();

export type GalleryVideo = {
  video: VideoKey;
  title: string;
  blurb: string;
  /** Runtime of the encoded loop, in seconds. */
  seconds: number;
};

export const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    video: "hero-office",
    title: "Corporate office fit-out",
    blurb:
      "Through a completed floor: leather lounge seating, glazed partitions and planting beneath exposed services.",
    seconds: 20,
  },
  {
    video: "sterling-dip",
    title: "Sterling Perfumes Head Office, DIP",
    blurb:
      "The glass and aluminium partition works, from the circulation spine through to the boardroom.",
    seconds: 20,
  },
  {
    video: "perfume-wall",
    title: "Perfume retail fit-out",
    blurb:
      "The display wall, the timber pergola and the shop floor at handover.",
    seconds: 18,
  },
];
