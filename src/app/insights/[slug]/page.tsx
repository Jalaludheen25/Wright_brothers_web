import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/sections/PostCard";
import { Cta } from "@/components/sections/Cta";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { IMAGES } from "@/lib/images";
import { POSTS, getPost, relatedPosts, type Block } from "@/lib/content/insights";
import { buildMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post)
    return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    image: IMAGES[post.image].src,
    type: "article",
    publishedTime: post.date,
  });
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <Reveal key={i}>
          <h2 className="display mt-14 mb-6 text-h3 leading-tight text-ink first:mt-0">
            {block.text}
          </h2>
        </Reveal>
      );
    case "ul":
      return (
        <Reveal key={i}>
          <ul className="my-8 space-y-3.5">
            {block.items.map((item) => (
              <li key={item} className="flex gap-4 leading-[1.75] text-slate">
                <span
                  aria-hidden="true"
                  className="mt-[0.75em] h-px w-4 shrink-0 bg-brass"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "quote":
      return (
        <Reveal key={i}>
          <blockquote className="display my-12 border-l border-brass/40 pl-7 text-h3 leading-[1.35] text-ink">
            &ldquo;{block.text}&rdquo;
          </blockquote>
        </Reveal>
      );
    default:
      return (
        <Reveal key={i}>
          <p className="my-6 leading-[1.85] text-slate">{block.text}</p>
        </Reveal>
      );
  }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug, 3);

  return (
    <>
      <JsonLd
        schema={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/insights/${post.slug}`,
            datePublished: post.date,
            author: post.author,
            image: IMAGES[post.image].src,
          }),
          breadcrumbSchema([
            { name: "Insights", href: "/insights" },
            { name: post.title, href: `/insights/${post.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink pt-40 pb-[clamp(2.5rem,2rem+3vw,5rem)]">
        <ParallaxImage
          image={post.image}
          alt=""
          fill
          sizes="100vw"
          priority
          amount={12}
          quality={80}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45"
        />
        <div aria-hidden="true" className="grain absolute inset-0" />

        <div className="relative z-10 container-x">
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
                  <Link href="/insights" className="link-underline hover:text-alabaster">
                    Insights
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <span aria-current="page" className="text-brass-light">
                    {post.category}
                  </span>
                </li>
              </ol>
            </nav>
          </Reveal>

          <AnimatedText
            as="h1"
            text={post.title}
            immediate
            delay={0.2}
            className="display mt-8 max-w-[20ch] text-h1 text-alabaster"
          />

          <Reveal delay={0.35}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-alabaster/15 pt-6">
              <span className="label text-brass-light">{post.category}</span>
              <span className="label text-alabaster/55">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="label text-alabaster/55">
                {post.readingMinutes} min read
              </span>
              <span className="label text-alabaster/55">
                {post.author}, {post.authorRole}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <Section tone="stone">
        <article className="container-prose">
          <Reveal>
            <p className="display text-h3 leading-[1.4] text-ink">
              {post.excerpt}
            </p>
          </Reveal>

          <div className="mt-12">{post.body.map(renderBlock)}</div>

          <Reveal>
            <footer className="mt-16 border-t border-ink/12 pt-8">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-[0.65rem] tracking-widest text-slate"
                >
                  {post.author
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div>
                  <p className="font-medium text-ink">{post.author}</p>
                  <p className="text-sm text-ash">{post.authorRole}</p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-slate">
                Have a question this raises about your own property?{" "}
                <Link href="/contact" className="link-underline text-ink">
                  Ask us directly
                </Link>{" "}
                — we answer these ourselves.
              </p>
            </footer>
          </Reveal>
        </article>
      </Section>

      {/* Related */}
      <Section tone="alabaster">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-h2 text-ink">Keep reading</h2>
            <Link href="/insights" className="link-underline label text-ink">
              All insights
            </Link>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.07}>
                <PostCard post={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Cta />
    </>
  );
}
