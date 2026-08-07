import { AnimatedText } from "@/components/ui/AnimatedText";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { CONTACT, whatsappUrl } from "@/lib/site";
import type { ImageKey } from "@/lib/images";

export function Cta({
  eyebrow = "Start a conversation",
  title = "Tell us about the house. We'll tell you the truth about it.",
  body = "An hour, at your property or at our studio in Downtown Dubai. You leave with a written summary of the brief, an indicative range with its assumptions stated, and an honest view on whether we are the right firm for it.",
  image = "hero-timber",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  image?: ImageKey;
} = {}) {
  return (
    <section className="relative overflow-hidden bg-ink text-alabaster">
      <ParallaxImage
        image={image}
        alt=""
        fill
        className="opacity-30"
        sizes="100vw"
        amount={16}
        quality={75}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40"
      />
      <div aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative z-10 container-wide py-[clamp(5rem,3.5rem+8vw,10rem)]">
        <div className="max-w-[62ch]">
          <Reveal>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </Reveal>

          <AnimatedText
            as="h2"
            text={title}
            className="display mt-8 text-display text-alabaster"
            accentClassName="italic text-brass-light"
          />

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[54ch] text-lead leading-[1.7] text-alabaster/65">
              {body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" variant="light" size="lg" arrow>
                Book a consultation
              </ButtonLink>
              <ButtonLink href={whatsappUrl()} variant="ghostLight" size="lg">
                Or message us on WhatsApp
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-14 grid gap-8 border-t border-alabaster/15 pt-8 sm:grid-cols-3">
              <div>
                <dt className="label text-alabaster/55">Call</dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${CONTACT.phoneHref}`}
                    className="link-underline text-alabaster/85"
                  >
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-alabaster/55">Email</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="link-underline text-alabaster/85"
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-alabaster/55">Response</dt>
                <dd className="mt-3 text-alabaster/85">Within one working day</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
