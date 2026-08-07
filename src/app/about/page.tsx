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
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { pad } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Wright Brothers is a Dubai design-and-build practice founded in 2009. Two brothers, one workshop, and a refusal to hand our drawings to somebody else.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "About", href: "/about" }])} />

      <PageHero
        eyebrow="The studio"
        title="Two brothers, one workshop, and a *stubborn* idea."
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
              title="Three years of watching good drawings get built badly."
            />

            <div className="mt-10 max-w-[58ch] space-y-6 leading-[1.75] text-slate">
              <Reveal>
                <p>
                  Daniel Wright arrived in Dubai in 2006 as a structural
                  engineer. Michael followed a year later, off the back of a
                  decade running sites in the north of England. Between them
                  they spent three years working on other people&apos;s villas
                  and watching the same failure repeat: a considered design
                  handed to a contractor with no stake in it, and a client left
                  to arbitrate between two firms who each believed the other was
                  wrong.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  In 2009 — not an obvious year to start a construction company
                  in this city — they started one anyway, on the premise that
                  the interface itself was the problem. Not the architects. Not
                  the builders. The gap between them.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Sixteen years and more than two hundred and forty residences
                  later, the premise has held. We have added a design team, a
                  joinery workshop in Al Quoz and a commercial director whose
                  entire job is to defend the fixed price. What we have not added
                  is a subcontracted design partner, or a second company to blame.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <figure className="mt-14 border-l border-brass/40 pl-7">
                <blockquote className="display text-h3 leading-[1.3] text-ink">
                  &ldquo;We are not trying to be the biggest builder in Dubai.
                  We are trying to be the one whose houses are still right in
                  twenty years.&rdquo;
                </blockquote>
                <figcaption className="label mt-6 text-ash">
                  Daniel Wright — Managing Director
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
              <dl className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <dt className="label text-ash">Founded</dt>
                  <dd className="display mt-3 text-h3 text-ink [font-variant-numeric:lining-nums]">
                    2009
                  </dd>
                </div>
                <div>
                  <dt className="label text-ash">Team</dt>
                  <dd className="display mt-3 text-h3 text-ink [font-variant-numeric:lining-nums]">
                    64
                  </dd>
                </div>
                <div>
                  <dt className="label text-ash">Workshop</dt>
                  <dd className="mt-3 text-ink">Al Quoz Industrial 3</dd>
                </div>
                <div>
                  <dt className="label text-ash">Classification</dt>
                  <dd className="mt-3 text-ink">DM Grade A</dd>
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
            lead="We are a studio of sixty-four. These six are the ones whose decisions shape your project."
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
                  <p className="mt-6 leading-relaxed text-alabaster/55">
                    {member.bio}
                  </p>
                  <p className="label mt-5 text-alabaster/55">{member.since}</p>
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
              eyebrow="Recognition"
              number="04"
              title="Awards, certifications and the paperwork that matters more."
              lead="The classifications at the bottom of this list are considerably harder to get than the awards at the top."
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
                <li key={item.title + item.year} className="border-b border-ink/12">
                  <Reveal delay={i * 0.05}>
                    <div className="grid grid-cols-[4rem_1fr] gap-5 py-6 sm:grid-cols-[5rem_1fr]">
                      <span className="label pt-1 text-brass-deep tabular-nums">
                        {item.year}
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
