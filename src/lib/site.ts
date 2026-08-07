/**
 * Single source of truth for brand, contact and navigation data.
 *
 * Company registration, address, phone and email are VERIFIED client data.
 * The canonical URL, social profiles, opening hours and the WhatsApp number
 * are still assumptions — see README ("Going live").
 */

export const SITE = {
  name: "Wright Brothers",
  legalName: "Wright Brothers Technical Services L.L.C.",
  shortName: "Wright Brothers",
  tagline: "Design & Build — Dubai",
  /** Used for canonical URLs, sitemap, JSON-LD and OG tags. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wrightbrothers.ae",
  locale: "en_AE",
  description:
    "Wright Brothers is a residential design-and-build atelier in Dubai. One team draws your villa in full, then builds it — from first sketch to final handover.",
} as const;

export const CONTACT = {
  /* --- Client-supplied, real --------------------------------------------- */
  email: "info@wbtechuae.com",
  phone: "+971 52 898 5055",
  phoneHref: "+971528985055",
  /** Assumed to be the same mobile number. Confirm before launch. */
  whatsapp: "971528985055",
  address: {
    line1: "301, RAG Tower Business Centre",
    line2: "Al Barsha First",
    city: "Dubai",
    country: "United Arab Emirates",
  },

  /* --- Still placeholders — see README ("Going live") --------------------- */
  careersEmail: "info@wbtechuae.com",
  whatsappMessage:
    "Hello Wright Brothers — I'd like to discuss a residential project in Dubai.",
  /**
   * Approximate Al Barsha First coordinates. Replace with the exact pin from
   * the Google Business Profile so the map and LocalBusiness schema agree.
   */
  geo: { lat: 25.1123, lng: 55.1975 },
  hours: [
    { days: "Sunday — Thursday", time: "09:00 — 18:00" },
    { days: "Saturday", time: "By appointment" },
    { days: "Friday", time: "Closed" },
  ],
  licence: "Dubai Economy & Tourism · Trade Licence 1084781",
} as const;

/**
 * Verified trade-licence record, as issued by the Department of Economy &
 * Tourism, Dubai. Rendered on the About page and in the LocalBusiness schema.
 */
export const COMPANY = {
  legalName: "Wright Brothers Technical Services L.L.C.",
  activity: "Wright Brothers Technical Services LLC",
  licenceNumber: "1084781",
  licenceAuthority: "Department of Economy & Tourism, Dubai",
  legalType: "Limited Liability Company – Single Owner (LLC - SO)",
  issued: "2022-07-28",
  expires: "2028-07-27",
  issuedLabel: "28 July 2022",
  expiresLabel: "27 July 2028",
  dcciNumber: "4112531",
  registerNumber: "1844315",
  owner: "Jinto Parakka Jose Jose",
  ownerRole: "Owner & CEO",
  ownerNationality: "India",
} as const;

export const SOCIAL = [
  { name: "Instagram", href: "https://instagram.com/wrightbrothers.ae", handle: "@wrightbrothers.ae" },
  { name: "LinkedIn", href: "https://linkedin.com/company/wrightbrothers-ae", handle: "Wright Brothers" },
  { name: "Pinterest", href: "https://pinterest.com/wrightbrothersae", handle: "Wright Brothers" },
  { name: "YouTube", href: "https://youtube.com/@wrightbrothersae", handle: "Wright Brothers" },
] as const;

export type NavItem = {
  label: string;
  href: string;
  /** Shown in the mega-menu / mobile nav under the label. */
  blurb?: string;
};

export const NAV: NavItem[] = [
  { label: "About", href: "/about", blurb: "The people, the standard, the studio" },
  { label: "Services", href: "/services", blurb: "What we take on, end to end" },
  { label: "Projects", href: "/projects", blurb: "Completed private residences" },
  { label: "Process", href: "/process", blurb: "Seven stages, one contract" },
  { label: "Testimonials", href: "/testimonials", blurb: "In our clients' words" },
  { label: "Insights", href: "/insights", blurb: "Notes on building in Dubai" },
  { label: "Contact", href: "/contact", blurb: "Start a conversation" },
];

export const FOOTER_LINKS = {
  studio: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Full Villa Transformation", href: "/services/villa-transformation" },
    { label: "Ground-Up Custom Homes", href: "/services/custom-homes" },
    { label: "Kitchens & Bathrooms", href: "/services/kitchens-bathrooms" },
    { label: "Penthouse & Apartment Fit-Out", href: "/services/penthouse-fit-out" },
    { label: "Landscape & Outdoor Living", href: "/services/landscape-outdoor" },
    { label: "Interior Architecture", href: "/services/interior-architecture" },
  ],
  areas: [
    { label: "Emirates Hills", href: "/projects?area=Emirates+Hills" },
    { label: "Palm Jumeirah", href: "/projects?area=Palm+Jumeirah" },
    { label: "Jumeirah", href: "/projects?area=Jumeirah" },
    { label: "Dubai Hills Estate", href: "/projects?area=Dubai+Hills+Estate" },
    { label: "Al Barari", href: "/projects?area=Al+Barari" },
    { label: "Arabian Ranches", href: "/projects?area=Arabian+Ranches" },
  ],
} as const;

export function whatsappUrl(message: string = CONTACT.whatsappMessage) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formattedAddress() {
  const a = CONTACT.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.country}`;
}
