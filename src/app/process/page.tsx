import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Cta } from "@/components/sections/Cta";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQS } from "@/lib/content/faqs";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Process",
  description:
    "Seven stages from first conversation to ten-year warranty. Survey before price, design before contract, and a written report every Friday of the build.",
  path: "/process",
});

const PROCESS_FAQS = FAQS.filter(
  (f) => f.group === "On site" || f.group === "Cost & contract"
);

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "Process", href: "/process" }]),
          faqSchema(PROCESS_FAQS),
        ]}
      />

      <PageHero
        eyebrow="How we work"
        title="Seven stages. One contract. No gap to *fall into*."
        lead="The first four happen before anybody picks up a tool. That front-loading is the entire reason our sites are quiet and our final accounts land where we said they would."
        image="craft-site"
        crumbs={[{ name: "Process", href: "/process" }]}
      />

      {/* Principle */}
      <Section tone="stone">
        <div className="container-wide grid gap-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-[1fr_1fr]">
          <SectionHeading
            eyebrow="The principle"
            number="01"
            title="Decide it on paper, where changing your mind is free."
          />

          <div className="space-y-6 leading-[1.75] text-slate lg:pt-4">
            <Reveal>
              <p>
                A change at design stage costs an email. The same change once
                the blockwork is up costs demolition, rework, a delay to three
                following trades, and an argument about who should pay for it.
                The cost of a decision rises roughly tenfold at every stage it
                is deferred.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                So we front-load. We survey before we price, we complete the
                design before we sign, and we resolve every socket, every
                joinery run and every drainage fall on a drawing rather than on
                a Tuesday morning with eleven people standing around waiting.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink">
                It makes the beginning feel slow. It is the reason the end
                arrives on time.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="stone" className="pt-0">
        <div className="container-wide">
          <ProcessTimeline />
        </div>
      </Section>

      {/* What you get in writing */}
      <Section tone="ink" className="grain overflow-hidden">
        <div className="container-wide grid gap-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="While we build"
            number="02"
            tone="light"
            title="A report on your desk every Friday."
            lead="Unglamorous, ninety minutes of a project manager's week, and probably the highest-return thing we do."
          />

          <div className="grid gap-px sm:grid-cols-2">
            {[
              {
                title: "Progress, photographed",
                body: "What was completed this week, against what the programme said would be completed. Both numbers, always.",
              },
              {
                title: "The live cost position",
                body: "Contract sum, approved variations, anticipated final account. Three lines, updated weekly, never hidden.",
              },
              {
                title: "Decisions we need",
                body: "Every outstanding decision with the date it must be made by, and what happens to the programme if it slips.",
              },
              {
                title: "What is at risk",
                body: "Named honestly, with the mitigation we propose. A report with no risks on a live site is not a report.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="h-full border-t border-alabaster/15 py-7">
                  <h3 className="display text-[1.5rem] leading-tight text-alabaster">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[38ch] leading-relaxed text-alabaster/55">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="alabaster">
        <div className="container-wide grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Questions"
            number="03"
            title="What people ask about cost and about site."
          />
          <Accordion
            items={PROCESS_FAQS.map((faq) => ({
              id: faq.question,
              title: faq.question,
              meta: faq.group,
              content: <p>{faq.answer}</p>,
            }))}
            defaultOpen={PROCESS_FAQS[0]?.question}
          />
        </div>
      </Section>

      <Cta
        eyebrow="Stage one"
        title="It starts with an hour and no invoice."
        body="The first conversation is free and genuinely non-committal. Roughly a third of them end with us recommending a different firm — which is information worth having either way."
        image="int-minimal-white"
      />
    </>
  );
}
