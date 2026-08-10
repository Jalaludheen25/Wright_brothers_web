import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Cta } from "@/components/sections/Cta";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { VideoGallery } from "@/components/gallery/VideoGallery";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { GALLERY } from "@/lib/content/gallery";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Photographs and walkthrough films of completed Wright Brothers work across Dubai — workspace fit-out, glass and aluminium partitioning, reception and lounge, retail, and MEP installation.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([{ name: "Gallery", href: "/gallery" }])}
      />

      <PageHero
        eyebrow="Gallery"
        title="The work, *photographed* on handover."
        lead={`${GALLERY.length} photographs and three walkthrough films from completed projects across Dubai. No stock, no renders.`}
        image="wb-retail-wall"
        crumbs={[{ name: "Gallery", href: "/gallery" }]}
      />

      {/* Films first — three cards, and the strongest thing on the page */}
      <Section tone="ink" className="grain overflow-hidden">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Films"
            number="01"
            tone="light"
            title="Three walkthroughs, start to finish."
            lead="Shot on completion and cut short. Nothing plays until you choose it."
          />
          <div className="mt-16">
            <VideoGallery />
          </div>
        </div>
      </Section>

      {/* Photographs */}
      <Section tone="ink" className="grain overflow-hidden pt-0">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Photographs"
            number="02"
            tone="light"
            title="Filter by trade, or take the lot in order."
            lead="Select any frame to open it full screen. Arrow keys move through the set; on a phone, swipe."
          />
          <div className="mt-14">
            <GalleryGrid />
          </div>
        </div>
      </Section>

      <Cta
        eyebrow="Your project next"
        title="If you would like this standard on your own job."
        image="wb-lounge-wide"
      />
    </>
  );
}
