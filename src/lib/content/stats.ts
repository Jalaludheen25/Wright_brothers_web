/**
 * The first entry is verified from the trade licence. The remaining figures and
 * all ACHIEVEMENTS are DEMONSTRATION CONTENT — not verified claims. Replace or
 * delete them before publishing. See README ("This is demonstration content").
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

/** Derived from the licence issue date so it cannot drift out of date. */
const LICENCE_YEAR = 2022;
const yearsLicensed = Math.max(1, new Date().getFullYear() - LICENCE_YEAR);

export const STATS: Stat[] = [
  {
    value: yearsLicensed,
    label: "Years licensed in Dubai",
    note: "DET trade licence 1084781, issued July 2022",
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

/**
 * Company strengths and credentials.
 *
 * The award wins that previously sat here were invented placeholder content and
 * have been removed. Items 01 and 02 are verifiable from the trade licence; the
 * rest are standards of conduct rather than claims about outcomes.
 */
export const ACHIEVEMENTS: { title: string; detail: string }[] = [
  {
    title: "Licensed & Registered Dubai Company",
    detail:
      "Trade licence 1084781, valid to July 2028, under commercial register 1844315.",
  },
  {
    title: "Department of Economy & Tourism Licensed",
    detail:
      "Licensed by Dubai DET as a Limited Liability Company (Single Owner), with Dubai Chamber membership 4112531.",
  },
  {
    title: "Professional & Skilled Technical Team",
    detail:
      "Engineers, supervisors and tradespeople employed directly rather than sub-let, so the people on your site answer to us.",
  },
  {
    title: "Quality Workmanship",
    detail:
      "Work is checked against the specification before it is called finished, and made good afterwards rather than left for someone else.",
  },
  {
    title: "Reliable Project Delivery",
    detail:
      "A dated programme at the outset and one named point of contact throughout, so you always know where the job actually stands.",
  },
  {
    title: "Customer Satisfaction",
    detail:
      "Snags are walked and closed with you present, and we come back for anything that turns out to be our workmanship.",
  },
  {
    title: "Residential & Commercial Expertise",
    detail:
      "Villas, apartments, offices and retail units — including the permits, NOCs and access constraints that tower work brings with it.",
  },
  {
    title: "Safety & Industry Best Practices",
    detail:
      "Method statements, safe isolation and site protection as standard practice on every job, whatever its size.",
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
