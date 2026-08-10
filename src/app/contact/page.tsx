import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQS, FAQ_GROUPS } from "@/lib/content/faqs";
import { CONTACT, SOCIAL, whatsappUrl } from "@/lib/site";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a conversation with Wright Brothers. Studio in Al Barsha First, Dubai, response within one working day, and a first consultation that costs nothing.",
  path: "/contact",
});

const MAP_QUERY = `${CONTACT.geo.lat},${CONTACT.geo.lng}`;
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&z=15&output=embed`;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "Contact", href: "/contact" }]),
          faqSchema(FAQS),
        ]}
      />

      <PageHero
        eyebrow="Start a conversation"
        title="Tell us about the house. We'll tell you the *truth* about it."
        lead="An hour, at your property or at our studio. No charge, no obligation, and a written summary either way."
        image="wb-office-artwork-bar"
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      {/* Form + details */}
      <Section tone="stone">
        <div className="container-wide grid gap-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-[1.35fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Enquiry"
              number="01"
              title="A few details to make the first reply a useful one."
            />
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:pt-4">
            <Reveal>
              <div className="border-t border-ink/15 pt-7">
                <h2 className="label text-ash">Studio</h2>
                <address className="mt-5 leading-[1.8] text-ink not-italic">
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                  <br />
                  {CONTACT.address.city}, {CONTACT.address.country}
                </address>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-10 border-t border-ink/15 pt-7">
                <h2 className="label text-ash">Direct</h2>
                <ul className="mt-5 space-y-3">
                  <li>
                    <a
                      href={`tel:${CONTACT.phoneHref}`}
                      className="link-underline text-ink"
                    >
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="link-underline text-ink"
                    >
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-brass-deep"
                    >
                      WhatsApp the studio
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 border-t border-ink/15 pt-7">
                <h2 className="label text-ash">Hours</h2>
                <dl className="mt-5 space-y-3">
                  {CONTACT.hours.map((slot) => (
                    <div key={slot.days} className="flex justify-between gap-4">
                      <dt className="text-slate">{slot.days}</dt>
                      <dd className="text-right text-ink">{slot.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 border-t border-ink/15 pt-7">
                <h2 className="label text-ash">Follow</h2>
                <ul className="mt-5 space-y-3">
                  {SOCIAL.map((social) => (
                    <li key={social.name} className="flex justify-between gap-4">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-ink"
                      >
                        {social.name}
                      </a>
                      <span className="text-sm text-ash">{social.handle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-10 border-t border-ink/15 pt-7 text-sm leading-relaxed text-ash">
                We take on a limited number of projects each year so that the
                same people can stay on each one. If we are full, we will say so
                in the first reply rather than three months into a design.
              </p>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* Map */}
      <section aria-labelledby="map-heading" className="relative bg-alabaster">
        <div className="container-wide pt-[clamp(3rem,2rem+4vw,6rem)]">
          <h2 id="map-heading" className="display text-h2 text-ink">
            Find the studio
          </h2>
          <p className="mt-4 max-w-[52ch] text-slate">
            {/* TODO(client): add a landmark and a parking note — it is the
                single most useful sentence on a contact page. */}
            Office 301, RAG Tower Business Centre, Al Barsha First. Tell
            reception you are seeing Wright Brothers.
          </p>
        </div>

        <div className="mt-10 h-[clamp(20rem,18rem+14vw,32rem)] w-full">
          <iframe
            title="Map showing the Wright Brothers studio in Al Barsha First, Dubai"
            src={MAP_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale-[35%]"
          />
        </div>
      </section>

      {/* FAQ */}
      <Section tone="alabaster" id="faq">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Questions"
            number="02"
            title="Everything people ask before they commit."
            lead="Grouped by when they usually come up. If yours is not here, it is a good first question for the consultation."
          />

          <div className="mt-14 space-y-14">
            {FAQ_GROUPS.map((group) => (
              <div key={group}>
                <h3 className="label text-brass-deep">{group}</h3>
                <div className="mt-5">
                  <Accordion
                    items={FAQS.filter((f) => f.group === group).map((faq) => ({
                      id: faq.question,
                      title: faq.question,
                      content: <p>{faq.answer}</p>,
                    }))}
                    allowMultiple
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
