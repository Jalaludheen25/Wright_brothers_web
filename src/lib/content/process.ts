import type { ImageKey } from "@/lib/images";

export type ProcessStage = {
  number: number;
  title: string;
  duration: string;
  summary: string;
  detail: string;
  deliverables: string[];
  image: ImageKey;
};

export const PROCESS: ProcessStage[] = [
  {
    number: 1,
    title: "Conversation",
    duration: "Week 0 · No charge",
    summary:
      "An hour, at the house or at our studio, to establish whether this is a project we should take on.",
    detail:
      "We ask what you want the house to do, not what you want it to look like. We will tell you honestly whether your budget and your brief are in the same room — and if they are not, we will say so before you have spent anything. Roughly a third of these conversations end with us recommending someone else.",
    deliverables: [
      "Written summary of the brief as we understood it",
      "An indicative cost range, with its assumptions stated",
      "A go / no-go recommendation",
    ],
    image: "abs-geometry",
  },
  {
    number: 2,
    title: "Survey",
    duration: "Weeks 1 — 3 · Paid",
    summary:
      "We measure the building and open it up. This is the stage most firms skip, and the reason most Dubai budgets move.",
    detail:
      "A laser-measured model of the existing structure, drainage traced and CCTV-surveyed, the distribution board and cooling plant assessed, and selected opening-up works to see what is behind the finishes. On new-build plots this becomes a site, levels and services survey instead.",
    deliverables: [
      "Measured survey and point-cloud model",
      "Structural and MEP condition report",
      "Photographic record of opening-up works",
      "Risk register with costed contingencies",
    ],
    image: "craft-site",
  },
  {
    number: 3,
    title: "Design",
    duration: "Weeks 4 — 12",
    summary:
      "The house is drawn in full — every plan, every elevation, every junction — before a price is fixed.",
    detail:
      "Concept, then developed design, then a complete technical package. You see the house in three dimensions and walk through it before it exists. We resolve joinery, lighting circuits, drainage falls and socket positions now, on paper, where changes are free.",
    deliverables: [
      "Full architectural and interior drawing package",
      "3D visualisations and a walkthrough",
      "Material and finishes schedule with physical samples",
      "Structural, MEP and façade engineering",
    ],
    image: "int-minimal-white",
  },
  {
    number: 4,
    title: "Fixed Price",
    duration: "Weeks 12 — 14",
    summary:
      "One number, built up from a complete design and a real bill of quantities. Not an estimate.",
    detail:
      "Because the design is finished and the building has been surveyed, we can commit. You receive a fully itemised price against a defined specification, a programme with dated milestones, and a single contract covering both design and construction. From here, the price only moves if you move it.",
    deliverables: [
      "Itemised fixed-price tender",
      "Dated construction programme",
      "Single design-and-build contract",
      "Payment schedule tied to milestones",
    ],
    image: "abs-facade",
  },
  {
    number: 5,
    title: "Permits",
    duration: "Weeks 14 — 22",
    summary:
      "Authority submissions, NOCs and community approvals — handled entirely by us.",
    detail:
      "Dubai Municipality or the relevant free-zone authority, DEWA, the community developer, and — for tower work — the building management company. We hold the relationships and we absorb the waiting. You are told what has been submitted and what has come back, and nothing else lands on you.",
    deliverables: [
      "All authority submissions and approvals",
      "Developer and community NOCs",
      "Contractor insurances and site set-up",
      "Confirmed start-on-site date",
    ],
    image: "ext-facade-detail",
  },
  {
    number: 6,
    title: "Build",
    duration: "The programme",
    summary:
      "Our own site team, our own joinery workshop, and a report on your desk every Friday.",
    detail:
      "A named project manager on site daily. Structure, services, finishes and joinery sequenced against the programme. Every Friday you receive progress photographs, the position against programme, the live cost position, and any decision we need from you in the coming fortnight — with a deadline against each one.",
    deliverables: [
      "Weekly written and photographic progress report",
      "Live cost and programme position",
      "Monthly site walkthrough with your project manager",
      "Quality inspections at every stage gate",
    ],
    image: "craft-artisan",
  },
  {
    number: 7,
    title: "Handover",
    duration: "Final 4 weeks, then 10 years",
    summary:
      "Commissioned, snagged, documented — and warranted long after we have left.",
    detail:
      "Every system is commissioned and tested with you present. We snag the house ourselves before you see it, and then again with you. You receive a complete handover pack, an hour of instruction on how the house works, and a warranty that does not expire the moment the last invoice is paid.",
    deliverables: [
      "Full commissioning and testing records",
      "Two-stage snagging, ours then yours",
      "O&M manuals, as-built drawings and warranties",
      "10-year structural and 5-year workmanship warranty",
      "12-month aftercare visit, scheduled at handover",
    ],
    image: "int-living-glass",
  },
];
