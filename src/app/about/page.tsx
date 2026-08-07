import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Cta } from "@/components/sections/Cta";
import { Stats } from "@/components/sections/Stats";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ParallaxImage, StaticImage } from "@/components/ui/ParallaxImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { TEAM, VALUES } from "@/lib/content/team";
import { ACHIEVEMENTS } from "@/lib/content/stats";
import { COMPANY } from "@/lib/site";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { pad } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Wright Brothers Technical Services L.L.C. is a Dubai design-and-build practice, licensed by the Department of Economy & Tourism and led by Jinto Parakka Jose Jose.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "About", href: "/about" }])} />

      <PageHero
        eyebrow="The studio"
        title="One team, one contract, and a *stubborn* idea."
        lead="That the people who design a house should be the people who build it — and should still be standing on site the day it is handed over."
        image="int-concrete-glass"
        crumbs={[{ name: "About", href: "/about" }]}
      />

      {/* Origin */}
      <Section tone="stone">
        <div className="container-wide grid gap-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Where this came from"
              number="01"
              title="One practice, responsible for the drawing and the building."
            />

            <div className="mt-10 max-w-[58ch] space-y-6 leading-[1.75] text-slate">
              <Reveal>
                <p>
                  {COMPANY.legalName} is a Dubai practice owned and led by{" "}
                  {COMPANY.owner}, licensed by the {COMPANY.licenceAuthority}{" "}
                  and working across residential and commercial property in the
                  emirate.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  Most residential work here is split in two. An architect draws
                  the project and hands it to a contractor who had no part in
                  the thinking. When the two disagree — and they always do — the
                  person paying for both is the one left to arbitrate between
                  them.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  So the interface was removed rather than managed. Design and
                  construction sit under a single agreement, carried out by our
                  own teams. There is no subcontracted design partner and no
                  second company to blame, which tends to concentrate the mind.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <figure className="mt-14 border-l border-brass/40 pl-7">
                {/* TODO(client): placeholder wording. Confirm with Jinto, or
                    replace with a sentence in his own words, before launch. */}
                <blockquote className="display text-h3 leading-[1.3] text-ink">
                  &ldquo;We are not trying to be the biggest builder in Dubai.
                  We are trying to be the one whose houses are still right in
                  twenty years.&rdquo;
                </blockquote>
                <figcaption className="label mt-6 text-ash">
                  {COMPANY.owner} — Founder &amp; CEO
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="none" duration={1.2}>
              <ParallaxImage
                image="craft-site"
                alt="A Wright Brothers site team walking a newly poured slab at first light"
                className="aspect-[3/4] w-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
                amount={14}
              />
            </Reveal>

            <Reveal delay={0.15}>
              {/* Verified trade-licence record */}
              <dl className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <dt className="label text-ash">Licence No.</dt>
                  <dd className="display mt-3 text-h3 text-ink [font-variant-numeric:lining-nums]">
                    {COMPANY.licenceNumber}
                  </dd>
                </div>
                <div>
                  <dt className="label text-ash">DCCI No.</dt>
                  <dd className="display mt-3 text-h3 text-ink [font-variant-numeric:lining-nums]">
                    {COMPANY.dcciNumber}
                  </dd>
                </div>
                <div>
                  <dt className="label text-ash">Register No.</dt>
                  <dd className="mt-3 text-ink [font-variant-numeric:lining-nums]">
                    {COMPANY.registerNumber}
                  </dd>
                </div>
                <div>
                  <dt className="label text-ash">Legal type</dt>
                  <dd className="mt-3 text-ink">{COMPANY.legalType}</dd>
                </div>
                <div>
                  <dt className="label text-ash">Licensed</dt>
                  <dd className="mt-3 text-ink">
                    {COMPANY.issuedLabel} — {COMPANY.expiresLabel}
                  </dd>
                </div>
                <div>
                  <dt className="label text-ash">{COMPANY.ownerRole}</dt>
                  <dd className="mt-3 text-ink">{COMPANY.owner}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      <Stats />

      {/* Values */}
      <Section tone="alabaster">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What we hold to"
            number="02"
            title="Six commitments, and the reasoning behind each."
            lead="These are not values in the poster sense. Each one costs us something, which is how we know we mean them."
          />

          <RevealGroup
            className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {VALUES.map((value, i) => (
              <RevealItem key={value.title}>
                <div className="border-t border-ink/12 pt-6">
                  <span className="label text-brass-deep tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <h3 className="display mt-4 text-h3 leading-tight text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate">{value.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Team */}
      <Section tone="ink" className="grain overflow-hidden">
        <div className="container-wide">
          <SectionHeading
            eyebrow="The people"
            number="03"
            tone="light"
            title="You will meet all of these people. Most of them, repeatedly."
            lead="The team behind every project — office, engineering and site."
          />

          <RevealGroup
            className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {TEAM.map((member) => (
              <RevealItem key={member.name}>
                <article className="border-t border-alabaster/15 pt-7">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-alabaster/25 text-xs tracking-widest text-alabaster/75"
                    >
                      {member.initials}
                    </span>
                    <div>
                      <h3 className="display text-[1.5rem] leading-tight text-alabaster">
                        {member.name}
                      </h3>
                      <p className="label mt-1.5 text-brass-light">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  {member.bio ? (
                    <p className="mt-6 leading-relaxed text-alabaster/55">
                      {member.bio}
                    </p>
                  ) : null}
                  {member.since ? (
                    <p className="label mt-5 text-alabaster/55">{member.since}</p>
                  ) : null}
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Recognition */}
      <Section tone="stone">
        <div className="container-wide grid gap-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="What we bring"
              number="04"
              title="Licensed, directly staffed, and accountable for the whole of it."
              lead="Not awards. The things a client can verify before signing, and the standards we hold ourselves to on every job after."
            />

            <Reveal delay={0.2} className="mt-12">
              <StaticImage
                image="ext-white-minimal"
                alt="A white rendered villa with deep-set openings, shot against a clear sky"
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </Reveal>
          </div>

          <div>
            <ul className="border-t border-ink/12">
              {ACHIEVEMENTS.map((item, i) => (
                <li key={item.title} className="border-b border-ink/12">
                  <Reveal delay={i * 0.05}>
                    <div className="grid grid-cols-[4rem_1fr] gap-5 py-6 sm:grid-cols-[5rem_1fr]">
                      {/* Same slot the year occupied, so the grid is unchanged. */}
                      <span className="label pt-1 text-brass-deep tabular-nums">
                        {pad(i + 1)}
                      </span>
                      <div>
                        <h3 className="text-base font-medium text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Cta
        eyebrow="Work with us"
        title="If any of this sounds like the way you'd want it done."
        image="ext-dusk-entry"
      />
    </>
  );
}
