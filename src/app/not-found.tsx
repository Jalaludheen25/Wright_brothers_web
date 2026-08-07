import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { NAV } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink pt-40 pb-[clamp(3rem,2rem+4vw,6rem)]">
      <ParallaxImage
        image="ext-canopy-dark"
        alt=""
        fill
        sizes="100vw"
        amount={10}
        quality={75}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/50"
      />
      <div aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative z-10 container-wide">
        <p className="label text-brass-light">Error 404</p>

        <h1 className="display mt-7 max-w-[18ch] text-display text-alabaster">
          This page was never drawn.
        </h1>

        <p className="mt-7 max-w-[46ch] text-lead leading-[1.65] text-alabaster/65">
          The address does not exist, or the page has moved since you last saw
          it. Everything we publish is one click away below.
        </p>

        <div className="mt-11 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="light" size="lg" arrow>
            Back to the home page
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghostLight" size="lg">
            Or tell us what you were looking for
          </ButtonLink>
        </div>

        <nav aria-label="All pages" className="mt-16 border-t border-alabaster/15 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-alabaster/65 transition-colors duration-300 hover:text-alabaster"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
