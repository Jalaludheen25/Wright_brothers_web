"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Props = {
  text: string;
  className?: string;
  as?: ElementType;
  /** Seconds before the first word starts. */
  delay?: number;
  stagger?: number;
  /** Run on mount rather than waiting for the element to scroll into view. */
  immediate?: boolean;
  /** Text wrapped in *asterisks* renders in the accent style. */
  accentClassName?: string;
};

type Token = {
  word: string;
  accent: boolean;
  /** Punctuation that must stay glued to the word, outside the accent style. */
  tail: string;
};

/**
 * Turns "no gap to *fall into*." into per-word tokens, so emphasis can span
 * several words and still survive the punctuation that follows it.
 */
function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\*([^*]+)\*/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  const push = (chunk: string, accent: boolean) => {
    let rest = chunk;

    // A plain chunk that does not begin with whitespace is a continuation of
    // the word before it — the full stop after "*fall into*", for instance.
    if (!accent && tokens.length && !/^\s/.test(chunk)) {
      const leading = /^\S+/.exec(chunk);
      if (leading) {
        tokens[tokens.length - 1].tail += leading[0];
        rest = chunk.slice(leading[0].length);
      }
    }

    for (const word of rest.split(/\s+/)) {
      if (word) tokens.push({ word, accent, tail: "" });
    }
  };

  while ((match = pattern.exec(text)) !== null) {
    push(text.slice(cursor, match.index), false);
    push(match[1], true);
    cursor = match.index + match[0].length;
  }
  push(text.slice(cursor), false);

  return tokens;
}

/**
 * Word-by-word masked reveal — each word rises out of a clipped line box.
 * The full string stays in the accessibility tree via aria-label while the
 * animated spans are hidden from it, so screen readers hear one clean phrase.
 */
export function AnimatedText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.055,
  immediate = false,
  accentClassName = "italic text-brass",
}: Props) {
  const reduce = usePrefersReducedMotion();
  const Tag = as as ElementType;
  const tokens = tokenize(text);
  const plain = text.replace(/\*/g, "");

  if (reduce) {
    return (
      <Tag className={className}>
        {tokens.map((token, i) => (
          <span key={i}>
            <span className={token.accent ? accentClassName : undefined}>
              {token.word}
            </span>
            {token.tail}
            {i < tokens.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={plain}>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        {...(immediate
          ? { animate: "visible" }
          : {
              whileInView: "visible",
              viewport: { once: true, margin: "0px 0px -12% 0px" },
            })}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {tokens.map((token, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <span className={cn(token.accent && accentClassName)}>
                {token.word}
              </span>
              {token.tail}
            </motion.span>
            {i < tokens.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
