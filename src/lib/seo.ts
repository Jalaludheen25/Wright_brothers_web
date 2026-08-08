import type { Metadata } from "next";
import { COMPANY, CONTACT, SITE, SOCIAL, formattedAddress } from "./site";
import { SERVICES } from "./content/services";
import { TECHNICAL_SERVICES } from "./content/technical-services";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/opengraph-image",
  type = "website",
  publishedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      // Dimensions are deliberately not asserted — page-specific images are
      // real project photography at their own aspect ratios, and declaring a
      // wrong size makes scrapers crop badly.
      images: [{ url: absoluteUrl(image), alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE.name}`,
      description,
      images: [absoluteUrl(image)],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* -------------------------------------------------------------------------- */
/* JSON-LD                                                                     */
/* -------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    foundingDate: COMPANY.issued,
    identifier: {
      "@type": "PropertyValue",
      name: "Trade Licence",
      value: COMPANY.licenceNumber,
    },
    founder: {
      "@type": "Person",
      name: COMPANY.owner,
      jobTitle: "Managing Director",
      nationality: { "@type": "Country", name: COMPANY.ownerNationality },
    },
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/icon.png"),
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "AED 320,000+",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.line1,
      addressLocality: CONTACT.address.line2,
      addressRegion: CONTACT.address.city,
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    areaServed: [
      "Dubai",
      "Emirates Hills",
      "Palm Jumeirah",
      "Jumeirah",
      "Dubai Hills Estate",
      "Al Barari",
      "Arabian Ranches",
      "District One",
    ].map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Design, build and technical services",
      itemListElement: [
        ...SERVICES.map((service) => service.title),
        ...TECHNICAL_SERVICES.map((trade) => trade.title),
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    sameAs: SOCIAL.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-AE",
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "City", name: "Dubai" },
  };
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  author,
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    image: absoluteUrl(image),
    author: { "@type": "Person", name: author },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function projectSchema({
  name,
  description,
  path,
  image,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    creator: { "@id": `${SITE.url}/#organization` },
    locationCreated: { "@type": "Place", name: formattedAddress() },
  };
}

export function reviewSchema(
  reviews: { quote: string; name: string; rating: number }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: reviews.length,
      bestRating: "5",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.quote,
    })),
  };
}
