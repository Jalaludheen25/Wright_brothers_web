import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-stone py-[clamp(4.5rem,3rem+8vw,10rem)]"
    >
      <div className="container-wide">
        <div className="grid gap-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-12">
          {/* Statement */}
          <div className="lg:col-span-7 lg:pr-8">
            <Reveal>
              <Eyebrow number="01">The studio</Eyebrow>
            </Reveal>

            <AnimatedText
              as="h2"
              text="A design practice that refuses to hand its drawings to someone else."
              className="display mt-8 text-display text-ink"
            />

            <div className="mt-10 max-w-[54ch] space-y-6 text-lead leading-[1.7] text-slate">
              <Reveal delay={0.05}>
                <p>
                  Most residential projects in Dubai are split in two. An
                  architect draws the house and hands it to a contractor who
                  had no part in the thinking. When the two disagree — and they
                  always do — the person paying for both is the one who has to
                  referee.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  We removed the seam. Wright Brothers designs and constructs
                  under a single contract, with our own site teams and our own
                  joinery workshop in Al Quoz. The architect who drew your stair
                  detail is still on the project the day it is installed.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-ink">
                  It is a slower way to start and a considerably faster way to
                  finish.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-12">
              <ButtonLink href="/about" variant="outline" arrow>
                About the studio
              </ButtonLink>
            </Reveal>
          </div>

          {/* Imagery */}
          <div className="lg:col-span-5">
            <div className="relative">
              <Reveal direction="none" duration={1.2}>
                <ParallaxImage
                  image="int-loft-glass"
                  alt="An interior of steel-framed glazed partitions dividing a double-height living space"
                  className="aspect-[4/5] w-full"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  amount={14}
                />
              </Reveal>

              {/* Offset detail image */}
              <Reveal
                delay={0.25}
                className="absolute -bottom-10 -left-6 hidden w-[46%] sm:block lg:-left-14"
              >
                <ParallaxImage
                  image="ext-facade-detail"
                  alt="Detail of a deep-set façade screen casting shadow across stone"
                  className="aspect-[3/4] w-full shadow-[0_30px_80px_-30px_rgba(12,15,16,0.45)]"
                  sizes="(max-width: 1024px) 45vw, 18vw"
                  amount={20}
                />
              </Reveal>
            </div>

            <Reveal delay={0.3} className="mt-20 sm:mt-28 lg:mt-24">
              <figure className="border-l border-brass/40 pl-6">
                <blockquote className="display text-h3 leading-[1.25] text-ink">
                  &ldquo;We spend the first month on plan, before anyone
                  discusses a stone sample.&rdquo;
                </blockquote>
                <figcaption className="label mt-5 text-ash">
                  Yasmin Rahal — Head of Design
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
