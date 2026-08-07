import Link from "next/link";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import type { ImageKey } from "@/lib/images";
import type { ReactNode } from "react";

export type Crumb = { name: string; href: string };

/**
 * Shared hero for every interior page. Always dark, which keeps the fixed
 * header's light-on-image treatment legible on every route.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs = [],
  children,
  size = "default",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: ImageKey;
  crumbs?: Crumb[];
  children?: ReactNode;
  size?: "default" | "tall";
}) {
  return (
    <section
      className={
        "relative flex items-end overflow-hidden bg-ink " +
        (size === "tall"
          ? "min-h-[85svh] pt-40 pb-[clamp(3rem,2rem+4vw,6rem)]"
          : "min-h-[62svh] pt-40 pb-[clamp(2.5rem,2rem+3vw,5rem)]")
      }
    >
      <ParallaxImage
        image={image}
        alt=""
        fill
        sizes="100vw"
        priority
        amount={14}
        quality={80}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/45"
      />
      <div aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative z-10 container-wide">
        {crumbs.length ? (
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="label flex flex-wrap items-center gap-2 text-alabaster/55">
                <li>
                  <Link href="/" className="link-underline hover:text-alabaster">
                    Home
                  </Link>
                </li>
                {crumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    {i === crumbs.length - 1 ? (
                      <span aria-current="page" className="text-brass-light">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="link-underline hover:text-alabaster"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        <Reveal delay={0.05} className="mt-8">
          <p className="label flex items-center gap-3 text-brass-light">
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
            {eyebrow}
          </p>
        </Reveal>

        <AnimatedText
          as="h1"
          text={title}
          immediate
          delay={0.25}
          className="display mt-7 max-w-[20ch] text-display text-alabaster"
          accentClassName="italic text-brass-light"
        />

        {lead ? (
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-[56ch] text-lead leading-[1.65] text-alabaster/70">
              {lead}
            </p>
          </Reveal>
        ) : null}

        {children}
      </div>
    </section>
  );
}
