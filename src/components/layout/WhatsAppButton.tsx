"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { usePrefersReducedMotion, useScrolledPast } from "@/lib/hooks";

export function WhatsAppButton() {
  const reduce = usePrefersReducedMotion();
  const visible = useScrolledPast(600);
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="no-print fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40"
        >
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            className="group relative flex items-center gap-3 rounded-full bg-whatsapp py-3.5 pr-4 pl-3.5 text-alabaster shadow-[0_10px_40px_-12px_rgba(12,15,16,0.55)] transition-colors duration-500 hover:bg-whatsapp-deep"
          >
            {/* Breathing halo */}
            {!reduce ? (
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/25 [animation-duration:3.5s]"
              />
            ) : null}

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 shrink-0 fill-current"
            >
              <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.36c0-4.53 3.69-8.22 8.24-8.22a8.18 8.18 0 0 1 8.22 8.23c0 4.53-3.69 8.21-8.22 8.21z" />
            </svg>

            <motion.span
              initial={false}
              animate={{
                width: hovered ? "auto" : 0,
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden text-[0.7rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase"
            >
              <span className="pr-1">Chat with us</span>
            </motion.span>

            <span className="sr-only">Message Wright Brothers on WhatsApp</span>
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
