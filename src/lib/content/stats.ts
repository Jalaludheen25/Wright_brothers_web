/**
 * DEMONSTRATION CONTENT. These figures and award wins are written to exercise
 * the design — they are not verified claims. Replace before publishing.
 */

export type Stat = {
  value: number;
  /** Rendered after the counted value, e.g. "+" or "%". */
  suffix?: string;
  prefix?: string;
  label: string;
  note: string;
  /** Decimal places to animate to. */
  decimals?: number;
};

export const STATS: Stat[] = [
  {
    value: 16,
    label: "Years building in Dubai",
    note: "Founded in 2009, through every cycle since",
  },
  {
    value: 240,
    suffix: "+",
    label: "Residences completed",
    note: "Villas, penthouses and ground-up homes",
  },
  {
    value: 98,
    suffix: "%",
    label: "Delivered on programme",
    note: "Measured against the dated programme issued at contract",
  },
  {
    value: 2,
    suffix: "%",
    label: "Average cost variance",
    note: "Final account against the fixed price, last 40 projects",
  },
];

export const ACHIEVEMENTS = [
  {
    year: "2025",
    title: "Middle East Architect Awards",
    detail: "Residential Project of the Year — shortlisted, Sarab House",
  },
  {
    year: "2024",
    title: "Commercial Interior Design Awards",
    detail: "Residential Interior of the Year — winner, Al Marsa Penthouse",
  },
  {
    year: "2024",
    title: "Emirates Green Building Council",
    detail: "Certified member — low-energy residential practice",
  },
  {
    year: "2023",
    title: "Identity Design Awards",
    detail: "Renovation of the Year — winner, Barajeel Villa",
  },
  {
    year: "2022",
    title: "Dubai Municipality",
    detail: "Grade A contractor classification, unrestricted residential",
  },
  {
    year: "2019",
    title: "ISO 9001 & ISO 45001",
    detail: "Quality and occupational health management, certified since",
  },
];

/** Small trust row used under the hero. */
export const CREDENTIALS = [
  "Dubai Municipality Grade A Contractor",
  "ISO 9001 · ISO 45001 Certified",
  "10-Year Structural Warranty",
  "Emirates Green Building Council",
  "Fully Insured & Bonded",
];
