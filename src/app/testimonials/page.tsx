import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Cta } from "@/components/sections/Cta";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Counter } from "@/components/ui/Counter";
import { JsonLd } from "@/components/ui/JsonLd";
import { TESTIMONIALS } from "@/lib/content/testimonials";
import { buildMetadata, breadcrumbSchema, reviewSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials",
  description:
    "What Wright Brothers clients say about working with us — on cost certainty, site conduct, and what happened after handover.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        schema={[
          reviewSchema(
            TESTIMONIALS.map((t) => ({
              quote: t.quote,
              name: t.name,
              rating: t.rating,
            }))
          ),
          breadcrumbSchema([{ name: "Testimonials", href: "/testimonials" }]),
        ]}
      />

      <PageHero
        eyebrow="In their words"
        title="We asked for the sentence they'd say to a *friend*."
        lead="Not for a review. For the one thing they would actually tell someone considering us over dinner. These are those sentences, unedited."
        image="wb-lounge-pendants"
        crumbs={[{ name: "Testimonials", href: "/testimonials" }]}
      />

      {/* Summary */}
      <Section tone="stone" className="py-[clamp(3rem,2rem+4vw,5rem)]">
        <div className="container-wide">
          <RevealGroup className="grid gap-10 sm:grid-cols-3" stagger={0.08}>
            {[
              {
                value: 5,
                suffix: ".0",
                label: "Average rating",
                note: "Across every project we have asked about",
              },
              {
                value: 94,
                suffix: "%",
                label: "Would recommend",
                note: "Unprompted, at the twelve-month aftercare visit",
              },
              {
                value: 41,
                suffix: "%",
                label: "Come back to us",
                note: "For a second property, or refer a family member",
              },
            ].map((stat) => (
              <RevealItem key={stat.label}>
                <div className="border-t border-ink/12 pt-6">
                  <p className="display text-[clamp(2.5rem,2rem+3vw,4rem)] leading-none text-ink [font-variant-numeric:lining-nums]">
                    <Counter value={stat.value} />
                    <span className="text-brass">{stat.suffix}</span>
                  </p>
                  <p className="mt-4 font-medium text-ink">{stat.label}</p>
                  <p className="mt-1.5 text-sm text-slate">{stat.note}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Carousel */}
      <Section tone="ink" className="grain overflow-hidden">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl">
            <TestimonialsCarousel tone="dark" />
          </div>
        </div>
      </Section>

      {/* All quotes */}
      <Section tone="alabaster">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Every one"
            title="All nine, in full."
            lead="Names are used with permission. Where a client asked us not to identify the property, we haven't."
          />

          <RevealGroup
            className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {TESTIMONIALS.map((t) => (
              <RevealItem key={t.id}>
                <figure className="flex h-full flex-col border-t border-ink/12 pt-7">
                  <span
                    className="flex gap-1 text-brass"
                    role="img"
                    aria-label="Rated 5 out of 5"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-3.5 w-3.5 fill-current"
                      >
                        <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                      </svg>
                    ))}
                  </span>

                  <blockquote className="mt-6 flex-1 leading-[1.75] text-ink/85">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-[0.65rem] tracking-widest text-slate"
                    >
                      {t.initials}
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{t.name}</span>
                      <span className="mt-0.5 block text-sm text-ash">
                        {t.location}
                        {t.project ? (
                          <>
                            {" — "}
                            {t.projectSlug ? (
                              <Link
                                href={`/projects/${t.projectSlug}`}
                                className="link-underline text-brass-deep"
                              >
                                {t.project}
                              </Link>
                            ) : (
                              t.project
                            )}
                          </>
                        ) : null}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-16 max-w-[62ch] text-sm leading-relaxed text-ash">
              We will happily put you in touch with any client on this page, and
              with one whose project went over budget. Ask us at the first
              meeting — the second conversation is usually the more useful one.
            </p>
          </Reveal>
        </div>
      </Section>

      <Cta
        eyebrow="Speak to them yourself"
        title="Ask us for a reference. We'll give you two."
        body="One project that went exactly to plan, and one that did not. Both clients have agreed to take the call, and we do not sit in on it."
        image="wb-workspace-seating"
      />
    </>
  );
}
