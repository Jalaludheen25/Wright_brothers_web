/**
 * Single source of truth for brand, contact and navigation data.
 *
 * NOTE: these are PLACEHOLDER details for a demonstration build, not a real
 * trading company. See README ("Going live") before publishing anything here.
 */

export const SITE = {
  name: "Wright Brothers",
  legalName: "Wright Brothers Design & Build LLC",
  shortName: "Wright Brothers",
  tagline: "Design & Build — Dubai",
  /** Used for canonical URLs, sitemap, JSON-LD and OG tags. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wrightbrothers.ae",
  locale: "en_AE",
  description:
    "Wright Brothers is a residential design-and-build atelier in Dubai. One team draws your villa in full, then builds it — from first sketch to final handover.",
  founded: "2009",
} as const;

export const CONTACT = {
  email: "studio@wrightbrothers.ae",
  careersEmail: "careers@wrightbrothers.ae",
  phone: "+971 4 512 8800",
  phoneHref: "+97145128800",
  whatsapp: "971501284400",
  whatsappMessage:
    "Hello Wright Brothers — I'd like to discuss a residential project in Dubai.",
  address: {
    line1: "Boulevard Plaza Tower 1, Level 14",
    line2: "Downtown Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    postalCode: "00000",
  },
  /** Downtown Dubai — used by the map embed and LocalBusiness schema. */
  geo: { lat: 25.1972, lng: 55.2744 },
  hours: [
    { days: "Sunday — Thursday", time: "09:00 — 18:00" },
    { days: "Saturday", time: "By appointment" },
    { days: "Friday", time: "Closed" },
  ],
  licence: "Dubai Economy & Tourism · Trade Licence 000000",
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
