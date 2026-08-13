import Link from "next/link";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Logo } from "@/components/ui/Logo";
import { Newsletter } from "./Newsletter";
import { TECHNICAL_SERVICES } from "@/lib/content/technical-services";
import {
  CONTACT,
  FOOTER_LINKS,
  SITE,
  SOCIAL,
  whatsappUrl,
} from "@/lib/site";

function Column({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="label text-alabaster/55">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="link-underline text-sm text-alabaster/70 transition-colors duration-300 hover:text-alabaster"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink text-alabaster">
      <div className="container-wide relative z-10 pt-[clamp(4rem,3rem+5vw,7rem)] pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            {/* The lockup already carries the wordmark, so no text beside it. */}
            <Link
              href="/"
              aria-label="Wright Brothers — home"
              className="inline-flex text-alabaster"
            >
              <Logo tone="light" className="h-9 sm:h-10" sizes="240px" />
            </Link>

            <p className="mt-7 max-w-[46ch] text-lead leading-[1.6] text-alabaster/60">
              A design-and-build atelier for Dubai&apos;s private residences.
              One team, one contract, from the first sketch to the day you get
              the keys.
            </p>

            <p className="mt-8 max-w-[44ch] text-sm leading-relaxed text-alabaster/55">
              <span className="text-brass-light">wright</span> · from Old
              English <em className="not-italic italic">wyrhta</em>: one who
              makes, shapes or works a material by hand.
            </p>

            <div className="mt-12 max-w-md">
              <Newsletter />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Column title="Studio" links={FOOTER_LINKS.studio} />
            <Column title="Services" links={FOOTER_LINKS.services} />

            <div className="space-y-10">
              <div>
                <h2 className="label text-alabaster/55">Visit</h2>
                <address className="mt-5 text-sm leading-relaxed text-alabaster/70 not-italic">
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                  <br />
                  {CONTACT.address.city}, {CONTACT.address.country}
                </address>
                <p className="mt-5 flex flex-col gap-2 text-sm">
                  <a
                    href={`tel:${CONTACT.phoneHref}`}
                    className="link-underline text-alabaster/70 hover:text-alabaster"
                  >
                    {CONTACT.phone}
                  </a>
                  <a
                    href={`tel:${CONTACT.phoneAltHref}`}
                    className="link-underline text-alabaster/70 hover:text-alabaster"
                  >
                    {CONTACT.phoneAlt}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="link-underline text-alabaster/70 hover:text-alabaster"
                  >
                    {CONTACT.email}
                  </a>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-brass-light"
                  >
                    WhatsApp us
                  </a>
                </p>
              </div>

              <div>
                <h2 className="label text-alabaster/55">Follow</h2>
                <ul className="mt-5 space-y-3">
                  {SOCIAL.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-2.5 text-sm text-alabaster/70 transition-colors duration-300 hover:text-alabaster"
                      >
                        <SocialIcon name={s.name} />
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Technical services — the eight trades, offered standalone */}
        <div className="mt-16 border-t border-alabaster/10 pt-8">
          <h2 className="label text-alabaster/55">Technical services</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {TECHNICAL_SERVICES.map((trade) => (
              <li key={trade.slug} className="text-sm text-alabaster/55">
                {trade.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Areas served — also useful for local SEO */}
        <div className="mt-10 border-t border-alabaster/10 pt-8">
          <h2 className="label text-alabaster/55">Communities we build in</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.areas.map((area) => (
              <li key={area.href}>
                <Link
                  href={area.href}
                  className="link-underline text-sm text-alabaster/55 hover:text-alabaster"
                >
                  {area.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-alabaster/10 pt-8 text-xs text-alabaster/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>{CONTACT.licence}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-underline hover:text-alabaster/70">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline hover:text-alabaster/70">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Oversized watermark — decorative, clipped by the footer bounds */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.22em] left-1/2 w-full -translate-x-1/2 text-center font-[var(--font-display)] text-[clamp(4rem,17vw,15rem)] leading-none font-light tracking-tight text-alabaster/[0.035] select-none"
      >
        Wright Brothers
      </span>
    </footer>
  );
}
