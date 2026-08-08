import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Cta } from "@/components/sections/Cta";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ParallaxImage, StaticImage } from "@/components/ui/ParallaxImage";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SERVICES, getService } from "@/lib/content/services";
import { PROJECTS } from "@/lib/content/projects";
import { buildMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { pad } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service)
    return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  // Projects that plausibly demonstrate this service.
  const related = PROJECTS.slice(0, 3);

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: service.title,
            description: service.summary,
            path: `/services/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: "Services", href: "/services" },
            { name: service.title, href: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`Service ${pad(service.index)}`}
        title={service.title}
        lead={service.intro}
        image={service.image}
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <Reveal delay={0.45}>
          <dl className="mt-12 grid gap-8 border-t border-alabaster/15 pt-8 sm:grid-cols-3">
            <div>
              <dt className="label text-alabaster/55">Programme</dt>
              <dd className="mt-3 text-alabaster">{service.duration}</dd>
            </div>
            <div>
              <dt className="label text-alabaster/55">Investment</dt>
              <dd className="mt-3 text-alabaster">{service.from}</dd>
            </div>
            <div>
              <dt className="label text-alabaster/55">Best for</dt>
              <dd className="mt-3 text-alabaster">{service.bestFor}</dd>
            </div>
          </dl>
        </Reveal>
      </PageHero>

      {/* Highlights */}
      <Section tone="stone">
        <div className="container-wide grid gap-[clamp(3rem,2rem+4vw,5rem)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="What makes the difference"
              number="01"
              title="Three things we do here that most firms do not."
            />

            <div className="mt-14 space-y-12">
              {service.highlights.map((highlight, i) => (
                <Reveal key={highlight.title} delay={i * 0.06}>
                  <div className="grid grid-cols-[3rem_1fr] gap-5 border-t border-ink/12 pt-7">
                    <span className="label pt-1 text-brass-deep tabular-nums">
                      {pad(i + 1)}
                    </span>
                    <div>
                      <h3 className="display text-h3 leading-tight text-ink">
                        {highlight.title}
                      </h3>
                      <p className="mt-4 max-w-[54ch] leading-[1.75] text-slate">
                        {highlight.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="none" duration={1.2}>
              <ParallaxImage
                image={service.secondaryImage}
                alt=""
                className="aspect-[3/4] w-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
                amount={14}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Deliverables */}
      <Section tone="ink" className="grain overflow-hidden">
        <div className="container-wide grid gap-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Scope"
            number="02"
            tone="light"
            title="Everything included, written down."
            lead="This list is the contract's table of contents. If something you expect is not on it, ask us before you sign — not after."
          />

          <RevealGroup className="grid gap-px sm:grid-cols-2" stagger={0.05}>
            {service.deliverables.map((item, i) => (
              <RevealItem key={item}>
                <div className="flex h-full gap-5 border-t border-alabaster/15 py-6">
                  <span className="label shrink-0 text-brass-light tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <p className="leading-relaxed text-alabaster/75">{item}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Related projects */}
      <Section tone="alabaster">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Seen in practice"
              number="03"
              title="Houses where this work is on show."
              className="flex-1"
            />
            <Reveal delay={0.15}>
              <ButtonLink href="/projects" variant="outline" arrow>
                All projects
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.07}>
                <article className="group">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <StaticImage
                      image={project.cover}
                      alt=""
                      className="aspect-[4/3] w-full"
                      imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <p className="label mt-5 text-ash">
                      {project.area}
                      {project.year ? ` · ${project.year}` : ""}
                    </p>
                    <h3 className="display mt-3 text-h3 leading-tight text-ink transition-colors duration-500 group-hover:text-brass-deep">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate">
                      {project.strapline}
                    </p>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Other services */}
      <Section tone="stone">
        <div className="container-wide">
          <SectionHeading eyebrow="Also available" number="04" title="Other things we take on." />

          <ul className="mt-12 border-t border-ink/12">
            {others.map((other) => (
              <li key={other.slug} className="border-b border-ink/12">
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-4 py-7"
                >
                  <span className="display text-[clamp(1.4rem,1.1rem+1.5vw,2.25rem)] text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-brass-deep">
                    {other.title}
                  </span>
                  <span className="label text-ash">{other.from}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Cta
        eyebrow="Next step"
        title={`Let's talk about ${service.title.toLowerCase()}.`}
        image={service.secondaryImage}
      />
    </>
  );
}
