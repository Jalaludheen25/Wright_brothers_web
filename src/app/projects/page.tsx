import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { BeforeAfterSection } from "@/components/sections/BeforeAfter";
import { Cta } from "@/components/sections/Cta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Completed workspace fit-out, glass and aluminium partitioning and MEP installation across Dubai and Dubai Investment Park — each with the problem it had to solve.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Projects", href: "/projects" }])} />

      <PageHero
        eyebrow="Selected work"
        title="Completed work, and the problem each job had to *solve*."
        lead="We do not publish everything we build — many of our clients would rather we didn't. These are the ones we can show, described honestly."
        image="ext-canopy-dark"
        crumbs={[{ name: "Projects", href: "/projects" }]}
      />

      <Section tone="stone">
        <div className="container-wide">
          {/* useSearchParams needs a boundary; the grid renders instantly, so
              the fallback is only ever a paint frame. */}
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            <ProjectGrid />
          </Suspense>
        </div>
      </Section>

      <Section tone="alabaster">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Before & after"
            title="The same room, photographed from the same spot."
            lead="Drag the handle. What you can see is usually the smaller half of the work."
          />
          <div className="mt-14">
            <BeforeAfterSection />
          </div>
        </div>
      </Section>

      <Cta
        eyebrow="Your project next"
        title="Every one of these started as a conversation."
        image="ext-pool-terrace"
      />
    </>
  );
}
