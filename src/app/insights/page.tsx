import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { InsightsGrid } from "@/components/sections/InsightsGrid";
import { PostCard } from "@/components/sections/PostCard";
import { Cta } from "@/components/sections/Cta";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { POSTS } from "@/lib/content/insights";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Practical notes on designing and building in Dubai — why budgets move, what keeps a villa cool at 45°C, how permits actually run, and choosing stone slab by slab.",
  path: "/insights",
});

export default function InsightsPage() {
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Insights", href: "/insights" }])} />

      <PageHero
        eyebrow="Insights"
        title="Notes on building well in this *climate*."
        lead="Written by the people who do the work, for owners who would rather understand the decision than be sold it."
        image="abs-geometry"
        crumbs={[{ name: "Insights", href: "/insights" }]}
      />

      {/* Featured */}
      <Section tone="stone">
        <div className="container-wide">
          <Reveal>
            {/* A real heading, so the featured card's h3 has an h2 above it. */}
            <h2 className="label text-brass-deep">Editor&apos;s pick</h2>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
            <PostCard post={featured} size="large" />
            <div className="hidden lg:block">
              <blockquote className="display border-l border-brass/40 pl-7 text-h3 leading-[1.3] text-ink">
                &ldquo;A free survey is not a survey. It is a sales visit with a
                tape measure.&rdquo;
              </blockquote>
              <p className="label mt-6 pl-7 text-ash">
                From &ldquo;Why Dubai renovation budgets move&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* All */}
      <Section tone="alabaster">
        <div className="container-wide">
          <SectionHeading eyebrow="The archive" title="Everything we've published." />
          <div className="mt-14">
            <InsightsGrid />
          </div>
        </div>
      </Section>

      <Cta
        eyebrow="The quarterly"
        title="Four letters a year, and nothing else."
        body="No promotions and no drip sequence — four pieces a year on building well in this climate, and one click to leave. Subscribe at the foot of any page."
        image="ext-facade-detail"
      />
    </>
  );
}
