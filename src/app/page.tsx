import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Stats } from "@/components/sections/Stats";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { CapabilitiesShowcase } from "@/components/sections/capabilities/CapabilitiesShowcase";
import { BeforeAfterSection } from "@/components/sections/BeforeAfter";
import { ProcessPreview } from "@/components/sections/ProcessTimeline";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { PostCard } from "@/components/sections/PostCard";
import { Cta } from "@/components/sections/Cta";
import { Accordion } from "@/components/ui/Accordion";
import { FaqAnswer } from "@/components/ui/FaqAnswer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { POSTS } from "@/lib/content/insights";
import { FAQS } from "@/lib/content/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Luxury Residential Design & Build in Dubai",
  description:
    "Wright Brothers designs and builds private residences across Dubai. One team draws your villa in full, then constructs it — fixed price, ten-year warranty, no gap between design and site.",
  path: "/",
});

/**
 * Six of the twenty-five, chosen to span the arc of an enquiry. Matched by
 * question text, so these strings must track `lib/content/faqs.ts` — the
 * assertion below fails the build rather than silently rendering an empty
 * accordion if one is renamed.
 */
const HOME_FAQ_QUESTIONS = [
  "What does Design & Build mean?",
  "Is there a minimum project size or budget?",
  "How is the quotation prepared?",
  "How long does an interior fit-out project take?",
  "Do you handle MEP works?",
  "What warranty do you provide?",
];

const HOME_FAQS = FAQS.filter((f) => HOME_FAQ_QUESTIONS.includes(f.question));

if (HOME_FAQS.length !== HOME_FAQ_QUESTIONS.length) {
  throw new Error(
    `Home FAQ selection is stale: ${HOME_FAQ_QUESTIONS.filter(
      (q) => !FAQS.some((f) => f.question === q)
    ).join(", ")}`
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={faqSchema(HOME_FAQS)} />

      <Hero />
      <Manifesto />
      <Stats />

      {/* Services */}
      <Section tone="alabaster" id="services">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What we do"
            number="02"
            title="Six ways we take on a *home*."
            lead="Every one of them is designed and constructed by the same team, under one contract, with a single number to call."
          />

          <div className="mt-16">
            <ServicesIndex />
          </div>

          <Reveal delay={0.1} className="mt-14">
            <ButtonLink href="/services" variant="outline" arrow>
              All services in detail
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Selected work */}
      <Section tone="stone" id="work">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Selected work"
              number="03"
              title="Three projects, and what each one had to *solve*."
              className="flex-1"
            />
            <Reveal delay={0.15}>
              <ButtonLink href="/projects" variant="outline" arrow>
                All projects
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-16">
            <ProjectShowcase />
          </div>
        </div>
      </Section>

      {/* In-house disciplines — pinned horizontal scrub on desktop */}
      <CapabilitiesShowcase />

      {/* Before & after */}
      <Section tone="alabaster">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Before & after"
            number="05"
            title="The same room, photographed from the same spot."
            lead="Drag the handle. The visible change is usually the smaller half of the work — the rest is behind the plaster."
          />

          <div className="mt-16">
            <BeforeAfterSection />
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="ink" className="grain overflow-hidden">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How we work"
            number="06"
            tone="light"
            title="Seven stages. One contract. No gap to fall into."
            lead="The first four happen before anybody picks up a tool — which is precisely why the last three run quietly."
          />

          <div className="mt-16">
            <ProcessPreview />
          </div>

          <Reveal delay={0.1} className="mt-14">
            <ButtonLink href="/process" variant="light" arrow>
              The process in full
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="stone">
        <div className="container-wide">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <SectionHeading
              eyebrow="In their words"
              number="07"
              title="Nine clients, unedited."
              lead="We asked for the sentence they would say to a friend considering us. These are those sentences."
            />

            <div className="lg:pt-4">
              <TestimonialsCarousel tone="light" />
            </div>
          </div>

          <Reveal delay={0.1} className="mt-16">
            <ButtonLink href="/testimonials" variant="outline" arrow>
              Read all testimonials
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Insights */}
      <Section tone="alabaster">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Insights"
              number="08"
              title="Notes on building well in this climate."
              className="flex-1"
            />
            <Reveal delay={0.15}>
              <ButtonLink href="/insights" variant="outline" arrow>
                All insights
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="stone" id="faq">
        <div className="container-wide">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Questions"
                number="09"
                title="The things people ask before they commit."
              />
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-[40ch] text-slate">
                  Anything not covered here, ask us directly — we would rather
                  answer it now than have it become a surprise later.
                </p>
                <Link
                  href="/contact#faq"
                  className="link-underline label mt-7 inline-block text-ink"
                >
                  See all questions
                </Link>
              </Reveal>
            </div>

            <Accordion
              items={HOME_FAQS.map((faq) => ({
                id: faq.question,
                title: faq.question,
                content: <FaqAnswer faq={faq} />,
              }))}
              defaultOpen={HOME_FAQS[0]?.question}
            />
          </div>
        </div>
      </Section>

      <Cta />
    </>
  );
}
