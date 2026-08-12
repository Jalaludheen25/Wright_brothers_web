import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/Cta";
import { ProjectClips } from "@/components/sections/ProjectClips";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { ParallaxImage, StaticImage } from "@/components/ui/ParallaxImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { IMAGES } from "@/lib/images";
import { PROJECTS, adjacentProjects, getProject } from "@/lib/content/projects";
import { buildMetadata, breadcrumbSchema, projectSchema } from "@/lib/seo";
import { pad } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project)
    return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: `${project.title}, ${project.area}`,
    description: `${project.strapline}. ${project.brief}`.slice(0, 175),
    path: `/projects/${project.slug}`,
    image: IMAGES[project.cover].src,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = adjacentProjects(project.slug);

  return (
    <>
      <JsonLd
        schema={[
          projectSchema({
            name: project.title,
            description: project.strapline,
            path: `/projects/${project.slug}`,
            image: IMAGES[project.cover].src,
          }),
          breadcrumbSchema([
            { name: "Projects", href: "/projects" },
            { name: project.title, href: `/projects/${project.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink pt-40 pb-[clamp(3rem,2rem+4vw,6rem)]">
        <ParallaxImage
          image={project.cover}
          alt={`${project.title} in ${project.area} — ${project.strapline}`}
          fill
          sizes="100vw"
          priority
          amount={12}
          quality={85}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/35"
        />
        <div aria-hidden="true" className="grain absolute inset-0" />

        <div className="relative z-10 container-wide">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="label flex flex-wrap items-center gap-2 text-alabaster/55">
                <li>
                  <Link href="/" className="link-underline hover:text-alabaster">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href="/projects" className="link-underline hover:text-alabaster">
                    Projects
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <span aria-current="page" className="text-brass-light">
                    {project.title}
                  </span>
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <p className="label flex flex-wrap items-center gap-3 text-brass-light">
              <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
              {project.category}
              <span aria-hidden="true">·</span>
              {project.area}
              {project.year ? (
                <>
                  <span aria-hidden="true">·</span>
                  {project.year}
                </>
              ) : null}
            </p>
          </Reveal>

          <AnimatedText
            as="h1"
            text={project.title}
            immediate
            delay={0.25}
            className="display mt-6 text-hero text-alabaster"
          />

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-[46ch] text-lead leading-[1.55] text-alabaster/70">
              {project.strapline}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <dl className="mt-14 grid gap-8 border-t border-alabaster/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="label text-alabaster/55">{fact.label}</dt>
                  <dd className="display mt-3 text-[1.75rem] leading-none text-alabaster [font-variant-numeric:lining-nums]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Narrative */}
      <Section tone="stone">
        <div className="container-wide grid gap-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-14">
              {[
                { label: "The brief", body: project.brief, n: 1 },
                { label: "Our approach", body: project.approach, n: 2 },
                { label: "The outcome", body: project.outcome, n: 3 },
              ].map((block) => (
                <Reveal key={block.label}>
                  <div>
                    <p className="label flex items-center gap-3 text-brass-deep">
                      <span className="tabular-nums">{pad(block.n)}</span>
                      <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
                      {block.label}
                    </p>
                    <p className="mt-6 max-w-[62ch] text-lead leading-[1.75] text-slate">
                      {block.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {project.quote ? (
              <Reveal delay={0.1}>
                <figure className="mt-16 border-l border-brass/40 pl-7">
                  <blockquote className="display text-h3 leading-[1.3] text-ink">
                    &ldquo;{project.quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="label mt-6 text-ash">
                    {project.quote.attribution}
                  </figcaption>
                </figure>
              </Reveal>
            ) : null}
          </div>

          {/* Scope */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <div className="border-t border-ink/15 pt-7">
                <h2 className="label text-ash">Scope of works</h2>
                <ul className="mt-6 space-y-3">
                  {project.scope.map((item) => (
                    <li key={item} className="flex gap-3.5 leading-relaxed text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-px w-3.5 shrink-0 bg-brass"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 border-t border-ink/15 pt-7">
                <h2 className="label text-ash">Details</h2>
                <dl className="mt-6 space-y-4">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate">Community</dt>
                    <dd className="text-right text-ink">{project.area}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate">Type</dt>
                    <dd className="text-right text-ink">{project.category}</dd>
                  </div>
                  {project.year ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Completed</dt>
                      <dd className="text-right text-ink [font-variant-numeric:lining-nums]">
                        {project.year}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* Walkthrough */}
      {project.video ? (
        <Section tone="alabaster" className="pt-0">
          <div className="container-wide">
            <Reveal direction="none" duration={1.2}>
              <figure>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <BackgroundVideo
                    video={project.video}
                    alt={`${project.title} — walkthrough of the completed floor`}
                  />
                </div>
                {project.videoCaption ? (
                  <figcaption className="label mt-5 text-ash">
                    {project.videoCaption}
                  </figcaption>
                ) : null}
              </figure>
            </Reveal>
          </div>
        </Section>
      ) : null}

      {/* Site clips */}
      {project.clips?.length ? (
        <Section tone="ink" className="grain overflow-hidden">
          <div className="container-wide">
            <SectionHeading
              eyebrow="On site"
              tone="light"
              title="Eleven clips from the works."
              lead="Shot as the boards were built out and terminated."
            />
            <div className="mt-14">
              <ProjectClips clips={project.clips} />
            </div>
          </div>
        </Section>
      ) : null}

      {/* Gallery */}
      <Section tone="alabaster" className="pt-0">
        <div className="container-wide">
          {/* Three columns rather than two: some galleries now run to nearly
              thirty frames. Each cell takes the orientation of its own source,
              so portrait site photography is not cropped to a landscape box. */}
          <RevealGroup
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            stagger={0.05}
          >
            {project.gallery.map((image, i) => {
              const { width, height } = IMAGES[image];
              const portrait = height > width;
              // The lead frame spans the row, but only if it is landscape —
              // a portrait image stretched that wide is all crop and no subject.
              const lead = i === 0 && !portrait;
              return (
                <RevealItem
                  key={image}
                  className={lead ? "sm:col-span-2 lg:col-span-3" : undefined}
                >
                  <StaticImage
                    image={image}
                    alt={`${project.title} — project photograph ${i + 1}`}
                    className={
                      lead
                        ? "aspect-[16/9] w-full"
                        : portrait
                          ? "aspect-[3/4] w-full"
                          : "aspect-[4/3] w-full"
                    }
                    sizes={
                      lead
                        ? "(max-width: 1024px) 100vw, 90vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                    }
                  />
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      {/* Prev / next */}
      <Section tone="ink" className="grain overflow-hidden py-0">
        <div className="container-wide grid divide-alabaster/12 sm:grid-cols-2 sm:divide-x">
          {[
            { project: prev, label: "Previous project", align: "left" as const },
            { project: next, label: "Next project", align: "right" as const },
          ].map(({ project: item, label, align }) =>
            item ? (
              <Link
                key={label}
                href={`/projects/${item.slug}`}
                className={
                  "group flex flex-col py-14 transition-colors duration-500 sm:py-20 " +
                  (align === "right" ? "sm:items-end sm:pl-10 sm:text-right" : "sm:pr-10")
                }
              >
                <span className="label text-alabaster/55">{label}</span>
                <span className="display mt-4 text-h2 text-alabaster transition-colors duration-500 group-hover:text-brass-light">
                  {item.title}
                </span>
                <span className="label mt-4 text-alabaster/55">
                  {item.category} · {item.area}
                </span>
              </Link>
            ) : null
          )}
        </div>
      </Section>

      <Cta
        eyebrow="Start yours"
        title="Tell us about your house."
        image={project.gallery[0] ?? project.cover}
      />
    </>
  );
}
