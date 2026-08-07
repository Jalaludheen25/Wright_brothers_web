"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  /** Optional right-hand meta, e.g. a category. */
  meta?: string;
};

/**
 * Disclosure list. Buttons carry aria-expanded / aria-controls and the panels
 * are real regions, so this reads correctly to assistive technology even while
 * the height is being animated.
 */
export function Accordion({
  items,
  className,
  tone = "dark",
  allowMultiple = false,
  defaultOpen,
}: {
  items: AccordionItem[];
  className?: string;
  tone?: "dark" | "light";
  allowMultiple?: boolean;
  defaultOpen?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(defaultOpen ? [defaultOpen] : []);

  const toggle = (id: string) => {
    setOpen((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((x) => x !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn("divide-y", tone === "light" ? "divide-alabaster/15" : "divide-ink/12", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className="border-t-0">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  "group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 sm:py-7",
                  tone === "light"
                    ? "text-alabaster hover:text-brass-light"
                    : "text-ink hover:text-brass-deep"
                )}
              >
                <span className="display text-[clamp(1.15rem,1rem+0.6vw,1.6rem)] leading-tight">
                  {item.title}
                </span>

                <span className="flex shrink-0 items-center gap-4 pt-1">
                  {item.meta ? (
                    <span
                      className={cn(
                        "label hidden sm:inline",
                        tone === "light" ? "text-alabaster/55" : "text-ash"
                      )}
                    >
                      {item.meta}
                    </span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative mt-0.5 block h-4 w-4",
                      tone === "light" ? "text-alabaster/60" : "text-slate"
                    )}
                  >
                    <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                    <span
                      className={cn(
                        "absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen ? "scale-y-0" : "scale-y-100"
                      )}
                    />
                  </span>
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "max-w-[68ch] pb-8 text-[0.975rem] leading-[1.75]",
                      tone === "light" ? "text-alabaster/65" : "text-slate"
                    )}
                  >
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
