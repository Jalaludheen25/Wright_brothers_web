"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { CONTACT, NAV, SOCIAL, whatsappUrl } from "@/lib/site";
import { usePrefersReducedMotion, useScrolledPast } from "@/lib/hooks";
import { cn, pad } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const reduce = usePrefersReducedMotion();
  // Solid header once we are clear of the hero.
  const scrolled = useScrolledPast(64);

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the overlay on navigation. Adjusting state during render (rather
  // than in an effect) is React's documented pattern for reacting to a
  // changed input, and avoids a second render pass with the menu still open.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  // Lock the page, trap focus and restore it on close.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the panel so the first Tab lands where you expect.
    const timer = window.setTimeout(
      () => panelRef.current?.querySelector<HTMLElement>("a")?.focus(),
      120
    );

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const light = !scrolled && !open;

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-xs focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-alabaster"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled && !open
            ? "border-b border-ink/8 bg-alabaster/85 py-3 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent py-6"
        )}
      >
        {/* Scrim so the nav stays legible over bright hero imagery before the
            solid background kicks in. */}
        {light ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-ink/75 via-ink/35 to-transparent"
          />
        ) : null}

        <div className="container-wide flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Wright Brothers — home"
            className="transition-colors duration-500"
            /* The white lockup shows over the hero and in the open menu; the
               black one once the header goes solid. Crossfaded, not swapped. */
            style={
              {
                "--logo-dark": light || open ? 0 : 1,
                "--logo-light": light || open ? 1 : 0,
              } as React.CSSProperties
            }
          >
            <Logo tone="auto" priority className="h-7 sm:h-9" />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 lg:flex"
          >
            {NAV.slice(0, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "link-underline text-[0.8rem] font-medium tracking-[0.06em] transition-colors duration-500",
                  light
                    ? "text-alabaster/85 hover:text-alabaster"
                    : "text-slate hover:text-ink",
                  isActive(item.href) && (light ? "text-alabaster" : "text-ink")
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "hidden rounded-xs border px-6 py-3 text-[0.7rem] font-medium tracking-[0.14em] uppercase transition-all duration-500 sm:inline-flex",
                light
                  ? "border-alabaster/35 text-alabaster hover:bg-alabaster hover:text-ink"
                  : "border-ink/25 text-ink hover:bg-ink hover:text-alabaster",
                open && "border-alabaster/35 text-alabaster hover:bg-alabaster hover:text-ink"
              )}
            >
              Start a project
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={cn(
                "relative z-[70] flex h-11 w-11 items-center justify-center rounded-xs transition-colors duration-500",
                light || open ? "text-alabaster" : "text-ink"
              )}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.2 : 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[65] overflow-y-auto bg-ink text-alabaster"
          >
            <div className="grain relative flex min-h-full flex-col justify-between pt-32 pb-12">
              <nav aria-label="All pages" className="container-wide">
                <ul>
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: reduce ? 0 : 0.28 + i * 0.055,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-alabaster/10"
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="group flex items-baseline gap-5 py-4 sm:gap-8 sm:py-5"
                      >
                        <span className="label w-8 shrink-0 text-brass-light opacity-80">
                          {pad(i + 1)}
                        </span>
                        <span
                          className={cn(
                            "display text-[clamp(2rem,1.1rem+4.2vw,4.5rem)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-brass-light",
                            isActive(item.href) && "text-brass"
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="ml-auto hidden max-w-[26ch] text-right text-sm text-alabaster/55 md:block">
                          {item.blurb}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.7, duration: 0.7 }}
                className="container-wide mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
              >
                <div>
                  <p className="label text-alabaster/55">Studio</p>
                  <p className="mt-3 text-sm leading-relaxed text-alabaster/70">
                    {CONTACT.address.line1}
                    <br />
                    {CONTACT.address.line2}, {CONTACT.address.city}
                  </p>
                </div>
                <div>
                  <p className="label text-alabaster/55">Enquiries</p>
                  <p className="mt-3 flex flex-col gap-1 text-sm">
                    <a href={`tel:${CONTACT.phoneHref}`} className="link-underline text-alabaster/80">
                      {CONTACT.phone}
                    </a>
                    <a href={`mailto:${CONTACT.email}`} className="link-underline text-alabaster/80">
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="label text-alabaster/55">Follow</p>
                  <ul className="mt-3 flex flex-col gap-1 text-sm">
                    {SOCIAL.map((s) => (
                      <li key={s.name}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-alabaster/80"
                        >
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label rounded-xs border border-alabaster/25 px-6 py-4 transition-colors duration-500 hover:bg-alabaster hover:text-ink"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
