import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CONTACT, SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The terms governing your use of the Wright Brothers website, and how they relate to our project contracts.",
  path: "/terms",
});

const SECTIONS = [
  {
    heading: "About this website",
    body: [
      `This site is operated by ${SITE.legalName}, a company licensed in Dubai, United Arab Emirates. By using it you accept the terms set out on this page.`,
    ],
  },
  {
    heading: "Nothing here is a quotation",
    body: [
      "Programme durations, indicative costs and starting prices shown on this site are illustrative ranges based on completed work. They are not offers, estimates or quotations, and they do not form part of any contract.",
      "A binding price is only ever given in writing, against a specification, after a technical survey and a completed design. That document — not this website — is the one that governs the commercial relationship.",
    ],
  },
  {
    heading: "Project information",
    body: [
      "Project descriptions, dimensions and performance figures on this site are demonstration content written to exercise the design. They are not a record of completed work.",
      "Photography is stock imagery licensed for commercial use, pending the client's own project photography.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The design, text, drawings and marks on this site belong to us or to our clients. You are welcome to quote or link to any of it with attribution. You may not reproduce it wholesale, or use it to represent the work of another firm.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "We take care to keep this site accurate, but we do not warrant that it is free of error or continuously available. To the extent permitted by UAE law, we are not liable for loss arising from reliance on information published here rather than on a written contract.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai, and the Dubai courts have exclusive jurisdiction.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        lead="What this website is, and — more importantly — what it is not. Last reviewed August 2026."
        image="abs-geometry"
        crumbs={[{ name: "Terms", href: "/terms" }]}
      />

      <Section tone="stone">
        <div className="container-prose">
          {SECTIONS.map((section) => (
            <section key={section.heading} className="mb-14 last:mb-0">
              <h2 className="display text-h3 text-ink">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-5 leading-[1.85] text-slate">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="border-t border-ink/12 pt-10">
            <h2 className="display text-h3 text-ink">Questions</h2>
            <p className="mt-5 leading-[1.85] text-slate">
              Email{" "}
              <a href={`mailto:${CONTACT.email}`} className="link-underline text-ink">
                {CONTACT.email}
              </a>
              . {CONTACT.licence}.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
