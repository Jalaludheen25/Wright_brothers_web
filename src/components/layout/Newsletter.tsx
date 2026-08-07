"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <label htmlFor="newsletter-email" className="label text-alabaster/55">
        The Quarterly
      </label>
      <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-alabaster/60">
        Four letters a year on building well in this climate. No promotions, and
        one click to leave.
      </p>

      <div className="mt-6 flex items-center border-b border-alabaster/25 transition-colors duration-500 focus-within:border-brass">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-describedby="newsletter-status"
          aria-invalid={status === "error"}
          className="w-full bg-transparent py-3 pr-3 text-sm text-alabaster placeholder:text-alabaster/55 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="label shrink-0 py-3 text-brass-light transition-colors duration-300 hover:text-alabaster disabled:opacity-50"
        >
          {status === "loading" ? "Sending" : "Subscribe"}
        </button>
      </div>

      <p
        id="newsletter-status"
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
  );
}
