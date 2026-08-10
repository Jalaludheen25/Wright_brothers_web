import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Cta } from "@/components/sections/Cta";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StaticImage } from "@/components/ui/ParallaxImage";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SERVICES } from "@/lib/content/services";
import {
  TECHNICAL_SERVICES,
  TECHNICAL_SERVICES_HEADING,
} from "@/lib/content/technical-services";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { pad } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Villa transformations, ground-up custom homes, kitchens and bathrooms, penthouse fit-out, landscape and interior architecture — designed and constructed by one team in Dubai.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Services", href: "/services" }])} />

      <PageHero
        eyebrow="What we do"
        title="Six ways we take on a home — all of them *end to end*."
        lead="Whichever you need, the same team designs it, prices it, permits it and builds it. There is never a second company involved, and never a second number to call."
        image="wb-office-timber-frame"
        crumbs={[{ name: "Services", href: "/services" }]}
      />

      <Section tone="stone">
        <div className="container-wide space-y-[clamp(4rem,3rem+5vw,8rem)]">
          {SERVICES.map((service, i) => (
            <article
              key={service.slug}
              className="grid gap-10 lg:grid-cols-12 lg:gap-14"
            >
              {/* Image — alternates side on desktop */}
              <div
                className={
                  "lg:col-span-5 " +
                  (i % 2 === 1 ? "lg:order-2 lg:col-start-8" : "")
                }
              >
                {/* Presentational only — the heading beside it is the link. */}
                <Reveal direction="none" duration={1.1}>
                  <StaticImage
                    image={service.image}
                    alt=""
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </Reveal>
              </div>

              {/* Copy */}
              <div
                className={
                  "flex flex-col justify-center lg:col-span-6 " +
                  (i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")
                }
              >
                <Reveal>
                  <p className="label flex items-center gap-3 text-brass-deep">
                    <span className="tabular-nums">{pad(service.index)}</span>
                    <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
                    {service.duration}
                  </p>
                </Reveal>

                <Reveal delay={0.05}>
                  <h2 className="display mt-6 text-h2 leading-[1.1] text-ink">
                    <Link
                      href={`/services/${service.slug}`}
                      className="transition-colors duration-500 hover:text-brass"
                    >
                      {service.title}
                    </Link>
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-[52ch] text-lead leading-[1.7] text-slate">
                    {service.intro}
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <dl className="mt-9 grid gap-6 border-t border-ink/12 pt-7 sm:grid-cols-3">
                    <div>
                      <dt className="label text-ash">Typically</dt>
                      <dd className="mt-2 text-sm text-ink">{service.duration}</dd>
                    </div>
                    <div>
                      <dt className="label text-ash">Investment</dt>
                      <dd className="mt-2 text-sm text-ink">{service.from}</dd>
                    </div>
                    <div>
                      <dt className="label text-ash">Best for</dt>
                      <dd className="mt-2 text-sm text-ink">{service.bestFor}</dd>
                    </div>
                  </dl>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-10">
                    <ButtonLink
                      href={`/services/${service.slug}`}
                      variant="outline"
                      arrow
                    >
                      {service.title}
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Technical services — the eight trades, offered standalone */}
      <Section tone="ink" className="grain overflow-hidden">
        <div className="container-wide">
          <SectionHeading
            eyebrow={TECHNICAL_SERVICES_HEADING.eyebrow}
            number="07"
            tone="light"
            title={TECHNICAL_SERVICES_HEADING.title}
            lead={TECHNICAL_SERVICES_HEADING.lead}
          />

          <RevealGroup
            className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {TECHNICAL_SERVICES.map((trade, i) => (
              <RevealItem key={trade.slug}>
                <div className="h-full border-t border-alabaster/15 pt-6">
                  <span className="label text-brass-light tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <h3 className="display mt-4 text-[1.4rem] leading-tight text-alabaster">
                    {trade.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-alabaster/65">
                    {trade.summary}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-14">
            <ButtonLink href="/contact" variant="light" arrow>
              Enquire about technical services
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <Section tone="alabaster">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Not sure which"
            align="center"
            title="Most projects turn out to be a combination."
            lead="Tell us what the house is and what is wrong with it. We will tell you which of these it actually needs — including, sometimes, none of them."
            className="mx-auto"
          />
          <Reveal delay={0.15} className="mt-11 flex justify-center">
            <ButtonLink href="/contact" arrow size="lg">
              Start a conversation
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <Cta />
    </>
  );
}
