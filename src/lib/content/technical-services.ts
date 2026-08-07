/**
 * Technical services — the eight trades carried out in-house.
 *
 * Added alongside (not in place of) the six design-and-build services in
 * `services.ts`. These are the trades the studio also offers on their own:
 * for aftercare on houses we have delivered, and as standalone work.
 *
 * Descriptions state what each trade ordinarily covers. Deliberately no
 * pricing, response times or warranty claims — those belong to the client.
 */

export type TechnicalService = {
  slug: string;
  title: string;
  /** One line describing what the trade covers. */
  summary: string;
};

export const TECHNICAL_SERVICES: TechnicalService[] = [
  {
    slug: "electrical-works",
    title: "Electrical Works",
    summary:
      "Circuits, distribution boards, lighting and power — tested, labelled and made good afterwards.",
  },
  {
    slug: "plumbing-services",
    title: "Plumbing Services",
    summary:
      "Leaks, blockages, sanitaryware and pipework, traced to the cause rather than the symptom.",
  },
  {
    slug: "ac-installation-maintenance",
    title: "AC Installation & Maintenance",
    summary:
      "Split and ducted installation, servicing, gas charging, duct cleaning and condensate clearing.",
  },
  {
    slug: "painting-services",
    title: "Painting Services",
    summary:
      "Interior and exterior decoration, with the preparation that decides how long the finish lasts.",
  },
  {
    slug: "carpentry-woodwork",
    title: "Carpentry & Woodwork",
    summary:
      "Fitted wardrobes, doors, shelving and repairs, measured and scribed to the actual opening.",
  },
  {
    slug: "gypsum-ceiling-partition",
    title: "Gypsum Ceiling & Partition",
    summary:
      "False ceilings, partitions, bulkheads and coves, with access panels where they will be needed.",
  },
  {
    slug: "tile-flooring-works",
    title: "Tile & Flooring Works",
    summary:
      "Floor and wall tiling, vinyl and laminate, over substrates levelled and waterproofed first.",
  },
  {
    slug: "general-maintenance",
    title: "General Maintenance",
    summary:
      "Multi-trade repairs and ongoing upkeep under a single point of contact and one invoice.",
  },
];

export const TECHNICAL_SERVICES_HEADING = {
  eyebrow: "Technical services",
  title: "Eight trades we also carry out on their own.",
  lead: "The same in-house teams that finish our own projects are available for maintenance and standalone work — for houses we have built, and for those we have not.",
} as const;
