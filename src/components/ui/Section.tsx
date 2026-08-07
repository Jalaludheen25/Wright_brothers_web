import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { AnimatedText } from "./AnimatedText";

export function Eyebrow({
  children,
  className,
  number,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  /** Drafting-style section numeral, e.g. "03". */
  number?: string;
  /** "dark" = sits on a light surface. Picks the brass tint that clears 4.5:1. */
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "label flex items-center gap-3",
        tone === "light" ? "text-brass-light" : "text-brass-deep",
        className
      )}
    >
      {number ? (
        <>
          <span className="tabular-nums opacity-70">{number}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
        </>
      ) : (
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      )}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  number,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
  children,
}: {
  eyebrow?: string;
  number?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** "dark" = dark text on a light surface. */
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow number={number} tone={tone}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}

      <AnimatedText
        as="h2"
        text={title}
        className={cn(
          "display mt-7 text-h2 max-w-[18ch]",
          align === "center" && "max-w-[22ch]",
          tone === "light" ? "text-alabaster" : "text-ink"
        )}
        accentClassName={tone === "light" ? "italic text-brass-light" : "italic text-brass"}
      />

      {lead ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-7 max-w-[52ch] text-lead leading-[1.65]",
              tone === "light" ? "text-alabaster/70" : "text-slate"
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "stone",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "stone" | "alabaster" | "ink" | "graphite" | "none";
} & React.HTMLAttributes<HTMLElement>) {
  const TONES = {
    stone: "bg-stone text-ink",
    alabaster: "bg-alabaster text-ink",
    ink: "bg-ink text-alabaster",
    graphite: "bg-graphite text-alabaster",
    none: "",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "relative py-[clamp(4.5rem,3rem+8vw,10rem)]",
        TONES[tone],
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
