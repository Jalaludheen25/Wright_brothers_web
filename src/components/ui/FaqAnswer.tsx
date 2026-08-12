import type { Faq } from "@/lib/content/faqs";

/**
 * One FAQ answer. Most are a single paragraph; the MEP question carries
 * labelled sub-points and a closing line. Shared by the home, contact and
 * process accordions so the three stay identical.
 */
export function FaqAnswer({ faq }: { faq: Faq }) {
  if (!faq.details?.length) return <p>{faq.answer}</p>;

  return (
    <div className="space-y-5">
      <p>{faq.answer}</p>
      <ul className="space-y-3">
        {faq.details.map((item) => (
          <li key={item.label} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.6em] h-px w-4 shrink-0 bg-current opacity-40"
            />
            <span>
              <span className="font-medium text-ink">{item.label}</span>
              {" — "}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
      {faq.outro ? <p>{faq.outro}</p> : null}
    </div>
  );
}
