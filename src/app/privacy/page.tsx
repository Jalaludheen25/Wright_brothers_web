import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CONTACT, SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Wright Brothers collects, uses and stores the personal information you share with us.",
  path: "/privacy",
});

const SECTIONS = [
  {
    heading: "What we collect",
    body: [
      "When you submit an enquiry we collect the name, email address, telephone number and project details you choose to give us. When you subscribe to The Quarterly we collect your email address only.",
      "Our website records standard, aggregated traffic information — pages viewed, approximate region, device type. This is not tied to you as an individual and we do not use advertising trackers or third-party marketing cookies.",
    ],
  },
  {
    heading: "Why we hold it",
    body: [
      "To reply to your enquiry, to prepare a proposal, and — if you become a client — to deliver and warrant your project. We hold project records for the duration of the warranty period because we may need them to honour it.",
      "We do not sell, rent or share your details with third parties for marketing. Where a project requires us to name you to an authority or a supplier, we ask you first.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiries that do not proceed are deleted after twenty-four months. Client project records are held for the life of the structural warranty, which is ten years from practical completion. Newsletter subscriptions are held until you unsubscribe.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You may ask us at any time for a copy of what we hold about you, ask us to correct it, or ask us to delete it. One line by email is enough, and we will action it within thirty days.",
      "Every email we send includes a working unsubscribe link. Using it removes you immediately and permanently.",
    ],
  },
  {
    heading: "Third-party services",
    body: [
      "This site embeds a Google Maps frame on the contact page. Loading that page will share your IP address with Google under their own privacy terms. No other third-party service receives your data through this website.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead="Short, because we collect very little. Last reviewed August 2026."
        image="abs-facade"
        crumbs={[{ name: "Privacy", href: "/privacy" }]}
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
            <h2 className="display text-h3 text-ink">Contact us about this</h2>
            <p className="mt-5 leading-[1.85] text-slate">
              Write to{" "}
              <a href={`mailto:${CONTACT.email}`} className="link-underline text-ink">
                {CONTACT.email}
              </a>{" "}
              or to {SITE.legalName}, {CONTACT.address.line1},{" "}
              {CONTACT.address.line2}, {CONTACT.address.city}.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
