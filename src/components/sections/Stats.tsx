import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { STATS } from "@/lib/content/stats";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(4.5rem,3rem+8vw,9rem)] text-alabaster">
      {/* Faint architectural backdrop */}
      <ParallaxImage
        image="abs-geometry"
        alt=""
        fill
        className="opacity-[0.14]"
        sizes="100vw"
        amount={18}
        quality={70}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
      <div aria-hidden="true" className="grain absolute inset-0" />

      <div className="relative z-10 container-wide">
        <RevealGroup
          className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="border-t border-alabaster/15 pt-7">
                {/* Lining figures — Cormorant defaults to old-style, which
                    makes "16" read as "ı6" at display size. */}
                <p className="display flex items-baseline text-[clamp(3rem,2rem+4.5vw,5.5rem)] leading-none text-alabaster [font-variant-numeric:lining-nums]">
                  {stat.prefix ? (
                    <span className="text-brass-light">{stat.prefix}</span>
                  ) : null}
                  <Counter value={stat.value} decimals={stat.decimals ?? 0} />
                  {stat.suffix ? (
                    <span className="text-brass-light">{stat.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-5 text-base font-medium text-alabaster">
                  {stat.label}
                </p>
                <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-alabaster/55">
                  {stat.note}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
