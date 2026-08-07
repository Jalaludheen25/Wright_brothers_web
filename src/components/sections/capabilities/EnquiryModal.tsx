"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import type { Capability } from "@/lib/content/capabilities";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Lead capture for a capability that has not launched yet.
 *
 * A real dialog: focus is moved in on open, trapped while open, and restored
 * to the trigger on close; Escape and backdrop both dismiss.
 */
export function EnquiryModal({
  capability,
  onClose,
}: {
  capability: Capability | null;
  onClose: () => void;
}) {
  const reduce = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const open = capability !== null;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  // Reset the form each time a different capability opens the dialog.
  const [lastId, setLastId] = useState<string | null>(null);
  if (open && capability.id !== lastId) {
    setLastId(capability.id);
    setStatus("idle");
    setMessage("");
    setEmail("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!capability) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          interest: `${capability.title} — ${capability.discipline}`,
        }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again, or call the office.");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-[75] flex items-end justify-center p-4 sm:items-center sm:p-6"
          role="presentation"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            aria-describedby={`${uid}-desc`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: reduce ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-xs border border-alabaster/15 bg-graphite p-7 text-alabaster shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] sm:p-9"
          >
            {/* Registration marks, matching the cards */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-4 left-4 h-3 w-3 border-t border-l border-brass-light/50"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 bottom-4 h-3 w-3 border-r border-b border-brass-light/50"
            />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-alabaster/20 text-alabaster/70 transition-colors duration-300 hover:border-alabaster hover:text-alabaster"
            >
              <span className="sr-only">Close</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <p className="label text-brass-light">
              {capability.index} · {capability.meta}
            </p>

            <h2
              id={`${uid}-title`}
              className="display mt-5 max-w-[16ch] text-h3 leading-tight text-alabaster"
            >
              {capability.title} opens in 2027.
            </h2>

            <p
              id={`${uid}-desc`}
              className="mt-5 max-w-[46ch] leading-relaxed text-alabaster/70"
            >
              We are building this department properly rather than quickly.
              Leave an address and we will write to you once — when it is
              actually running, with what it does and what it costs.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-8">
              <label htmlFor={`${uid}-email`} className="label text-alabaster/55">
                Email address
              </label>
              <div className="mt-3 flex items-center border-b border-alabaster/25 transition-colors duration-500 focus-within:border-brass-light">
                <input
                  ref={inputRef}
                  id={`${uid}-email`}
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={status === "error"}
                  aria-describedby={`${uid}-status`}
                  className="w-full bg-transparent py-3 pr-3 text-alabaster placeholder:text-alabaster/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="label shrink-0 py-3 text-brass-light transition-colors duration-300 hover:text-alabaster disabled:opacity-50"
                >
                  {status === "loading" ? "Sending" : "Notify me"}
                </button>
              </div>

              <p
                id={`${uid}-status`}
                role="status"
                aria-live="polite"
                className={cn(
                  "mt-3 min-h-[1.25rem] text-xs",
                  status === "error" ? "text-[#e2a08a]" : "text-brass-light"
                )}
              >
                {message}
              </p>
            </form>

            <p className="mt-4 text-xs leading-relaxed text-alabaster/50">
              One email, then nothing until launch. Unsubscribe in a click.
            </p>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
