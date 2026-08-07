import "server-only";

import { CONTACT, SITE } from "./site";

/**
 * Outbound delivery for form submissions.
 *
 * Two channels, checked in order:
 *
 *   1. RESEND_API_KEY + CONTACT_TO_EMAIL — sends a transactional email.
 *   2. FORM_WEBHOOK_URL — POSTs the payload as JSON (Zapier, Make, n8n,
 *      a CRM endpoint, a Slack workflow — anything that accepts a webhook).
 *
 * If neither is configured, delivery fails *loudly*. The alternative — quietly
 * returning success — means a deployed site silently discards real enquiries,
 * which is far worse than an honest error telling the visitor to phone.
 */

export type DeliveryResult =
  | { delivered: true; via: "resend" | "webhook" }
  | { delivered: false; reason: "not-configured" | "provider-error" };

export function deliveryConfigured(): boolean {
  return Boolean(
    (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) ||
      process.env.FORM_WEBHOOK_URL
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function deliver({
  subject,
  fields,
  replyTo,
}: {
  subject: string;
  fields: Record<string, string>;
  replyTo?: string;
}): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const webhook = process.env.FORM_WEBHOOK_URL;

  if (resendKey && to) {
    const rows = Object.entries(fields)
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#616a6c;vertical-align:top">${escapeHtml(
            k
          )}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`
      )
      .join("");

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL ??
            `${SITE.name} <website@${new URL(SITE.url).hostname}>`,
          to: [to],
          reply_to: replyTo,
          subject,
          html: `<h2 style="font-family:Georgia,serif">${escapeHtml(
            subject
          )}</h2><table style="font-family:Helvetica,Arial,sans-serif;font-size:14px">${rows}</table>`,
        }),
      });

      if (!res.ok) {
        console.error("[notify] Resend rejected the message:", res.status, await res.text());
        return { delivered: false, reason: "provider-error" };
      }
      return { delivered: true, via: "resend" };
    } catch (error) {
      console.error("[notify] Resend request failed:", error);
      return { delivered: false, reason: "provider-error" };
    }
  }

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, fields, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) {
        console.error("[notify] Webhook rejected the payload:", res.status);
        return { delivered: false, reason: "provider-error" };
      }
      return { delivered: true, via: "webhook" };
    } catch (error) {
      console.error("[notify] Webhook request failed:", error);
      return { delivered: false, reason: "provider-error" };
    }
  }

  console.error(
    "[notify] No delivery channel configured — set RESEND_API_KEY + CONTACT_TO_EMAIL, " +
      "or FORM_WEBHOOK_URL. See README (Going live). Submission was NOT stored."
  );
  return { delivered: false, reason: "not-configured" };
}

/** Shown to the visitor when we cannot deliver, so the lead is not lost. */
export const FALLBACK_MESSAGE =
  `We couldn't submit that form just now. Please email ${CONTACT.email} ` +
  `or call ${CONTACT.phone} and we'll pick it up straight away.`;
