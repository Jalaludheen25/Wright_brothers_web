"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/content/services";
import { TECHNICAL_SERVICES } from "@/lib/content/technical-services";
import { PROJECT_AREAS } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";
type Errors = Record<string, string>;

const BUDGETS = [
  "Under AED 500K",
  "AED 500K — 1M",
  "AED 1M — 2.5M",
  "AED 2.5M — 5M",
  "AED 5M — 10M",
  "Above AED 10M",
  "Not yet established",
];

const FIELD =
  "w-full border-b bg-transparent py-3.5 text-[0.95rem] text-ink transition-colors duration-400 " +
  "placeholder:text-ash focus:border-brass focus:outline-none";

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label text-ash">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-brass-deep">
            *
          </span>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-xs text-[#a8442f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const id = (name: string) => `${uid}-${name}`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");

    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      community: data.get("community"),
      service: data.get("service"),
      budget: data.get("budget"),
      message: data.get("message"),
      company: data.get("company"),
      consent: data.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as {
        ok: boolean;
        message: string;
        errors?: Errors;
      };

      if (!res.ok || !result.ok) {
        setStatus("error");
        setErrors(result.errors ?? {});
        setMessage(result.message);
        statusRef.current?.focus();
        return;
      }

      setStatus("success");
      setMessage(result.message);
      formRef.current?.reset();
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      setMessage("Network error — please try again, or call the studio.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="w-full">
      {/* Honeypot — off-screen rather than display:none so bots still see it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company")}>Company (leave blank)</label>
        <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <Field label="Your name" htmlFor={id("name")} error={errors.name} required>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id("name")}-error` : undefined}
            className={cn(FIELD, errors.name ? "border-[#a8442f]" : "border-ink/20")}
          />
        </Field>

        <Field label="Email" htmlFor={id("email")} error={errors.email} required>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id("email")}-error` : undefined}
            className={cn(FIELD, errors.email ? "border-[#a8442f]" : "border-ink/20")}
          />
        </Field>

        <Field label="Phone" htmlFor={id("phone")}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+971 50 000 0000"
            className={cn(FIELD, "border-ink/20")}
          />
        </Field>

        <Field label="Community" htmlFor={id("community")}>
          <select
            id={id("community")}
            name="community"
            defaultValue=""
            className={cn(FIELD, "border-ink/20")}
          >
            <option value="">Select a community</option>
            {PROJECT_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
            <option value="Other">Elsewhere in the UAE</option>
          </select>
        </Field>

        <Field label="What you need" htmlFor={id("service")}>
          <select
            id={id("service")}
            name="service"
            defaultValue=""
            className={cn(FIELD, "border-ink/20")}
          >
            <option value="">Select a service</option>
            <optgroup label="Design & build">
              {SERVICES.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Technical services">
              {TECHNICAL_SERVICES.map((trade) => (
                <option key={trade.slug} value={trade.title}>
                  {trade.title}
                </option>
              ))}
            </optgroup>
            <option value="Not sure">Not sure yet</option>
          </select>
        </Field>

        <Field label="Budget" htmlFor={id("budget")}>
          <select
            id={id("budget")}
            name="budget"
            defaultValue=""
            className={cn(FIELD, "border-ink/20")}
          >
            <option value="">Select a range</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="About the property"
          htmlFor={id("message")}
          error={errors.message}
          required
          className="sm:col-span-2"
        >
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            required
            placeholder="What the house is, what is wrong with it, and roughly when you'd like to start."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${id("message")}-error` : undefined}
            className={cn(
              FIELD,
              "resize-y",
              errors.message ? "border-[#a8442f]" : "border-ink/20"
            )}
          />
        </Field>
      </div>

      <div className="mt-9">
        <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-3.5">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[#a9834e]"
          />
          <span className="text-sm leading-relaxed text-slate">
            I agree that Wright Brothers may contact me about this enquiry. We
            never sell or share your details, and one line in reply removes you
            from our records.
          </span>
        </label>
        {errors.consent ? (
          <p id={`${id("consent")}-error`} className="mt-2 text-xs text-[#a8442f]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Button type="submit" size="lg" disabled={status === "loading"} arrow>
          {status === "loading" ? "Sending…" : "Request a consultation"}
        </Button>

        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={cn(
            "max-w-[38ch] text-sm focus:outline-none",
            status === "error" ? "text-[#a8442f]" : "text-brass-deep"
          )}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
